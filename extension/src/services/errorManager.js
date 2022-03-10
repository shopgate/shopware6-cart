'use strict'

const {
  ProductNotFoundError,
  ProductStockReachedError,
  UnknownError,
  ForbiddenError,
  CouponNotFound, CouponNotEligible
} = require('./errorList')

/**
 * @param {SWErrorLevel} shopwareType
 */
const toShopgateType = function (shopwareType) {
  switch (shopwareType) {
    case 20:
      return 'error'
    case 10:
      return 'warning'
    case 0:
    default:
      return 'info'
  }
}

/**
 * @param {SWEntityError} error
 * @return SGCartMessage
 */
const toShopgateMessage = function (error) {
  return {
    type: toShopgateType(error.level),
    code: error.messageKey,
    message: error.message,
    messageParams: {},
    translated: true
  }
}

/**
 * @param {SWClientApiError|SWEntityError|Error} error
 * @return string
 */
const wrapErrorForPrint = function (error) {
  if (error.statusCode) {
    return JSON.stringify(error.messages)
  } else if (error.messageKey) {
    return JSON.stringify(error)
  }
  return error.message
}

/**
 * @param {SWCartErrors} errorList
 * @param {PipelineContext} context
 * @throws {Error}
 */
const throwOnCartErrors = function (errorList, context) {
  Object.keys(errorList)
    .filter(key => errorList[key].level > 0)
    .forEach((key) => {
      const details = errorList[key].message
      context.log.info(details)
      switch (errorList[key].messageKey) {
        case 'product-not-found':
          throw new ProductNotFoundError()
        case 'promotion-not-found':
          throw new CouponNotFound(details)
        case 'product-stock-reached':
          throw new ProductStockReachedError()
        case 'shipping-method-blocked':
          // this is not a hard error, products are still added/updated
          break
        default:
          context.log.debug('Cannot map error: ' + wrapErrorForPrint(errorList[key]))
          throw new UnknownError()
      }
    })
}

/**
 * Sometimes we want to throw even on information messages
 * to show customer information via Error modal
 *
 * @param {SWCartErrors} errorList
 * @param {PipelineContext} context
 * @throws {Error}
 */
const throwOnCartInfoErrors = function (errorList, context) {
  Object.keys(errorList)
    .filter(key => errorList[key].level === 0)
    .forEach((key) => {
      const details = errorList[key].message
      context.log.info(details)
      switch (errorList[key].messageKey) {
        case 'promotion-not-eligible':
          throw new CouponNotEligible(details)
      }
    })
  throwOnCartErrors(errorList, context)
}

/**
 * @param {SWShopwareError[]} messages
 * @param {PipelineContext} context
 * @throws Error
 */
const throwOnMessage = function (messages, context) {
  messages.forEach(message => {
    switch (message.code) {
      case 'CHECKOUT__CART_LINEITEM_NOT_FOUND':
        context.log.info('Could not locate line item in cart: ' + message.detail)
        throw new ProductNotFoundError()
      case 'FRAMEWORK__INVALID_UUID':
        context.log.fatal('Unexpected UID provided:' + message.detail)
        throw new UnknownError()
      default:
        context.log.fatal('Could not map message: ' + JSON.stringify(message))
        throw new UnknownError()
    }
  })
  // hard fallback
  context.log.error('The error did not have messages provided')
  throw new UnknownError()
}

/**
 * @param {SWClientApiError|Error} error
 * @param {PipelineContext} context
 * @see https://shopware.stoplight.io/docs/store-api/ZG9jOjExMTYzMDU0-error-handling
 * @throws {Error}
 */
const throwOnApiError = function (error, context) {
  if (!error.statusCode) {
    context.log.error(error.message)
    throw new UnknownError()
  }
  const printableErrors = JSON.stringify(error.messages)
  switch (error.statusCode) {
    case 400:
      throwOnMessage(error.messages, context)
      break
    case 401:
      context.log.fatal('Unauthorized request, is your SalesChannel access token missing? ' + printableErrors)
      throw UnknownError()
    case 403:
      context.log.fatal('Cannot call this endpoint with authentication: ' + printableErrors)
      throw new ForbiddenError()
    case 412:
      context.log.fatal('Possibly SalesChannel access key is invalid. ' + printableErrors)
      throw new UnknownError()
    case 500:
    default:
      context.log.fatal('Unmapped error: ' + printableErrors)
      throw new UnknownError()
  }
}

module.exports = {
  throwOnApiError,
  throwOnCartErrors,
  throwOnCartInfoErrors,
  toShopgateType,
  toShopgateMessage,
  wrapErrorForPrint
}
