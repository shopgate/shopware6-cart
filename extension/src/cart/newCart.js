'use strict'

const {
  apiManager: { deleteCart, getCart },
  clientManger: { createApiConfig },
  contextManager: { removeContextToken },
  errorManager: { throwOnApiError }
} = require('@apite/shopware6-utility')
const { decorateError } = require('../services/logDecorator')

/**
 * This pipeline is created for testing purposes only
 *
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<{token: string}>}
 */
module.exports = async (context) => {
  // deletes old cart
  const removeClient = await createApiConfig(context, false)
  await deleteCart(removeClient).catch(e => context.log.debug(decorateError(e)))
  await removeContextToken(context)

  // creates new cart
  const saveClient = await createApiConfig(context)
  const { token } = await getCart(saveClient).catch(e => throwOnApiError(e, context))

  return { token }
}
