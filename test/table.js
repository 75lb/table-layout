import Table from 'table-layout'
import { strict as a } from 'assert'

const [test, only, skip] = [new Map(), new Map(), new Map()]
const eol = '\n'

test.set('new Table()', function () {
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

test.set('table.getWrapped()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data = [
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  const table = new Table(data, options)
  const result = table.getWrapped()

  a.deepEqual(result, [
    [['row 1 column one ..', '.. ..'], ['r1 c2']],
    [['r2 c1'], ['row two column 2']]
  ])
})

test.set('table.getLines()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data = [
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

test.set('table.renderLines()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data = [
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

test.set('table.toString()', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data = [
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
  const table = new Table(data, options)
  const expected = [
    '<row 1 column one .. ><r1 c2           >',
    '<.. ..               ><                >',
    '<r2 c1               ><row two column 2>'
  ].join(eol) + eol

  a.equal(table.toString(), expected)
})

test.set('table.renderLines() 2', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  }
  const data = [
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

test.set('table.renderLines() 3', function () {
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

test.set('column options', function () {
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

test.set('Cell getter 1', function () {
  const data = [
    { one: 'a', two: 3 },
    { one: 'b', two: 5 },
    { one: 'c', two: 7 }
  ]
  const options = {
    columns: [{
      name: 'two',
      get: function (cell) {
        return cell + 2
      }
    }]
  }
  const expected = [
    ' a  5 ',
    ' b  7 ',
    ' c  9 '
  ].join(eol) + eol

  const table = new Table(data, options)
  a.equal(table.toString(), expected)
})

test.set('Cell getter: deep value', function () {
  const data = [
    { one: 'a', two: { value: 2 } }
  ]
  const options = { columns: [{ name: 'two', get: cell => cell.value }] }
  const expected = [' a  2 '].join(eol) + eol
  const table = new Table(data, options)
  a.equal(table.toString(), expected)
})

export { test, only, skip }
