import Table from 'table-layout'
import { promises as fs } from 'fs'

const issues = await fs.readFile('./example/data/issues.json', 'utf8')
const table = new Table(JSON.parse(issues), { maxWidth: 60 })

console.log(table.toString())
