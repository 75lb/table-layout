'use strict';

var tableLayout = require('../../');
var tool = require('command-line-tool');
var collectJson = require('collect-json');
var extend = require('deep-extend');
var t = require('typical');
var cliData = require('../lib/cli-data');

var cli = tool.getCli(cliData.definitions, cliData.usageSections);
var options = cli.options;

if (options.help) {
  tool.stop(cli.usage);
}

var columns = [];
if (options.width) {
  options.width.forEach(function (columnWidth) {
    var split = columnWidth.split(':').map(function (item) {
      return item.trim();
    });
    if (split[0] && split[1]) {
      columns.push({ name: split[0], width: Number(split[1]) });
    }
  });
}

process.stdin.pipe(collectJson(function (json) {
  var clOptions = {
    maxWidth: process.stdout.columns,
    padding: {}
  };

  if (t.isDefined(options['padding-left'])) clOptions.padding.left = options['padding-left'];
  if (t.isDefined(options['padding-right'])) clOptions.padding.right = options['padding-right'];

  if (!Array.isArray(json)) {
    if (json.options && json.data) {
      clOptions = extend(clOptions, json.options);
      json = json.data;
    } else {
      throw new Error('Invalid input data');
    }
  }

  if (columns.length) clOptions.columns = columns;

  var table = new tableLayout.Table(json, clOptions);
  return options.lines ? JSON.stringify(table.renderLines(), null, '  ') + '\n' : table.toString();
})).on('error', tool.halt).pipe(process.stdout);