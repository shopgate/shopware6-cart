'use strict'

/**
 * Helps structure cart page totals
 */
class TotalsHandler {
  constructor () {
    this.totals = []
  }

  /**
   * @param {Total} total
   */
  addTotal (total) {
    this.totals.push(total)
  }

  getResult () {
    return this.totals.map(total => total.getResult())
  }
}

class Total {
  /**
   * @param {string} type - e.g. subTotal, shipping, tax, payment, discount, grandTotal
   * @param {number} amount - e.g. 7.6
   * @param {string} label - label that appears on frontend (if theme allows)
   */
  constructor (type, amount, label = '') {
    this.payload = { type, label, amount, subTotals: [] }
  }

  /**
   * NB! Seems like this structure does not work at all
   *
   * @param {string} type - e.g. subTotal, shipping, tax, payment, discount, grandTotal
   * @param {number} amount - e.g. 7.6
   * @param {string} label - label that appears on frontend (if theme allows)
   */
  addSubtotal (type, amount, label = '') {
    this.payload.subTotals.push({ type, label, amount })
    return this
  }

  setSubtotals (subtotals) {
    this.payload.subTotals = subtotals
    return this
  }

  getResult () {
    return this.payload
  }
}

module.exports = { Total, TotalsHandler }
