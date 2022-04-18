'use strict'

const { saveContextToken } = require('../services/contextManager')
const { getCart, update } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError } = require('../services/errorManager')

/**
 * This pipeline is created for testing purposes only
 *
 * @param {SW6Cart.PipelineContext} context
 */
module.exports = async (context) => {
  update({ contextToken: undefined })
  const { token } = await getCart().catch(e => throwOnApiError(e, context))
  await saveContextToken(token, context)
  return { token }
}
