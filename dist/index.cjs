'use strict';

/**
 * Takes any input and guarantees an array back.
 *
 * - Converts array-like objects (e.g. `arguments`, `Set`) to a real array.
 * - Converts `undefined` to an empty array.
 * - Converts any another other, singular value (including `null`, objects and iterables other than `Set`) into an array containing that value.
 * - Ignores input which is already an array.
 *
 * @module array-back
 * @example
 * > const arrayify = require('array-back')
 *
 * > arrayify(undefined)
 * []
 *
 * > arrayify(null)
 * [ null ]
 *
 * > arrayify(0)
 * [ 0 ]
 *
 * > arrayify([ 1, 2 ])
 * [ 1, 2 ]
 *
 * > arrayify(new Set([ 1, 2 ]))
 * [ 1, 2 ]
 *
 * > function f(){ return arrayify(arguments); }
 * > f(1,2,3)
 * [ 1, 2, 3 ]
 */

function isObject$2 (input) {
  return typeof input === 'object' && input !== null
}

function isArrayLike$2 (input) {
  return isObject$2(input) && typeof input.length === 'number'
}

/**
 * @param {*} - The input value to convert to an array
 * @returns {Array}
 * @alias module:array-back
 */
function arrayify (input) {
  if (Array.isArray(input)) {
    return input
  } else if (input === undefined) {
    return []
  } else if (isArrayLike$2(input) || input instanceof Set) {
    return Array.from(input)
  } else {
    return [input]
  }
}

const _value = new WeakMap();
const _column = new WeakMap();

class Cell {
  constructor (value, column) {
    this.value = value;
    _column.set(this, column);
  }

  set value (val) {
    _value.set(this, val);
  }

  get value () {
    let cellValue = _value.get(this);
    if (typeof cellValue === 'function') cellValue = cellValue.call(_column.get(this));
    if (cellValue === undefined) {
      cellValue = '';
    } else {
      cellValue = String(cellValue);
    }
    return cellValue
  }
}

/**
 * Isomorphic, functional type-checking for Javascript.
 * @module typical
 * @typicalname t
 * @example
 * const t = require('typical')
 * const allDefined = array.every(t.isDefined)
 */

/**
 * Returns true if input is a number (including infinity). It is a more reasonable alternative to `typeof n` which returns `number` for `NaN`.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isNumber(0)
 * true
 * > t.isNumber(1)
 * true
 * > t.isNumber(1.1)
 * true
 * > t.isNumber(0xff)
 * true
 * > t.isNumber(0644)
 * true
 * > t.isNumber(6.2e5)
 * true
 * > t.isNumber(NaN)
 * false
 * > t.isNumber(Infinity)
 * true
 */
function isNumber$1 (n) {
  return !isNaN(parseFloat(n))
}

/**
 * Returns true if input is a finite number. Identical to `isNumber` beside excluding infinity.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isFiniteNumber(0)
 * true
 * > t.isFiniteNumber(1)
 * true
 * > t.isFiniteNumber(1.1)
 * true
 * > t.isFiniteNumber(0xff)
 * true
 * > t.isFiniteNumber(0644)
 * true
 * > t.isFiniteNumber(6.2e5)
 * true
 * > t.isFiniteNumber(NaN)
 * false
 * > t.isFiniteNumber(Infinity)
 * false
 */
function isFiniteNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/**
 * A plain object is a simple object literal, it is not an instance of a class. Returns true if the input `typeof` is `object` and directly decends from `Object`.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isPlainObject({ something: 'one' })
 * true
 * > t.isPlainObject(new Date())
 * false
 * > t.isPlainObject([ 0, 1 ])
 * false
 * > t.isPlainObject(/test/)
 * false
 * > t.isPlainObject(1)
 * false
 * > t.isPlainObject('one')
 * false
 * > t.isPlainObject(null)
 * false
 * > t.isPlainObject((function * () {})())
 * false
 * > t.isPlainObject(function * () {})
 * false
 */
function isPlainObject$1 (input) {
  return input !== null && typeof input === 'object' && input.constructor === Object
}

