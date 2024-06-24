import { remove } from './ansi.js'
import t from 'typical'
import wrap from 'wordwrapjs'

/**
 * Array of arrays in.. Returns the length of the longest one
 * @returns {number}
 * @private
 */
export function getLongestArray (arrays) {
  const lengths = arrays.map(array => array.length)
  return Math.max(...lengths)
}

export function padCell (cellValue, padding, width) {
  const ansiLength = cellValue.length - remove(cellValue).length
  cellValue = cellValue || ''
  return (padding.left || '') +
  cellValue.padEnd(width - padding.length() + ansiLength) + (padding.right || '')
}

export function getLongestWord (line) {
  const words = wrap.getChunks(line)
  return words.reduce((max, word) => Math.max(word.length, max), 0)
}

export function removeEmptyColumns (data) {
  const distinctColumnNames = data.reduce((columnNames, row) => {
    for (const key of Object.keys(row)) {
      if (!columnNames.includes(key)) {
        columnNames.push(key)
      }
    }
    return columnNames
  }, [])

  const emptyColumns = distinctColumnNames.filter(columnName => {
    const hasValue = data.some(row => {
      const value = row[columnName]
      return (t.isDefined(value) && typeof value !== 'string') || (typeof value === 'string' && /\S+/.test(value))
    })
    return !hasValue
  })

  return data.map(row => {
    for (const emptyCol of emptyColumns) {
      delete row[emptyCol]
    }
    return row
  })
}
