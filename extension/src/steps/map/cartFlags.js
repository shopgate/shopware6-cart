'use strict'

/**
 * @param {PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{flags: CartFlags}>}
 */
module.exports = async (context, input) => {
  // todo: need to find errors worth blocking the checkout?
  // const hardErrors = Object.keys(input.swCart.errors).filter(key => input.swCart.errors[key].level > 10)
  return {
    flags: {
      taxIncluded: input.swCart.price?.taxStatus === 'gross',
      orderable: true,
      coupons: context.config.settings.enableCoupons
    }
  }
}
