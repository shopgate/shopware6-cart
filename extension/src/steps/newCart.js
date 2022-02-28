'use strict'

const { saveContextToken } = require('../services/contextManager')
const { UnknownError } = require('../services/errorManager')
const { getCart, update } = require('@shopware-pwa/shopware-6-client')

/**
 * This pipeline is created for testing purposes only
 *
 * @param {PipelineContext} context
 */
module.exports = async (context) => {
  let swCart
  try {
    update({ contextToken: undefined })
    swCart = await getCart()
    await saveContextToken(swCart.token, context)
  } catch (err) {
    context.log.error('Failed to create new cart. Error: ' + JSON.stringify(err))
    throw new UnknownError()
  }
}
