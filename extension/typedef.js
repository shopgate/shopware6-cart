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

/**
 * @typedef {Object} CartFlags
 * @property {boolean} taxIncluded
 * @property {boolean} orderable
 * @property {boolean} coupons
 */
