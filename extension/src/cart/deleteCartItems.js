'use strict'

const {
  apiManager: { createApiConfig },
  errorManager: { throwOnCartErrors, throwOnApiError, throwOnCartInfoErrors }
} = require('@apite/shopware6-utility')
const { removeCartItem } = require('@shopware-pwa/shopware-6-client')

const NotFoundError = () => ({errors: [{ level: 1, messageKey: 'product-not-found'}]})

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.SGDeleteItemInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  // Cart API cannot handle Async calls, so we sync them
  const apiConfig = await createApiConfig(context)
  let sync = Promise.resolve()
  await Promise.all(
    input.cartItemIds.map(
      lineItemId => {
        sync = sync.then(
          () => removeCartItem(lineItemId, apiConfig)
            .catch(e => e.statusCode === 404 ? NotFoundError() : throwOnApiError(e, context))
            .then(cart => throwOnCartInfoErrors(cart.errors, context))
        )
        return sync
      }
    )
  )
}
