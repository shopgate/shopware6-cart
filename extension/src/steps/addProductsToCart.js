'use strict'

const { addCartItems } = require('@shopware-pwa/shopware-6-client')
const { pushCartMessages } = require('../services/contextManager')
const { UnknownError } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
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
    .catch(e => {
      context.log.error(e.message)
      throw new UnknownError()
    })

  if (newCart.errors) {
    await pushCartMessages(newCart.errors, context)
  }
  return { messages: newCart }
}
