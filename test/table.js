import TestRunner from 'test-runner'
import os from 'os'
import { strict as a } from 'assert'
import Table from 'table-layout'

const tom = new TestRunner.Tom()

tom.test('new Table()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data =[
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  const table = new Table(data, options)

  a.equal(table.rows.list.length, 2)
  a.equal(table.columns.list.length, 2)
})

tom.test('table.getWrapped()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data =[
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  const table = new Table(data, options)

  a.deepEqual(table.getWrapped(), [
    [['row 1 column one ..', '.. ..'], ['r1 c2']],
    [['r2 c1'], ['row two column 2']]
  ])
})

tom.test('table.getLines()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data =[
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  const table = new Table(data, options)

  a.deepEqual(table.getLines(), [
    ['row 1 column one ..', 'r1 c2'],
    ['.. ..', ''],
    ['r2 c1', 'row two column 2']
  ])
})

tom.test('table.renderLines()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data =[
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  const table = new Table(data, options)

  a.deepEqual(table.renderLines(), [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ])
})

tom.test('table.toString()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data =[
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  const table = new Table(data, options)
  const expected = [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ].join(os.EOL) + os.EOL

  a.equal(table.toString(), expected)
})

tom.test('table.renderLines() 2', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data =[
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  const table = new Table(data, options)
  const expected = [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ]

  a.deepEqual(table.renderLines(), expected)
})

tom.test('table.renderLines() 3', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data = [
    { one: 'row 1 column one .. .. ..', two: 3000 },
    { one: true, two: null },
    { one: { yeah: true } }
  ]
  const expected = [
    '<row 1 column one .. .. ..><3000>',
    '<true                     ><null>',
    '<[object Object]          ><    >'
  ]

  const table = new Table(data, options)
  a.deepEqual(table.renderLines(), expected)
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
  a.deepEqual(table.renderLines(), expected)
})

tom.test('Column Transform', function () {
  const options = {
    columns: [{
      name: 'two',
      transform: function (two) {
        return two + 2
      }
    }]
  }
  const data = [
    { one: 'a', two: 3 },
    { one: 'b', two: 5 },
    { one: 'c', two: 7 }
  ]
  const expected = [
    ' a  5 ',
    ' b  7 ',
    ' c  9 '
  ].join(os.EOL) + os.EOL

  const table = new Table(data, options)
  a.equal(table.toString(), expected)
})

export default tom
