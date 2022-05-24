'use strict'

const _get = require('lodash/get')
const { decorateError } = require('../../services/logDecorator')

/**
 * @param {SW6Cart.PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{flags: CartFlags}>}
 */
module.exports = async (context, input) => {
  const hardErrors = Object.keys(input.swCart.errors).filter(key => input.swCart.errors[key].level > 10)
  hardErrors.forEach(key => context.log.info(decorateError(input.swCart.errors[key]), 'Found hard cart error'))

  return {
    flags: {
      taxIncluded: _get(input, 'swCart.price.taxStatus') === 'gross',
      orderable: true, // hardErrors.length === 0,
      coupons: context.config.showCoupon
    }
  }
}
