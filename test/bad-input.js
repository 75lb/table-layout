import TestRunner from 'test-runner'
import assert from 'assert'
import Table from '../packages/lib/index.js'
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('table.lines(): no data', function () {
  let table = new Table([])
  a.deepEqual(table.getLines([]), [])

  table = new Table([])
  a.deepEqual(table.getLines(), [])
})

tom.test('process.stdout.columns not available: default maxWidth to 80', async function () {
  const prevIn = process.stdin.columns
  const prevOut = process.stdout.columns
  const prevErr = process.stderr.columns
  delete process.stdin.columns
  delete process.stdout.columns
  delete process.stderr.columns
  const table = new Table()
  table.options.maxWidth = 80
  process.stdin.columns = prevIn
  process.stdout.columns = prevOut
  process.stderr.columns = prevErr
})

export default tom