/**
 * An array-like value has all the properties of an array yet is not an array instance. An example is the `arguments` object. Returns `true`` if the input value is an object, not `null`` and has a `length` property set with a numeric value.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * function sum(x, y){
 *   console.log(t.isArrayLike(arguments))
 *   // prints `true`
 * }
 */
function isArrayLike$1 (input) {
  return isObject$1(input) && typeof input.length === 'number'
}

/**
 * Returns true if the typeof input is `'object'` but not null.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isObject$1 (input) {
  return typeof input === 'object' && input !== null
}

/**
 * Returns true if the input value is defined.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isDefined$1 (input) {
  return typeof input !== 'undefined'
}

/**
 * Returns true if the input value is undefined.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isUndefined$1 (input) {
  return !isDefined$1(input)
}

/**
 * Returns true if the input value is null.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isNull$1 (input) {
 return input === null
}

/**
 * Returns true if the input value is not one of `undefined`, `null`, or `NaN`.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isDefinedValue$1 (input) {
 return isDefined$1(input) && !isNull$1(input) && !Number.isNaN(input)
}

/**
 * Returns true if the input value is an ES2015 `class`.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isClass$1 (input) {
  if (typeof input === 'function') {
    return /^class /.test(Function.prototype.toString.call(input))
  } else {
    return false
  }
}

/**
 * Returns true if the input is a string, number, symbol, boolean, null or undefined value.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPrimitive$1 (input) {
  if (input === null) return true
  switch (typeof input) {
    case 'string':
    case 'number':
    case 'symbol':
    case 'undefined':
    case 'boolean':
      return true
    default:
      return false
  }
}

/**
 * Returns true if the input is a Promise.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPromise$1 (input) {
  if (input) {
    const isPromise = isDefined$1(Promise) && input instanceof Promise;
    const isThenable = input.then && typeof input.then === 'function';
    return !!(isPromise || isThenable)
  } else {
    return false
  }
}

/**
 * Returns true if the input is an iterable (`Map`, `Set`, `Array`, Generator etc.).
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isIterable('string')
 * true
 * > t.isIterable(new Map())
 * true
 * > t.isIterable([])
 * true
 * > t.isIterable((function * () {})())
 * true
 * > t.isIterable(Promise.resolve())
 * false
 * > t.isIterable(Promise)
 * false
 * > t.isIterable(true)
 * false
 * > t.isIterable({})
 * false
 * > t.isIterable(0)
 * false
 * > t.isIterable(1.1)
 * false
 * > t.isIterable(NaN)
 * false
 * > t.isIterable(Infinity)
 * false
 * > t.isIterable(function () {})
 * false
 * > t.isIterable(Date)
 * false
 * > t.isIterable()
 * false
 * > t.isIterable({ then: function () {} })
 * false
 */
function isIterable$1 (input) {
  if (input === null || !isDefined$1(input)) {
    return false
  } else {
    return (
      typeof input[Symbol.iterator] === 'function' ||
      typeof input[Symbol.asyncIterator] === 'function'
    )
  }
}

/**
 * Returns true if the input value is a string. The equivalent of `typeof input === 'string'` for use in funcitonal contexts.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isString$1 (input) {
  return typeof input === 'string'
}

/**
 * Returns true if the input value is a function. The equivalent of `typeof input === 'function'` for use in funcitonal contexts.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isFunction$1 (input) {
  return typeof input === 'function'
}

var t$1 = {
  isNumber: isNumber$1,
  isFiniteNumber,
  isPlainObject: isPlainObject$1,
  isArrayLike: isArrayLike$1,
  isObject: isObject$1,
  isDefined: isDefined$1,
  isUndefined: isUndefined$1,
  isNull: isNull$1,
  isDefinedValue: isDefinedValue$1,
  isClass: isClass$1,
  isPrimitive: isPrimitive$1,
  isPromise: isPromise$1,
  isIterable: isIterable$1,
  isString: isString$1,
  isFunction: isFunction$1
};

/**
 *
 */
