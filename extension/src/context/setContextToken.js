'use strict'

const { saveContextToken } = require('../services/contextManager')

/**
 * Check frontend->subscriptions->context for more info
 *
 * @param {SW6Cart.PipelineContext} context
 * @param {Object} input
 * @property {string} input.contextToken
 * @returns {Promise<void>}
 */
module.exports = async (context, { contextToken }) => {
  await saveContextToken(contextToken, context)
}
