'use strict'

const {
  apiManager: { createApiConfig },
  contextManager: { getCouponCode, removeCouponCode }
} = require('@apite/sw6-webcheckout-helper')
const { addPromotionCode } = require('@shopware-pwa/shopware-6-client')

/**
 * We avoid throwing errors in this call as it's
 * our non-customer attempts to add coupon to cart.
 *
 * @param {ApiteSW6Helper.PipelineContext} context
 * @returns {Promise<void>}
 */
module.exports = async (context) => {
  const coupon = await getCouponCode(context).catch(() => null)
  if (!coupon) {
    return
  }
  const apiConfig = await createApiConfig(context)
  await addPromotionCode(coupon, apiConfig)
    .then(() => removeCouponCode(context))
    .catch(() => {})
}
