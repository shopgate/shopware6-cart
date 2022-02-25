'use strict'

const { changeCartItemQuantity } = require('@shopware-pwa/shopware-6-client')
const { pushCartMessages } = require('../services/contextManager')

/**
 * @param {PipelineContext} context
 * @param {SGUpdateProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  let messages = {}
  input.cartItems.map(
    async (item) => {
      const updateItem = input.swCart.lineItems.find(swItem => swItem.referencedId === (item.CartItemId ?? item.cartItemId))
      if (!updateItem) {
        return
      }
      await changeCartItemQuantity(updateItem.id, item.quantity)
        .then(cart => {
          messages = { ...messages, ...cart.errors }
        })
        .catch(e => context.log.error(JSON.stringify(e.messages)))
    }
  )
  if (messages) {
    await pushCartMessages(messages, context)
  }
}
