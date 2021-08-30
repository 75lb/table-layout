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

export default tom
