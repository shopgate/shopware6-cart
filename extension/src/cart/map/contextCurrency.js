'use strict'

const {
  apiManager: { createApiConfig },
  errorManager: { throwOnApiError }
} = require('@apite/shopware6-utility')
const { getSessionContext } = require('@shopware-pwa/shopware-6-client')

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
