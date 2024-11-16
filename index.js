import { wrap, segment } from 'wordwrapjs'
import stringWidth from 'string-width'

function getColumnOptions (data) {
  const columnNames = data.reduce((set, row) => {
    Object.keys(row).forEach(key => set.add(key))
    return set
  }, new Set())

  const columns = Array.from(columnNames).map(name => {
    const column = {
      name,
      maxWidth: 20,
      widthMode: 'visual',
      contentWidth: Math.max(...data.map(r => stringWidth(String(r[name])) || 0)),
      biggestSegment: Math.max(...data.map(r => {
        return Math.max(...Array.from(segment(String(r[name])))
          .filter(s => s.isWordLike)
          .map(s => stringWidth(s.segment)))
      }))
    }
    column.width = column.biggestSegment > column.maxWidth
      ? column.biggestSegment
      : column.contentWidth > column.maxWidth
        ? column.maxWidth
        : column.contentWidth
    return column
  })
  return columns
}

function getWrappedData (data, columns) {
  const wrappedData = data.map(d => {
    return columns.reduce((prev, column) => {
      column.pad = true
      // prev[column.name] = column.noWrap
      //   ? [d[column.name]]
      //   : wrap(d[column.name], column)
      prev[column.name] = wrap(d[column.name], column)
      return prev
    }, {})
  })
  return wrappedData
}

function getMergedRows (wrappedData, columns, columnSeparator = ' \u2502 ') {
  const rows = []
  for (const w of wrappedData) {
    const maxLength = Math.max(...Object.keys(w).map(key => w[key].length))
    const mergedRow = []
    for (let x = 0; x < maxLength; x++) {
      mergedRow[x] = Object.keys(w).map(key => {
        const wrapOptions = columns.find(c => c.name === key)
        return w[key][x] || ' '.repeat(wrapOptions.width)
      }).join(columnSeparator)
    }
    rows.push(mergedRow)
  }
  return rows
}

function tableLayout (data, columns) {
  columns = columns || getColumnOptions(data)
  // console.log(columns)
  const wrappedData = getWrappedData(data, columns)
  // console.log(wrappedData)
  const mergedRows = getMergedRows(wrappedData, columns)
  // console.log(mergedRows)
  return mergedRows.map(r => r.join('\n')).join('\n')
}

export { getColumnOptions, getWrappedData, getMergedRows, tableLayout }

// const filename = process.argv[2]
// if (!filename) {
//   process.exit(1)
// }
// import { promises as fs } from 'node:fs'
// const content = await fs.readFile(filename, 'utf8')
// const data = JSON.parse(content) // must be an array of objects

// console.log(tableLayout(data, [
//   { name: 'one', width: 16, rtol: true },
//   { name: 'two', width: 16, rtol: false },
//   { name: 'three', width: 16, rtol: false }
// ]))

// console.log(tableLayout(data, [
//   {
//     name: 'name',
//     width: 25,
//     granularity: 'grapheme'
//   },
//   {
//     name: 'type',
//     width: 6,
//     granularity: 'grapheme',
//     noWrap: true
//   },
//   {
//     name: 'expiry',
//     width: 6,
//     granularity: 'grapheme',
//     noWrap: true
//   },
//   {
//     name: 'bid',
//     width: 6,
//     granularity: 'grapheme',
//     noWrap: true
//   },
//   {
//     name: 'offer',
//     width: 6,
//     granularity: 'grapheme',
//     noWrap: true
//   },
//   {
//     name: 'change',
//     width: 6,
//     granularity: 'grapheme',
//     noWrap: true
//   },
//   {
//     name: 'change %',
//     width: 8,
//     granularity: 'grapheme',
//     noWrap: true
//   },
//   {
//     name: 'epic',
//     width: 25,
//     granularity: 'grapheme'
//   }
// ]))

// // console.log(rows)
// const dividedRows = rows.reduce((acc, curr, index) => {
//   if (index % 2 > 0) {
//     /* odd row */
//     acc.push(['\u2500'.repeat(curr[0].length)])
//   }
//   acc.push(curr)
//   if (index % 2 > 0) {
//     /* odd row */
//     acc.push(['\u2500'.repeat(curr[0].length)])
//   }
//   return acc
// }, [])
// console.log(dividedRows)
// console.log(dividedRows.map(r => r.join('\n')).join('\n'))
