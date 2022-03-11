'use strict'

const { toShopgateMessage } = require('../../services/errorManager')

/**
 * Despite out attempt, the messages are not printed in default theme
 *
 * @param {PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{messages: Array}>}
 */
module.exports = async (context, input) => {
  const messages = []
  const errors = { ...input.swCart.errors }
  Object.keys(errors)
    .filter(key => errors[key].level > 0)
    .forEach(key => messages.push(toShopgateMessage(errors[key])))

  return { messages }
}
