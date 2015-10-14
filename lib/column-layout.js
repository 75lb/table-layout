'use strict'
var Table = require('./table')

/**
@module column-layout
*/
module.exports = columnLayout

/**
Returns JSON data formatted in columns.

@param {array} - input data
@param [options] {object} - optional settings
@param [options.viewWidth] {number} - maximum width of layout
@param [options.columns] {module:column-layout~columnOption} - array of column options
@param [options.padding] {object}
@param [options.padding.left] {string}
@param [options.padding.right] {string}
@returns {string}
@alias module:column-layout
@example
> columnFormat = require("column-format")
> jsonData = [{
    col1: "Some text you wish to read in column layout",
    col2: "And some more text in column two. "
}]
> columnFormat(jsonData, { viewWidth: 30 })
' Some text you  And some more \n wish to read   text in       \n in column      column two.   \n layout                       \n'
*/
function columnLayout (data, options) {
  var table = new Table(data, options)
  return table.render()
}
