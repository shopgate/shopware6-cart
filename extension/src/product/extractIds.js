'use strict'

/**
 * @param {ApiteSW6Cart.PipelineContext} context
 * @param {{products: Array<{productId: string}>}} input
 * @returns {Promise<{productIds:string[]}>}
 */
module.exports = async (context, { products }) =>
  ({ productIds: products.map(product => product.productId) })
