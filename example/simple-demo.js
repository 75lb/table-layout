import { tableLayout } from 'table-layout'
import { promises as fs } from 'fs'

const issues = await fs.readFile('./example/data/issues.json', 'utf8')
const result = tableLayout(JSON.parse(issues))

console.log(result)
