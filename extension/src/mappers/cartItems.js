'use strict'

/**
 * @param {SDKContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{cartItems: []}>}
 */
module.exports = async (context, input) => {
  const cartItems = []
  if (input.swCart.lineItems) {
    input.swCart.lineItems.forEach(({ id, quantity }) => {
      cartItems.push({
        id,
        quantity
      })
    })
  }
  return { cartItems }
}
