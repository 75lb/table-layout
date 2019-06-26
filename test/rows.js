const Tom = require('test-runner').Tom
const Rows = require('../lib/rows')
const a = require('assert')

const tom = module.exports = new Tom('rows')

tom.test('removeEmptyColumns', function () {
  const input = [
    { name: 'Lloyd', 'age': '' },
    { name: 'Roger', 'age': ' ' },
    { name: 'Amir' },
    { name: 'Frank' },
    { name: 'Amy' }
  ]
  a.deepStrictEqual(
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
