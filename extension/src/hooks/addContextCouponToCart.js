'use strict'

const {
  apiManager: { addCartItems },
  clientManger: { createApiConfig },
  contextManager: { getCouponCode, removeCouponCode }
} = require('@apite/shopware6-utility')

/**
 * We avoid throwing errors in this call as it's
 * our non-customer attempts to add coupon to cart.
 *
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<void>}
 */
module.exports = async (context) => {
  const coupon = await getCouponCode(context).catch(() => null)
  if (!coupon) {
    return
  }
  const apiConfig = await createApiConfig(context)
  await addCartItems(apiConfig, [{ type: 'promotion', referencedId: coupon }])
    .then(() => removeCouponCode(context))
    .catch(() => {})
}
