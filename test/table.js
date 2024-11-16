import { tableLayout } from 'table-layout'
import { strict as a } from 'assert'

const [test, only, skip] = [new Map(), new Map(), new Map()]

skip.set('multi-byte content', function () {
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

skip.set('multi-byte content, 3 columns, no padding', function () {
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
})

export { test, only, skip }
