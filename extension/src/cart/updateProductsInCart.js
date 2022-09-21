'use strict'

const _get = require('lodash.get')
const { apiManager: { createApiConfig } } = require('@apite/sw6-webcheckout-helper')
const { changeCartItemQuantity } = require('@shopware-pwa/shopware-6-client')
const { throwOnCartInfoErrors, throwOnApiError } = require('../services/errorManager')

/**
 * @param {ApiteSW6Helper.PipelineContext} context
 * @param {SGUpdateProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  // Cart API cannot handle Async calls, so we sync them
  const apiConfig = await createApiConfig(context)
  let sync = Promise.resolve()
  await Promise.all(
    input.cartItems.map(item => {
      sync = sync.then(
        () => changeCartItemQuantity(_get(item, 'CartItemId', item.cartItemId), item.quantity, apiConfig)
          .catch(e => throwOnApiError(e, context))
          .then(swCart => throwOnCartInfoErrors(swCart.errors, context))
      )
      return sync
    })
  )
}
