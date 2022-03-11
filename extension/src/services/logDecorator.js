'use strict'

const extension = '@apite-shopware6-cart'

/**
 * @param {SWClientApiError|SWEntityError|SWShopwareError|Error} error
 * @return {SWEntityError[]|SWShopwareError[]|string[]}
 */
const extractErrorMessages = function (error) {
  if (error.statusCode) {
    // SWClientApiError
    return error.messages
  } else if (error.messageKey || error.status) {
    // SWEntityError | SWShopwareError
    return [error]
  }
  // Error
  return [error.message]
}

/**
 * @param {SWClientApiError|SWEntityError|SWShopwareError|Error} error
 * @return {string|number}
 */
const extractErrorCode = function (error) {
  if (error.statusCode) {
    return error.statusCode
  } else if (error.messageKey) {
    return error.code
  } else if (error.status) {
    return Number(error.status)
  }
  return 500
}

const decorateError = function (error) {
  return {
    extension,
    code: extractErrorCode(error),
    messages: extractErrorMessages(error)
  }
}

module.exports = { decorateError }
