'use strict'

const { changeCartItemQuantity } = require('@shopware-pwa/shopware-6-client')
const { throwOnCartErrors, throwOnApiError } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @param {SGUpdateProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  await Promise.all(
    input.cartItems.slice(-1)
      .map(item => changeCartItemQuantity(item.CartItemId ?? item.cartItemId, item.quantity)
        .catch(e => throwOnApiError(e, context))
        .then(swCart => throwOnCartErrors(swCart.errors, context)))
  )
}
