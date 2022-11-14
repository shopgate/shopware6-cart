'use strict'

const currencyFormatter = require('currency-formatter')

/**
 * @param {number} price
 * @param {string} currency - iso3 currency (e.g. EUR)
 * @return {string}
 */
const getPrice = (price, currency) => {
  return currencyFormatter.format(price, { code: currency })
}

const getNumber = (price, currency) => {
  if (currency === 'EUR') {
    return price.toString().replace('.', ',')
  }

  return price
}

module.exports = { getNumber, getPrice }
