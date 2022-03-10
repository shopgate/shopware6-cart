'use strict'

const { removeCartItem } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError, throwOnCartErrors } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @param {SGDeleteCartItemInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  // Cart API cannot handle Async calls, so we sync them
  let sync = Promise.resolve()
  await Promise.all(
    input.cartItemIds.map(
      lineItemId => {
        sync = sync.then(
          () => removeCartItem(lineItemId)
            .catch(e => throwOnApiError(e, context))
            .then(cart => throwOnCartErrors(cart.errors, context))
        )
        return sync
      }
    )
  )
}
