import TestRunner from 'test-runner'
import assert from 'assert'
import Columns from '../lib/columns.mjs'
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('columns.autoSize(contentColumns, maxWidth)', function () {
  const columns = new Columns([
    { name: 'one', contentWidth: 10, contentWrappable: true },
    { name: 'two', contentWidth: 20, contentWrappable: true }
  ])

  columns.maxWidth = 30
  columns.autoSize()
  a.strictEqual(columns.list[0].generatedWidth, 12)
  a.strictEqual(columns.list[1].generatedWidth, 18)
})

export default tom
