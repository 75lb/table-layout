'use strict';

var Table = require('./table');

module.exports = tableLayout;

function tableLayout(data, options) {
  var table = new Table(data, options);
  return table.toString();
}

tableLayout.lines = function (data, options) {
  var table = new Table(data, options);
  return table.renderLines();
};

tableLayout.Table = Table;