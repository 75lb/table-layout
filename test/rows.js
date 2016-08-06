'use strict'
var test = require('test-runner')
var Rows = require('../es5/rows')
var a = require('core-assert')

test('removeEmptyColumns', function () {
  var input = [
    { name: 'Lloyd', 'age': '' },
    { name: 'Roger', 'age': ' ' },
    { name: 'Amir' },
    { name: 'Frank' },
    { name: 'Amy' }
  ]
  a.deepEqual(
    Rows.removeEmptyColumns(input),
    [
      { name: 'Lloyd' },
      { name: 'Roger' },
      { name: 'Amir' },
      { name: 'Frank' },
      { name: 'Amy' }
    ]
  )
})
