'use strict'

const { apiManager: { createApiConfig } } = require('@apite/shopware6-utility')
const { getCart } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError } = require('../services/errorManager')

/**
 * @param {ApiteSW6Helper.PipelineContext} context
 */
module.exports = async (context) => {
  const apiConfig = await createApiConfig(context)
  const swCart = await getCart(apiConfig).catch(e => throwOnApiError(e, context))

  return { swCart }
}
