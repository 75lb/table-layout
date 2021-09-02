import Table from 'table-layout'
import streamReadAll from 'stream-read-all'
import commandLineArgs from 'command-line-args'
import extend from '@75lb/deep-merge'
import t from 'typical'
import * as cliData from './cli-data.js'
import commandLineUsage from 'command-line-usage'
import { promises as fs } from 'fs'

class TableLayoutCli {
  async start (argv, testInput) {
    const options = commandLineArgs(cliData.definitions, { argv })
    if (options.help) {
      return commandLineUsage(cliData.usageSections)
    } else if (options.file) {
      const input = testInput || await fs.readFile(options.file, 'utf8')
      const json = JSON.parse(input)
      return getTable(json, options)
    } else {
      const input = testInput || await this.fetchInput()
      const json = JSON.parse(input)
      return getTable(json, options)
    }
  }

  async fetchInput () {
    return streamReadAll(process.stdin)
  }
}

function getTable (json, options) {
  let clOptions = {
    maxWidth: process.stdout.columns,
    padding: {}
  }

  if (t.isDefined(options['padding-left'])) clOptions.padding.left = options['padding-left']
  if (t.isDefined(options['padding-right'])) clOptions.padding.right = options['padding-right']

  /* split input into data and options */
  if (!Array.isArray(json)) {
    if (json.options && json.data) {
      clOptions = extend(clOptions, json.options)
      json = json.data
    } else {
      throw new Error('Invalid input data')
    }
  }

  if (options.width) {
    const columns = []
    for (const columnWidth of options.width) {
      const split = columnWidth.split(':').map(item => item.trim())
      if (split[0] && split[1]) {
        columns.push({ name: split[0], width: Number(split[1]) })
      }
    }
    if (columns.length) clOptions.columns = columns
  }

  const table = new Table(json, clOptions)
  return table.toString()
}

export default TableLayoutCli