class Rows {
  constructor (rows, columns) {
    this.list = [];
    this.load(rows, columns);
  }

  load (rows, columns) {
    arrayify(rows).forEach(row => {
      this.list.push(new Map(objectToIterable(row, columns)));
    });
  }

  static removeEmptyColumns (data) {
    const distinctColumnNames = data.reduce((columnNames, row) => {
      Object.keys(row).forEach(key => {
        if (columnNames.indexOf(key) === -1) columnNames.push(key);
      });
      return columnNames
    }, []);

    const emptyColumns = distinctColumnNames.filter(columnName => {
      const hasValue = data.some(row => {
        const value = row[columnName];
        return (t$1.isDefined(value) && typeof value !== 'string') || (typeof value === 'string' && /\S+/.test(value))
      });
      return !hasValue
    });

    return data.map(row => {
      emptyColumns.forEach(emptyCol => delete row[emptyCol]);
      return row
    })
  }
}

function objectToIterable (row, columns) {
  return columns.list.map(column => {
    return [column, new Cell(row[column.name], column)]
  })
}

/**
 * @module padding
 */

class Padding {
  constructor (padding) {
    this.left = padding.left;
    this.right = padding.right;
  }

  length () {
    return this.left.length + this.right.length
  }
}

/**
 * @module column
 */

const _padding = new WeakMap();

// setting any column property which is a factor of the width should trigger autoSize()

/**
 * Represents a table column
 */
class Column {
  constructor (column) {
    /**
     * @type {string}
     */
    if (t$1.isDefined(column.name)) this.name = column.name;
    /**
     * @type {number}
     */
    if (t$1.isDefined(column.width)) this.width = column.width;
    if (t$1.isDefined(column.maxWidth)) this.maxWidth = column.maxWidth;
    if (t$1.isDefined(column.minWidth)) this.minWidth = column.minWidth;
    if (t$1.isDefined(column.noWrap)) this.noWrap = column.noWrap;
    if (t$1.isDefined(column.break)) this.break = column.break;
    if (t$1.isDefined(column.contentWrappable)) this.contentWrappable = column.contentWrappable;
    if (t$1.isDefined(column.contentWidth)) this.contentWidth = column.contentWidth;
    if (t$1.isDefined(column.minContentWidth)) this.minContentWidth = column.minContentWidth;
    this.padding = column.padding || { left: ' ', right: ' ' };
    this.generatedWidth = null;
  }

  set padding (padding) {
    _padding.set(this, new Padding(padding));
  }

  get padding () {
    return _padding.get(this)
  }

  /**
   * the width of the content (excluding padding) after being wrapped
   */
  get wrappedContentWidth () {
    return Math.max(this.generatedWidth - this.padding.length(), 0)
  }

  isResizable () {
    return !this.isFixed()
  }

  isFixed () {
    return t$1.isDefined(this.width) || this.noWrap || !this.contentWrappable
  }

  generateWidth () {
    this.generatedWidth = this.width || (this.contentWidth + this.padding.length());
  }

  generateMinWidth () {
    this.minWidth = this.minContentWidth + this.padding.length();
  }
}

/**
 * Isomorphic, functional type-checking for Javascript.
 * @module typical
 * @typicalname t
 * @example
 * const t = require('typical')
 * const allDefined = array.every(t.isDefined)
 */

/**
 * Returns true if input is a number. It is a more reasonable alternative to `typeof n` which returns `number` for `NaN` and `Infinity`.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isNumber(0)
 * true
 * > t.isNumber(1)
 * true
 * > t.isNumber(1.1)
 * true
 * > t.isNumber(0xff)
 * true
 * > t.isNumber(0644)
 * true
 * > t.isNumber(6.2e5)
 * true
 * > t.isNumber(NaN)
 * false
 * > t.isNumber(Infinity)
 * false
 */
