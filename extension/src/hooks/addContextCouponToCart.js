'use strict'

const { getCouponCode, removeCouponCode } = require('../services/contextManager')
const { addPromotionCode } = require('@shopware-pwa/shopware-6-client')

/**
 * We avoid throwing errors in this call as it's
 * our non-customer attempts to add coupon to cart.
 *
 * @param {PipelineContext} context
 * @returns {Promise<void>}
 */
module.exports = async (context) => {
  const coupon = await getCouponCode(context).catch(() => null)
  if (!coupon) {
    return
  }
  await addPromotionCode(coupon)
    .then(() => removeCouponCode(context))
    .catch(() => {})
}
