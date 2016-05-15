'use strict'
var test = require('tape')
var Columns = require('../es5/columns')

test('columns.autoSize(contentColumns, maxWidth)', function (t) {
  var columns = new Columns([
    { name: 'one', contentWidth: 10, contentWrappable: true },
    { name: 'two', contentWidth: 20, contentWrappable: true }
  ])

  columns.maxWidth = 30
  columns.autoSize()
  t.strictEqual(columns.list[0].generatedWidth, 12)
  t.strictEqual(columns.list[1].generatedWidth, 18)

  t.end()
})