function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/**
 * A plain object is a simple object literal, it is not an instance of a class. Returns true if the input `typeof` is `object` and directly decends from `Object`.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isPlainObject({ something: 'one' })
 * true
 * > t.isPlainObject(new Date())
 * false
 * > t.isPlainObject([ 0, 1 ])
 * false
 * > t.isPlainObject(/test/)
 * false
 * > t.isPlainObject(1)
 * false
 * > t.isPlainObject('one')
 * false
 * > t.isPlainObject(null)
 * false
 * > t.isPlainObject((function * () {})())
 * false
 * > t.isPlainObject(function * () {})
 * false
 */
function isPlainObject (input) {
  return input !== null && typeof input === 'object' && input.constructor === Object
}

/**
 * An array-like value has all the properties of an array yet is not an array instance. An example is the `arguments` object. Returns `true`` if the input value is an object, not `null`` and has a `length` property set with a numeric value.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * function sum(x, y){
 *   console.log(t.isArrayLike(arguments))
 *   // prints `true`
 * }
 */
function isArrayLike (input) {
  return isObject(input) && typeof input.length === 'number'
}

/**
 * Returns true if the typeof input is `'object'` but not null.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isObject (input) {
  return typeof input === 'object' && input !== null
}

/**
 * Returns true if the input value is defined.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isDefined (input) {
  return typeof input !== 'undefined'
}

/**
 * Returns true if the input value is undefined.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isUndefined (input) {
  return !isDefined(input)
}

/**
 * Returns true if the input value is null.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isNull (input) {
 return input === null
}

/**
 * Returns true if the input value is not one of `undefined`, `null`, or `NaN`.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isDefinedValue (input) {
 return isDefined(input) && !isNull(input) && !Number.isNaN(input)
}

/**
 * Returns true if the input value is an ES2015 `class`.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isClass (input) {
  if (typeof input === 'function') {
    return /^class /.test(Function.prototype.toString.call(input))
  } else {
    return false
  }
}

/**
 * Returns true if the input is a string, number, symbol, boolean, null or undefined value.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPrimitive (input) {
  if (input === null) return true
  switch (typeof input) {
    case 'string':
    case 'number':
    case 'symbol':
    case 'undefined':
    case 'boolean':
      return true
    default:
      return false
  }
}

/**
 * Returns true if the input is a Promise.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPromise (input) {
  if (input) {
    const isPromise = isDefined(Promise) && input instanceof Promise;
    const isThenable = input.then && typeof input.then === 'function';
    return !!(isPromise || isThenable)
  } else {
    return false
  }
}

/**
 * Returns true if the input is an iterable (`Map`, `Set`, `Array`, Generator etc.).
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isIterable('string')
 * true
 * > t.isIterable(new Map())
 * true
 * > t.isIterable([])
 * true
 * > t.isIterable((function * () {})())
 * true
 * > t.isIterable(Promise.resolve())
 * false
 * > t.isIterable(Promise)
 * false
 * > t.isIterable(true)
 * false
 * > t.isIterable({})
 * false
 * > t.isIterable(0)
 * false
 * > t.isIterable(1.1)
 * false
 * > t.isIterable(NaN)
 * false
 * > t.isIterable(Infinity)
 * false
 * > t.isIterable(function () {})
 * false
 * > t.isIterable(Date)
 * false
 * > t.isIterable()
 * false
 * > t.isIterable({ then: function () {} })
 * false
 */
function isIterable (input) {
  if (input === null || !isDefined(input)) {
    return false
  } else {
    return (
      typeof input[Symbol.iterator] === 'function' ||
      typeof input[Symbol.asyncIterator] === 'function'
    )
  }
}

/**
 * Returns true if the input value is a string. The equivalent of `typeof input === 'string'` for use in funcitonal contexts.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isString (input) {
  return typeof input === 'string'
}

/**
 * Returns true if the input value is a function. The equivalent of `typeof input === 'function'` for use in funcitonal contexts.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isFunction (input) {
  return typeof input === 'function'
}

var t = {
  isNumber,
  isPlainObject,
  isArrayLike,
  isObject,
  isDefined,
  isUndefined,
  isNull,
  isDefinedValue,
  isClass,
  isPrimitive,
  isPromise,
  isIterable,
  isString,
  isFunction
};

/**
 * Isomorphic map-reduce function to flatten an array into the supplied array.
 *
 * @module reduce-flatten
 * @example
 * const flatten = require('reduce-flatten')
 */

