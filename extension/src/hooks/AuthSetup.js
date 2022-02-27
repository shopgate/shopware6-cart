'use strict'

const { setup, onConfigChange } = require('@shopware-pwa/shopware-6-client')
const { UnknownError } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @returns {Promise<{contextToken:string}|undefined>}
 */
module.exports = async (context) => {
  if (!context.config.shopware?.endpoint || !context.config.shopware?.accessToken) {
    context.log.fatal('Please specify endpoint or accessToken in the config')
    throw new UnknownError()
  }
  const storage = context.meta.userId ? context.storage.user : context.storage.device
  const contextToken = await storage.get('contextToken')
  const { endpoint, accessToken, languageId } = context.config.shopware
  setup({
    endpoint,
    accessToken,
    languageId,
    contextToken
  })
  onConfigChange(({ config }) => {
    context.log.debug('contextToken possibly changed:' + config.contextToken)
  })

  return { contextToken }
}
