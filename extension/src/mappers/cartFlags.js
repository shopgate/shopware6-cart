'use strict'

/**
 * @param {SDKContext} context
 * @param {{swCart: object}} input
 * @returns {Promise<{flags: CartFlags}>}
 */
module.exports = async (context, input) => {
  // todo: finish up
  return {
    flags: {
      taxIncluded: input.swCart?.price?.taxStatus === 'gross',
      orderable: false,
      coupons: false
    }
  }
}
