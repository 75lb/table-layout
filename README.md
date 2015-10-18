[![view on npm](http://img.shields.io/npm/v/column-layout.svg)](https://www.npmjs.org/package/column-layout)
[![npm module downloads](http://img.shields.io/npm/dt/column-layout.svg)](https://www.npmjs.org/package/column-layout)
[![Build Status](https://travis-ci.org/75lb/column-layout.svg?branch=master)](https://travis-ci.org/75lb/column-layout)
[![Dependency Status](https://david-dm.org/75lb/column-layout.svg)](https://david-dm.org/75lb/column-layout)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# column-layout
Pretty-print JSON data in columns.

## Synopsis
Say you have some data:
```json
[
    {
      "column 1": "The Kingdom of Scotland was a state in north-west Europe traditionally said to have been founded in 843, which joined with the Kingdom of England to form a unified Kingdom of Great Britain in 1707. Its territories expanded and shrank, but it came to occupy the northern third of the island of Great Britain, sharing a land border to the south with the Kingdom of England. ",
      "column 2": "Operation Barbarossa (German: Unternehmen Barbarossa) was the code name for Nazi Germany's invasion of the Soviet Union during World War II, which began on 22 June 1941. Over the course of the operation, about four million soldiers of the Axis powers invaded Soviet Russia along a 2,900 kilometer front, the largest invasion force in the history of warfare. In addition to troops, the Germans employed some 600,000 motor vehicles and between 600–700,000 horses."
    }
]
```

pipe it through `column-layout`:
```sh
$ cat example/two-columns.json | column-layout
```

to get this:
```
The Kingdom of Scotland was a state in       Operation Barbarossa (German: Unternehmen
north-west Europe traditionally said to      Barbarossa) was the code name for Nazi
have been founded in 843, which joined with  Germany's invasion of the Soviet Union
the Kingdom of England to form a unified     during World War II, which began on 22 June
Kingdom of Great Britain in 1707. Its        1941. Over the course of the operation,
territories expanded and shrank, but it      about four million soldiers of the Axis
came to occupy the northern third of the     powers invaded Soviet Russia along a 2,900
island of Great Britain, sharing a land      kilometer front, the largest invasion force
border to the south with the Kingdom of      in the history of warfare. In addition to
England.                                     troops, the Germans employed some 600,000
                                             motor vehicles and between 600–700,000
                                             horses.
```

Columns containing wrappable data are auto-sized by default to fit the available space. You can set specific widths using `--width`

```sh
$ cat example/two-columns.json | column-layout --width "column 2: 55"
```

```
The Kingdom of Scotland was a      Operation Barbarossa (German: Unternehmen Barbarossa)
state in north-west Europe         was the code name for Nazi Germany's invasion of the
traditionally said to have been    Soviet Union during World War II, which began on 22
founded in 843, which joined with  June 1941. Over the course of the operation, about
the Kingdom of England to form a   four million soldiers of the Axis powers invaded
unified Kingdom of Great Britain   Soviet Russia along a 2,900 kilometer front, the
in 1707. Its territories expanded  largest invasion force in the history of warfare. In
and shrank, but it came to occupy  addition to troops, the Germans employed some 600,000
the northern third of the island   motor vehicles and between 600–700,000 horses.
of Great Britain, sharing a land
border to the south with the
Kingdom of England.
```

## More Examples
Read the latest npm issues:
```sh
$ curl -s https://api.github.com/repos/npm/npm/issues \
| array-tools pick number title updated_at user.login comments \
| column-layout
```
```
 8738  install: Run the "install"         2015-06-27T22:19:33Z  iarna
       lifecycle in the toplevel module
 8737  npm install (-g) (everything)      2015-06-27T22:15:52Z  DerekFoulk    2
       completely broken after upgrade
       to 2.12.0 [Windows]
 8736  node-gyp not executed on npm@3     2015-06-27T22:19:19Z  piranna       2
 8735  Graceful fs 4                      2015-06-27T21:12:57Z  isaacs
 8734  npm start failed dont get why its  2015-06-27T21:12:36Z  kashikhan1
       happened error windows_nt
       6.3.9600 error on npm start
 8733  npm install error "elliptic curve  2015-06-27T21:07:15Z  MF-Bra
       routines"
 8732  No clue what do                    2015-06-27T20:05:26Z  worldlynx
 8731  npm does not work on IPv6          2015-06-27T17:33:10Z  hobarrera
 8730  Pass module version on preversion  2015-06-27T17:11:57Z  zanona
       and postversion scripts.
 8729  problem installing cordova on      2015-06-27T14:28:35Z  axtens
       Windows
 8728  npm error                          2015-06-27T14:20:42Z  hyguyz
 8727  npm install error                  2015-06-27T13:40:56Z  wfgenius
 8726  Why can't I install the npm?       2015-06-27T17:37:51Z  PleasantPro   2
 etc.
 etc.
```

## Install
As a library:

```
$ npm install column-layout --save
```

As a command-line tool:
```
$ npm install -g column-layout
```

## API Reference

* [column-layout](#module_column-layout)
  * [columnLayout(data, [options])](#exp_module_column-layout--columnLayout) ⇒ <code>string</code> ⏏
    * _static_
      * [.lines()](#module_column-layout--columnLayout.lines) ⇒ <code>Array</code>
    * _inner_
      * [~columnOption](#module_column-layout--columnLayout..columnOption)

<a name="exp_module_column-layout--columnLayout"></a>
### columnLayout(data, [options]) ⇒ <code>string</code> ⏏
Returns JSON data formatted in columns.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>array</code> | input data |
| [options] | <code>object</code> | optional settings |
| [options.viewWidth] | <code>number</code> | maximum width of layout |
| [options.columns] | <code>[columnOption](#module_column-layout--columnLayout..columnOption)</code> | array of column options |
| [options.padding] | <code>object</code> | Padding values to set on each column. Per-column overrides can be set in the `options.columns` array. |
| [options.padding.left] | <code>string</code> |  |
| [options.padding.right] | <code>string</code> |  |

**Example**  
```js
> columnFormat = require("column-format")
> jsonData = [{
    col1: "Some text you wish to read in column layout",
    col2: "And some more text in column two. "
}]
> columnFormat(jsonData, { viewWidth: 30 })
' Some text you  And some more \n wish to read   text in       \n in column      column two.   \n layout                       \n'
```
<a name="module_column-layout--columnLayout.lines"></a>
#### columnLayout.lines() ⇒ <code>Array</code>
Identical to [column-layout](#module_column-layout) with the exception of the rendered result being returned as an array of lines, rather that a single string.

**Kind**: static method of <code>[columnLayout](#exp_module_column-layout--columnLayout)</code>  
**Example**  
```js
> columnFormat = require("column-format")
> jsonData = [{
     col1: "Some text you wish to read in column layout",
     col2: "And some more text in column two. "
}]
> columnFormat.lines(jsonData, { viewWidth: 30 })
[ ' Some text you  And some more ',
' wish to read   text in       ',
' in column      column two.   ',
' layout                       ' ]
```
<a name="module_column-layout--columnLayout..columnOption"></a>
#### columnLayout~columnOption
**Kind**: inner typedef of <code>[columnLayout](#exp_module_column-layout--columnLayout)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | column width |
| maxWidth | <code>number</code> | column max width |
| nowrap | <code>boolean</code> | disable wrapping for this column |
| padding | <code>object</code> | padding options |
| padding.left | <code>string</code> | a string to pad the left of each cell (default: `" "`) |
| padding.right | <code>string</code> | a string to pad the right of each cell (default: `" "`) |


* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
