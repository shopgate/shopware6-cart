/* eslint-disable */
// noinspection ES6ShorthandObjectProperty
const {
  EntityError,
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
 * @typedef {Object} ApiteSW6Cart.CartItem
 * @property {string} id
 * @property {number} quantity
 * @property {string} type
 * @property {?ApiteSW6Cart.CartItemProduct} product
 * @property {?ApiteSW6Cart.CartItemCoupon} coupon
 * @property {Array} messages
 * @property {string} currency
 */

/**
 * @typedef {Object} ApiteSW6Cart.CartItemProduct
 * @property {string} id
 * @property {string} name
 * @property {string} featuredImageUrl
 * @property {Object} price
 * @property {number} price.unit
 * @property {number} price.default full amount with quantity or struck price
 * @property {number|null} price.special full amount with quantity when strike is given
 * @property {ApiteSW6Cart.CartItemProductProperty[]} properties
 * @property {Array} appliedDiscounts
 * @property {Array} additionalInfo
 */

/**
 * @typedef {Object} ApiteSW6Cart.CartItemCoupon
 * @property {string|undefined} code
 * @property {string|undefined} description
 * @property {string|undefined} label
 * @property {Object} savedPrice
 * @property {number} savedPrice.value
 * @property {string} savedPrice.type
 */

/**
 * @typedef {Object} ApiteSW6Cart.CartItemProductProperty
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
 * @typedef {Object} ApiteSW6Cart.SGCartError
 * @property {string} entityId
 * @property {EntityError.messageKey | string} code - e.g. ENOTFOUND
 * @property {string} message
 * @property {Object|undefined} messageParams
 * @property {boolean|undefined} translated
 */

/**
 * @typedef {Object} ApiteSW6Cart.UrlResponse
 * @property {string|URL} url
 * @property {?string} expires
 */
