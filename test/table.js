const Tom = require('test-runner').Tom
const Table = require('../')
const os = require('os')
const a = require('assert')

const tom = module.exports = new Tom('table')

tom.test('new Table()', function () {
  const fixture = require('./fixture/simple-maxWidth')
  const table = new Table(fixture.data, fixture.options)

  a.strictEqual(table.rows.list.length, 2)
  a.strictEqual(table.columns.list.length, 2)
})

tom.test('table.getWrapped()', function () {
  const fixture = require('./fixture/simple-maxWidth')
  const table = new Table(fixture.data, fixture.options)

  a.deepStrictEqual(table.getWrapped(), [
    [ ['row 1 column one ..', '.. ..'], ['r1 c2'] ],
    [ ['r2 c1'], ['row two column 2'] ]
  ])
})

tom.test('table.getLines()', function () {
  const fixture = require('./fixture/simple-maxWidth')
  const table = new Table(fixture.data, fixture.options)

  a.deepStrictEqual(table.getLines(), [
    [ 'row 1 column one ..', 'r1 c2' ],
    [ '.. ..', '' ],
    [ 'r2 c1', 'row two column 2' ]
  ])
})

tom.test('table.renderLines()', function () {
  const fixture = require('./fixture/simple-maxWidth')
  const table = new Table(fixture.data, fixture.options)

  a.deepStrictEqual(table.renderLines(), [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ])
})

tom.test('table.toString()', function () {
  const fixture = require('./fixture/simple-maxWidth')
  const result = [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ].join(os.EOL) + os.EOL

  const table = new Table(fixture.data, fixture.options)
  a.strictEqual(table.toString(), result)
})

tom.test('table.renderLines() 2', function () {
  const fixture = require('./fixture/simple-maxWidth')
  const result = [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ]

  const table = new Table(fixture.data, fixture.options)
  a.deepStrictEqual(table.renderLines(), result)
})

tom.test('table.renderLines() 3', function () {
  const fixture = require('./fixture/primatives')
  const result = [
    '<row 1 column one .. .. ..><3000>',
    '<true                     ><null>',
    '<[object Object]          ><    >'
  ]

  const table = new Table(fixture.data, fixture.options)
  a.deepStrictEqual(table.renderLines(), result)
})

tom.test('column options', function () {
  const options = {
    maxWidth: 40,
    padding: { 'left': '<', 'right': '>'},
    columns: [
      { name: 'one' },
      { name: 'two', width: 10 }
    ]
  }

  const data = [
    { one: 'row 1 column one .. .. ..', two: 3000 },
    { one: true, two: null },
    { one: 'yeah' }
  ]

  const expected = [
    '<row 1 column one .. .. ..><3000    >',
    '<true                     ><null    >',
    '<yeah                     ><        >'
  ]

  const table = new Table(data, options)
  a.deepStrictEqual(table.renderLines(), expected)
})
