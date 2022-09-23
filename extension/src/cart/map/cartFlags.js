'use strict'

const _get = require('lodash.get')
const { decorateError } = require('../../services/logDecorator')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.Input} input
 * @returns {Promise<{flags: ApiteSW6Cart.Flags}>}
 */
module.exports = async (context, { swCart }) => {
  const hardErrors = Object.keys(swCart.errors).filter(key => swCart.errors[key].level > 10)
  hardErrors.forEach(key => context.log.info(decorateError(swCart.errors[key]), 'Found hard cart error'))

  return {
    flags: {
      taxIncluded: _get(swCart, 'price.taxStatus') === 'gross',
      orderable: true,
      coupons: context.config.showCoupon
    }
  }
}
