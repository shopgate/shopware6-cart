'use strict'

/**
 * @param {PipelineContext} context
 * @param {Object} input
 * @property {SWCart} swCart
 * @property {string[]} couponCodes
 * @returns {Promise<{ cartItemIds: string[] }>}
 */
module.exports = async (context, input) => {
  const cartItemIds = input.swCart.lineItems
    .filter(lineItem => lineItem.type === 'promotion')
    .filter(lineItem => input.couponCodes.includes(lineItem.referencedId))
    .map(lineItem => lineItem.id)

  return { cartItemIds }
}
