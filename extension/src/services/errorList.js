'use strict'

class CartError extends Error {
  constructor (message = 'message-default', code = 'EUNKNOWN', entityId = '') {
    super()
    this.message = 'Error'
    this.code = 'ECART'
    /**
     * @type {SW6Cart.SGCartError[]}
     */
    this.errors = [{ entityId, code, message: `SW6Cart.notice.${message}`, translated: false }]
  }

  /**
   * @param {SW6Cart.SWEntityError} error
   * @param {string} code - Shopgate Error code, e.g. EUNKNOWN
   * @return {CartError}
   */
  mapEntityError (error, code = 'ESWERROR') {
    this.errors = [{
      entityId: error.id,
      code,
      message: 'SW6Cart.notice.' + error.messageKey,
      messageParams: { ...error },
      translated: false
    }]
    return this
  }
}

class UnknownError extends CartError {
  constructor () {
    super('message-default', 'EUNKNOWN', '')
  }
}

class ProductNotFoundError extends CartError {
  constructor (entityId = '') {
    super('product-not-found', 'ENOTFOUND', entityId)
  }
}

class ProductStockReachedError extends CartError {}

class CouponNotFound extends CartError {}

class CouponNotEligibleError extends CartError {}

class AutoPromoNotEligibleError extends CartError {}

/**
 * Our custom frontend handles this error
 */
class ContextDeSyncError extends Error {
  constructor () {
    super()
    this.message = 'SW6Cart.app.not-in-sync'
    this.code = 'EDESYNC'
  }
}

module.exports = {
  AutoPromoNotEligibleError,
  CartError,
  ContextDeSyncError,
  CouponNotEligibleError,
  CouponNotFound,
  ProductNotFoundError,
  ProductStockReachedError,
  UnknownError
}
