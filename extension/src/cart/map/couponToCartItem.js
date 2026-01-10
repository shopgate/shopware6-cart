'use strict'

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.CouponToItemMapInput} input
 * @returns {Promise<{ cartItemIds: string[] }>}
 */
module.exports = async (context, input) => {
  const cartItemIds = input.swCart.lineItems
    .filter(lineItem => input.couponCodes.some(
      // theme can pass either a code or a UID
      code => lineItem.referencedId === code || lineItem.id === code
    ))
    .map(lineItem => lineItem.id)

  return { cartItemIds }
}
