#!/usr/bin/env node
'use strict'
var detect = require('feature-detect-es6')

if (detect.all('class', 'arrowFunction', 'let', 'const')) {
  require('./src/bin/cli.js')
} else {
  require('./es5/bin/cli.js')
}
