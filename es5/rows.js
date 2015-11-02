'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Columns = require('./columns');
var ansi = require('./ansi');
var arrayify = require('array-back');
var wrap = require('wordwrapjs');
var Cell = require('./cell');

var Rows = (function (_Array) {
  _inherits(Rows, _Array);

  function Rows(rows, columns) {
    _classCallCheck(this, Rows);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rows).call(this));

    _this.load(rows, columns);
    return _this;
  }

  _createClass(Rows, [{
    key: 'load',
    value: function load(rows, columns) {
      var _this2 = this;

      arrayify(rows).forEach(function (row) {
        return _this2.push(new Row(row, columns));
      });
    }
  }], [{
    key: 'getColumns',
    value: function getColumns(rows) {
      var columns = new Columns();
      arrayify(rows).forEach(function (row) {
        for (var columnName in row) {
          var column = columns.get(columnName);
          if (!column) {
            column = columns.add({ name: columnName, contentWidth: 0, minContentWidth: 0 });
          }
          var cell = new Cell(row[columnName], column);
          var cellValue = cell.value;
          if (ansi.has(cellValue)) {
            cellValue = ansi.remove(cellValue);
          }

          if (cellValue.length > column.contentWidth) column.contentWidth = cellValue.length;

          var longestWord = getLongestWord(cellValue);
          if (longestWord > column.minContentWidth) {
            column.minContentWidth = longestWord;
          }
          if (!column.contentWrappable) column.contentWrappable = wrap.isWrappable(cellValue);
        }
      });
      return columns;
    }
  }]);

  return Rows;
})(Array);

var Row = (function (_Map) {
  _inherits(Row, _Map);

  function Row(row, columns) {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).call(this, objectToIterable(row, columns)));
  }

  return Row;
})(Map);

function getLongestWord(line) {
  var words = wrap.getWords(line);
  return words.reduce(function (max, word) {
    return Math.max(word.length, max);
  }, 0);
}

function objectToIterable(row, columns) {
  return columns.map(function (column) {
    return [column, new Cell(row[column.name], column)];
  });
}

module.exports = Rows;