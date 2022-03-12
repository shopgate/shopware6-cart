'use strict'

const SW_TYPE_PRODUCT = 'product'
const SW_TYPE_COUPON = 'promotion'

/* jshint -W014 */
/**
 * @param {SWLineItem} lineItem
 * @return {{type: string, value: number}}
 */
const getCouponPrice = function (lineItem) {
  const swType = lineItem.priceDefinition?.type
  return swType === 'percentage'
    ? { type: swType, value: -(lineItem.priceDefinition[swType]) }
    : { type: 'fixed', value: -(lineItem.price.totalPrice) }
}
/**
 * @param {SW6Cart.PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{cartItems: []}>}
 */
module.exports = async (context, input) => {
  const coupons = input.swCart.lineItems
    .filter(({ type }) => type === SW_TYPE_COUPON)
    .map((lineItem) => {
      return {
        id: lineItem.id,
        quantity: lineItem.quantity,
        type: 'coupon',
        coupon: {
          code: lineItem.referencedId,
          label: lineItem.label,
          savedPrice: getCouponPrice(lineItem)
        },
        currency: input.currency,
        product: null,
        messages: []
      }
    })
  const products = input.swCart.lineItems
    .filter(({ type }) => type === SW_TYPE_PRODUCT)
    .map((lineItem) => {
      return {
        id: lineItem.id,
        quantity: lineItem.quantity,
        type: 'product',
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
        currency: input.currency,
        coupon: null,
        messages: []
      }
    })
  return { cartItems: [...products, ...coupons] }
}
