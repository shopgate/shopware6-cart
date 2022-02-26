'use strict'

const TYPE_PRODUCT = 'product'

/**
 * @param {PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{cartItems: []}>}
 */
module.exports = async (context, input) => {
  const coupons = []
  const products = input.swCart.lineItems
    .filter(({ type }) => type === TYPE_PRODUCT)
    .map((lineItem) => {
      return {
        id: lineItem.id,
        quantity: lineItem.quantity,
        type: lineItem.type,
        product: {
          id: lineItem.payload?.productNumber ?? lineItem.referencedId,
          name: lineItem.label,
          featuredImageUrl: lineItem.cover.url,
          price: {
            unit: lineItem.price.unitPrice,
            default: lineItem.price.totalPrice,
            special: null
          },
          properties: [],
          appliedDiscounts: [],
          additionalInfo: null
        },
        coupon: null,
        messages: []
      }
    })
  return { cartItems: [...products, ...coupons] }
}
