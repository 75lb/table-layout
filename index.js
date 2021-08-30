import Rows from './lib/rows.js'
import Columns from './lib/columns.js'
import wrap from 'wordwrapjs'
import { remove } from './lib/ansi.js'
import t from 'typical'

/**
 * @module table-layout
 */

/**
 * Recordset data in (array of objects), text table out.
 * @alias module:table-layout
 * @example
 * > Table = require('table-layout')
 * > jsonData = [{
 *   col1: 'Some text you wish to read in table layout',
 *   col2: 'And some more text in column two. '
 * }]
 * > table = new Table(jsonData, { maxWidth: 30 })
 * > console.log(table.toString())
 *  Some text you  And some more
 *  wish to read   text in
 *  in table      column two.
 *  layout
 */
class Table {
  /**
   * @param {object[]} - input data
   * @param [options] {object} - optional settings
   * @param [options.maxWidth] {number} - maximum width of layout
   * @param [options.noWrap] {boolean} - disable wrapping on all columns
   * @param [options.noTrim] {boolean} - disable line-trimming
   * @param [options.break] {boolean} - enable word-breaking on all columns
   * @param [options.columns] {module:table-layout~columnOption} - array of column-specific options
   * @param [options.ignoreEmptyColumns] {boolean} - if set, empty columns or columns containing only whitespace are not rendered.
   * @param [options.padding] {object} - Padding values to set on each column. Per-column overrides can be set in the `options.columns` array.
   * @param [options.padding.left] {string} - Defaults to a single space.
   * @param [options.padding.right] {string} - Defaults to a single space.
   * @param [options.eol] {string} - EOL character used. Defaults to `\n`.
   * @alias module:table-layout
   */
  constructor (data, options = {}) {
    const defaults = {
      padding: {
        left: ' ',
        right: ' '
      },
      maxWidth: 80,
      columns: [],
      eol: '\n'
    }
    if (!options.padding) options.padding = defaults.padding
    if (options.padding && t.isUndefined(options.padding.left)) options.padding.left = defaults.padding.left
    if (options.padding && t.isUndefined(options.padding.right)) options.padding.right = defaults.padding.right
    if (t.isUndefined(options.maxWidth)) options.maxWidth = defaults.maxWidth
    if (t.isUndefined(options.eol)) options.eol = defaults.eol
    options.columns = options.columns || []
    this.options = options
    this.load(data)
  }

  load (data) {
    const options = this.options

    /* remove empty columns */
    if (options.ignoreEmptyColumns) {
      data = Rows.removeEmptyColumns(data)
    }

    this.columns = Columns.getColumns(data)
    this.rows = new Rows(data, this.columns)

    /* load default column properties from options */
    this.columns.maxWidth = options.maxWidth
    this.columns.list.forEach(column => {
      if (options.padding) column.padding = options.padding
      if (options.noWrap) column.noWrap = options.noWrap
      if (options.break) {
        column.break = options.break
        column.contentWrappable = true
      }
    })

    /* load column properties from options.columns */
    options.columns.forEach(optionColumn => {
      const column = this.columns.get(optionColumn.name)
      if (column) {
        if (optionColumn.padding) {
          column.padding.left = optionColumn.padding.left
          column.padding.right = optionColumn.padding.right
        }
        if (optionColumn.width) column.width = optionColumn.width
        if (optionColumn.maxWidth) column.maxWidth = optionColumn.maxWidth
        if (optionColumn.minWidth) column.minWidth = optionColumn.minWidth
        if (optionColumn.noWrap) column.noWrap = optionColumn.noWrap

        if (optionColumn.break) {
          column.break = optionColumn.break
          column.contentWrappable = true
        }

        if (optionColumn.transform) column.transform = optionColumn.transform
      }
    })

    this.columns.autoSize()
    return this
  }

  getWrapped () {
    this.columns.autoSize()
    return this.rows.list.map(row => {
      const line = []
      row.forEach((cell, column) => {
        if (column.noWrap) {
          line.push(cell.value.split(/\r\n?|\n/))
        } else {
          line.push(wrap.lines(cell.value, {
            width: column.wrappedContentWidth,
            break: column.break,
            noTrim: this.options.noTrim
          }))
        }
      })
      return line
    })
  }

  getLines () {
    const wrappedLines = this.getWrapped()
    const lines = []
    wrappedLines.forEach(wrapped => {
      const mostLines = getLongestArray(wrapped)
      for (let i = 0; i < mostLines; i++) {
        const line = []
        wrapped.forEach(cell => {
          line.push(cell[i] || '')
        })
        lines.push(line)
      }
    })
    return lines
  }

  /**
   * Identical to `.toString()` with the exception that the result will be an array of lines, rather than a single, multi-line string.
   * @returns {string[]}
   */
  renderLines () {
    const lines = this.getLines()
    return lines.map(line => {
      return line.reduce((prev, cell, index) => {
        const column = this.columns.list[index]
        return prev + padCell(cell, column.padding, column.generatedWidth)
      }, '')
    })
  }

  /**
   * Returns the input data as a text table.
   * @returns {string}
   */
  toString () {
    return this.renderLines().join(this.options.eol) + this.options.eol
  }
}

/**
 * Array of arrays in.. Returns the length of the longest one
 * @returns {number}
 * @private
 */
function getLongestArray (arrays) {
  const lengths = arrays.map(array => array.length)
  return Math.max.apply(null, lengths)
}

function padCell (cellValue, padding, width) {
  const ansiLength = cellValue.length - remove(cellValue).length
  cellValue = cellValue || ''
  return (padding.left || '') +
  cellValue.padEnd(width - padding.length() + ansiLength) + (padding.right || '')
}

/**
 * @typedef module:table-layout~columnOption
 * @property name {string} - column name, must match a property name in the input
 * @property [width] {number} - A specific column width. Supply either this or a min and/or max width.
 * @property [minWidth] {number} - column min width
 * @property [maxWidth] {number} - column max width
 * @property [nowrap] {boolean} - disable wrapping for this column
 * @property [break] {boolean} - enable word-breaking for this columns
 * @property [padding] {object} - padding options
 * @property [padding.left] {string} - a string to pad the left of each cell (default: `' '`)
 * @property [padding.right] {string} - a string to pad the right of each cell (default: `' '`)
 * @property [transform] {function} - a function which will be ran for each value of this column. Transforming it.
 */
export default Table
