'use strict';

exports.definitions = [{
  name: 'width',
  type: String,
  multiple: true,
  alias: 'w',
  typeLabel: '<widths>',
  description: 'specify a list of column widths in the format \'<column>:<width>\', for example:\n$ cat <json data> | table-layout --width "column 1: 10" "column 2: 30"'
}, {
  name: 'padding-left',
  type: String,
  alias: 'l',
  description: "One or more characters to pad the left of each column. Defaults to ' '."
}, {
  name: 'padding-right',
  type: String,
  alias: 'r',
  description: "One or more characters to pad the right of each column. Defaults to ' '."
}, {
  name: 'help',
  type: Boolean,
  alias: 'h'
}];

exports.usageSections = [{
  header: 'table-layout',
  content: 'Styleable plain-text table generator. Useful for formatting console output.'
}, {
  header: 'Synopsis',
  content: '$ cat [underline]{jsonfile} | table-layout [options]'
}, {
  header: 'Options',
  optionList: exports.definitions
}];