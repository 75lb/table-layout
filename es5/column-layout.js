'use strict';
require('core-js/es6/array');
var Table = require('./table');

module.exports = columnLayout;

function columnLayout(data, options) {
  var table = new Table(data, options);
  return table.render();
}

columnLayout.lines = function (data, options) {
  var table = new Table(data, options);
  return table.renderLines();
};