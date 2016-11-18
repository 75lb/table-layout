'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var t = require('typical');
var arrayify = require('array-back');
var Column = require('./column');

var _maxWidth = new WeakMap();

var Columns = function () {
  function Columns(columns) {
    _classCallCheck(this, Columns);

    this.list = [];
    arrayify(columns).forEach(this.add.bind(this));
  }

  _createClass(Columns, [{
    key: 'totalWidth',
    value: function totalWidth() {
      return this.list.length ? this.list.map(function (col) {
        return col.generatedWidth;
      }).reduce(function (a, b) {
        return a + b;
      }) : 0;
    }
  }, {
    key: 'totalFixedWidth',
    value: function totalFixedWidth() {
      return this.getFixed().map(function (col) {
        return col.generatedWidth;
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
    }
  }, {
    key: 'get',
    value: function get(columnName) {
      return this.list.find(function (column) {
        return column.name === columnName;
      });
    }
  }, {
    key: 'getResizable',
    value: function getResizable() {
      return this.list.filter(function (column) {
        return column.isResizable();
      });
    }
  }, {
    key: 'getFixed',
    value: function getFixed() {
      return this.list.filter(function (column) {
        return column.isFixed();
      });
    }
  }, {
    key: 'add',
    value: function add(column) {
      var col = column instanceof Column ? column : new Column(column);
      this.list.push(col);
      return col;
    }
  }, {
    key: 'autoSize',
    value: function autoSize() {
      var _this = this;

      var maxWidth = _maxWidth.get(this);

      this.list.forEach(function (column) {
        column.generateWidth();
        column.generateMinWidth();
      });

      this.list.forEach(function (column) {
        if (t.isDefined(column.maxWidth) && column.generatedWidth > column.maxWidth) {
          column.generatedWidth = column.maxWidth;
        }

        if (t.isDefined(column.minWidth) && column.generatedWidth < column.minWidth) {
          column.generatedWidth = column.minWidth;
        }
      });

      var width = {
        total: this.totalWidth(),
        view: maxWidth,
        diff: this.totalWidth() - maxWidth,
        totalFixed: this.totalFixedWidth(),
        totalResizable: Math.max(maxWidth - this.totalFixedWidth(), 0)
      };

      if (width.diff > 0) {
        (function () {
          var resizableColumns = _this.getResizable();
          resizableColumns.forEach(function (column) {
            column.generatedWidth = Math.floor(width.totalResizable / resizableColumns.length);
          });

          var grownColumns = _this.list.filter(function (column) {
            return column.generatedWidth > column.contentWidth;
          });
          var shrunkenColumns = _this.list.filter(function (column) {
            return column.generatedWidth < column.contentWidth;
          });
          var salvagedSpace = 0;
          grownColumns.forEach(function (column) {
            var currentGeneratedWidth = column.generatedWidth;
            column.generateWidth();
            salvagedSpace += currentGeneratedWidth - column.generatedWidth;
          });
          shrunkenColumns.forEach(function (column) {
            column.generatedWidth += Math.floor(salvagedSpace / shrunkenColumns.length);
          });
        })();
      }

      return this;
    }
  }, {
    key: 'maxWidth',
    set: function set(val) {
      _maxWidth.set(this, val);
    }
  }]);

  return Columns;
}();

module.exports = require('./no-species')(Columns);