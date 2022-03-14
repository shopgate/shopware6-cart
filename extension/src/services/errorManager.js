'use strict'

const {
  ProductNotFoundError,
  ProductStockReachedError,
  UnknownError,
  ForbiddenError,
  CouponNotFound, CouponNotEligible
} = require('./errorList')
const { decorateError } = require('./logDecorator')

/**
 * @param {SW6Cart.SWErrorLevel} shopwareType
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
 * @param {SW6Cart.SWEntityError} error
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
 * Note that this only throws if errors are present
 *
 * @param {SW6Cart.SWCartErrors} errorList
 * @param {SW6Cart.PipelineContext} context
 * @throws {Error}
 */
const throwOnCartErrors = function (errorList, context) {
  Object.keys(errorList)
    .filter(key => errorList[key].level > 0)
    .forEach((key) => {
      context.log.info(decorateError(errorList[key]))
      switch (errorList[key].messageKey) {
        case 'product-not-found':
          throw new ProductNotFoundError()
        case 'promotion-not-found':
          throw new CouponNotFound(errorList[key].message)
        case 'product-stock-reached':
          throw new ProductStockReachedError()
        case 'shipping-method-blocked':
          // this is not a hard error, products are still added/updated
          break
        default:
          context.log.error(decorateError(errorList[key]), 'Cannot map error')
          throw new UnknownError()
      }
    })
}

/**
 * Sometimes we want to throw even on information messages
 * to show customer information via Error modal
 *
 * @param {SW6Cart.SWCartErrors} errorList
 * @param {SW6Cart.PipelineContext} context
 * @throws {Error}
 */
const throwOnCartInfoErrors = function (errorList, context) {
  Object.keys(errorList)
    .filter(key => errorList[key].level === 0)
    .forEach((key) => {
      context.log.info(decorateError(errorList[key]))
      switch (errorList[key].messageKey) {
        case 'promotion-not-eligible':
          throw new CouponNotEligible(errorList[key].message)
      }
    })
  throwOnCartErrors(errorList, context)
}

/**
 * @param {SW6Cart.ShopwareError[]} messages
 * @param {SW6Cart.PipelineContext} context
 * @throws Error
 */
const throwOnMessage = function (messages, context) {
  messages.forEach(message => {
    switch (message.code) {
      case 'CHECKOUT__CART_LINEITEM_NOT_FOUND':
        context.log.info(decorateError(message), 'Could not locate line item in cart')
        throw new ProductNotFoundError()
      case 'FRAMEWORK__INVALID_UUID':
        context.log.fatal(decorateError(message), 'Unexpected UID provided')
        throw new UnknownError()
      default:
        context.log.fatal(decorateError(message), 'Could not map message')
        throw new UnknownError()
    }
  })
  // hard fallback
  context.log.error('The error did not have messages provided')
  throw new UnknownError()
}

/**
 * @param {SW6Cart.SWClientApiError|Error} error
 * @param {SW6Cart.PipelineContext} context
 * @see https://shopware.stoplight.io/docs/store-api/ZG9jOjExMTYzMDU0-error-handling
 * @throws {Error}
 */
const throwOnApiError = function (error, context) {
  if (!error.statusCode) {
    context.log.error(decorateError(error))
    throw new UnknownError()
  }
  switch (error.statusCode) {
    case 400:
      throwOnMessage(error.messages, context)
      break
    case 401:
      context.log.fatal(decorateError(error), 'Unauthorized request, is your SalesChannel access token missing?')
      throw UnknownError()
    case 403:
      context.log.fatal(decorateError(error), 'Cannot call this endpoint with authentication')
      throw new ForbiddenError()
    case 412:
      context.log.fatal(decorateError(error), 'Possibly SalesChannel access key is invalid.')
      throw new UnknownError()
    case 500:
    default:
      context.log.fatal(decorateError(error), 'Unmapped error')
      throw new UnknownError()
  }
}

module.exports = {
  throwOnApiError,
  throwOnCartErrors,
  throwOnCartInfoErrors,
  toShopgateType,
  toShopgateMessage
}
