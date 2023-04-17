'use strict'

const _get = require('lodash.get')
const { getProducts } = require('@shopware-pwa/shopware-6-client')
const { apiManager: { createApiConfig } } = require('@apite/shopware6-utility')
const { decorateError } = require('../services/logDecorator')

/**
 * Adds reference prices to cart products if they are not available
 *
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.Input} input
 * @returns {Promise<{swCart: ApiteSW6Utility.SWCart}>}
 */
module.exports = async (context, { swCart }) => {
  const lineItemIds = swCart.lineItems
    .filter(item => item.type === 'product' && !item.price.referencePrice)
    .map(lineItem => lineItem.id)
  if (lineItemIds.length === 0) {
    return { swCart }
  }
  const productsWithDetails = await getProductDetails(context, lineItemIds)
  productsWithDetails && productsWithDetails.elements && swCart.lineItems.forEach((item, index) => {
    const details = productsWithDetails.elements.find(el => el.id === item.id)
    if (details && details.unit) {
      swCart.lineItems[index].price.referencePrice = {
        purchaseUnit: details.purchaseUnit,
        referenceUnit: details.referenceUnit,
        unitName: _get(details, 'unit.translated.name', _get(details, 'unit.name', '')),
        price: item.price.unitPrice
      }
    }
  })

  return { swCart }
}

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {Array<string>} ids
 * @returns {Promise<EntityResult<"product", Product[]>|undefined>}
 */
const getProductDetails = async (context, ids) => {
  const apiConfig = await createApiConfig(context)
  const criteria = {
    ids,
    includes: { product: ['id', 'purchaseUnit', 'referenceUnit', 'packUnit', 'packUnitPlural', 'unit.unitName'] },
    associations: { unit: { 'total-count-mode': 1 } }
  }

  return getProducts(criteria, apiConfig).catch(e => {
    context.log.error(decorateError(e))
    return null
  })
}
