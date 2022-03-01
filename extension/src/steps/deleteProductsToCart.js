'use strict'

const { removeCartItem } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError, throwOnCartErrors } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @param {SGDeleteProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  await Promise.all(
    input.cartItemIds.slice(-1).map(
      lineItemId => removeCartItem(lineItemId)
        .catch(e => throwOnApiError(e, context))
        .then(cart => throwOnCartErrors(cart.errors, context))
    )
  )
}
