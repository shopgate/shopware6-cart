'use strict'

const _get = require('lodash.get')
const { getCurrencySymbol } = require('./swCurrency')

const SW_TYPE_PRODUCT = 'product'
const SW_TYPE_COUPON = 'promotion'

/**
 * @param {ApiteSW6Utility.SWLineItem} lineItem
 * @return {{type: string, value: number}}
 */
const getCouponPrice = function (lineItem) {
  const swType = _get(lineItem, 'priceDefinition.type')
  return swType === 'percentage'
    ? { type: swType, value: -(lineItem.priceDefinition[swType]) }
    : { type: 'fixed', value: -(lineItem.price.totalPrice) }
}
/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.Input} input
 * @returns {Promise<{cartItems: ApiteSW6Cart.Item[]}>}
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

  const symbol = getCurrencySymbol(input.currency)
  const products = input.swCart.lineItems
    .filter(({ type }) => type === SW_TYPE_PRODUCT)
    .map((lineItem) => {
      const refPrice = lineItem.price.referencePrice
      let info
      if (refPrice) {
        info = `${refPrice.purchaseUnit} ${refPrice.unitName} ` +
          `(${symbol}${refPrice.price} / ${refPrice.referenceUnit} ${refPrice.unitName})`
      }

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
            special: null,
            info
          },
          properties: lineItem.payload.options.map(
            ({ group, option }) => ({ label: group, value: option })
          ),
          appliedDiscounts: [],
          additionalInfo: []
        },
        currency: input.currency,
        coupon: null,
        messages: []
      }
    })

  return { cartItems: [...products, ...coupons] }
}
