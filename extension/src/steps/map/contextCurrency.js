'use strict'

const { getSessionContext } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError } = require('../../services/errorManager')

/**
 * @param {SW6Cart.PipelineContext} context
 * @returns {Promise<{currency: string}>}
 */
module.exports = async (context) => {
  const swContext = await getSessionContext().catch(e => throwOnApiError(e, context))
  return {
    currency: swContext.currency.isoCode
  }
}
