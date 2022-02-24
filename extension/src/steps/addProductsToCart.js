'use strict'

const { addCartItems } = require('@shopware-pwa/shopware-6-client')
const { pushCartMessages } = require('../services/contextManager')

/**
 * @param {SDKContext} context
 * @param {SGAddProductInput} input
 * @returns {Promise<{messages: any}>}
 */
module.exports = async (context, input) => {
  const swItems = input.products.map(({ productId, quantity }) => {
    return {
      referencedId: productId,
      quantity,
      type: 'product'
    }
  })
  const newCart = await addCartItems(swItems)
    .catch(e => context.log.error(e.message))

  if (newCart.errors) {
    // todo: on non-existing products the text lacks product names
    await pushCartMessages(newCart.errors, context)
  }
  return { messages: newCart }
}
