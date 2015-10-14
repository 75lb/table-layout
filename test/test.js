'use strict'
var test = require('tape')
var columnLayout = require('../')
var Table = require('../lib/table')
var Rows = require('../lib/rows')
var Columns = require('../lib/columns')

var fixture = {
  rows: [
    { one: 'r1c1 r1c1 r1c1 r1c1', two: 'r1c2' },
    { one: 'r2c1 r2c1 r2c1 r2c1', two: 'r2c2' }
  ],
  rows2: [
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ],
  rows5: [
    {
      one: '.....',
      two: 'blah blah blah blah blah blah blah blah blah blah',
      three: '........................................'
    }
  ],
  columns: [
    { name: 'one', width: 6 }
  ]
}

test('Table summary', t => {
  var data = [
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  var table = new Table(data, {
    padding: { left: '<', right: '>' }
  })
  t.strictEqual(table.rows.length, 2)
  t.strictEqual(table.columns.length, 2)

  t.deepEqual(table.getWrapped(), [
    [ ['row 1 column one .. .. ..'], ['r1 c2'] ],
    [ ['r2 c1'], ['row two column 2'] ]
  ])

  t.deepEqual(table.getLines(), [
    [ 'row 1 column one .. .. ..', 'r1 c2' ],
    [ 'r2 c1', 'row two column 2' ]
  ])

  table.columns.get('one').width = 10

  t.deepEqual(table.getWrapped(), [
    [ [ 'row 1', 'column', 'one ..', '.. ..' ], [ 'r1 c2' ] ],
    [ [ 'r2 c1' ], [ 'row two column 2' ] ]
  ], 'table.getWrapped()')

  t.deepEqual(table.getLines(), [
    [ 'row 1', 'r1 c2' ],
    [ 'column', null ],
    [ 'one ..', null ],
    [ '.. ..', null ],
    [ 'r2 c1', 'row two column 2' ]
  ], 'table.getLines()')

  t.deepEqual(table.renderLines(), [
    '<row 1   ><r1c2            >',
    '<column  ><                >',
    '<one ..  ><                >',
    '<.. ..   ><                >',
    '<r2 c1   ><row two column 2>'
  ], 'table.renderLines()')

  t.end()

})

test('contentColumns', function(t){
  var data = [
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  var rows = new Rows(data)
  t.deepEqual(rows.getColumns(), [
    { name: 'one', contentWidth: 25 },
    { name: 'two', contentWidth: 16 }
  ])
  t.end()
})

test.skip('new Table(rows) sets default columns', function (t) {
  var data = [
    { one: 'r1c1 r1c1 r1c1 r1c1', two: 'r1c2' },
    { one: 'r2c1 r2c1 r2c1 r2c1', two: 'r2c2' }
  ]
  var table = new Table(data)
  t.strictEqual(table.rows.length, 2)
  t.strictEqual(table.columns.length, 2)

  t.deepEqual(table.columns, [
    { name: 'one', width: 30 },
    { name: 'two', width: 30 }
  ])

  t.deepEqual(table.rows, data)
  t.end()
})

test.skip("new Rows(rows, columns)", function(t){
  var data = [ { one: 1 }, { one: 1 } ]
  var rows = new Rows(data)
  t.strictEqual(rows.length, 2)
  t.deepEqual(rows, data)
})

test("rows.wrapped()", function(t){
  var data = [
    { one: 'r1c1 r1c1 r1c1 r1c1', two: 'r1c2' },
    { one: 'r2c1 r2c1 r2c1 r2c1', two: 'r2c2' }
  ]
  var rows = new Rows(data, [ { name: 'one', width: 4 } ])

  t.deepEqual(rows, data)
  t.deepEqual(rows.wrapped(), [
    [ [ 'r1c1', 'r1c1', 'r1c1', 'r1c1' ], [ 'r1c2' ] ],
    [ [ 'r2c1', 'r2c1', 'r2c1', 'r2c1' ], [ 'r2c2' ] ]
  ])

  t.end()
})

test("rows.getLines()", function(t){
  var data = [
    { one: 'r1c1 r1c1 r1c1 r1c1', two: 'r1c2' },
    { one: 'r2c1 r2c1 r2c1 r2c1', two: 'r2c2' }
  ]
  var columns = new Columns(data, [ { name: 'one', width: 4 }])
  var rows = new Rows(data, columns)

  t.deepEqual(rows, data)
  t.deepEqual(rows.getLines(), [
    [ 'r1c1', 'r1c2' ],
    [ 'r1c1', '    ' ],
    [ 'r1c1', '    ' ],
    [ 'r1c1', '    ' ],
    [ 'r2c1', 'r2c2' ],
    [ 'r2c1', '    ' ],
    [ 'r2c1', '    ' ],
    [ 'r2c1', '    ' ]
  ])

  t.end()
})

test("rows.render(), no padding", function(t){
  var columns = new Columns(fixture.rows, [ { name: 'one', width: 4 }])
  var rows = new Rows(fixture.rows, columns)

  t.deepEqual(rows, fixture.rows)
  t.deepEqual(rows.render(), [
    [ 'r1c1r1c2' ],
    [ 'r1c1    ' ],
    [ 'r1c1    ' ],
    [ 'r1c1    ' ],
    [ 'r2c1r2c2' ],
    [ 'r2c1    ' ],
    [ 'r2c1    ' ],
    [ 'r2c1    ' ]
  ])

  t.end()
})

test("rows.render(), with padding", function(t){
  var columns = new Columns(fixture.rows, [
    { name: 'one', width: 4, padding: { left: '| ', right: ' |' } },
    { name: 'two', padding: { left: ' ', right: ' |' } }
  ])
  var rows = new Rows(fixture.rows, columns)

  t.deepEqual(rows.render(), [
    [ '| r1c1 | r1c2 |' ],
    [ '| r1c1 |      |' ],
    [ '| r1c1 |      |' ],
    [ '| r1c1 |      |' ],
    [ '| r2c1 | r2c2 |' ],
    [ '| r2c1 |      |' ],
    [ '| r2c1 |      |' ],
    [ '| r2c1 |      |' ]
  ])

  t.end()
})

test("rows.render(), with padding and width", function(t){
  var columns = new Columns(fixture.rows, [
    { name: 'one', width: 8, padding: { left: '| ', right: ' |' } },
    { name: 'two', width: 10, padding: { left: ' ', right: ' |' } }
  ])
  var rows = new Rows(fixture.rows, columns)

  t.deepEqual(rows.render(), [
    [ '| r1c1 | r1c2   |' ],
    [ '| r1c1 |        |' ],
    [ '| r1c1 |        |' ],
    [ '| r1c1 |        |' ],
    [ '| r2c1 | r2c2   |' ],
    [ '| r2c1 |        |' ],
    [ '| r2c1 |        |' ],
    [ '| r2c1 |        |' ]
  ])

  t.end()
})

test("rows.wrapped() 2", function(t){
  var columns = new Columns([ { name: 'one', width: 6 }], fixture.rows2)
  var rows = new Rows(fixture.rows, columns)

  t.deepEqual(rows.wrapped(), [
    [ [ 'row 1','column', 'one ..', '.. ..' ], [ 'r1c2' ] ],
    [ [ 'r2 c1' ], [ 'row two column 2' ] ]
  ])

  t.end()
})

test("rows.getLines() 2", function(t){
  var columns = new Columns([ { name: 'one', width: 4 }], fixture.rows)
  var rows = new Rows(fixture.rows, columns)

  t.deepEqual(rows.getLines(), [
    [ 'row 1 ', 'r1c2            ' ],
    [ 'column', '                ' ],
    [ 'one ..', '                ' ],
    [ '.. .. ', '                ' ],
    [ 'r2 c1 ', 'row two column 2' ]
  ])

  t.end()
})

test('new Columns(columns)', function (t) {
  var columns = new Columns(fixture.columns)

  t.deepEqual(columns, fixture.columns)
  t.end()
})

test('columns.fromRows(rows)', function (t) {
  var columns = new Columns(fixture.columns)
  t.deepEqual(columns, fixture.columns)

  columns.fromRows(fixture.rows)
  t.deepEqual(columns, [
    { name: 'one', width: 6 },
    { name: 'two', width: 4 }
  ])
  t.end()
})

test('columns.fromRows(rows) 5', function (t) {
  var columns = new Columns()

  columns.fromRows(fixture.rows5)
  t.deepEqual(columns, [
    { name: 'one', width: 5 },
    { name: 'two', width: 49 },
    { name: 'three', width: 40 }
  ])
  t.end()
})

test('columns.fromRows(rows) 5, with viewWidth', function (t) {
  var columns = new Columns({ viewWidth: 50 })

  columns.fromRows(fixture.rows5)
  t.deepEqual(columns, [
    { name: 'one', width: 5 },
    { name: 'two', width: 5 },
    { name: 'three', width: 40 }
  ])
  t.end()
})

test('columns.fromRows(rows), with viewWidth, 2 wrappable columns', function (t) {
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

test('columns.fromRows(rows), with viewWidth, 1 wrappable columns', function (t) {
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

test.skip('cell.getWidth()', function(t){
  var cell = new Cell('one one one')
  t.strictEqual(cell.getWidth(), 11)
  t.end()
})

test.skip('cell.wrap()', function(t){
  var options = {
    width: 3
  }
  var cell = new Cell('one one one', options)
  t.deepEqual(cell.wrap(), [
    'one', 'one', 'one'
  ])
  t.end()
})
