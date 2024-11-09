import { removeEmptyColumns, applyDefaultValues } from '../../lib/util.js'
import { strict as a } from 'assert'

const [test, only, skip] = [new Map(), new Map(), new Map()]

test.set('util.removeEmptyColumns', function () {
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

test.set('util.applyDefaultValues: no options supplied', async function () {
  const defaults = {
    padding: {
      left: ' ',
      right: ' '
    },
    maxWidth: 80,
    columns: [],
    eol: '\n'
  }

  const result = applyDefaultValues({}, defaults)
  a.deepEqual(result, { padding: { left: ' ', right: ' ' }, maxWidth: 80, columns: [], eol: '\n' })
})

test.set('util.applyDefaultValues: all options supplied', async function () {
  const defaults = {
    padding: {
      left: ' ',
      right: ' '
    },
    maxWidth: 80,
    columns: [],
    eol: '\n'
  }

  const result = applyDefaultValues({ padding: { left: 'L', right: 'R' }, maxWidth: 10, columns: [1], eol: 'EOL' }, defaults)
  a.deepEqual(result, { padding: { left: 'L', right: 'R' }, maxWidth: 10, columns: [ 1 ], eol: 'EOL' })
})

test.set('util.applyDefaultValues: not all options supplied', async function () {
  const defaults = {
    padding: {
      left: ' ',
      right: ' '
    },
    maxWidth: 80,
    columns: [],
    eol: '\n'
  }

  const result = applyDefaultValues({ padding: { right: 'R' }, maxWidth: 10 }, defaults)
  a.deepEqual(result, { padding: { right: 'R', left: ' ' }, maxWidth: 10, columns: [], eol: '\n' })
})


export { test, only, skip }
