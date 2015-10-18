'use strict'
var test = require('tape')
var columnLayout = require('../')

test('columnLayout(data, options)', function (t) {
  var data = [
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]

  t.strictEqual(
    columnLayout(data, { viewWidth: 40 }),
    ' row 1 column one    r1 c2              \n .. .. ..                               \n r2 c1               row two column 2   \n'
  )

  t.end()
})

test('columnLayout.lines(data, options)', function (t) {
  var data = [
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]

  t.deepEqual(
    columnLayout.lines(data, { viewWidth: 40 }),
    [
      ' row 1 column one    r1 c2              ',
      ' .. .. ..                               ',
      ' r2 c1               row two column 2   '
    ]
  )

  t.end()
})
