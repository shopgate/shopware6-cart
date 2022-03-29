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
/// Pipeline output
///

/**
 * @typedef {Object} SW6Cart.CartItem
 * @property {string} id
 * @property {number} quantity
 * @property {string} type
 * @property {?SW6Cart.CartItemProduct} product
 * @property {?SW6Cart.CartItemCoupon} coupon
 * @property {Array} messages
 * @property {string} currency
 */

/**
 * @typedef {Object} SW6Cart.CartItemProduct
 * @property {string} id
 * @property {string} name
 * @property {string} featuredImageUrl
 * @property {Object} price
 * @property {number} price.unit
 * @property {number} price.default full amount with quantity or striked price
 * @property {number|null} price.special full amount with quantity when strike is given
 * @property {SW6Cart.CartItemProductProperty[]} properties
 * @property {Array} appliedDiscounts
 * @property {Array} additionalInfo
 */

/**
 * @typedef {Object} SW6Cart.CartItemCoupon
 * @property {string|undefined} code
 * @property {string|undefined} description
 * @property {string|undefined} label
 * @property {Object} savedPrice
 * @property {number} savedPrice.value
 * @property {string} savedPrice.type
 */

/**
 * @typedef {Object} SW6Cart.CartItemProductProperty
 * @property {string} label - Color
 * @property {string} value - Red
 */

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

/**
 * @typedef {Object} SW6Cart.SGCartError
 * @property {string} entityId
 * @property {string} code - e.g. ENOTFOUND
 * @property {string} message
 * @property {Object|undefined} messageParams
 * @property {boolean|undefined} translated
 */

/**
 * @typedef {Object} SW6Cart.UrlResponse
 * @property {string} url
 * @property {?string} expires
 */

///
/// SW hacky pass-through
///
/** @typedef {EntityError} SW6Cart.SWEntityError */
/** @typedef {CartErrors} SW6Cart.SWCartErrors */
/** @typedef {ErrorLevel} SW6Cart.SWErrorLevel */
/** @typedef {ClientApiError} SW6Cart.SWClientApiError */
/** @typedef {ShopwareError} SW6Cart.ShopwareError */
/** @typedef {Cart} SW6Cart.SWCart */
/** @typedef {LineItem} SW6Cart.SWLineItem */
