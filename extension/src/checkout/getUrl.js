'use strict'

const {
  apiManager: { createApiConfig },
  configManager: { getEndpoint },
  connectApiManager: { getLoginToken, getLoginUrl },
  errorManager: { throwOnApiError }
} = require('@apite/shopware6-utility')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<ApiteSW6Utility.UrlResponse>}
 */
module.exports = async (context) => {
  const api = await createApiConfig(context)
  const { token, expiration } = await getLoginToken(api).catch(e => throwOnApiError(e, context))
  const url = getLoginUrl(getEndpoint(context), { token, affiliateCode: 'SGConnect_App' })

  return {
    url: url.toString(),
    expires: new Date(expiration * 1000).toISOString()
  }
}
