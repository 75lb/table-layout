'use strict'
const TestRunner = require('test-runner')
const tableLayout = require('../../')
const a = require('core-assert')

const runner = new TestRunner()

runner.test('table.lines(): no data', function () {
  a.deepEqual(tableLayout.lines([]), [])
  a.deepEqual(tableLayout.lines(), [])
})
