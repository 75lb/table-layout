'use strict'
var TestRunner = require('test-runner')
var tableLayout = require('../')
var a = require('core-assert')

var runner = new TestRunner()

runner.test('table.lines(): no data', function () {
  a.deepEqual(tableLayout.lines([]), [])
  a.deepEqual(tableLayout.lines(), [])
})
