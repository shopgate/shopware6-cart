'use strict'

const { config } = require('@shopware-pwa/shopware-6-client')
const { getLoginToken } = require('../services/connectApiManager')
const { throwOnApiError } = require('../services/errorManager')

/**
 * @param {SW6Cart.PipelineContext} context
 * @returns {Promise<SW6Cart.UrlResponse>}
 */
module.exports = async (context) => {
  const { token, expiration } = await getLoginToken().catch(e => throwOnApiError(e, context))
  const url = new URL('sgconnect/login', config.endpoint)
  url.searchParams.append('token', token)
  url.searchParams.append('affiliateCode', 'SGConnect_App')

  return {
    url,
    expires: new Date(expiration * 1000).toISOString()
  }
}
