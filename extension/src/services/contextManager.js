'use strict'

/**
 * Saves the current checkout token into internal storage (user or device)
 *
 * @param {string} contextToken
 * @param {PipelineContext} context
 * @returns Promise<void>
 */
const saveContextToken = async function (contextToken, context) {
  // select storage to use: device or user, if logged in
  const storage = context.meta.userId ? context.storage.user : context.storage.device

  await storage.set('contextToken', contextToken)
}

/**
 * Need to save cart warnings/errors in-between addProduct & getCart pipeline calls
 *
 * @param {SWCartErrors} messages
 * @param {PipelineContext} context
 * @returns Promise<void>
 */
const pushCartMessages = async function (messages, context) {
  const storage = context.meta.userId ? context.storage.user : context.storage.device

  await storage.set('cartMessages', messages)
}

/**
 * Once we get the messages, they are also removed from the stack
 *
 * @param {PipelineContext} context
 * @returns Promise<SWCartErrors>
 */
const popCartMessages = async function (context) {
  const storage = context.meta.userId ? context.storage.user : context.storage.device
  const response = await storage.get('cartMessages')
  await storage.del('cartMessages')

  return response
}

module.exports = { saveContextToken, pushCartMessages, popCartMessages }
