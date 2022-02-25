'use strict'

const { saveContextToken } = require('../services/contextManager')
const { UnknownError } = require('../services/errorManager')
const { getCart } = require('@shopware-pwa/shopware-6-client')

/**
 * @param {PipelineContext} context
 * @param {ContextTokenInput} input
 */
module.exports = async (context, input) => {
  context.log.debug(`inc token: '${input.contextToken}'`)
  let swCart
  try {
    swCart = await fetchCheckout(context)
  } catch (err) {
    context.log.error('Failed to create / load a new checkout (cart) at Shopify. Error: ' + JSON.stringify(err))

    throw new UnknownError()
  }

  if (swCart.token !== input.contextToken) {
    context.log.debug(`not reusing cart, checkout token: '${swCart.token}'`)
    try {
      await saveContextToken(swCart.token, context)
    } catch (err) {
      /** @param {string} err */
      context.log.error(`Failed to save Shopify checkout token. Error: '${err.message}'`)
      context.log.debug(JSON.stringify(err.stack))

      throw new UnknownError()
    }
  }

  return { swCart }
}

/**
 * Creates a new checkout on request or creates/loads a checkout, based on a checkout token being available, or not
 *
 * @param {PipelineContext} context
 * @throws SWClientApiError
 */
async function fetchCheckout (context) {
  let cart
  try {
    cart = getCart()
  } catch (err) {
    if (err.statusCode !== 404) {
      throw err
    }

    // todo: create new checkout if old checkout is expired
    // context.log.warn({ checkoutToken }, `Checkout is expired or was not found --> generating new one. Error: ${JSON.stringify(err)}`)
    // cart = await shopifyApiRequest.createCheckout()
  }

  return cart
}
