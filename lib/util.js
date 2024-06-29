import { remove } from './ansi.js'
import wrap from 'wordwrapjs'

/**
 * Array of arrays in.. Returns the length of the longest one
 * @returns {number}
 * @private
 */
function getLongestArray (arrays) {
  const lengths = arrays.map(array => array.length)
  return Math.max(...lengths)
}

function padCell (cellValue, padding, width) {
  const ansiLength = cellValue.length - remove(cellValue).length
  cellValue = cellValue || ''
  return (padding.left || '') +
  cellValue.padEnd(width - padding.length() + ansiLength) + (padding.right || '')
}

function getLongestWord (line) {
  const words = wrap.getChunks(line)
  return words.reduce((max, word) => Math.max(word.length, max), 0)
}

function removeEmptyColumns (data) {
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
      return (value !== undefined && typeof value !== 'string') || (typeof value === 'string' && /\S+/.test(value))
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

export { getLongestArray, padCell, getLongestWord, removeEmptyColumns }
