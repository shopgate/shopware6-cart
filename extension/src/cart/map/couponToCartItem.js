'use strict'

/**
 * @param {SW6Cart.PipelineContext} context
 * @param {Object} input
 * @property {SW6Cart.SWCart} input.swCart
 * @property {string[]} input.couponCodes
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
