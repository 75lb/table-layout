[![view on npm](http://img.shields.io/npm/v/column-layout.svg)](https://www.npmjs.org/package/column-layout)
[![npm module downloads per month](http://img.shields.io/npm/dm/column-layout.svg)](https://www.npmjs.org/package/column-layout)
[![Build Status](https://travis-ci.org/75lb/column-layout.svg?branch=master)](https://travis-ci.org/75lb/column-layout)
[![Dependency Status](https://david-dm.org/75lb/column-layout.svg)](https://david-dm.org/75lb/column-layout)

# column-layout
Pretty-print JSON data in columns.

## Synopsis
Say you have some data:
```json
[
    { 
        "column 1": "The Kingdom of Scotland was a state in north-west Europe traditionally said to have been founded in 843, which joined with the Kingdom of England to form a unified Kingdom of Great Britain in 1707. Its territories expanded and shrank, but it came to occupy the northern third of the island of Great Britain, sharing a land border to the south with the Kingdom of England. It suffered many invasions by the English, but under Robert I it fought a successful war of independence and remained a distinct state in the late Middle Ages. In 1603, James VI of Scotland became King of England, joining Scotland with England in a personal union. In 1707, the two kingdoms were united to form the Kingdom of Great Britain under the terms of the Acts of Union. ", 
        "column 2": "Operation Barbarossa (German: Unternehmen Barbarossa) was the code name for Nazi Germany's invasion of the Soviet Union during World War II, which began on 22 June 1941. Over the course of the operation, about four million soldiers of the Axis powers invaded Soviet Russia along a 2,900 kilometer front, the largest invasion force in the history of warfare. In addition to troops, the Germans employed some 600,000 motor vehicles and between 600–700,000 horses. The operation was driven by Adolf Hitler's ideological desire to conquer the Soviet territories as outlined in his 1925 manifesto Mein Kampf ('My Struggle'). It marked the beginning of the rapid escalation of the war, both geographically and in the formation of the Allied coalition."
    }
]
```

pipe it through `column-layout`:
```sh
$ cat example/two-columns.json | column-layout
```

to get this:
```
 The Kingdom of Scotland was a state in  Operation Barbarossa (German:
 north-west Europe traditionally said    Unternehmen Barbarossa) was the code
 to have been founded in 843, which      name for Nazi Germany's invasion of
 joined with the Kingdom of England to   the Soviet Union during World War II,
 form a unified Kingdom of Great         which began on 22 June 1941. Over the
 Britain in 1707. Its territories        course of the operation, about four
 expanded and shrank, but it came to     million soldiers of the Axis powers
 occupy the northern third of the        invaded Soviet Russia along a 2,900
 island of Great Britain, sharing a      kilometer front, the largest invasion
 land border to the south with the       force in the history of warfare. In
 Kingdom of England. It suffered many    addition to troops, the Germans
 invasions by the English, but under     employed some 600,000 motor vehicles
 Robert I it fought a successful war of  and between 600–700,000 horses. The
 independence and remained a distinct    operation was driven by Adolf Hitler's
 state in the late Middle Ages. In       ideological desire to conquer the
 1603, James VI of Scotland became King  Soviet territories as outlined in his
 of England, joining Scotland with       1925 manifesto Mein Kampf ('My
 England in a personal union. In 1707,   Struggle'). It marked the beginning of
 the two kingdoms were united to form    the rapid escalation of the war, both
 the Kingdom of Great Britain under the  geographically and in the formation of
 terms of the Acts of Union.             the Allied coalition.
```

Columns containing wrappable data are auto-sized by default to fit the available space. You can set specific widths using `--width` 

```sh
$ cat example/two-columns.json | column-layout --width "column 2: 45"
```
```
 The Kingdom of Scotland was a      Operation Barbarossa (German: Unternehmen
 state in north-west Europe         Barbarossa) was the code name for Nazi
 traditionally said to have been    Germany's invasion of the Soviet Union
 founded in 843, which joined with  during World War II, which began on 22 June
 the Kingdom of England to form a   1941. Over the course of the operation,
 unified Kingdom of Great Britain   about four million soldiers of the Axis
 in 1707. Its territories expanded  powers invaded Soviet Russia along a 2,900
 and shrank, but it came to occupy  kilometer front, the largest invasion force
 the northern third of the island   in the history of warfare. In addition to
 of Great Britain, sharing a land   troops, the Germans employed some 600,000
 border to the south with the       motor vehicles and between 600–700,000
 Kingdom of England. It suffered    horses. The operation was driven by Adolf
 many invasions by the English,     Hitler's ideological desire to conquer the
 but under Robert I it fought a     Soviet territories as outlined in his 1925
 successful war of independence     manifesto Mein Kampf ('My Struggle'). It
 and remained a distinct state in   marked the beginning of the rapid
 the late Middle Ages. In 1603,     escalation of the war, both geographically
 James VI of Scotland became King   and in the formation of the Allied
 of England, joining Scotland with  coalition.
 England in a personal union. In
 1707, the two kingdoms were
 united to form the Kingdom of
 Great Britain under the terms of
 the Acts of Union.
```

Plain strings in the input data are passed straight through to the output - useful for injecting lines around the column layout:

```sh
$ cat example/usage.json | column-layout
```
<pre><code><strong>Example App</strong>
This is an example app, yeah?

<strong>Usage</strong>
$ example one two

 -t, --template   blah blah blah blah blah blah blah blah blah blah blah blah
                  blah blah blah blah blah blah
 -v, --verbose    yeah yeah yeah
 -s, --something  bang bang bang bang bang bang bang bang bang bang bang bang
                  bang bang bang bang bang bang bang bang bang bang bang bang
                  bang bang bang bang bang bang
                  
This is the footer
</code></pre>

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
<a name="module_column-layout--columnLayout..columnOption"></a>
#### columnLayout~columnOption
**Kind**: inner typedef of <code>[columnLayout](#exp_module_column-layout--columnLayout)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | column width |
| nowrap | <code>boolean</code> | disable wrapping for this column |
| padding | <code>object</code> | padding options |
| padding.left | <code>string</code> | a string to pad the left of each cell (default: `" "`) |
| padding.right | <code>string</code> | a string to pad the right of each cell (default: `" "`) |


* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
