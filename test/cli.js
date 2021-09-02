import TableLayoutCli from '../bin/lib/index.js'
import TestRunner from 'test-runner'
import { strict as a } from 'assert'

const tom = new TestRunner.Tom()

tom.test('no args', async function () {
  const cli = new TableLayoutCli()
  const result = await cli.start([], '[ { "one": "test" } ]')
  a.ok(/test/.test(result))
})

tom.test('help', async function () {
  const cli = new TableLayoutCli()
  const result = await cli.start(['--help'])
  a.ok(/Synopsis/.test(result))
})

tom.test('render file', async function () {
  const cli = new TableLayoutCli()
  const result = await cli.start(['./test/fixture/one.json'])
  a.ok(/China/.test(result))
})

export default tom
