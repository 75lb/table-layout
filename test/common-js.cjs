const Tom = require('@test-runner/tom')
const Table = require('table-layout')
const assert = require('assert')
const a = assert.strict

const eol = '\n'
const tom = new Tom()

tom.test('new Table()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data = [
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  const table = new Table(data, options)

  a.equal(table.rows.list.length, 2)
  a.equal(table.columns.list.length, 2)
})

module.exports = tom
