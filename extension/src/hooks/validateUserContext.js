'use strict'

const {
  apiManager: { createApiConfig },
  errorManager: { throwOnApiError },
  errorList: { ContextDeSyncError }
} = require('@apite/shopware6-utility')
const { getSessionContext } = require('@shopware-pwa/shopware-6-client')
const { decorateMessage } = require('../services/logDecorator')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<void>}
 * @throws {ContextDeSyncError}
 */
module.exports = async (context) => {
  const apiConfig = await createApiConfig(context)
  const swContext = await getSessionContext(apiConfig)
    .catch(error => throwOnApiError(error, context))

  if (context.meta.userId && !swContext.customer) {
    context.log.warn(decorateMessage('Logged in the app, but contextToken is of a guest'))
    // this error is handled by our custom frontend
    throw new ContextDeSyncError()
  }
}
