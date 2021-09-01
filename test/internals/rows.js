import TestRunner from 'test-runner'
import { strict as a } from 'assert'
import Rows from '../../lib/rows.js'
import Columns from '../../lib/columns.js'

const tom = new TestRunner.Tom()

tom.test('Rows.removeEmptyColumns', function () {
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

tom.skip('new Rows(data)', function () {
  const data = [
    {
      one: 'one one one',
      two: 'two two two two two two two two two two'
    },
    {
      one: 'oneB oneB oneB',
      two: 'twoB twoB twoB twoB twoB twoB twoB twoB twoB twoB'
    },
  ]
  const columns = new Columns([
    { name: 'one' },
    { name: 'two' },
  ])
  const result = new Rows(data, columns)
  this.data = result
})

export default tom
