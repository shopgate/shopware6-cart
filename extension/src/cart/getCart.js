'use strict'

const {
  apiManager: { getCart },
  clientManger: { createApiConfig },
  errorManager: { throwOnApiError }
} = require('@apite/shopware6-utility')
const { decorateMessage } = require('../services/logDecorator')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<{swCart: Cart}>}
 */
module.exports = async (context) => {
  const apiConfig = await createApiConfig(context)
  const swCart = await getCart(apiConfig).catch(e => throwOnApiError(e, context))

  context.log.debug(decorateMessage('Cart token received: ' + swCart.token))

  return { swCart }
}
