'use strict'

const { apiManager: { createApiConfig } } = require('@apite/sw6-webcheckout-helper')
const { getSessionContext } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError } = require('../services/errorManager')
const { ContextDeSyncError } = require('../services/errorList')
const { decorateMessage } = require('../services/logDecorator')

/**
 * @param {ApiteSW6Helper.PipelineContext} context
 * @returns {Promise<void>}
 */
module.exports = async (context) => {
  const apiConfig = await createApiConfig(context)
  const swContext = await getSessionContext(apiConfig).catch(error => throwOnApiError(error, context))

  if (context.meta.userId && !swContext.customer) {
    context.log.warn(decorateMessage('Logged in the app, but contextToken is of a guest'))
    // this error is handled by our custom frontend
    throw new ContextDeSyncError()
  }
}
