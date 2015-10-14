'use strict'
var wrap = require('wordwrapjs')
var s = require('string-tools')
var t = require('typical')
var os = require('os')
var Rows = require('./rows')

var ansiEscapeSequence = /\u001b.*?m/g

class Padding {
  constructor (padding) {
    this.left = padding.left
    this.right = padding.right
  }
  length () {
    return this.left.length + this.right.length
  }
}

/**
 * @class
 * @classdesc Table containing the data
 * @param
 */
class Table {
  constructor (data, options) {
    if (!options.padding) options.padding = {}
    options.padding.left = t.isDefined(options.padding.left) ? options.padding.left : ' '
    options.padding.right = t.isDefined(options.padding.right) ? options.padding.right : ' '
    options.viewWidth = t.isDefined(options.viewWidth) ? options.viewWidth : 80
    options.columns = options.columns || []

    this.rows = new Rows(data)
    this.columns = this.rows.getColumns()
    this.columns.forEach(column => {
      column.padding = new Padding(options.padding)
    })

    options.columns.forEach(optionColumn => {
      let column = this.columns.get(optionColumn.name)
      if (optionColumn.padding) {
        column.padding.left = optionColumn.padding.left
        column.padding.right = optionColumn.padding.right
      }
      if (optionColumn.width) column.width = optionColumn.width
      if (optionColumn.nowrap) column.nowrap = optionColumn.nowrap
    })

    this.columns.autoSize(options.viewWidth)
  }

  getWrapped () {
    var lines = []
    this.rows.forEach(row => {
      let line = []
      this.columns.forEach(column => {
        let cell = row[column.name]
        line.push(wrap.lines(cell, {
          width: column.generatedWidth - column.padding.length(),
          ignore: ansiEscapeSequence
        }))
      })
      lines.push(line)
    })
    return lines
  }

  getLines () {
    var wrappedLines = this.getWrapped()
    var lines = []
    wrappedLines.forEach(wrapped => {
      let mostLines = getLongestArray(wrapped)
      for (let i = 0; i < mostLines; i++) {
        let line = []
        wrapped.forEach(cell => {
          line.push(cell[i] || null)
        })
        lines.push(line)
      }
    })
    return lines
  }

  renderLines () {
    var lines = this.getLines()
    return lines.map(line => {
      return line.reduce((prev, cell, index) => {
        let column = this.columns[index]
        return prev + padCell(cell, column.padding, column.generatedWidth)
      }, '')
    })
  }

  render () {
    return this.renderLines().join(os.EOL) + os.EOL
  }
}

/**
 * Array of arrays in.. Returns the length of the longest one
 * @returns {number}
 */
function getLongestArray (arrays) {
  var lengths = arrays.map(array => array.length)
  return Math.max.apply(null, lengths)
}

function padCell (cellValue, padding, width) {
  return (padding.left || '') +
    s.padRight(cellValue || '', width - padding.length()) +
    (padding.right || '')
}

/**
@module table
*/
module.exports = Table
