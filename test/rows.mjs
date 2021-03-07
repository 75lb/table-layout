import TestRunner from 'test-runner'
import assert from 'assert'
import Rows from '../lib/rows.mjs'
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('removeEmptyColumns', function () {
  const input = [
    { name: 'Lloyd', age: '' },
    { name: 'Roger', age: ' ' },
    { name: 'Amir' },
    { name: 'Frank' },
    { name: 'Amy' }
  ]
  a.deepStrictEqual(
    Rows.removeEmptyColumns(input),
    [
      { name: 'Lloyd' },
      { name: 'Roger' },
      { name: 'Amir' },
      { name: 'Frank' },
      { name: 'Amy' }
    ]
  )
})

export default tom
