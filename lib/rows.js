'use strict'
var Columns = require('./columns')
var ansi = require('./ansi')

/**
 * @class Rows
 * @extends Array
 */
class Rows extends Array {
  constructor (rows) {
    super()
    this.load(rows)
  }

  load (rows) {
    rows.forEach(row => this.push(row))
  }

  getColumns () {
    var columns = new Columns()
    this.forEach(row => {
      for (let prop in row) {
        let column = columns.find(column => column.name === prop)
        if (!column) {
          column = columns.add({ name: prop, contentWidth: 0 })
        }
        let cellValue = row[prop]
        if (cellValue === undefined) {
          cellValue = ''
        } else if (ansi.has(cellValue)) {
          cellValue = ansi.remove(cellValue)
        } else {
          cellValue = String(cellValue)
        }
        if (cellValue.length > column.contentWidth) column.contentWidth = cellValue.length

        if (!column.contentWrappable) column.contentWrappable = /\s+/.test(cellValue)
      }
    })
    return columns
  }
}

/**
 * @module rows
 */
module.exports = Rows
