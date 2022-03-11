'use strict'

const { addPromotionCode } = require('@shopware-pwa/shopware-6-client')
const { throwOnCartInfoErrors, throwOnApiError } = require('../services/errorManager')
const { CouponNotFound, CouponNotEligible } = require('../services/errorList')
const { saveCouponCode, removeCouponCode } = require('../services/contextManager')

/**
 * @param {PipelineContext} context
 * @param {Object} input
 * @param {string[]} input.couponCodes
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  const couponCode = input.couponCodes.pop()

  await addPromotionCode(couponCode)
    .catch(e => throwOnApiError(e, context))
    .then(swCart => {
      throwOnCartInfoErrors(swCart.errors, context)
      return swCart.lineItems
    })
    .catch(async e => {
      // when the cart is not empty, it will throw these
      if (e instanceof CouponNotFound || e instanceof CouponNotEligible) {
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
