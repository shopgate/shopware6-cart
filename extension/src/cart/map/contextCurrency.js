'use strict'

const { apiManager: { createApiConfig } } = require('@apite/sw6-webcheckout-helper')
const { getSessionContext } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError } = require('../../services/errorManager')

/**
 * @param {ApiteSW6Helper.PipelineContext} context
 * @returns {Promise<{currency: string}>}
 */
module.exports = async (context) => {
  const apiConfig = await createApiConfig(context)
  const swContext = await getSessionContext(apiConfig).catch(e => throwOnApiError(e, context))
  return {
    currency: swContext.currency.isoCode
  }
}
