'use strict'

const { setup, onConfigChange, getSessionContext } = require('@shopware-pwa/shopware-6-client')
const { getContextToken, saveContextToken, isFirstRun, setFirstRun } = require('../services/contextManager')
const { UnknownError } = require('../services/errorList')
const { decorateMessage, decorateError } = require('../services/logDecorator')

/**
 * @param {SW6Cart.PipelineContext} context
 * @returns {Promise<void>}
 */
module.exports = async (context) => {
  const endpoint = context.config.endpoint || process.env.ENDPOINT
  const accessToken = context.config.accessToken || process.env.ACCESS_KEY
  const languageId = context.config.languageId || process.env.LANG_ID

  if (!endpoint || !accessToken) {
    context.log.fatal(decorateMessage('Please specify endpoint or accessToken in the config'))
    throw new UnknownError()
  }

  const contextToken = await getContextToken(context).then(contextToken => {
    if (typeof contextToken === 'string' && contextToken.length > 0) {
      return contextToken
    }
    return getSessionContext()
      .catch(e => {
        context.log.fatal(decorateError(e), 'Could not get session context')
        throw new UnknownError()
      })
      .then(swContext => {
        saveContextToken(swContext.token, context)
        return swContext.token
      })
  })

  setup({
    endpoint,
    accessToken,
    languageId,
    contextToken
  })
  // initialize only once
  if (!await isFirstRun(context)) {
    onConfigChange(({ config }) => {
      context.log.debug(decorateMessage('contextToken possibly changed:' + config.contextToken))
    })
    await setFirstRun(context)
  }
}
