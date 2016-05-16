'use strict'
var test = require('tape')
var Table = require('../').Table
var os = require('os')

test('new Table()', function (t) {
  var fixture = require('./fixture/simple-maxWidth')
  var table = new Table(fixture.data, fixture.options)

  t.strictEqual(table.rows.list.length, 2)
  t.strictEqual(table.columns.list.length, 2)
  t.end()
})

test('table.getWrapped()', function (t) {
  var fixture = require('./fixture/simple-maxWidth')
  var table = new Table(fixture.data, fixture.options)

  t.deepEqual(table.getWrapped(), [
    [ ['row 1 column one ..', '.. ..'], ['r1 c2'] ],
    [ ['r2 c1'], ['row two column 2'] ]
  ])
  t.end()
})

test('table.getLines()', function (t) {
  var fixture = require('./fixture/simple-maxWidth')
  var table = new Table(fixture.data, fixture.options)

  t.deepEqual(table.getLines(), [
    [ 'row 1 column one ..', 'r1 c2' ],
    [ '.. ..', '' ],
    [ 'r2 c1', 'row two column 2' ]
  ])
  t.end()
})

test('table.renderLines()', function (t) {
  var fixture = require('./fixture/simple-maxWidth')
  var table = new Table(fixture.data, fixture.options)

  t.deepEqual(table.renderLines(), [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ])
  t.end()
})

test('table.toString()', function (t) {
  var fixture = require('./fixture/simple-maxWidth')
  var result = [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ].join(os.EOL) + os.EOL

  var table = new Table(fixture.data, fixture.options)
  t.strictEqual(table.toString(), result)
  t.end()
})

test('table.renderLines()', function (t) {
  var fixture = require('./fixture/simple-maxWidth')
  var result = [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ]

  var table = new Table(fixture.data, fixture.options)
  t.deepEqual(table.renderLines(), result)
  t.end()
})

test('table.renderLines() 2', function (t) {
  var fixture = require('./fixture/primatives')
  var result = [
    '<row 1 column one .. .. ..><3000>',
    '<true                     ><null>',
    '<[object Object]          ><    >'
  ]

  var table = new Table(fixture.data, fixture.options)
  t.deepEqual(table.renderLines(), result)
  t.end()
})
