'use strict'

const { setup } = require('@shopware-pwa/shopware-6-client')

/**
 * @returns {Promise<void>}
 */
module.exports = async () => {
  // todo: change to use config
  setup({
    endpoint: 'http://localhost',
    accessToken: 'SWSCEKRYVJM1UMO3Y1D5MXRJVA'
  })
}
