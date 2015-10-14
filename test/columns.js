'use strict'
var test = require('tape')
var Columns = require('../lib/columns')

test('new Columns(columns)', function (t) {
  var data = [
    { name: 'one', width: 6 }
  ]
  var columns = new Columns(data)

  t.deepEqual(columns, columns)
  t.end()
})

test('columns.autoSize(contentColumns, viewWidth)', function (t) {
  var columns = new Columns([
    { name: 'one', contentWidth: 10, contentWrappable: true },
    { name: 'two', contentWidth: 20, contentWrappable: true }
  ])

  columns.autoSize(30)
  t.deepEqual(columns, [
    { name: 'one', contentWidth: 10, contentWrappable: true, generatedWidth: 10 },
    { name: 'two', contentWidth: 20, contentWrappable: true, generatedWidth: 20 }
  ])

  columns.autoSize(20)
  t.deepEqual(columns, [
    { name: 'one', contentWidth: 10, contentWrappable: true, generatedWidth: 10 },
    { name: 'two', contentWidth: 20, contentWrappable: true, generatedWidth: 10 }
  ])
  t.deepEqual(columns, [
    { name: 'one', contentWidth: 10, contentWrappable: true, generatedWidth: 5, width: 5 },
    { name: 'two', contentWidth: 20, contentWrappable: true, generatedWidth: 15 }
  ])
  t.deepEqual(columns, [
    { name: 'one', contentWidth: 12, contentWrappable: false, generatedWidth: 12 },
    { name: 'two', contentWidth: 20, contentWrappable: true, generatedWidth: 8 }
  ])
  t.deepEqual(columns, [
    { name: 'one', contentWidth: 12, contentWrappable: true, generatedWidth: 12, nowrap: true },
    { name: 'two', contentWidth: 20, contentWrappable: true, generatedWidth: 8 }
  ])

  t.end()
})

test.skip('columns.fromRows(rows) 5, with viewWidth', function (t) {
  var columns = new Columns({ viewWidth: 50 })

  columns.fromRows(fixture.rows5)
  t.deepEqual(columns, [
    { name: 'one', width: 5 },
    { name: 'two', width: 5 },
    { name: 'three', width: 40 }
  ])
  t.end()
})

test.skip('columns.fromRows(rows), with viewWidth, 2 wrappable columns', function (t) {
  var columns = new Columns({ viewWidth: 10 })

  var rows = [
    {
      one: "one four seven",
      two: "four seven eleven"
    }
  ]
  columns.fromRows(rows)
  t.deepEqual(columns, [
    { name: 'one', width: 5 },
    { name: 'two', width: 5 }
  ])
  t.end()
})

test.skip('columns.fromRows(rows), with viewWidth, 1 wrappable columns', function (t) {
  var columns = new Columns({ viewWidth: 20 })

  var rows = [
    {
      one: "one four seven eight",
      two: ".............."
    }
  ]
  columns.fromRows(rows)
  t.deepEqual(columns, [
    { name: 'one', width: 6 },
    { name: 'two', width: 14 }
  ])
  t.end()
})
