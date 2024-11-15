import Table from 'table-layout'
import { strict as a } from 'assert'
import wordwrap from 'wordwrapjs'

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

test.set('multi-byte padding characters', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '🙂具', right: '具' },
    columns: [
      { name: 'one' },
      { name: 'two', width: 10 }
    ]
  }

  const data = [
    { one: '12345 67890', two: '12345678 0' },
    { one: '12345', two: '12345' },
    { one: '12345', two: '12345' }
  ]

  const expected = [
    '<row 1 column one .. .. ..><3000    >',
    '<true                     ><null    >',
    '<yeah                     ><        >'
  ]

  const table = new Table(data, options)
  // a.deepEqual(table.renderLines(), expected)
  // this.data = table.toString()
  console.log(table.toString())
})

only.set('multi-byte content', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '|', right: '|' },
    columns: [
      { name: 'one' },
      { name: 'two', width: 10 }
    ]
  }

  const data = [
    {
      one: `这个大漆视频迟到了四年
“漆”同“柒”
我给这幅雕漆隐花的漆器作品取名“紫气东来”
麒麟回首，万事不愁
也把这份祝愿送给看到视频的每一个你，很想你们[心]
#李子柒紫气东来# #朝花柒拾# #焕新非遗计划# 李子柒的微博视频`,
      two: `这个大漆视频迟到了四年
“漆”同“柒”
我给这幅雕漆隐花的漆器作品取名“紫气东来”
麒麟回首，万事不愁
也把这份祝愿送给看到视频的每一个你，很想你们[心]
#李子柒紫气东来# #朝花柒拾# #焕新非遗计划# 李子柒的微博视频`
    }
  ]

  const expected = []

  const table = new Table(data, options)
  // a.deepEqual(table.renderLines(), expected)
  // this.data = table.toString()
  console.log(table.renderLines())
})

test.set('multi-byte content, 3 columns, no padding', function () {
  const options = {
    maxWidth: 40,
    padding: { left: '', right: '' },
    columns: [
      { name: 'one', width: 20 },
      { name: 'two', width: 10 },
      { name: 'three', width: 10 }
    ]
  }

  const data = [
    {
      one: 'لما اتفرّقت العقول كل واحد عجبه عقله، ولما اتفرّقت الأرزاق ماحدش عجبه رزقه',
      two: 'A one-yard square must be drawn in the middle of the combat place, to which the “seconds”, after the fall of one of the contestants or at the beginning of the fight, must take their pupils, placing them face to face.',
      three: '有理走遍天下，无理寸步难行。'
    },
    {
      one: 'A one-yard square must be drawn in the middle of the combat place, to which the “seconds”, after the fall of one of the contestants or at the beginning of the fight, must take their pupils, placing them face to face.',
      two: 'لما اتفرّقت العقول كل واحد عجبه عقله، ولما اتفرّقت الأرزاق ماحدش عجبه رزقه',
      three: '有理走遍天下，无理寸步难行。'
    },
    {
      one: '有理走遍天下，无理寸步难行。',
      two: 'A one-yard square must be drawn in the middle of the combat place, to which the “seconds”, after the fall of one of the contestants or at the beginning of the fight, must take their pupils, placing them face to face.',
      three: 'لما اتفرّقت العقول كل واحد عجبه عقله، ولما اتفرّقت الأرزاق ماحدش عجبه رزقه'
    },
    {
      two: '有理走遍天下，无理寸步难行。',
      three: 'A one-yard square must be drawn in the middle of the combat place, to which the “seconds”, after the fall of one of the contestants or at the beginning of the fight, must take their pupils, placing them face to face.',
      one: 'لما اتفرّقت العقول كل واحد عجبه عقله، ولما اتفرّقت الأرزاق ماحدش عجبه رزقه'
    }
  ]

  const expected = []

  const table = new Table(data, options)
  // a.deepEqual(table.renderLines(), expected)

  /* 42 width in total, columns 2 and 3 are 11 chars */
  console.log(table.renderLines())

  for (const row of data) {
    row.one = wordwrap.lines(row.one, { width: 20 })
    row.two = wordwrap.lines(row.two, { width: 10 })
    row.three = wordwrap.lines(row.three, { width: 10 })
  }
  console.log(data)
})

export { test, only, skip }
