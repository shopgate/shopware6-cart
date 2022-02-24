'use strict'

const { toShopgateType } = require('../services/errorManager')
const { popCartMessages } = require('../services/contextManager')

/**
 * @param {SDKContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{messages: Array}>}
 */
module.exports = async (context, input) => {
  const messages = []
  const errors = { ...input.swCart.errors, ...await popCartMessages(context) }
  Object.keys(errors).forEach((key) => {
    const error = errors[key]
    messages.push({
      type: toShopgateType(error.level),
      code: error.messageKey,
      message: error.message
    })
  })

  return { messages }
}
