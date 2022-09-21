'use strict'

const { apiManager: { createApiConfig } } = require('@apite/shopware6-utility')
const { addCartItems } = require('@shopware-pwa/shopware-6-client')
const { throwOnCartErrors, throwOnApiError } = require('../services/errorManager')

/**
 * @param {ApiteSW6Helper.PipelineContext} context
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

  const apiConfig = await createApiConfig(context)
  await addCartItems(swItems, apiConfig)
    .catch(e => throwOnApiError(e, context))
    .then(swCart => throwOnCartErrors(swCart.errors, context))
}
