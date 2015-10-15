'use strict'
var t = require('typical')

class Columns extends Array {
  constructor (columns) {
    super()
    this.load(columns)
  }

  totalWidth () {
    return this.map(col => col.generatedWidth).reduce((a, b) => a + b)
  }

  get (columnName) {
    return this.find(column => column.name === columnName)
  }

  load (columns) {
    if (columns) {
      columns.forEach(column => {
        this.push(column)
      })
    }
  }

  autoSize (viewWidth) {
    /* size */
    this.forEach(column => {
      column.generatedWidth = column.width || (column.contentWidth + column.padding.length())
    })

    /* adjust if short of space */
    var widthDiff = this.totalWidth() - viewWidth
    if (widthDiff) {
      let resizableColumns = this.filter(column => column.contentWrappable && !t.isDefined(column.width))
      resizableColumns.forEach(column => {
        column.generatedWidth -= Math.floor(widthDiff / resizableColumns.length)
      })
    }

    /* adjust if user set a max */
    this.forEach(column => {
      if (t.isDefined(column.maxWidth) && column.generatedWidth > column.maxWidth) {
        column.generatedWidth = column.maxWidth
      }
    })
  }
}

/**
 * @module columns
 */
module.exports = Columns
