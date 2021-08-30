import TestRunner from 'test-runner'
import { strict as a } from 'assert'
import Rows from '../../lib/rows.js'

const tom = new TestRunner.Tom()

tom.test('removeEmptyColumns', function () {
  const input = [
    { name: 'Lloyd', age: '' },
    { name: 'Roger', age: ' ' },
    { name: 'Amir' },
    { name: 'Frank' },
    { name: 'Amy' }
  ]
  a.deepEqual(
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
