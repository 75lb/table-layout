import Table from 'table-layout'
import { promises as fs } from 'fs'

const rows = JSON.parse(await fs.readFile('./example/deep-data/gdp.json', 'utf8'))
const germanCurrency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
const germanNumber = new Intl.NumberFormat('de-DE', { notation: 'compact', maximumSignificantDigits: 3, maximumFractionDigits: 0 })

/* solved via library - maintainer has control */
{
  const table = new Table(rows, {
    maxWidth: 60,
    columns: [
      {
        name: 'country',
        get: (cellValue) => cellValue.name
      },
      {
        name: 'GDP',
        get: (cellValue) => germanCurrency.format(cellValue)
      },
      {
        name: 'population',
        get: (cellValue) => germanNumber.format(cellValue)
      }
    ]
  })

  console.log(table.toString())
}

/* solved via language - user has control */
{
  const proxiedRows = rows.map(row => {
    return new Proxy(row, {
      get (target, property, receiver) {
        if (property === 'country') {
          return target.country.name
        } else if (property === 'GDP') {
          return germanCurrency.format(target.GDP)
        } else if (property === 'population') {
          return germanNumber.format(target.population)
        } else {
          return Reflect.get(target, property, receiver)
        }
      }
    })
  })
  const table = new Table(proxiedRows, { maxWidth: 60})
  console.log(table.toString())
}
