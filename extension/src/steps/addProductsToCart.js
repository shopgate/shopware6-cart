'use strict'

const { addCartItems } = require('@shopware-pwa/shopware-6-client')
const { UnknownError, ProductNotFoundError, wrapErrorForPrint } = require('../services/errorManager')

/**
 * @param {PipelineContext} context
 * @param {SGAddProductInput} input
 * @returns {Promise<void>}
 */
module.exports = async (context, input) => {
  const swItems = input.products.map(({ productId, quantity }) => {
    return {
      referencedId: productId,
      quantity,
      type: 'product'
    }
  })

  await addCartItems(swItems)
    .catch(e => {
      context.log.error(e.message)
      throw new UnknownError()
    })
    .then(async cart => {
      if (cart.errors.length === 0) {
        return
      }
      Object.keys(cart.errors).forEach((key) => {
        switch (cart.errors[key].messageKey) {
          case 'product-not-found':
            throw new ProductNotFoundError()
          default:
            context.log.debug('Cannot map error: ' + wrapErrorForPrint(cart.errors[key]))
            throw new UnknownError()
        }
      })
    })
}
