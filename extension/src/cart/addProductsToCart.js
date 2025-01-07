'use strict'

const {
  apiManager: { addCartItems },
  clientManger: { createApiConfig },
  errorManager: { throwOnCartErrors, throwOnApiError }
} = require('@apite/shopware6-utility')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.SGAddProductInput} input
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
  await addCartItems(apiConfig, swItems)
    .catch(e => throwOnApiError(e, context))
    .then(swCart => throwOnCartErrors(swCart.errors, context))
}
