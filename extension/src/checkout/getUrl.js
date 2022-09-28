'use strict'

const {
  apiManager: { createApiConfig },
  configManager: { getEndpoint },
  connectApiManager: { getLoginToken },
  errorManager: { throwOnApiError }
} = require('@apite/shopware6-utility')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<ApiteSW6Utility.UrlResponse>}
 */
module.exports = async (context) => {
  const endpoint = getEndpoint(context)
  const api = await createApiConfig(context)
  const { token, expiration } = await getLoginToken(api).catch(e => throwOnApiError(e, context))
  const url = new URL('sgconnect/login', endpoint)
  url.searchParams.append('token', token)
  url.searchParams.append('affiliateCode', 'SGConnect_App')

  return {
    url: url.toString(),
    expires: new Date(expiration * 1000).toISOString()
  }
}
