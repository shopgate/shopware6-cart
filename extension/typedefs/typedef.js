/* eslint-disable */
// noinspection ES6ShorthandObjectProperty
const { ErrorLevel, CartErrors, EntityError, ClientApiError } = require('@shopware-pwa/commons')
const { Cart } = require('@shopware-pwa/shopware-6-client')

/**
 * @typedef {Object} CartFlags
 * @property {boolean} taxIncluded
 * @property {boolean} orderable
 * @property {boolean} coupons
 */

///
/// Pipeline input
///

/**
 * @typedef {Object} ContextTokenInput
 * @property {string|undefined} contextToken
 */
/**
 * @typedef {Object} SWCartInput
 * @property {Cart} swCart
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

///
/// SW hacky pass-through
///
/** @typedef {EntityError} SWEntityError */
/** @typedef {CartErrors} SWCartErrors */
/** @typedef {ErrorLevel} SWErrorLevel */
/** @typedef {ClientApiError} SWClientApiError */
