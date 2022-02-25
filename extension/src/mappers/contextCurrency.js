'use strict'

const { UnknownError } = require('../services/errorManager')
const { getSessionContext } = require('@shopware-pwa/shopware-6-client')

/**
 * @param {PipelineContext} context
 * @returns {Promise<{currency: string}>}
 */
module.exports = async (context) => {
  try {
    const swContext = await getSessionContext()
    return {
      currency: swContext.currency.isoCode
    }
  } catch (e) {
    context.log.error(e.statusCode ? JSON.stringify(e.messages) : 'Could not retrieve context for currency. ' + e.message)
    throw new UnknownError()
  }
}
