'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var t = require('typical');
var Padding = require('./padding');
var arrayify = require('array-back');

var _viewWidth = new WeakMap();

var Columns = (function (_Array) {
  _inherits(Columns, _Array);

  function Columns(columns) {
    _classCallCheck(this, Columns);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Columns).call(this));

    _this.load(columns);
    return _this;
  }

  _createClass(Columns, [{
    key: 'totalWidth',
    value: function totalWidth() {
      return this.length ? this.map(function (col) {
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
      return this.find(function (column) {
        return column.name === columnName;
      });
    }
  }, {
    key: 'getResizable',
    value: function getResizable() {
      return this.filter(function (column) {
        return column.isResizable();
      });
    }
  }, {
    key: 'getFixed',
    value: function getFixed() {
      return this.filter(function (column) {
        return column.isFixed();
      });
    }
  }, {
    key: 'load',
    value: function load(columns) {
      arrayify(columns).forEach(this.add.bind(this));
    }
  }, {
    key: 'add',
    value: function add(column) {
      var col = _instanceof(column, Column) ? column : new Column(column);
      this.push(col);
      return col;
    }
  }, {
    key: 'autoSize',
    value: function autoSize() {
      var _this2 = this;

      var viewWidth = _viewWidth.get(this);

      this.forEach(function (column) {
        column.generateWidth();
        column.generateMinWidth();
      });

      this.forEach(function (column) {
        if (t.isDefined(column.maxWidth) && column.generatedWidth > column.maxWidth) {
          column.generatedWidth = column.maxWidth;
        }

        if (t.isDefined(column.minWidth) && column.generatedWidth < column.minWidth) {
          column.generatedWidth = column.minWidth;
        }
      });

      var width = {
        total: this.totalWidth(),
        view: viewWidth,
        diff: this.totalWidth() - viewWidth,
        totalFixed: this.totalFixedWidth(),
        totalResizable: Math.max(viewWidth - this.totalFixedWidth(), 0)
      };

      if (width.diff > 0) {
        var grownColumns;
        var shrunkenColumns;
        var salvagedSpace;

        (function () {
          var resizableColumns = _this2.getResizable();
          resizableColumns.forEach(function (column) {
            column.generatedWidth = Math.floor(width.totalResizable / resizableColumns.length);
          });

          grownColumns = _this2.filter(function (column) {
            return column.generatedWidth > column.contentWidth;
          });
          shrunkenColumns = _this2.filter(function (column) {
            return column.generatedWidth < column.contentWidth;
          });
          salvagedSpace = 0;

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
    key: 'viewWidth',
    set: function set(val) {
      _viewWidth.set(this, val);
    }
  }]);

  return Columns;
})(Array);

var _padding = new WeakMap();

var Column = (function () {
  function Column(column) {
    _classCallCheck(this, Column);

    if (t.isDefined(column.name)) this.name = column.name;

    if (t.isDefined(column.width)) this.width = column.width;
    if (t.isDefined(column.maxWidth)) this.maxWidth = column.maxWidth;
    if (t.isDefined(column.minWidth)) this.minWidth = column.minWidth;
    if (t.isDefined(column.nowrap)) this.nowrap = column.nowrap;
    if (t.isDefined(column.break)) this.break = column.break;
    if (t.isDefined(column.contentWrappable)) this.contentWrappable = column.contentWrappable;
    if (t.isDefined(column.contentWidth)) this.contentWidth = column.contentWidth;
    if (t.isDefined(column.minContentWidth)) this.minContentWidth = column.minContentWidth;
    this.padding = column.padding || { left: ' ', right: ' ' };
    this.generatedWidth = null;
  }

  _createClass(Column, [{
    key: 'isResizable',
    value: function isResizable() {
      return !this.isFixed();
    }
  }, {
    key: 'isFixed',
    value: function isFixed() {
      return t.isDefined(this.width) || this.nowrap || !this.contentWrappable;
    }
  }, {
    key: 'generateWidth',
    value: function generateWidth() {
      this.generatedWidth = this.width || this.contentWidth + this.padding.length();
    }
  }, {
    key: 'generateMinWidth',
    value: function generateMinWidth() {
      this.minWidth = this.minContentWidth + this.padding.length();
    }
  }, {
    key: 'padding',
    set: function set(padding) {
      _padding.set(this, new Padding(padding));
    },
    get: function get() {
      return _padding.get(this);
    }
  }, {
    key: 'wrappedContentWidth',
    get: function get() {
      return Math.max(this.generatedWidth - this.padding.length(), 0);
    }
  }]);

  return Column;
})();

module.exports = Columns;