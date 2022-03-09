'use strict'

const { addCartItems } = require('@shopware-pwa/shopware-6-client')
const { throwOnCartErrors, throwOnApiError } = require('../services/errorManager')
const { CouponNotFound } = require('../services/errorList')
const { saveCouponCode } = require('../services/contextManager')

/**
 * @param {PipelineContext} context
 * @param {Object} input
 * @param {string[]} input.couponCodes
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  const swItems = input.couponCodes.map(referencedId => {
    return {
      referencedId,
      type: 'promotion'
    }
  })

  await addCartItems(swItems)
    .catch(e => throwOnApiError(e, context))
    .then(swCart => throwOnCartErrors(swCart.errors, context))
    .catch(async e => {
      if (e instanceof CouponNotFound) {
        await saveCouponCode(e.referencedId, context)
      }
      throw e
    })
}
