#!/usr/bin/env node
import TableLayoutCli from './lib/index.mjs'

const cli = new TableLayoutCli()
const result = await cli.go()
console.log(result)
