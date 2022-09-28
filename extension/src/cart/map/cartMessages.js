'use strict'

const { errorManager: { toShopgateMessage } } = require('@apite/shopware6-utility')
const { decorateError } = require('../../services/logDecorator')

/**
 * Despite our attempts, the messages are not printed in default theme
 *
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.Input} input
 * @returns {Promise<{messages: ApiteSW6Cart.SGCartMessage[]}>}
 */
module.exports = async (context, input) => {
  const messages = []
  const errors = { ...input.swCart.errors }
  Object.keys(errors)
    .filter(key => errors[key].level > 0)
    .forEach(key => {
      context.log.info(decorateError(errors[key]), 'Untranslated cart error message')
      messages.push(toShopgateMessage(errors[key]))
    })

  return { messages }
}
