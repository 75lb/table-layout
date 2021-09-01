import arrayify from 'array-back'
import Cell from './cell.js'
import t from 'typical'

/**
 * @module rows
 */


/**
≈ Each row is a map of column/cell pairs.
*/
class Rows {
  constructor (rows, columns) {
    this.list = []
    this.load(rows, columns)
  }

  load (rows, columns) {
    for (const row of arrayify(rows)) {
      const map = new Map(columns.list.map(column => [column, new Cell(row[column.name], column)]))
      this.list.push(map)
    }
  }

  static removeEmptyColumns (data) {
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
}

export default Rows
