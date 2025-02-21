'use strict'

const { Total, TotalsHandler } = require('../../services/totalsHandler')

/**
 * @param {ApiteSW6Utility.PipelineContext} context
 * @param {ApiteSW6Cart.Input} input
 * @returns {Promise<{totals: []}>}
 */
module.exports = async (context, input) => {
  const { totalPrice, calculatedTaxes, positionPrice, netPrice } = input.swCart.price
  const totals = new TotalsHandler()
  // print for guest only when display shipping is enabled
  const displayShipping = context.meta.userId || context.config.displayGuestShipping
  const shipTax = input.swCart.deliveries.length ? input.swCart.deliveries[0].shippingCosts.calculatedTaxes.reduce((total, { tax }) => tax + total, 0.0) : 0.0
  if (totalPrice > 0) {
    const grandTotal = displayShipping ? totalPrice : positionPrice
    const subTotal = displayShipping ? netPrice : (netPrice - shipTax)
    const total = new Total('grandTotal', grandTotal)
    total.addSubtotal('subTotal', subTotal, 'NET')
    totals.addTotal(total)
  }

  const allTaxes = calculatedTaxes.reduce((total, { tax }) => tax + total, 0.0)
  const taxSummed = displayShipping ? allTaxes : (allTaxes - shipTax)
  totals.addTotal(
    (new Total('tax', taxSummed, 'ApiteSW6Utility.cart.summaryTax'))
      .setSubtotals(
        calculatedTaxes.map(
          ({ taxRate, tax }) => ({ type: 'tax', label: taxRate + '%', amount: tax })
        )
      )
  )

  const promos = input.swCart.lineItems.filter(lineItem => lineItem.type === 'promotion')
  if (promos.length) {
    totals.addTotal(
      (new Total('discount', promos.reduce((total, { price: { totalPrice } }) => -totalPrice + total, 0.0)))
        .setSubtotals(
          promos.map(
            promo => ({ type: 'discount', label: promo.label, amount: -promo.price.totalPrice })
          )
        )
    )
  }

  if (displayShipping && input.swCart.deliveries.length) {
    const shipping = input.swCart.deliveries[0].shippingCosts.totalPrice
    totals.addTotal(
      (new Total('shipping', shipping, 'ApiteSW6Utility.cart.summaryShipping'))
    )
  }

  return { totals: totals.getResult() }
}
