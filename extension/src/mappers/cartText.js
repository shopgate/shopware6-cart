'use strict'

/**
 * @typedef CartText
 * @property {string} legalText
 * @property {string} legalInfo
 */
/**
 * @param {SDKContext} context
 * @returns {Promise<{text: CartText}>}
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
