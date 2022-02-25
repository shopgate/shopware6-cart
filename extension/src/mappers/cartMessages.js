'use strict'

const { toShopgateType } = require('../services/errorManager')
const { popCartMessages } = require('../services/contextManager')

/**
 * @param {PipelineContext} context
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
      message: getPrintableMessage(error)
    })
  })

  return { messages }
}

/**
 * @param {SWEntityError} error
 * @return string
 */
function getPrintableMessage (error) {
  if (error.messageKey === 'product-not-found') {
    // todo: DE translate
    return 'The product added could not be found.'
  }
  return error.message
}