/**
 * @alias module:reduce-flatten
 * @example
 * > numbers = [ 1, 2, [ 3, 4 ], 5 ]
 * > numbers.reduce(flatten, [])
 * [ 1, 2, 3, 4, 5 ]
 */
function flatten (arr, curr) {
  if (Array.isArray(curr)) {
    arr.push(...curr);
  } else {
    arr.push(curr);
  }
  return arr
}

/**
 * @module wordwrapjs
 */

const re = {
  chunk: /[^\s-]+?-\b|\S+|\s+|\r\n?|\n/g,
  ansiEscapeSequence: /\u001b.*?m/g
};

/**
 * @alias module:wordwrapjs
 * @typicalname wordwrap
 */
class WordWrap {
  constructor (text, options = {}) {
    if (!t.isDefined(text)) text = '';

    this._lines = String(text).split(/\r\n|\n/g);
    this.options = Object.assign({
        eol: '\n',
        width: 30
    }, options);
  }

  lines () {
    /* trim each line of the supplied text */
    return this._lines.map(trimLine.bind(this))

      /* split each line into an array of chunks, else mark it empty */
      .map(line => line.match(re.chunk) || [ '~~empty~~' ])

      /* optionally, break each word on the line into pieces */
      .map(lineWords => {
        if (this.options.break) {
          return lineWords.map(breakWord.bind(this))
        } else {
          return lineWords
        }
      })
      .map(lineWords => lineWords.reduce(flatten, []))

      /* transforming the line of words to one or more new lines wrapped to size */
      .map(lineWords => {
        return lineWords
          .reduce((lines, word) => {
            let currentLine = lines[lines.length - 1];
            if (replaceAnsi(word).length + replaceAnsi(currentLine).length > this.options.width) {
              lines.push(word);
            } else {
              lines[lines.length - 1] += word;
            }
            return lines
          }, [ '' ])
      })
      .reduce(flatten, [])

      /* trim the wrapped lines */
      .map(trimLine.bind(this))

      /* filter out empty lines */
      .filter(line => line.trim())

      /* restore the user's original empty lines */
      .map(line => line.replace('~~empty~~', ''))
  }

  wrap () {
    return this.lines().join(this.options.eol)
  }

  toString () {
    return this.wrap()
  }

  /**
   * @param {string} - the input text to wrap
   * @param [options] {object} - optional configuration
   * @param [options.width] {number} - the max column width in characters (defaults to 30).
   * @param [options.break] {boolean} - if true, words exceeding the specified `width` will be forcefully broken
   * @param [options.noTrim] {boolean} - By default, each line output is trimmed. If `noTrim` is set, no line-trimming occurs - all whitespace from the input text is left in.
   * @param [options.eol] {string} - The end of line character to use. Defaults to `\n`.
   * @return {string}
   */
  static wrap (text, options) {
    const block = new this(text, options);
    return block.wrap()
  }

  /**
   * Wraps the input text, returning an array of strings (lines).
   * @param {string} - input text
   * @param {object} - Accepts same options as constructor.
   */
  static lines (text, options) {
    const block = new this(text, options);
    return block.lines()
  }

  /**
   * Returns true if the input text would be wrapped if passed into `.wrap()`.
   * @param {string} - input text
   * @return {boolean}
   */
  static isWrappable (text) {
    if (t.isDefined(text)) {
      text = String(text);
      var matches = text.match(re.chunk);
      return matches ? matches.length > 1 : false
    }
  }

  /**
   * Splits the input text into an array of words and whitespace.
   * @param {string} - input text
   * @returns {string[]}
   */
  static getChunks (text) {
    return text.match(re.chunk) || []
  }
}

function trimLine (line) {
  return this.options.noTrim ? line : line.trim()
}

function replaceAnsi (string) {
  return string.replace(re.ansiEscapeSequence, '')
}

