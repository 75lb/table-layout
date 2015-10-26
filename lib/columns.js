'use strict'
var t = require('typical')
var Padding = require('./padding')

var _viewWidth = new WeakMap()

class Columns extends Array {
  constructor (columns) {
    super()
    this.load(columns)
  }

  /**
   * sum of all generatedWidth fields
   * @return {number}
   */
  totalWidth () {
    return this.length
      ? this.map(col => col.generatedWidth).reduce((a, b) => a + b)
      : 0
  }

  totalFixedWidth () {
    return this.getFixed().map(col => col.generatedWidth).reduce((a, b) => a + b, 0)
  }

  get (columnName) {
    return this.find(column => column.name === columnName)
  }

  getResizable () {
    return this.filter(column => column.isResizable())
  }

  getFixed () {
    return this.filter(column => column.isFixed())
  }

  load (columns) {
    if (columns) {
      columns.forEach(column => {
        this.push(column instanceof Column ? column : new Column(column))
      })
    }
  }

  add (column) {
    var col = new Column(column)
    this.push(col)
    return col
  }

  set viewWidth (val) {
    _viewWidth.set(this, val)
  }

  /**
   * sets `generatedWidth` for each column
   */
  autoSize () {
    var viewWidth = _viewWidth.get(this)

    /* size */
    this.forEach(column => column.generateWidth())

    var width = {
      total: this.totalWidth(),
      view: viewWidth,
      diff: this.totalWidth() - viewWidth,
      totalFixed: this.totalFixedWidth(),
      totalResizable: viewWidth - this.totalFixedWidth()
    }
    // console.log(width);
    /* adjust if short of space */
    if (width.diff > 0) {
      /* share the available space between resizeable columns */
      let resizableColumns = this.getResizable()
      resizableColumns.forEach(column => {
        column.generatedWidth = Math.floor(width.totalResizable / resizableColumns.length)
      })

      /* at this point, the generatedWidth should never end up bigger than the contentWidth */
      var grownColumns = this.filter(column => column.generatedWidth > column.contentWidth)
      var shrunkenColumns = this.filter(column => column.generatedWidth < column.contentWidth)
      var salvagedSpace = 0
      grownColumns.forEach(column => {
        var currentGeneratedWidth = column.generatedWidth
        column.generateWidth()
        salvagedSpace += currentGeneratedWidth - column.generatedWidth
      })
      shrunkenColumns.forEach(column => {
        column.generatedWidth += Math.floor(salvagedSpace / shrunkenColumns.length)
      })

      /* adjust if user set a maxWidth */
      this.forEach(column => {
        if (t.isDefined(column.maxWidth) && column.generatedWidth > column.maxWidth) {
          column.generatedWidth = column.maxWidth
        }
      })

      /* need a minWidth to stop breakable columns getting too short */
    }
  }
}

var _padding = new WeakMap()

class Column {
  constructor (column) {
    if (t.isDefined(column.name)) this.name = column.name
    if (t.isDefined(column.width)) this.width = column.width
    if (t.isDefined(column.maxWidth)) this.maxWidth = column.maxWidth
    if (t.isDefined(column.nowrap)) this.nowrap = column.nowrap
    if (t.isDefined(column.break)) this.break = column.break
    if (t.isDefined(column.contentWrappable)) this.contentWrappable = column.contentWrappable
    if (t.isDefined(column.contentWidth)) this.contentWidth = column.contentWidth
    this.padding = column.padding || { left: ' ', right: ' ' }
    this.generatedWidth = null
  }

  set padding (padding) {
    _padding.set(this, new Padding(padding))
  }
  get padding () {
    return _padding.get(this)
  }

  get wrappedContentWidth () {
    return this.generatedWidth - this.padding.length()
  }

  isResizable () {
    return !this.isFixed()
  }

  isFixed () {
    return t.isDefined(this.width) || this.nowrap || !this.contentWrappable
  }

  generateWidth () {
    this.generatedWidth = this.width || (this.contentWidth + this.padding.length())
  }
}

/**
 * @module columns
 */
module.exports = Columns
