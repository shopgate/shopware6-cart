'use strict'

const { addCartItems } = require('@shopware-pwa/shopware-6-client')
const { throwOnCartErrors, throwOnApiError } = require('../services/errorManager')

/**
 * @param {SW6Cart.PipelineContext} context
 * @param {SGAddProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  const swItems = input.products.map(({ productId, quantity }) => {
    return {
      id: productId,
      referencedId: productId,
      quantity,
      type: 'product'
    }
  })

  await addCartItems(swItems)
    .catch(e => throwOnApiError(e, context))
    .then(swCart => throwOnCartErrors(swCart.errors, context))
}
