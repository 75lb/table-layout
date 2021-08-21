import TestRunner from 'test-runner'
import os from 'os'
import assert from 'assert'
import Table from '../index.mjs'
import { simpleMaxWidth, primatives, transformTest } from './fixture/fixture.mjs'
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('new Table()', function () {
  const table = new Table(simpleMaxWidth.data, simpleMaxWidth.options)

  a.strictEqual(table.rows.list.length, 2)
  a.strictEqual(table.columns.list.length, 2)
})

tom.test('table.getWrapped()', function () {
  const table = new Table(simpleMaxWidth.data, simpleMaxWidth.options)

  a.deepStrictEqual(table.getWrapped(), [
    [['row 1 column one ..', '.. ..'], ['r1 c2']],
    [['r2 c1'], ['row two column 2']]
  ])
})

tom.test('table.getLines()', function () {
  const table = new Table(simpleMaxWidth.data, simpleMaxWidth.options)

  a.deepStrictEqual(table.getLines(), [
    ['row 1 column one ..', 'r1 c2'],
    ['.. ..', ''],
    ['r2 c1', 'row two column 2']
  ])
})

tom.test('table.renderLines()', function () {
  const table = new Table(simpleMaxWidth.data, simpleMaxWidth.options)

  a.deepStrictEqual(table.renderLines(), [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ])
})

tom.test('table.toString()', function () {
  const result = [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ].join(os.EOL) + os.EOL

  const table = new Table(simpleMaxWidth.data, simpleMaxWidth.options)
  a.strictEqual(table.toString(), result)
})

tom.test('table.renderLines() 2', function () {
  const result = [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ]

  const table = new Table(simpleMaxWidth.data, simpleMaxWidth.options)
  a.deepStrictEqual(table.renderLines(), result)
})

tom.test('table.renderLines() 3', function () {
  const result = [
    '<row 1 column one .. .. ..><3000>',
    '<true                     ><null>',
    '<[object Object]          ><    >'
  ]

  const table = new Table(primatives.data, primatives.options)
  a.deepStrictEqual(table.renderLines(), result)
})

tom.test('column options', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' },
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

tom.test('Column Transform', function () {
  const result = [
    ' a  5 ',
    ' b  7 ',
    ' c  9 '
  ].join(os.EOL) + os.EOL

  const table = new Table(transformTest.data, transformTest.options)
  a.strictEqual(table.toString(), result)
})

export default tom
