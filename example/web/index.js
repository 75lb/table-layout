import Table from 'table-layout'
const $ = document.querySelector.bind(document)

{
  const response = await fetch('../data/issues.json')
  const issues = await response.json()
  const table = new Table(issues, { maxWidth: 60 })
  $('pre[simple]').textContent = table.toString()
}

{
  const response = await fetch('/example/deep-data/gdp.json')
  const rows = await response.json()
  const germanCurrency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
  const germanNumber = new Intl.NumberFormat('de-DE', { notation: 'compact', maximumSignificantDigits: 3, maximumFractionDigits: 0 })

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

  $('pre[getter]').textContent = table.toString()
}