/* break a word into several pieces */
function breakWord (word) {
  if (replaceAnsi(word).length > this.options.width) {
    const letters = word.split('');
    let piece;
    const pieces = [];
    while ((piece = letters.splice(0, this.options.width)).length) {
      pieces.push(piece.join(''));
    }
    return pieces
  } else {
    return word
  }
}

/**
 * @module ansi
 */

const ansiEscapeSequence = /\u001b.*?m/g;

function remove (input) {
  return input.replace(ansiEscapeSequence, '')
}

function has (input) {
  return ansiEscapeSequence.test(input)
}

const _maxWidth = new WeakMap();

/**
 * @module columns
 */

class Columns {
  constructor (columns) {
    this.list = [];
    arrayify(columns).forEach(this.add.bind(this));
  }

  /**
   * sum of all generatedWidth fields
   * @return {number}
   */
  totalWidth () {
    return this.list.length
      ? this.list.map(col => col.generatedWidth).reduce((a, b) => a + b)
      : 0
  }

  totalFixedWidth () {
    return this.getFixed()
      .map(col => col.generatedWidth)
      .reduce((a, b) => a + b, 0)
  }

  get (columnName) {
    return this.list.find(column => column.name === columnName)
  }

  getResizable () {
    return this.list.filter(column => column.isResizable())
  }

  getFixed () {
    return this.list.filter(column => column.isFixed())
  }

  add (column) {
    const col = column instanceof Column ? column : new Column(column);
    this.list.push(col);
    return col
  }

  get maxWidth () {
    _maxWidth.get(this);
  }

  set maxWidth (val) {
    _maxWidth.set(this, val);
  }

  /**
   * sets `generatedWidth` for each column
   * @chainable
   */
  autoSize () {
    const maxWidth = _maxWidth.get(this);

    /* size */
    this.list.forEach(column => {
      column.generateWidth();
      column.generateMinWidth();
    });

    /* adjust if user set a min or maxWidth */
    this.list.forEach(column => {
      if (t$1.isDefined(column.maxWidth) && column.generatedWidth > column.maxWidth) {
        column.generatedWidth = column.maxWidth;
      }

      if (t$1.isDefined(column.minWidth) && column.generatedWidth < column.minWidth) {
        column.generatedWidth = column.minWidth;
      }
    });

    const width = {
      total: this.totalWidth(),
      view: maxWidth,
      diff: this.totalWidth() - maxWidth,
      totalFixed: this.totalFixedWidth(),
      totalResizable: Math.max(maxWidth - this.totalFixedWidth(), 0)
    };

    /* adjust if short of space */
    if (width.diff > 0) {
      /* share the available space between resizeable columns */
      const resizableColumns = this.getResizable();
      resizableColumns.forEach(column => {
        column.generatedWidth = Math.floor(width.totalResizable / resizableColumns.length);
      });

      /* at this point, the generatedWidth should never end up bigger than the contentWidth */
      const grownColumns = this.list.filter(column => column.generatedWidth > column.contentWidth);
      const shrunkenColumns = this.list.filter(column => column.generatedWidth < column.contentWidth);
      let salvagedSpace = 0;
      grownColumns.forEach(column => {
        const currentGeneratedWidth = column.generatedWidth;
        column.generateWidth();
        salvagedSpace += currentGeneratedWidth - column.generatedWidth;
      });
      shrunkenColumns.forEach(column => {
        column.generatedWidth += Math.floor(salvagedSpace / shrunkenColumns.length);
      });

    /* if, after autosizing, we still don't fit within maxWidth then give up */
    }

    return this
  }

  /**
   * Factory method returning all distinct columns from input
   * @param  {object[]} - input recordset
   * @return {module:columns}
   */
  static getColumns (rows) {
    const columns = new Columns();
    arrayify(rows).forEach(row => {
      for (const columnName in row) {
        let column = columns.get(columnName);
        if (!column) {
          column = columns.add({ name: columnName, contentWidth: 0, minContentWidth: 0 });
        }
        const cell = new Cell(row[columnName], column);
        let cellValue = cell.value;
        if (has(cellValue)) {
          cellValue = remove(cellValue);
        }

        if (cellValue.length > column.contentWidth) column.contentWidth = cellValue.length;

        const longestWord = getLongestWord(cellValue);
        if (longestWord > column.minContentWidth) {
          column.minContentWidth = longestWord;
        }
        if (!column.contentWrappable) column.contentWrappable = WordWrap.isWrappable(cellValue);
      }
    });
    return columns
  }
}

