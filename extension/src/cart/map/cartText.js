'use strict'

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<{text: ApiteSW6Cart.CartText}>}
 */
module.exports = async (context) => {
  const { legalText, legalInfo } = context.config.settings
  return {
    text: {
      legalText,
      legalInfo
    }
  }
}
