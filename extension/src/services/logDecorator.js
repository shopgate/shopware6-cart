'use strict'

const extension = '@apite-shopware6-cart'

/**
 * @param {SW6Cart.SWClientApiError|SW6Cart.SWEntityError|SW6Cart.ShopwareError|Error} error
 * @return {SW6Cart.SWEntityError[]|SW6Cart.ShopwareError[]|string[]}
 */
const extractErrorMessages = function (error) {
  if (error.statusCode) {
    // SW6Cart.SWClientApiError
    return error.messages
  } else if (error.messageKey || error.status) {
    // SW6Cart.SWEntityError | SW6Cart.ShopwareError
    return [error]
  }
  // Error
  return [error.message]
}

/**
 * @param {SW6Cart.SWClientApiError|SW6Cart.SWEntityError|SW6Cart.ShopwareError|Error} error
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

/**
 * @param {SW6Cart.SWClientApiError|SW6Cart.SWEntityError|SW6Cart.ShopwareError|Error} error
 * @return {{extension: string, code: (string|number), messages: (SW6Cart.SWEntityError[]|SW6Cart.ShopwareError[]|string[])}}
 */
const decorateError = function (error) {
  return {
    extension,
    code: extractErrorCode(error),
    messages: extractErrorMessages(error)
  }
}

/**
 * @param {string} message
 * @param {number} code - arbitrary code to search by
 * @return {{extension: string, messages: string[]}}
 */
const decorateMessage = (message, code = 15) => ({
  extension,
  code,
  messages: [message]
})

module.exports = { decorateError, decorateMessage }
