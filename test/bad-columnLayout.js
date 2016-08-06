'use strict'
var test = require('test-runner')
var tableLayout = require('../')
var a = require('core-assert')

test('table.lines(): no data', function () {
  a.deepEqual(tableLayout.lines([]), [])
  a.deepEqual(tableLayout.lines(), [])
})
