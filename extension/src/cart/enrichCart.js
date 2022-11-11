'use strict'

const _get = require('lodash.get')
const { createApiConfig } = require('@apite/shopware6-utility/src/services/apiManager')
const { getProducts } = require('@shopware-pwa/shopware-6-client')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.Input} input
 * @returns {Promise<{swCart: ApiteSW6Utility.SWCart}>}
 */
module.exports = async (context, { swCart }) => {
  const productsWithDetails = await getProductDetails(context, swCart.lineItems.map(lineItem => lineItem.id))
  swCart.lineItems.forEach((item, index) => {
    // we need to find products that do not have a reference price
    if (item.type !== 'product' || item.price.referencePrice) {
      return
    }
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
 * @returns {Promise<EntityResult<"product", Product[]>>}
 */
const getProductDetails = async (context, ids) => {
  const apiConfig = await createApiConfig(context)
  const criteria = {
    ids,
    includes: { product: ['id', 'purchaseUnit', 'referenceUnit', 'packUnit', 'packUnitPlural', 'unit.unitName'] },
    associations: {
      unit: { 'total-count-mode': 1 }
    }
  }
  return getProducts(criteria, apiConfig)
}
