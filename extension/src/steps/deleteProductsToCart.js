'use strict'

const { removeCartItem } = require('@shopware-pwa/shopware-6-client')
const { wrapErrorForPrint, UnknownError } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @param {SGDeleteProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  await Promise.all(
    input.cartItemIds.map(
      lineItemId => removeCartItem(lineItemId).catch(e => {
        context.log.error('Could not remove item from cart: ' + wrapErrorForPrint(e))
        throw new UnknownError()
      })
    )
  )
}
