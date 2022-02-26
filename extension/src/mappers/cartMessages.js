'use strict'

const { toShopgateMessage } = require('../services/errorManager')
const { popCartMessages } = require('../services/contextManager')

/**
 * Despite out attempt, the messages are not printed in default theme
 *
 * @param {PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{messages: Array}>}
 */
module.exports = async (context, input) => {
  const messages = []
  const errors = { ...input.swCart.errors, ...await popCartMessages(context) }
  Object.keys(errors).forEach((key) => {
    messages.push(toShopgateMessage(errors[key]))
  })

  return { messages }
}
