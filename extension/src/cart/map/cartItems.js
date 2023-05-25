'use strict'

const _get = require('lodash.get')
const { getPrice, getNumber } = require('../../services/printService')
const { getImageList } = require('../../services/productHandler')

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
  const imgList = await getImageList(context)
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
    .map((lineItem) => ({
      id: lineItem.id,
      quantity: lineItem.quantity,
      type: 'product',
      product: {
        id: lineItem.referencedId,
        name: lineItem.label,
        featuredImageUrl: imgList && imgList.hasOwnProperty(lineItem.id) ? imgList[lineItem.id] : lineItem.cover.url,
        price: {
          unit: lineItem.price.unitPrice,
          default: lineItem.price.totalPrice,
          special: null,
          info: buildProductInfo(lineItem.price.referencePrice, input.currency)
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
    }))

  return { cartItems: [...products, ...coupons] }
}

/**
 * Builds product price / unit block if it exists
 *
 * @param {{purchaseUnit: number,referenceUnit: number,price: number, unitName:string}|ApiteSW6Utility.ReferencePrice|undefined} refPrice
 * @param {string} currency - ISO3 currency
 * @return {string|undefined}
 */
const buildProductInfo = (refPrice, currency) => {
  return refPrice
    ? `${getNumber(refPrice.purchaseUnit, currency)} ${refPrice.unitName} ` +
    `(${getPrice(refPrice.price, currency)} / ${refPrice.referenceUnit} ${refPrice.unitName})`
    : undefined
}
