'use strict'

const { addCartItems } = require('@shopware-pwa/shopware-6-client')
const { pushCartMessages } = require('../services/contextManager')
const { UnknownError, ProductNotFoundError } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @param {SGAddProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  const swItems = input.products.map(({ productId, quantity }) => {
    return {
      referencedId: productId,
      quantity,
      type: 'product'
    }
  })

  const notFound = await addCartItems(swItems)
    .then(async cart => {
      if (cart.errors.length === 0) {
        return
      }
      const notFound = Object.keys(cart.errors).filter(key => cart.errors[key].messageKey === 'product-not-found')
      delete cart.errors[notFound]
      await pushCartMessages(cart.errors, context)
      return notFound
    }).catch(e => {
      context.log.error(e.message)
      throw new UnknownError()
    })

  if (notFound) {
    throw new ProductNotFoundError()
  }
}
