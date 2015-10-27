'use strict'
var Columns = require('./columns')
var ansi = require('./ansi')
var arrayify = require('array-back')

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
    arrayify(rows).forEach(row => this.push(row))
  }

  getColumns () {
    var columns = new Columns()
    this.forEach(row => {
      for (let columnName in row) {
        let column = columns.find(column => column.name === columnName)
        if (!column) {
          column = columns.add({ name: columnName, contentWidth: 0, minContentWidth: 0 })
        }
        let cellValue = row[columnName]
        if (cellValue === undefined) {
          cellValue = ''
        } else if (ansi.has(cellValue)) {
          cellValue = ansi.remove(cellValue)
        } else {
          cellValue = String(cellValue)
        }
        if (cellValue.length > column.contentWidth) column.contentWidth = cellValue.length

        let longestWord = getLongestWord(cellValue)
        if (longestWord > column.minContentWidth) {
          column.minContentWidth = longestWord
        }

        if (!column.contentWrappable) column.contentWrappable = /\s+/.test(cellValue)
      }
    })
    return columns
  }
}

function getLongestWord (line) {
  const words = line.match(/(\S+|\r\n?|\n)/g) || []
  return words.reduce((max, word) => {
    return Math.max(word.length, max)

  }, 0)
}

/**
 * @module rows
 */
module.exports = Rows
