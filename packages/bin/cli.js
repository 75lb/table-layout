#!/usr/bin/env node
import TableLayoutCli from './lib/index.js'

async function start () {
  const cli = new TableLayoutCli()
  const result = await cli.start()
  console.log(result)
}

start().catch(console.error)
