'use strict'

const {
  apiManager: { createApiConfig },
  configManager: { getEndpoint },
  connectApiManager: { getLoginToken }
} = require('@apite/sw6-webcheckout-helper')
const { throwOnApiError } = require('../services/errorManager')

/**
 * @param {ApiteSW6Helper.PipelineContext} context
 * @returns {Promise<ApiteSW6Cart.UrlResponse>}
 */
module.exports = async (context) => {
  const endpoint = getEndpoint(context)
  const api = await createApiConfig(context)
  const { token, expiration } = await getLoginToken(api).catch(e => throwOnApiError(e, context))
  const url = new URL('sgconnect/login', endpoint)
  url.searchParams.append('token', token)
  url.searchParams.append('affiliateCode', 'SGConnect_App')

  return {
    url,
    expires: new Date(expiration * 1000).toISOString()
  }
}
