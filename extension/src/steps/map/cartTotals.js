'use strict'

/**
 * @param {SW6Cart.PipelineContext} context
 * @param {SWCartInput} input
 * @returns {Promise<{totals: []}>}
 */
module.exports = async (context, input) => {
  const totals = []
  if (input.swCart.price.totalPrice) {
    totals.push({
      type: 'grandTotal',
      label: 'Total', // todo: translate
      amount: input.swCart.price.totalPrice,
      subTotals: [
        {
          type: 'subTotal',
          label: 'NET total',
          amount: input.swCart.price.netPrice
        }
      ]
    })
  }
  if (input.swCart.price.calculatedTaxes) {
    const totalTax = input.swCart.price.calculatedTaxes.reduce((total, { tax }) => tax + total, 0.0)
    totals.push({
      type: 'tax',
      label: 'Total Tax', // todo: translate
      amount: totalTax,
      subTotals:
        input.swCart.price.calculatedTaxes.map(
          ({ taxRate, tax }) => {
            return {
              type: 'tax',
              label: taxRate + '%',
              amount: tax
            }
          })
    })
  }
  const promos = input.swCart.lineItems
    .filter(lineItem => lineItem.type === 'promotion')
  if (promos) {
    totals.push({
      type: 'discount',
      label: 'Discounts', // todo: translate
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
