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
    .filter(lineItem => input.couponCodes.includes(
      /**
       * Auto-promo's do not have referencedId, therefore no coupon code is set.
       * In this case the Theme sends lineItem ID of the promo instead of code
       */
      lineItem.referencedId === '' ? lineItem.id : lineItem.referencedId
    ))
    .map(lineItem => lineItem.id)

  return { cartItemIds }
}
