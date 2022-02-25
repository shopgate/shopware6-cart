'use strict'

class UnknownError extends Error {
  constructor () {
    super('An internal error occurred.')

    this.code = 'EUNKNOWN'
    this.displayMessage = null
  }
}

class ProductNotFoundError extends Error {
  constructor () {
    // todo: translate
    super('Unfortunately the product you are trying to ass is no longer available')
  }
}

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
    code: error.messageKey,
    type: toShopgateType(error.level),
    message: error.message
  }
}

module.exports = { UnknownError, toShopgateType, toShopgateMessage, ProductNotFoundError }
