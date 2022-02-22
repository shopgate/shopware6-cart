'use strict'

const { setup } = require('@shopware-pwa/shopware-6-client')

/**
 * @param {SDKContext} context
 * @returns {Promise<Object>}
 */
module.exports = async (context) => {
  const storage = context.meta.userId ? context.storage.user : context.storage.device
  const contextToken = await storage.get('contextToken')
  // todo: change to use config
  setup({
    endpoint: 'http://localhost',
    accessToken: 'SWSCEKRYVJM1UMO3Y1D5MXRJVA',
    contextToken
  })

  return { contextToken }
}
