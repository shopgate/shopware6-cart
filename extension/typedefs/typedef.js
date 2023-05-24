/**
 * @typedef ApiteSW6Cart
 */

/**
 * @typedef {Object} ApiteSW6Cart.Input
 * @property {ApiteSW6Utility.SWCart} swCart
 * @property {string} currency
 */

/**
 * @typedef {Object} ApiteSW6Cart.SGAddProductInput
 * @property {Array<ApiteSW6Cart.SGAadProduct>} products
 * @typedef {Object} ApiteSW6Cart.SGAadProduct
 * @property {string} productId
 * @property {number} quantity
 * @property {Array<Object>} options
 * @property {Object} metadata
 */

/**
 * @typedef {Object} ApiteSW6Cart.SGCatalogProductInput
 * @property {Array<ApiteSW6Cart.SGCatalogProduct>} products
 */

 /**
 * @typedef ApiteSW6Cart.SGCatalogProduct
 * @property {string} id
 * @property {string} featuredImageUrl - image with color & other properties attached to it
 * @property {string} featuredImageBaseUrl - image with the least properties
 */

/**
 * @typedef {Object} ApiteSW6Cart.SGUpdateProductInput
 * @property {Array<ApiteSW6Cart.SGUpdateProduct>} cartItems
 * @typedef ApiteSW6Cart.SGUpdateProduct
 * @property {string} cartItemId - PWA6.x
 * @property {string} CartItemId - PWA5.x
 * @property {number} quantity
 */

/**
 * @typedef {Object} ApiteSW6Cart.SGDeleteItemInput
 * @property {Array<string>} cartItemIds
 */

/**
 * @typedef ApiteSW6Cart.CartText
 * @property {string} legalText
 * @property {string} legalInfo
 */

/**
 * @typedef {Object} ApiteSW6Cart.Item
 * @property {string} id
 * @property {number} quantity
 * @property {string} type
 * @property {?ApiteSW6Cart.ItemProduct} product
 * @property {?ApiteSW6Cart.ItemCoupon} coupon
 * @property {Array} messages
 * @property {string} currency
 */

/**
 * @typedef {Object} ApiteSW6Cart.ItemProduct
 * @property {string} id
 * @property {string} name
 * @property {string} featuredImageUrl
 * @property {Object} price
 * @property {number} price.unit
 * @property {number} price.default full amount with quantity or struck price
 * @property {number|null} price.special full amount with quantity when strike is given
 * @property {ApiteSW6Cart.ItemProductProperty[]} properties
 * @property {Array} appliedDiscounts
 * @property {Array} additionalInfo
 */

/**
 * @typedef {Object} ApiteSW6Cart.SGCartError
 * @property {string} entityId
 * @property {ApiteSW6Utility.SWEntityError.messageKey | string} code - e.g. ENOTFOUND
 * @property {string} message
 * @property {Object|undefined} messageParams
 * @property {boolean|undefined} translated
 */

/**
 * @typedef {Object} ApiteSW6Cart.ItemCoupon
 * @property {string|undefined} code
 * @property {string|undefined} description
 * @property {string|undefined} label
 * @property {Object} savedPrice
 * @property {number} savedPrice.value
 * @property {string} savedPrice.type
 */

/**
 * @typedef {Object} ApiteSW6Cart.ItemProductProperty
 * @property {string} label - Color
 * @property {string} value - Red
 */

/**
 * @typedef {Object} ApiteSW6Cart.Flags
 * @property {boolean} taxIncluded
 * @property {boolean} orderable
 * @property {boolean} coupons
 */

/**
 * @typedef {Object} ApiteSW6Cart.SGCartMessage
 * @property {ApiteSW6Utility.SWEntityError.messageKey | string} code
 * @property {'warning', 'error', 'info'} type
 * @property {string} message
 */
