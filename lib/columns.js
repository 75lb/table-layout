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
        this.push(column)
      })
    }
  }

  add (column) {
    var col = new Column(column)
    this.push(col)
    return col
  }

  autoSize (viewWidth) {
    /* size */
    this.forEach(column => {
      column.generatedWidth = column.width || (column.contentWidth + column.padding.length())
    })

    /* adjust if short of space */
    var width = {
      total: this.totalWidth(),
      view: viewWidth,
      diff: this.totalWidth() - viewWidth,
      totalFixed: this.totalFixedWidth(),
      totalResizable: viewWidth - this.totalFixedWidth()
    }

    if (width.diff) {
      let resizableColumns = this.getResizable()
      resizableColumns.forEach(column => {
        column.generatedWidth = Math.floor(width.totalResizable / resizableColumns.length)
      })
    }

    /* adjust if user set a maxWidth */
    this.forEach(column => {
      if (t.isDefined(column.maxWidth) && column.generatedWidth > column.maxWidth) {
        column.generatedWidth = column.maxWidth
      }
    })
  }
}

class Column {
  constructor (column) {
    for (let prop in column){
      this[prop] = column[prop]
    }
  }

  isResizable () {
    return !this.isFixed()
  }

  isFixed () {
    return t.isDefined(this.width) || this.nowrap || !this.contentWrappable
  }
}

/**
 * @module columns
 */
module.exports = Columns
