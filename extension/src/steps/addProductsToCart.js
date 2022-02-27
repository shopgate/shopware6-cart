'use strict'

const { addCartItems } = require('@shopware-pwa/shopware-6-client')
const { UnknownError, throwOnCartErrors } = require('../services/errorManager')

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

  await addCartItems(swItems)
    .catch(e => {
      context.log.error(e.message)
      throw new UnknownError()
    })
    .then(swCart => {
      throwOnCartErrors(swCart.errors, context)
    })
}
