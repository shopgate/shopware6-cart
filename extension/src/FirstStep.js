'use strict'

const { getCategories } = require('@shopware-pwa/shopware-6-client')

module.exports = async (context) => {
  try {
    const cats = await getCategories({ limit: 1 })
    context.log.debug(cats)
  } catch (e) {
    console.log(e)
  }
}
