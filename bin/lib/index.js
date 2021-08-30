import Table from 'table-layout'
import streamReadAll from 'stream-read-all'
import commandLineArgs from 'command-line-args'
import extend from '@75lb/deep-merge'
import t from 'typical'
import * as cliData from './cli-data.js'
import commandLineUsage from 'command-line-usage'

class TableLayoutCli {
  constructor (options) {
    options = options || {}
  }

  async go (argv, testInput) {
    const options = commandLineArgs(cliData.definitions, { argv })
    if (options.help) {
      return commandLineUsage(cliData.usageSections)
    }
    const input = testInput || await streamReadAll(process.stdin)

    const columns = []
    if (options.width) {
      options.width.forEach(function (columnWidth) {
        const split = columnWidth.split(':').map(function (item) {
          return item.trim()
        })
        if (split[0] && split[1]) {
          columns.push({ name: split[0], width: Number(split[1]) })
        }
      })
    }

    function getTable (json) {
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

      if (columns.length) clOptions.columns = columns

      const table = new Table(json, clOptions)
      return table.toString()
    }

    const json = JSON.parse(input)
    return getTable(json)
  }
}

export default TableLayoutCli
