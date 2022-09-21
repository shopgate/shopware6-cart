'use strict'

const { contextManager: { saveContextToken } } = require('@apite/sw6-webcheckout-helper')

/**
 * Check frontend->subscriptions->context for more info
 *
 * @param {ApiteSW6Helper.PipelineContext} context
 * @param {Object} input
 * @property {string} input.contextToken
 * @returns {Promise<void>}
 */
module.exports = async (context, { contextToken }) => {
  context.log.warn('cart: set context token: ' + contextToken)
  await saveContextToken(contextToken, context)
}
