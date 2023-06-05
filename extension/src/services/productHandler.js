'use strict'

const imgStoreKey = 'featuredImageStore'

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<Array<string,string>>}
 */
const getImageList = async context => context.storage.extension.get(imgStoreKey)

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.SGCatalogProduct[]} products
 */
const saveImageList = async (context, products) => {
  const target = Object.assign({}, await getImageList(context));
  products.forEach(product => target[product.id] = product.featuredImageBaseUrl);
  await context.storage.extension.set(imgStoreKey, target)
}

module.exports = { getImageList, saveImageList }
