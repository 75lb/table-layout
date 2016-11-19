'use strict'
const Table = require('./table')

/**
 * @module table-layout
 */
module.exports = tableLayout

/**
 * Recordset data in (array of objects), text table out.
 *
 * @param {object[]} - input data
 * @param [options] {object} - optional settings
 * @param [options.maxWidth] {number} - maximum width of layout
 * @param [options.nowrap] {boolean} - disable wrapping on all columns
 * @param [options.break] {boolean} - enable word-breaking on all columns
 * @param [options.columns] {module:table-layout~columnOption} - array of column options
 * @param [options.ignoreEmptyColumns] {boolean} - if set, empty columns or columns containing only whitespace are not rendered.
 * @param [options.padding] {object} - Padding values to set on each column. Per-column overrides can be set in the `options.columns` array.
 * @param [options.padding.left] {string}
 * @param [options.padding.right] {string}
 * @alias module:table-layout
 * @example
 * > tableLayout = require('table-layout')
 * > jsonData = [{
 *   col1: 'Some text you wish to read in table layout',
 *   col2: 'And some more text in column two. '
 * }]
 * > tableLayout(jsonData, { maxWidth: 30 })
 *  Some text you  And some more
 *  wish to read   text in
 *  in table      column two.
 *  layout
 */
function tableLayout (data, options) {
  const table = new Table(data, options)
  return table.toString()
}

/**
 * Identical to `tableLayout()` with the exception of the rendered result being returned as an array of lines, rather that a single string.
 * @returns {string[]}
 * @example
 * > tableLayout = require('table-layout')
 * > jsonData = [{
 *   col1: 'Some text you wish to read in table layout',
 *   col2: 'And some more text in column two. '
 * }]
 * > tableLayout.lines(jsonData, { maxWidth: 30 })
 * [ ' Some text you  And some more ',
 * ' wish to read   text in       ',
 * ' in table      column two.   ',
 * ' layout                       ' ]
 */
tableLayout.lines = function (data, options) {
  const table = new Table(data, options)
  return table.renderLines()
}

tableLayout.Table = Table

/**
 * @typedef module:table-layout~columnOption
 * @property name {string} - column name, must match a property name in the input
 * @property [width] {number} - column width
 * @property [minWidth] {number} - column min width
 * @property [maxWidth] {number} - column max width
 * @property [nowrap] {boolean} - disable wrapping for this column
 * @property [break] {boolean} - enable word-breaking for this columns
 * @property [padding] {object} - padding options
 * @property [padding.left] {string} - a string to pad the left of each cell (default: `' '`)
 * @property [padding.right] {string} - a string to pad the right of each cell (default: `' '`)
 */
