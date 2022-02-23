'use strict'

/**
 * Saves the current checkout token into internal storage (user or device)
 *
 * @param {string} contextToken
 * @param {SDKContext} context
 * @returns Promise<void>
 */
const saveContextToken = async function (contextToken, context) {
  // select storage to use: device or user, if logged in
  const storage = context.meta.userId ? context.storage.user : context.storage.device

  storage.set('contextToken', contextToken)
}

module.exports = { saveContextToken }
