'use strict'
var test = require('tape')
var columnLayout = require('../')
var Rows = require('../lib/rows')

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
