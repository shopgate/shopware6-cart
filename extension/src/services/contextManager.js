'use strict'

/**
 * Select storage to use: device or user (if logged in)
 *
 * @param {PipelineContext} context
 * @return PipelineStorage
 * @private
 */
const _getStorage = context => context.meta.userId ? context.storage.user : context.storage.device

/**
 * Saves the current checkout token into internal storage (user or device)
 *
 * @param {string} contextToken
 * @param {PipelineContext} context
 * @returns Promise<void>
 */
const saveContextToken = async function (contextToken, context) {
  _getStorage(context).set('contextToken', contextToken).catch(err => {
    context.log.error(`Failed to save context token. Error: '${err.message}'`)
  })
}

const saveCouponCode = async function (couponCode, context) {
  _getStorage(context).set('couponCode', couponCode).catch(err => {
    context.log.error(`Failed to save context token. Error: '${err.message}'`)
  })
}

const getCouponCode = async context => _getStorage(context).get('couponCode')

module.exports = { saveContextToken, saveCouponCode, getCouponCode }
