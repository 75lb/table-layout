<a name="module_table-layout"></a>

## table-layout

* [table-layout](#module_table-layout)
    * [Table](#exp_module_table-layout--Table) ⏏
        * [new Table(data, [options])](#new_module_table-layout--Table_new)
        * [table.load(data)](#module_table-layout--Table+load)
        * [table.renderLines()](#module_table-layout--Table+renderLines) ⇒ <code>Array.&lt;string&gt;</code>
        * [table.toString()](#module_table-layout--Table+toString) ⇒ <code>string</code>
        * [Table~columnOption](#module_table-layout--Table..columnOption)

<a name="exp_module_table-layout--Table"></a>

### Table ⏏
Recordset data in (array of objects), text table out.

**Kind**: Exported class  
<a name="new_module_table-layout--Table_new"></a>

#### new Table(data, [options])
**Params**

- data <code>Array.&lt;object&gt;</code> - input data
- [options] <code>object</code> - optional settings
    - [.maxWidth] <code>number</code> - maximum width of layout
    - [.noWrap] <code>boolean</code> - disable wrapping on all columns
    - [.noTrim] <code>boolean</code> - disable line-trimming
    - [.break] <code>boolean</code> - enable word-breaking on all columns
    - [.columns] [<code>columnOption</code>](#module_table-layout--Table..columnOption) - array of column-specific options
    - [.ignoreEmptyColumns] <code>boolean</code> - If set, empty columns or columns containing only whitespace are not rendered.
    - [.padding] <code>object</code> - Padding values to set on each column. Per-column overrides can be set in the `options.columns` array.
        - [.left] <code>string</code> - Defaults to a single space.
        - [.right] <code>string</code> - Defaults to a single space.
    - [.eol] <code>string</code> - EOL character used. Defaults to `\n`.

**Example**  
```js
> Table = require('table-layout')
> jsonData = [{
  col1: 'Some text you wish to read in table layout',
  col2: 'And some more text in column two. '
}]
> table = new Table(jsonData, { maxWidth: 30 })
> console.log(table.toString())
 Some text you  And some more
 wish to read   text in
 in table      column two.
 layout
```
<a name="module_table-layout--Table+load"></a>

#### table.load(data)
Set the input data to display. Must be an array of objects.

**Kind**: instance method of [<code>Table</code>](#exp_module_table-layout--Table)  
**Params**

- data <code>Array.&lt;object&gt;</code>

<a name="module_table-layout--Table+renderLines"></a>

#### table.renderLines() ⇒ <code>Array.&lt;string&gt;</code>
Identical to `.toString()` with the exception that the result will be an array of lines, rather than a single, multi-line string.

**Kind**: instance method of [<code>Table</code>](#exp_module_table-layout--Table)  
<a name="module_table-layout--Table+toString"></a>

#### table.toString() ⇒ <code>string</code>
Returns the input data as a text table.

**Kind**: instance method of [<code>Table</code>](#exp_module_table-layout--Table)  
<a name="module_table-layout--Table..columnOption"></a>

#### Table~columnOption
**Kind**: inner typedef of [<code>Table</code>](#exp_module_table-layout--Table)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | column name, must match a property name in the input |
| [width] | <code>number</code> | A specific column width. Supply either this or a min and/or max width. |
| [minWidth] | <code>number</code> | column min width |
| [maxWidth] | <code>number</code> | column max width |
| [nowrap] | <code>boolean</code> | disable wrapping for this column |
| [break] | <code>boolean</code> | enable word-breaking for this columns |
| [padding] | <code>object</code> | padding options |
| [padding.left] | <code>string</code> | a string to pad the left of each cell (default: `' '`) |
| [padding.right] | <code>string</code> | a string to pad the right of each cell (default: `' '`) |
| [get] | <code>function</code> | A getter function to return the cell value. |

