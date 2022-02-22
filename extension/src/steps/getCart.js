'use strict'

const { UnknownError } = require('../errorManager')
const { getCart } = require('@shopware-pwa/shopware-6-client')

/**
 * @param {SDKContext} context
 * @param {ContextTokenInput} input
 * @returns Promise<Cart>
 */
module.exports = async (context, input) => {
  context.log.info('inc token: ' + input.contextToken)
  let checkout
  try {
    checkout = await fetchCheckout(context)
  } catch (err) {
    context.log.error('Failed to create / load a new checkout (cart) at Shopify. Error: ' + JSON.stringify(err))

    throw new UnknownError()
  }

  if (checkout.token !== input.contextToken) {
    context.log.info('not reusing cart, checkout token: ' + checkout.token)
    try {
      await saveCheckoutToken(checkout.token, context)
    } catch (err) {
      context.log.error('Failed to save Shopify checkout token. Error: ' + JSON.stringify(err))

      throw new UnknownError()
    }
  }

  return checkout
}

/**
 * Creates a new checkout on request or creates/loads a checkout, based on a checkout token being available, or not
 *
 * @param {SDKContext} context
 * @returns Promise<Cart>
 * @throws ClientApiError
 */
async function fetchCheckout (context) {
  let checkout
  try {
    checkout = getCart()
    // context.log.info(`Cart loaded with token ${checkoutToken}`)
  } catch (err) {
    if (err.statusCode !== 404) {
      throw err
    }

    // todo: create new checkout if old checkout is expired
    // context.log.warn({ checkoutToken }, `Checkout is expired or was not found --> generating new one. Error: ${JSON.stringify(err)}`)
    // checkout = await shopifyApiRequest.createCheckout()
  }

  return checkout
}

/**
 * Saves the current checkout token into internal storage (user or device)
 *
 * @param {string} checkoutToken
 * @param {Object} context
 * @returns Promise<void>
 */
async function saveCheckoutToken (checkoutToken, context) {
  // select storage to use: device or user, if logged in
  const storage = context.meta.userId ? context.storage.user : context.storage.device

  storage.set('contextToken', checkoutToken)
}
