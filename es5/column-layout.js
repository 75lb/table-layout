'use strict';
require('core-js/es6/array');
require('core-js/es6/weak-map');
var Table = require('./table');
var Columns = require('./columns');

module.exports = columnLayout;

function columnLayout(data, options) {
  var table = new Table(data, options);
  return table.render();
}

columnLayout.lines = function (data, options) {
  var table = new Table(data, options);
  return table.renderLines();
};

columnLayout.table = function (data, options) {
  return new Table(data, options);
};

columnLayout.Columns = Columns;