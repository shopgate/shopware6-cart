'use strict'

const TYPE_PRODUCT = 'product'
const TYPE_COUPON = 'promotion'

/**
 * @param {PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{cartItems: []}>}
 */
module.exports = async (context, input) => {
  const coupons = input.swCart.lineItems
    .filter(({ type }) => type === TYPE_COUPON)
    .map((lineItem) => {
      return {
        id: lineItem.id,
        quantity: lineItem.quantity,
        type: 'coupon',
        coupon: {
          code: lineItem.referencedId,
          description: '',
          label: lineItem.label,
          savedPrice: {
            type: 'fixed',
            value: -(lineItem.price.totalPrice)
          }
        }
      }
    })
  const products = input.swCart.lineItems
    .filter(({ type }) => type === TYPE_PRODUCT)
    .map((lineItem) => {
      return {
        id: lineItem.id,
        quantity: lineItem.quantity,
        type: lineItem.type,
        product: {
          id: lineItem.referencedId,
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
