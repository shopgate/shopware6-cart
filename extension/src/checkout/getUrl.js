'use strict'

const {
  configManager: { getEndpoint },
  connectApiManager: { getLoginUrl }
} = require('@apite/shopware6-utility')
const { decorateMessage } = require('../services/logDecorator')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {SGConnectAPI.LoginTokenResponse} input
 * @returns {Promise<ApiteSW6Utility.UrlResponse>}
 */
module.exports = async (context, { token, expiration }) => {
  const url = getLoginUrl(
    getEndpoint(context),
    { token, affiliateCode: 'SGConnect_App' }
  ).toString()
  context.log.debug(decorateMessage('Checkout URL: ' + url))

  return {
    url,
    expires: new Date(expiration * 1000).toISOString()
  }
}
