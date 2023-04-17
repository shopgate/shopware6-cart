'use strict'

const imgStoreKey = 'featuredImageStore'

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {ApiteSW6Utility.PipelineStorage}
 * @private
 */
const _getStorage = context => context.meta.userId ? context.storage.user : context.storage.device

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<Array<string,string>>}
 */
const getImageList = async context => _getStorage(context).get(imgStoreKey)

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.SGCatalogProduct[]} products
 */
const saveImageList = async (context, products) => {
  const target = Object.assign({}, await getImageList(context));
  products.forEach(product => target[product.id] = product.featuredImageUrl);
  await _getStorage(context).set(imgStoreKey, target)
}

module.exports = { getImageList, saveImageList }
