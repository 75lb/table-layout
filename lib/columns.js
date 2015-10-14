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

  /**
   * width is either
   * - set by user
   * - set by content
   *   - if columns won't fit within viewport
   *     - determine which columns are wrappable
   *     - reduce wrappable column widths equally
   */
  autoSize (viewWidth) {
    this.forEach(column => {
      column.generatedWidth = column.width || (column.contentWidth + column.padding.length())
    })

    var widthDiff = this.totalWidth() - viewWidth
    if (widthDiff) {
      let resizableColumns = this.filter(column => column.contentWrappable && !t.isDefined(column.width))
      resizableColumns.forEach(column => {
        column.generatedWidth -= Math.floor(widthDiff / resizableColumns.length)
      })
    }
  }
}

/**
 * @module columns
 */
module.exports = Columns
