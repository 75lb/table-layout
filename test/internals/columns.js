import TestRunner from 'test-runner'
import { strict as a } from 'assert'
import Columns from '../../lib/columns.js'

const tom = new TestRunner.Tom()

tom.test('columns.autoSize(contentColumns, maxWidth)', function () {
  const columns = new Columns([
    { name: 'one', contentWidth: 10, contentWrappable: true },
    { name: 'two', contentWidth: 20, contentWrappable: true }
  ])

  columns.maxWidth = 30
  columns.autoSize()
  a.equal(columns.list[0].generatedWidth, 12)
  a.equal(columns.list[1].generatedWidth, 18)
})

tom.test('Columns.getColumns', async function () {
  const data = [
    {
      one: 'one one one one one one one one one one one one one one one one one one one one',
      two: 'two two two two two two two two two two'
    }
  ]
  const result = Columns.getColumns(data)
  // this.data = result
  a.deepEqual({ ...result.list[0] }, {
    name: 'one',
    width: undefined,
    maxWidth: undefined,
    minWidth: undefined,
    noWrap: undefined,
    break: undefined,
    contentWrappable: undefined,
    contentWidth: 0,
    minContentWidth: 0,
    generatedWidth: null
  })
  a.deepEqual({ ...result.list[1] }, {
    name: 'two',
    width: undefined,
    maxWidth: undefined,
    minWidth: undefined,
    noWrap: undefined,
    break: undefined,
    contentWrappable: undefined,
    contentWidth: 0,
    minContentWidth: 0,
    generatedWidth: null
  })
})

export default tom
