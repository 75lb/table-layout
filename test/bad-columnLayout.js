'use strict'
var test = require('tape')
var Table = require('../')

test('table.renderLines(): no data', function (t) {
  t.deepEqual(new Table([]).renderLines(), [])
  t.deepEqual(new Table().renderLines(), [])
  t.end()
})
