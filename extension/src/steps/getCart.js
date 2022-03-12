'use strict'

const { saveContextToken } = require('../services/contextManager')
const { getCart } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError } = require('../services/errorManager')

/**
 * @param {SW6Cart.PipelineContext} context
 */
module.exports = async (context) => {
  const swCart = await getCart().catch(e => throwOnApiError(e, context))
  await saveContextToken(swCart.token, context)

  return { swCart }
}
