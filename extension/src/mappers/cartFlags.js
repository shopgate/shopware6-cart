'use strict'

/**
 * @param {PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{flags: CartFlags}>}
 */
module.exports = async (context, input) => {
  // todo: finish up
  return {
    flags: {
      taxIncluded: input.swCart?.price?.taxStatus === 'gross',
      orderable: false,
      coupons: context.config.settings.enableCoupons
    }
  }
}
