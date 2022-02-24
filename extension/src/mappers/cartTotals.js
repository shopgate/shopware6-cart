'use strict'

/**
 * @param {SDKContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{totals: []}>}
 */
module.exports = async (context, input) => {
  const totals = []
  if (input.swCart.price.totalPrice) {
    totals.push({
      type: 'grandTotal',
      label: 'Total',
      amount: input.swCart.price.totalPrice
    })
  }
  return { totals }
}
