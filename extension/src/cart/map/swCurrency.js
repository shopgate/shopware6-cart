'use strict'

/**
 * To avoid having to connect via the Admin API we provide this statically
 */
const currencyMap = { EUR: '€', USD: '$', GBP: '£', DKK: 'kr', CZK: 'Kč', PLN: 'zł', NOK: 'nkr' }

/**
 * @param {string} iso3
 * @returns {?string}
 */
const getCurrencySymbol = iso3 => currencyMap[iso3] ?? null

module.exports = { currencyMap, getCurrencySymbol }
