const Tom = require('test-runner').Tom
const Table = require('../')
const a = require('assert')

const tom = module.exports = new Tom('bad-input')

tom.test('table.lines(): no data', function () {
  let table = new Table([])
  a.deepStrictEqual(table.getLines([]), [])

  table = new Table([])
  a.deepStrictEqual(table.getLines(), [])
})
