'use strict'

const { apiManager: { createApiConfig } } = require('@apite/shopware6-utility')
const { removeCartItem } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError, throwOnCartInfoErrors } = require('../services/errorManager')

/**
 * @param {ApiteSW6Helper.PipelineContext} context
 * @param {SGDeleteCartItemInput} input
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
            .catch(e => throwOnApiError(e, context))
            .then(cart => throwOnCartInfoErrors(cart.errors, context))
        )
        return sync
      }
    )
  )
}
