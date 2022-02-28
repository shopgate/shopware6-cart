'use strict'

class UnknownError extends Error {
  constructor () {
    // todo: translate
    super('An internal error occurred.')
    this.code = 'EUNKNOWN'
    this.displayMessage = null
  }
}

class ProductNotFoundError extends Error {
  constructor () {
    // todo: translate
    super('Unfortunately, this product is no longer available')
    this.code = 'ENOTFOUND'
  }
}

class ProductStockReachedError extends Error {
  constructor () {
    // todo: translate
    super('Maximum stock reached for this product')
    this.code = 'ESTOCKREACHED'
  }
}

class ShippingMethodBlockedError extends Error {
  constructor () {
    // todo: translate
    super('Your selected shipping method is not available, please select another one')
    this.code = 'ESHIPPINGBLOCKED'
  }
}

class ForbiddenError extends Error {
  constructor () {
    // todo: translate
    super('You need to log in before using the action')
    this.code = 'EFORBIDDEN'
  }
}

module.exports = {
  ForbiddenError,
  ProductNotFoundError,
  ProductStockReachedError,
  ShippingMethodBlockedError,
  UnknownError
}
