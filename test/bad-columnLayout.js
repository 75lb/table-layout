'use strict'
var test = require('tape')
var tableLayout = require('../')

test('table.lines(): no data', function (t) {
  t.deepEqual(tableLayout.lines([]), [])
  t.deepEqual(tableLayout.lines(), [])
  t.end()
})
