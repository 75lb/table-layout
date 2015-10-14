'use strict'
var a = require('array-tools')
var t = require('typical')

var _viewWidth = new WeakMap()

class Columns extends Array {
  constructor (columns) {
    super()
    this.load(columns)
  }

  set viewWidth (val) {
    _viewWidth.set(this, val)
  }

  totalWidth () {
    return this.map(col => col.width).reduce((a, b) => a + b)
  }

  get (columnName) {
    return this.find(column => column.name === columnName)
  }

  load (columns) {
    if (columns) {
      columns.forEach(column => {
        this.push(column instanceof Column ? column : new Column(column))
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
      // if (column.width) {
      //   column.generatedWidth = column.width
      // }
    })
  }
}

/**
@property [name] {string} - name
@property [width] {number} - column width
@property [maxWidth] {number} - column max width
@property [nowrap] {boolean} - disable wrapping for this column
@property [padding] {object} - padding options
@property [padding.left] {string} - a string to pad the left of each cell (default: `" "`)
@property [padding.right] {string} - a string to pad the right of each cell (default: `" "`)
*/
class Column {
  constructor (column) {
    this.name = column.name
    if (t.isDefined(column.width)) {
      this.width = column.width
      /* this flag prevents the column being autosized */
      this._userDefinedWidth = true
    }
    if (t.isDefined(column.maxWidth)) this.maxWidth = column.maxWidth
    if (t.isDefined(column.nowrap)) this.nowrap = column.nowrap
    if (t.isDefined(column.padding)) this.padding = column.padding
  }
}

/**
 * @module columns
 */
module.exports = Columns
