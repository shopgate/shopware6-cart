/* eslint-disable */
// noinspection ES6ShorthandObjectProperty
const {
  CartErrors,
  ClientApiError,
  ErrorLevel,
  EntityError,
  LineItem,
  ShopwareError
} = require('@shopware-pwa/commons')
const { Cart } = require('@shopware-pwa/shopware-6-client')

/**
 * @typedef {Object} CartFlags
 * @property {boolean} taxIncluded
 * @property {boolean} orderable
 * @property {boolean} coupons
 */

/**
 * @typedef {Object} SGCartMessage
 * @property {EntityError.messageKey | string} code
 * @property {'warning', 'error', 'info'} type
 * @property {string} message
 */

///
/// Pipeline input
///

/**
 * @typedef {Object} SWCartInput
 * @property {Cart} swCart
 * @property {string} currency
 */
/**
 * @typedef {Object} SGAddProductInput
 * @property {Array<SGAadProduct>} products
 * @typedef {Object} SGAadProduct
 * @property {string} productId
 * @property {number} quantity
 * @property {Array<Object>} options
 * @property {Object} metadata
 */
/**
 * @typedef {Object} SGUpdateProductInput
 * @property {Array<SGUpdateProduct>} cartItems
 * @typedef SGUpdateProduct
 * @property {string} cartItemId - PWA6.x
 * @property {string} CartItemId - PWA5.x
 * @property {number} quantity
 */
/**
 * @typedef {Object} SGDeleteCartItemInput
 * @property {Array<string>} cartItemIds
 */

///
/// SW hacky pass-through
///
/** @typedef {EntityError} SWEntityError */
/** @typedef {CartErrors} SWCartErrors */
/** @typedef {ErrorLevel} SWErrorLevel */
/** @typedef {ClientApiError} SWClientApiError */
/** @typedef {ShopwareError} SWShopwareError */
/** @typedef {Cart} SWCart */
/** @typedef {LineItem} SWLineItem */
