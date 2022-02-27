'use strict'

const { changeCartItemQuantity } = require('@shopware-pwa/shopware-6-client')
const { wrapErrorForPrint, UnknownError, ProductNotFoundError, throwOnCartErrors } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @param {SGUpdateProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  const item = input.cartItems.pop()
  const swCart = await changeCartItemQuantity(item.CartItemId ?? item.cartItemId, item.quantity)
    .catch(e => {
      if (e.statusCode === 400) {
        throw new ProductNotFoundError()
      }
      context.log.error(wrapErrorForPrint(e.messages))
      throw new UnknownError()
    })

  throwOnCartErrors(swCart.errors, context)
}
