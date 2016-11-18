'use strict'
const tableLayout = require('../../')
const tool = require('command-line-tool')
const collectJson = require('collect-json')
const extend = require('deep-extend')
const t = require('typical')
const cliData = require('../lib/cli-data')

const cli = tool.getCli(cliData.definitions, cliData.usageSections)
const options = cli.options

if (options.help) {
  tool.stop(cli.usage)
}

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

process.stdin
  .pipe(collectJson(function (json) {
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

    const table = new tableLayout.Table(json, clOptions)
    return options.lines
      ? JSON.stringify(table.renderLines(), null, '  ') + '\n'
      : table.toString()
  }))
  .on('error', tool.halt)
  .pipe(process.stdout)
