'use strict'

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {Object} input
 * @property {ApiteSW6Cart.SWCart} input.swCart
 * @property {string[]} input.couponCodes
 * @returns {Promise<{ cartItemIds: string[] }>}
 */
module.exports = async (context, input) => {
  const cartItemIds = input.swCart.lineItems
    .filter(lineItem => lineItem.type === 'promotion')
    .filter(lineItem => input.couponCodes.some(
      // theme can pass either a code or a UID
      code => lineItem.referencedId === code || lineItem.id === code
    ))
    .map(lineItem => lineItem.id)

  return { cartItemIds }
}
