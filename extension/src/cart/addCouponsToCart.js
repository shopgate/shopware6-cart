'use strict'

const {
  apiManager: { createApiConfig },
  contextManager: { saveCouponCode, removeCouponCode },
  errorManager: { throwOnCartInfoErrors, throwOnApiError },
  errorList: { PromoNotFoundError, PromoNotEligibleError }
} = require('@apite/shopware6-utility')
const { addPromotionCode } = require('@shopware-pwa/shopware-6-client')

/**
 * @param {ApiteSW6Helper.PipelineContext} context
 * @param {Object} input
 * @param {string[]} input.couponCodes
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  const couponCode = input.couponCodes.pop()

  const apiConfig = await createApiConfig(context)
  await addPromotionCode(couponCode, apiConfig)
    .catch(e => throwOnApiError(e, context))
    .then(swCart => {
      throwOnCartInfoErrors(swCart.errors, context)
      return swCart.lineItems
    })
    .catch(async e => {
      // when the cart is not empty, it will throw these
      if (e instanceof PromoNotFoundError || e instanceof PromoNotEligibleError) {
        await saveCouponCode(couponCode, context)
      }
      throw e
    })
    // if the cart is clean of errors & coupon was added successfully
    .then(async lineItems =>
      // if the cart is empty it will throw no errors
      lineItems.length === 0 ? await saveCouponCode(couponCode, context) : await removeCouponCode(context)
    )
}
