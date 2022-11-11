'use strict'

/**
 * @param {float|number} price
 * @return {string}
 */
const getDEPrice = (price) => {
  const germanCurrency = Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  })

  return germanCurrency.format(price)
}

/**
 * @param {float|number} number
 * @return {string}
 */
const getDENumber = (number) => {
  const format = Intl.NumberFormat('de-DE')

  return format.format(number)
}

module.exports = { getDENumber, getDEPrice }
