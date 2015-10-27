'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var wrap = require('wordwrapjs');
var t = require('typical');
var os = require('os');
var Rows = require('./rows');
var ansi = require('./ansi');

var Table = (function () {
  function Table(data, options) {
    var _this = this;

    _classCallCheck(this, Table);

    options = options || {};
    if (!options.padding) options.padding = {};
    options.padding.left = t.isDefined(options.padding.left) ? options.padding.left : ' ';
    options.padding.right = t.isDefined(options.padding.right) ? options.padding.right : ' ';
    options.viewWidth = t.isDefined(options.viewWidth) ? options.viewWidth : process && process.stdout.columns || 80;
    options.columns = options.columns || [];

    this.rows = new Rows(data);
    this.columns = this.rows.getColumns();

    this.columns.viewWidth = options.viewWidth;
    this.columns.forEach(function (column) {
      if (options.padding) column.padding = options.padding;
      if (options.nowrap) column.nowrap = options.nowrap;
      if (options['break']) {
        column['break'] = options['break'];
        column.contentWrappable = true;
      }
    });

    options.columns.forEach(function (optionColumn) {
      var column = _this.columns.get(optionColumn.name);
      if (column) {
        if (optionColumn.padding) {
          column.padding.left = optionColumn.padding.left;
          column.padding.right = optionColumn.padding.right;
        }
        if (optionColumn.width) column.width = optionColumn.width;
        if (optionColumn.maxWidth) column.maxWidth = optionColumn.maxWidth;
        if (optionColumn.minWidth) column.minWidth = optionColumn.minWidth;
        if (optionColumn.nowrap) column.nowrap = optionColumn.nowrap;
        if (optionColumn['break']) {
          column['break'] = optionColumn['break'];
          column.contentWrappable = true;
        }
      }
    });

    this.columns.autoSize();
  }

  _createClass(Table, [{
    key: 'getWrapped',
    value: function getWrapped() {
      var _this2 = this;

      var lines = [];
      this.rows.forEach(function (row) {
        var line = [];
        _this2.columns.forEach(function (column) {
          var cell = row[column.name];
          if (!t.isString(cell)) {
            if (!t.isDefined(cell)) {
              cell = '';
            } else {
              cell = String(cell);
            }
          }
          if (column.nowrap) {
            line.push(cell.split(/\r\n?|\n/));
          } else {
            line.push(wrap.lines(cell, {
              width: column.generatedWidth - column.padding.length(),
              ignore: ansi.regexp,
              'break': column['break']
            }));
          }
        });
        lines.push(line);
      });
      return lines;
    }
  }, {
    key: 'getLines',
    value: function getLines() {
      var wrappedLines = this.getWrapped();
      var lines = [];
      wrappedLines.forEach(function (wrapped) {
        var mostLines = getLongestArray(wrapped);

        var _loop = function (i) {
          var line = [];
          wrapped.forEach(function (cell) {
            line.push(cell[i] || '');
          });
          lines.push(line);
        };

        for (var i = 0; i < mostLines; i++) {
          _loop(i);
        }
      });
      return lines;
    }
  }, {
    key: 'renderLines',
    value: function renderLines() {
      var _this3 = this;

      var lines = this.getLines();
      return lines.map(function (line) {
        return line.reduce(function (prev, cell, index) {
          var column = _this3.columns[index];
          return prev + padCell(cell, column.padding, column.generatedWidth);
        }, '');
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderLines().join(os.EOL) + os.EOL;
    }
  }]);

  return Table;
})();

function getLongestArray(arrays) {
  var lengths = arrays.map(function (array) {
    return array.length;
  });
  return Math.max.apply(null, lengths);
}

function padCell(cellValue, padding, width) {
  var ansiLength = cellValue.length - ansi.remove(cellValue).length;
  cellValue = cellValue || '';
  return (padding.left || '') + cellValue.padRight(width - padding.length() + ansiLength) + (padding.right || '');
}

module.exports = Table;