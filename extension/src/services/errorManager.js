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

module.exports = { UnknownError, toShopgateType }
