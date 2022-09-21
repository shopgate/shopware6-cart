'use strict'

const { apiManager: { createApiConfig } } = require('@apite/sw6-webcheckout-helper')
const { getCart } = require('@shopware-pwa/shopware-6-client')
const { throwOnApiError } = require('../services/errorManager')

/**
 * This pipeline is created for testing purposes only
 *
 * @param {ApiteSW6Helper.PipelineContext} context
 */
module.exports = async (context) => {
  const apiConfig = await createApiConfig(context, { contextToken: undefined })
  const { token } = await getCart(apiConfig).catch(e => throwOnApiError(e, context))

  return { token }
}
