import Table from 'table-layout'
import { promises as fs } from 'fs'
import ansi from 'ansi-escape-sequences'

const rows = JSON.parse(await fs.readFile('./example/data/stock-prices.json', 'utf8'))
const maxValue = Math.max(...rows.map(r => r.return))
const minValue = Math.min(...rows.map(r => r.return))

function getColour (value) {
  const ratio = value >= 0 ? value / maxValue : value / minValue
  return Math.round((100 * ratio) + 155)
}

/* solved via language - user has control */
{
  const proxy = rows.map(row => {
    return new Proxy(row, {
      get (target, property, receiver) {
        if (property === 'return') {
          const ansiColour = target.return >= 0
            ? `fg-rgb(0, ${getColour(target.return)}, 0)`
            : `fg-rgb(${getColour(target.return)}, 0, 0)`
          return ansi.format(target.return + '%', ansiColour)
        } else {
          return Reflect.get(target, property, receiver)
        }
      }
    })
  })
  const table = new Table(proxy, {
    maxWidth: 60
  })

  console.log(table.toString())
}

