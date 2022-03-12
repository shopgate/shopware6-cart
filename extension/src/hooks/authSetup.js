'use strict'

const { setup, onConfigChange } = require('@shopware-pwa/shopware-6-client')
const { getContextToken } = require('../services/contextManager')
const { UnknownError } = require('../services/errorList')

/**
 * @param {SW6Cart.PipelineContext} context
 * @returns {Promise<void>}
 */
module.exports = async (context) => {
  if (!context.config.shopware?.endpoint || !context.config.shopware?.accessToken) {
    context.log.fatal('Please specify endpoint or accessToken in the config')
    throw new UnknownError()
  }
  const contextToken = getContextToken(context)
  const { endpoint, accessToken, languageId } = context.config.shopware
  // initialize only once
  if (!contextToken) {
    onConfigChange(({ config }) => {
      context.log.debug('contextToken possibly changed:' + config.contextToken)
    })
  }
  setup({
    endpoint,
    accessToken,
    languageId,
    contextToken
  })
}
