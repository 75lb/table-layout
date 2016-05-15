'use strict'
var test = require('tape')
var Rows = require('../es5/rows')

test('removeEmptyColumns', function (t) {
  var input = [
    { name: 'Lloyd', 'age': '' },
    { name: 'Roger', 'age': ' ' },
    { name: 'Amir' },
    { name: 'Frank' },
    { name: 'Amy' }
  ]
  t.deepEqual(
    Rows.removeEmptyColumns(input),
    [
      { name: 'Lloyd' },
      { name: 'Roger' },
      { name: 'Amir' },
      { name: 'Frank' },
      { name: 'Amy' }
    ]
  )
  t.end()
})
