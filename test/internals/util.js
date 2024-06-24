import TestRunner from 'test-runner'
import { strict as a } from 'assert'
import { removeEmptyColumns } from '../../packages/lib/util.js'

const tom = new TestRunner.Tom()

tom.test('util.removeEmptyColumns', function () {
  const input = [
    { name: 'Lloyd', age: '' },
    { name: 'Roger', age: ' ' },
    { name: 'Amir' },
    { name: 'Frank' },
    { name: 'Amy' }
  ]
  const result = removeEmptyColumns(input)
  a.deepEqual(result, [
    { name: 'Lloyd' },
    { name: 'Roger' },
    { name: 'Amir' },
    { name: 'Frank' },
    { name: 'Amy' }
  ])
})

export default tom
