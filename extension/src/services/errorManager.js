'use strict'

class UnknownError extends Error {
  constructor () {
    super('An internal error occurred.')

    this.code = 'EUNKNOWN'
    this.displayMessage = null
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
 * @return string
 */
const toPrintableMessage = function (error) {
  if (error.messageKey === 'product-not-found') {
    // todo: DE translate
    return 'The product added could not be found.'
  }
  return error.message
}

/**
 * @param {SWEntityError} error
 * @return SGCartMessage
 */
const toShopgateMessage = function (error) {
  return {
    code: error.messageKey,
    type: toShopgateType(error.level),
    message: toPrintableMessage(error)
  }
}

module.exports = { UnknownError, toPrintableMessage, toShopgateType, toShopgateMessage }
