'use strict'

const { changeCartItemQuantity } = require('@shopware-pwa/shopware-6-client')
const { throwOnCartErrors, throwOnApiError } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @param {SGUpdateProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  const item = input.cartItems.pop()
  const swCart = await changeCartItemQuantity(item.CartItemId ?? item.cartItemId, item.quantity)
    .catch(e => throwOnApiError(e, context))

  throwOnCartErrors(swCart.errors, context)
}
