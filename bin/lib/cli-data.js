export const definitions = [
  {
    name: 'file',
    type: String,
    description: 'A JSON input file to read. If not present, table-layout will look for input on stdin.',
    defaultOption: true
  },
  {
    name: 'width',
    type: String,
    multiple: true,
    alias: 'w',
    typeLabel: '{underline widths}',
    description: 'specify a list of column widths in the format \'<column>:<width>\', for example:\n$ cat <file> | table-layout --width "column 1: 10" "column 2: 30"'
  },
  {
    name: 'padding-left',
    type: String,
    alias: 'l',
    description: "One or more characters to pad the left of each column. Defaults to ' '."
  },
  {
    name: 'padding-right',
    type: String,
    alias: 'r',
    description: "One or more characters to pad the right of each column. Defaults to ' '."
  },
  {
    name: 'help',
    type: Boolean,
    alias: 'h'
  }
]

export const usageSections = [
  {
    header: 'table-layout',
    content: 'Styleable plain-text table generator. Useful for formatting console output.'
  },
  {
    header: 'Synopsis',
    content: [
      '$ cat {underline json-file} | table-layout [options]',
      '$ table-layout [options] {underline json-file}'
    ]
  },
  {
    header: 'Options',
    optionList: definitions
  }
]
