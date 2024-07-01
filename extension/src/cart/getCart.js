'use strict'

const {
  apiManager: { createApiConfig },
  errorManager: { throwOnApiError }
} = require('@apite/shopware6-utility')
const { getCart } = require('@shopware-pwa/shopware-6-client')
const { decorateMessage } = require('../services/logDecorator')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<{swCart: ApiteSW6Utility.SWCart}>}
 */
module.exports = async (context) => {
  const apiConfig = await createApiConfig(context)
  const swCart = await getCart(apiConfig).catch(e => throwOnApiError(e, context))

  context.log.debug(decorateMessage('Cart token received: ' + swCart.token))

  return { swCart }
}
