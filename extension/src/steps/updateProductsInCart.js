'use strict'

const { changeCartItemQuantity } = require('@shopware-pwa/shopware-6-client')
const { wrapErrorForPrint } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @param {SGUpdateProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  input.cartItems.map(
    async (item) => {
      await changeCartItemQuantity(item.CartItemId ?? item.cartItemId, item.quantity)
        .catch(e => context.log.error(wrapErrorForPrint(e.messages)))
    }
  )
}
