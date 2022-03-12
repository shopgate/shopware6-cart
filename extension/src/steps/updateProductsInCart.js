'use strict'

const { changeCartItemQuantity } = require('@shopware-pwa/shopware-6-client')
const { throwOnCartErrors, throwOnApiError } = require('../services/errorManager')

/**
 * @param {SW6Cart.PipelineContext} context
 * @param {SGUpdateProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  // Cart API cannot handle Async calls, so we sync them
  let sync = Promise.resolve()
  await Promise.all(
    input.cartItems.map(item => {
      sync = sync.then(
        () => changeCartItemQuantity(item.CartItemId ?? item.cartItemId, item.quantity)
          .catch(e => throwOnApiError(e, context))
          .then(swCart => throwOnCartErrors(swCart.errors, context))
      )
      return sync
    })
  )
}