function getLongestWord (line) {
  const words = WordWrap.getChunks(line);
  return words.reduce((max, word) => {
    return Math.max(word.length, max)
  }, 0)
}

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
    };
    if (!options.padding) options.padding = defaults.padding;
    if (options.padding && t$1.isUndefined(options.padding.left)) options.padding.left = defaults.padding.left;
    if (options.padding && t$1.isUndefined(options.padding.right)) options.padding.right = defaults.padding.right;
    if (t$1.isUndefined(options.maxWidth)) options.maxWidth = defaults.maxWidth;
    if (t$1.isUndefined(options.eol)) options.eol = defaults.eol;
    options.columns = options.columns || [];
    this.options = options;
    this.load(data);
  }

  load (data) {
    const options = this.options;

    /* remove empty columns */
    if (options.ignoreEmptyColumns) {
      data = Rows.removeEmptyColumns(data);
    }

    this.columns = Columns.getColumns(data);
    this.rows = new Rows(data, this.columns);

    /* load default column properties from options */
    this.columns.maxWidth = options.maxWidth;
    this.columns.list.forEach(column => {
      if (options.padding) column.padding = options.padding;
      if (options.noWrap) column.noWrap = options.noWrap;
      if (options.break) {
        column.break = options.break;
        column.contentWrappable = true;
      }
    });

    /* load column properties from options.columns */
    options.columns.forEach(optionColumn => {
      const column = this.columns.get(optionColumn.name);
      if (column) {
        if (optionColumn.padding) {
          column.padding.left = optionColumn.padding.left;
          column.padding.right = optionColumn.padding.right;
        }
        if (optionColumn.width) column.width = optionColumn.width;
        if (optionColumn.maxWidth) column.maxWidth = optionColumn.maxWidth;
        if (optionColumn.minWidth) column.minWidth = optionColumn.minWidth;
        if (optionColumn.noWrap) column.noWrap = optionColumn.noWrap;
        if (optionColumn.break) {
          column.break = optionColumn.break;
          column.contentWrappable = true;
        }
      }
    });

    this.columns.autoSize();
    return this
  }

  getWrapped () {
    this.columns.autoSize();
    return this.rows.list.map(row => {
      const line = [];
      row.forEach((cell, column) => {
        if (column.noWrap) {
          line.push(cell.value.split(/\r\n?|\n/));
        } else {
          line.push(WordWrap.lines(cell.value, {
            width: column.wrappedContentWidth,
            break: column.break,
            noTrim: this.options.noTrim
          }));
        }
      });
      return line
    })
  }

  getLines () {
    const wrappedLines = this.getWrapped();
    const lines = [];
    wrappedLines.forEach(wrapped => {
      const mostLines = getLongestArray(wrapped);
      for (let i = 0; i < mostLines; i++) {
        const line = [];
        wrapped.forEach(cell => {
          line.push(cell[i] || '');
        });
        lines.push(line);
      }
    });
    return lines
  }

  /**
   * Identical to `.toString()` with the exception that the result will be an array of lines, rather than a single, multi-line string.
   * @returns {string[]}
   */
  renderLines () {
    const lines = this.getLines();
    return lines.map(line => {
      return line.reduce((prev, cell, index) => {
        const column = this.columns.list[index];
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
  const lengths = arrays.map(array => array.length);
  return Math.max.apply(null, lengths)
}

function padCell (cellValue, padding, width) {
  const ansiLength = cellValue.length - remove(cellValue).length;
  cellValue = cellValue || '';
  return (padding.left || '') +
  cellValue.padEnd(width - padding.length() + ansiLength) + (padding.right || '')
}

module.exports = Table;
