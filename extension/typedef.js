/**
 * @typedef {Object} SDKContext
 * @property {ExtensionConfig} config
 * @property {SDKContextMeta} meta
 * @property {SDKContextStorage} storage
 * @property {SDKContextLog} log
 * @property {function} tracedRequest
 */

/**
 * @typedef {Object} ExtensionConfig
 * @property {boolean} hasCoupons
 * @property {boolean} allowMultipleCoupons
 * @property {string} currency
 * @property {string} legalText
 * @property {string} legalInfo
 */

/**
 * @typedef {Object} SDKContextMeta
 * @property {string} deviceId
 * @property {string} appId
 * @property {string} userId
 * @property {string} appLanguage
 */

/**
 * @typedef {Object} SDKContextStorage
 * @property {SDKContextEntityStorage} extension
 * @property {SDKContextEntityStorage} device
 * @property {SDKContextEntityStorage} user
 */

/**
 * @typedef {Object} SDKContextEntityStorage
 * @property {function} get - (string key, function cb)
 * @property {function} set - (string key, mixed value, function cb)
 * @property {function} del - (string key, function cb)
 */

/**
 * @typedef {Object} SDKContextLog
 * @property {function} log.trace
 * @property {function} log.debug
 * @property {function} log.info
 * @property {function} log.warn
 * @property {function} log.error
 * @property {function} log.fatal
 */

/**
 * @typedef {CartItem[]} Cart
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {number} quantity
 * @property {string} type
 * @property {?CartItemProduct} product
 * @property {?CartItemCoupon} coupon
 * @property {Array} messages
 */

/**
 * @typedef {Object} CartItemProduct
 * @property {string} id
 * @property {string} name
 * @property {string} featuredImageUrl
 * @property {Object} price
 * @property {number} price.unit
 * @property {number} price.default full amount with quantity or striked price
 * @property {number} price.special full amount with quantity when strike is given
 * @property {Array} properties
 * @property {Array} appliedDiscounts
 * @property {Array} additionalInfo
 */

/**
 * @typedef {Object} CartItemCoupon
 * @property {string} code
 * @property {string} description
 * @property {string} label
 * @property {Object} savedPrice
 * @property {number} savedPrice.value
 * @property {string} savedPrice.type
 */

/**
 * @typedef {Object} ShopwareError
 * @property {string} status
 * @property {string} code
 * @property {string} title
 * @property {any} source
 * @property {any} meta
 */

/**
 * @typedef ClientApiError
 * @property {array<ShopwareError>} messages
 * @property {number} statusCode
 */

/**
 * @typedef {Object} ContextTokenInput
 * @property {string|undefined} contextToken
 */
