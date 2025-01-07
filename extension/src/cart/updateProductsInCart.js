'use strict'

const {
  apiManager: { changeCartItemQuantity },
  clientManger: { createApiConfig },
  errorManager: { throwOnApiError, throwOnCartInfoErrors }
} = require('@apite/shopware6-utility')
const _get = require('lodash.get')

const NotFoundError = () => ({ errors: [{ level: 1, messageKey: 'product-not-found' }] })

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.SGUpdateProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  // Cart API cannot handle Async calls, so we sync them
  const apiConfig = await createApiConfig(context)
  let sync = Promise.resolve()
  await Promise.all(
    input.cartItems.map(item => {
      sync = sync.then(
        () => changeCartItemQuantity(apiConfig, [{
          id: _get(item, 'CartItemId', item.cartItemId),
          quantity: item.quantity
        }])
          .catch(e => e.statusCode === 404 ? NotFoundError() : throwOnApiError(e, context))
          .then(swCart => throwOnCartInfoErrors(swCart.errors, context))
      )
      return sync
    })
  )
}
