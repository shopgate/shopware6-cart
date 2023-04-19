'use strict'

const { saveImageList } = require('../services/productHandler')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.SGCatalogProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) =>
  saveImageList(context, input.products)
