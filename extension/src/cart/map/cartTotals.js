'use strict'

/**
 * @param {SW6Cart.PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{totals: []}>}
 */
module.exports = async (context, input) => {
  const totals = []
  const { totalPrice, calculatedTaxes } = input.swCart.price

  if (totalPrice > 0) {
    totals.push({
      type: 'grandTotal',
      label: '',
      amount: totalPrice,
      subTotals: [
        {
          type: 'subTotal',
          label: 'NET',
          amount: input.swCart.price.netPrice
        }
      ]
    })
  }

  totals.push({
    type: 'tax',
    label: 'Tax',
    amount: calculatedTaxes.reduce((total, { tax }) => tax + total, 0.0),
    subTotals:
      calculatedTaxes.map(
        ({ taxRate, tax }) => {
          return {
            type: 'tax',
            label: taxRate + '%',
            amount: tax
          }
        })
  })

  const promos = input.swCart.lineItems.filter(lineItem => lineItem.type === 'promotion')
  if (promos.length) {
    totals.push({
      type: 'discount',
      label: '',
      amount: promos.reduce((total, { price: { totalPrice } }) => -totalPrice + total, 0.0),
      subTotals: promos.map((promo) => {
        return {
          type: 'discount',
          label: promo.label,
          amount: -promo.price.totalPrice
        }
      })
    })
  }
  return { totals }
}
