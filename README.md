[![view on npm](https://badgen.net/npm/v/table-layout)](https://www.npmjs.org/package/table-layout)
[![npm module downloads](https://badgen.net/npm/dt/table-layout)](https://www.npmjs.org/package/table-layout)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/table-layout)](https://github.com/75lb/table-layout/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/table-layout)](https://github.com/75lb/table-layout/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/75lb/table-layout/actions/workflows/node.js.yml/badge.svg)](https://github.com/75lb/table-layout/actions/workflows/node.js.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# table-layout

Styleable plain-text table generator. Useful for formatting console output. Available as both a command-line tool and isomorphic Javascript library.

## Synopsis

Install the `table-layout` command-line app:

```
$ npm install --global table-layout

```

As input, table-layout takes a JSON file containing an array of objects. 

```json
[
  {
    "country": "USA",
    "GDP": "$19,485,394,000,000",
    "population": "325,084,756"
  },
  {
    "country": "China",
    "GDP": "$12,237,700,479,375",
    "population": "1,421,021,791"
  },
  {
    "country": "Japan",
    "GDP": "$4,872,415,104,315",
    "population": "127,502,725"
  }
]
```

The output of table-layout is plain-text table. 

```
$ cat example/gdp.json | table-layout

 USA    $19,485,394,000,000  325,084,756
 China  $12,237,700,479,375  1,421,021,791
 Japan  $4,872,415,104,315   127,502,725

```

## Examples

Please see below for example usage. 

### View Github issues

A quick way to see the latest issues on a repository (this example requires [jq](https://stedolan.github.io/jq/)).

```sh
$ curl -s https://api.github.com/repos/npm/npm/issues \
| jq 'map({ number, title, login:.user.login, comments })' \
| table-layout
```

```
10263  npm run start                                            Slepperpon        4
10262  npm-shrinkwrap.json being ignored for a dependency of a  maxkorp           0
      dependency (2.14.9, 3.3.10)
10261  EPROTO Error Installing Packages                         azkaiart          2
10260  ENOENT during npm install with npm v3.3.6/v3.3.12 and    lencioni          2
      node v5.0.0
10259  npm install failed                                       geraldvillorente  1
10258  npm moves common dependencies under a dependency on      trygveaa          2
      install
10257  [NPM3] Missing top level dependencies after npm install  naholyr           0
10256  Yo meanjs app creation problem                           nrjkumar41        0
10254  sapnwrfc is not installing                               RamprasathS       0
10253  npm install deep dependence folder "node_modules"        duyetvv           2
10251  cannot npm login                                         w0ps              2
10250  Update npm-team.md                                       louislarry        0
10248  cant install module I created                            nousacademy       4
10247  Cannot install passlib                                   nicola883         3
10246  Error installing Gulp                                    AlanIsrael0       1
10245  cannot install packages through NPM                      RoyGeagea         11
10244  Remove arguments from npm-dedupe.md                      bengotow          0
 etc.
 etc.
```

### Format an article into columns

Formatting long chunks of text into columns for display side by side.

```json
[
    {
      "column 1": "The Kingdom of Scotland was a state in north-west Europe traditionally said to have been founded in 843, which joined with the Kingdom of England to form a unified Kingdom of Great Britain in 1707. Its territories expanded and shrank, but it came to occupy the northern third of the island of Great Britain, sharing a land border to the south with the Kingdom of England. ",
      "column 2": "Operation Barbarossa (German: Unternehmen Barbarossa) was the code name for Nazi Germany's invasion of the Soviet Union during World War II, which began on 22 June 1941. Over the course of the operation, about four million soldiers of the Axis powers invaded Soviet Russia along a 2,900 kilometer front, the largest invasion force in the history of warfare. In addition to troops, the Germans employed some 600,000 motor vehicles and between 600–700,000 horses."
    }
]
```

Output:

```
$ cat example/two-columns.json | table-layout

The Kingdom of Scotland was a state in     Operation Barbarossa (German: Unternehmen
north-west Europe traditionally said to    Barbarossa) was the code name for Nazi
have been founded in 843, which joined     Germany's invasion of the Soviet Union
with the Kingdom of England to form a      during World War II, which began on 22
unified Kingdom of Great Britain in 1707.  June 1941. Over the course of the
Its territories expanded and shrank, but   operation, about four million soldiers of
it came to occupy the northern third of    the Axis powers invaded Soviet Russia
the island of Great Britain, sharing a     along a 2,900 kilometer front, the
land border to the south with the Kingdom  largest invasion force in the history of
of England.                                warfare. In addition to troops, the
                                           Germans employed some 600,000 motor
                                           vehicles and between 600–700,000 horses.
```

Notice the columns above have equal width - this is the default style. You can give one or more columns a specific width using the `--width` option. In the example below we give "column 2" a specific width of 55 characters:

```
$ cat example/two-columns.json | table-layout --width "column 2: 55"

The Kingdom of Scotland was a  Operation Barbarossa (German: Unternehmen Barbarossa)
state in north-west Europe     was the code name for Nazi Germany's invasion of the
traditionally said to have     Soviet Union during World War II, which began on 22
been founded in 843, which     June 1941. Over the course of the operation, about
joined with the Kingdom of     four million soldiers of the Axis powers invaded
England to form a unified      Soviet Russia along a 2,900 kilometer front, the
Kingdom of Great Britain in    largest invasion force in the history of warfare. In
1707. Its territories          addition to troops, the Germans employed some 600,000
expanded and shrank, but it    motor vehicles and between 600–700,000 horses.
came to occupy the northern
third of the island of Great
Britain, sharing a land
border to the south with the
Kingdom of England.
```

## Full command-line usage guide:

<pre><code>$ table-layout --help

<u>table-layout</u>

  Styleable plain-text table generator. Useful for formatting console output.

<u>Synopsis</u>

  $ cat <u>json-file</u> | table-layout [options]
  $ table-layout [options] <u>json-file</u>

<u>Options</u>

  --file string                A JSON input file to read. If not present, table-layout will look for input
                               on stdin.
  -w, --width widths           specify a list of column widths in the format '<column>:<width>', for
                               example:
                               $ cat <file> | table-layout --width "column 1: 10" "column 2: 30"
  -l, --padding-left string    One or more characters to pad the left of each column. Defaults to ' '.
  -r, --padding-right string   One or more characters to pad the right of each column. Defaults to ' '.
  -h, --help
</code></pre>


## Programmatic Usage

An example of how to use table-layout from Node.js.

```js
import Table from 'table-layout'
import { promises as fs } from 'fs'

const issues = await fs.readFile('./issues.json', 'utf8')
const table = new Table(JSON.parse(issues), { maxWidth: 60 })

console.log(table.toString())

```

If the input file looks like this: 

```json
[
  {
    "number": 15134,
    "title": "Coveralls has no source available ",
    "login": "ndelangen",
    "comments": 0
  },
  {
    "number": 15133,
    "title": "Fixing --preserve-symlinks. Enhancing node to exploit.",
    "login": "phestermcs",
    "comments": 0
  },
  {
    "number": 15131,
    "title": "Question - Confused about NPM's local installation philosophy",
    "login": "the1mills",
    "comments": 0
  },
  {
    "number": 15130,
    "title": "Question - global npm cache directory if user is root?",
    "login": "ORESoftware",
    "comments": 0
  }
]
```

This is the output:

```
 15134  Coveralls has no source available   ndelangen     0
 15133  Fixing --preserve-symlinks.         phestermcs    0
        Enhancing node to exploit.
 15131  Question - Confused about NPM's     the1mills     0
        local installation philosophy
 15130  Question - global npm cache         ORESoftware   0
        directory if user is root?
 15127  how to installa gulp fontfacegen    aramgreat     0
        on Windows 10
 15097  Cannot install package from         mastertinner  3
        tarball out of package.json entry
        generated by npm
 15067  npm "SELF_SIGNED_CERT_IN_CHAIN"     LegendsLyfe   3
        error when installing discord.js
        with .log
```

### API Reference

Full the full API documentation, see [here]()

## Load anywhere

This library is compatible with Node.js, the Web and any style of module loader. It can be loaded anywhere, natively without transpilation.

Within a Node.js CommonJS Module:

```js
const TableLayout = require('table-layout')
```

Within a Node.js ECMAScript Module:

```js
import TableLayout from 'table-layout'
```

Within a modern browser ECMAScript Module:

```js
import TableLayout from './node_modules/table-layout/dist/index.mjs'
```

* * *

&copy; 2021 [Lloyd Brookes](https://github.com/75lb) \<75pound@gmail.com\>.

Isomorphic test suite by [test-runner](https://github.com/test-runner-js/test-runner) and [web-runner](https://github.com/test-runner-js/web-runner). Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
