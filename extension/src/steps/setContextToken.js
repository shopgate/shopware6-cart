'use strict'

const { saveContextToken } = require('../services/contextManager')

/**
 * This pipeline should be called from the user extension,
 * once the user logs in/logs out
 *
 * @param {SW6Cart.PipelineContext} context
 * @param {Object} input
 * @property {string} input.contextToken
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  await saveContextToken(input.contextToken, context)
}
