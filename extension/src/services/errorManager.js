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
    super('Unfortunately, this product is no longer available')
    this.code = 'ENOTFOUND'
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
    type: toShopgateType(error.level),
    code: error.messageKey,
    message: error.message,
    messageParams: {},
    translated: true
  }
}

module.exports = { UnknownError, toShopgateType, toShopgateMessage, ProductNotFoundError }
