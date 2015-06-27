"use strict";
var wrap = require("word-wrap");
var s = require("string-tools");
var a = require("array-tools");
var o = require("object-tools");
var t = require("typical");

module.exports = columnLayout;

function columnLayout(data, options){
    /* option to display all unique field names  */
    var cols = ColumnLayout(data, options);
    return cols.toString();
}

function ColumnLayout(data, options){
    if (!(this instanceof ColumnLayout)) return new ColumnLayout(data, options);
    var self = this;
    options = options || { 
        viewWidth: 100
    };

    /* split input into data and options */
    if (!Array.isArray(data)){
        if (data.options && data.data){
            options = o.extend(data.options, options);
            data = data.data;
        } else {
            throw new Error("Invalid input data");
        }
    }
    this.options = options;
    this.data = data;

    /* get rows which require column layout */
    var rows = a(data).where(function(row){
        return t.isObject(row);
    }).val();

    /* if no column options supplied, create them.. */
    if (!options.columns){
        options.columns = getUniquePropertyNames(rows).map(createColumnOption);
    }

    /* for 'nowrap' columns, or columns with no specific width, set the width to the content width */
    options.columns.forEach(function(columnOption){
        if (typeof columnOption.width === "undefined" || columnOption.nowrap){
            columnOption = autosizeColumn(rows, columnOption);
        }
        return columnOption;
    });

    var totalContentWidth = sum(options.columns, "width");
    var widthDiff = totalContentWidth - options.viewWidth;

    /* make adjustments if the total width is above the available width */
    if (widthDiff > 0){
        autoSizeColumnWidths(options.columns, options.viewWidth, rows)
    }

    this.dataSplit = this.data.map(renderRow.bind(null, options.columns));
}

ColumnLayout.prototype.toString = function(){
    return this.dataSplit.reduce(function(output, row){
        output += mergeArrays(row).join("\n") + "\n";
        return output;
    }, "");
};

function getLongestItem(array){
    return array.reduce(function(longest, item){
        if (!Array.isArray(item)) item = String(item);
        if (item.length > longest) longest = item.length;
        return longest;
    }, 0);
}

function mergeArrays(arrays){
    return arrays.reduce(function(merged, array){
        if (merged === null){
            merged = array;
        } else {
            merged = merged.map(function(item, index){
                return item + array[index];
            });
        }
        return merged;
    }, null);
}

function getUniquePropertyNames(rows){
    return rows.reduce(function(keys, row){
        Object.keys(row).forEach(function(key){
            if (!a.contains(keys, key)) keys.push(key);
        });
        return keys;
    }, []);
}

/**
@param {array} - input array
@param [propertyName] {string} - if the input array is a recordset, sum values from this property
*/
function sum(array, property){
    return array.reduce(function(total, item){
        return total + Number(property ? item[property] : item);
    }, 0);
}

function getWrappableColumns(rows, columnOptions){
    var wrappableColumns = columnsContaining(rows, /\s+/);
    return wrappableColumns.filter(function(wrappableCol){
        return !getColumnOption(columnOptions, wrappableCol).nowrap;
    });
}

function getUnWrappableColumns(rows, columnOptions){
    return a(columnOptions)
        .pluck("name")
        .without(getWrappableColumns(rows, columnOptions))
        .val();
}

function getCellLines(columnOptions, row, column){
    var cellValue = row[column];
    var width = getColumnOption(columnOptions, column).width;
    cellValue = String(typeof cellValue === "undefined" || cellValue === null ? "" : cellValue);
    cellValue = wrap(cellValue, { width: width - 2, trim: true, indent: "" });
    var cellLines = cellValue.split(/\n/).map(padCell.bind(null, width));
    return cellLines;
}

/**
converts a row (object) into an array of "cellLines" arrays, with an equal number of lines, each line padded to the specified column width
*/
function renderRow(columnOptions, row){

    if (typeof row === "string"){
        return [ [ row ] ];
    } else {
        /* create a cellLines array for each column */
        var cellLinesRow = Object.keys(row).map(getCellLines.bind(null, columnOptions, row));

        /* ensure each cellLines array has the same amount of lines */
        if (cellLinesRow.length > 1){
            var mostLines = getLongestItem(cellLinesRow);
            cellLinesRow = cellLinesRow.map(function(cellLines, index){
                var width = getColumnOption(columnOptions, Object.keys(row)[index]).width;
                for (var i = 0; i < mostLines; i++){
                    if (typeof cellLines[i] === "undefined") cellLines.push(padCell(width, ""));
                }
                return cellLines;
            });
        }
        return cellLinesRow;
    }
}

function padCell(width, value){
    return " " + s.padRight(value, width - 2) + " ";
}

function autoSizeColumnWidths(columnOptions, viewWidth, data){
    var wrappableColumns = getWrappableColumns(data, columnOptions);
    var unWrappableColumns = getUnWrappableColumns(data, columnOptions);
    var totalWidthOfUnwrappableColumns = sum(
        a(columnOptions).where(unWrappableColumns.map(function(colName){ 
            return { name: colName }; 
        })).val(),
        "width"
    );
    var remainingWidth = viewWidth - totalWidthOfUnwrappableColumns;
    var reductionShare = Math.floor(remainingWidth / wrappableColumns.length);
    wrappableColumns.forEach(function(columnName){
        getColumnOption(columnOptions, columnName).width = reductionShare;
    });
}

function autosizeColumn(rows, columnOption){
    var columnValues = a.pluck(rows, columnOption.name);
    columnOption.width = getLongestItem(columnValues) + 2;
    return columnOption;
}

function createColumnOption(name){
    return { name: name };
}

function getColumnOption(columnOptions, columnName){
    var columnOption = a(columnOptions).findWhere({ name: columnName });
    if (!columnName) throw Error("Could not find column options for: " + columnName);
    return columnOption;
}

function columnsContaining(rows, test){
    return rows.reduce(function(columns, row){
        o.each(row, function(val, key){
            if (test.test(String(val).trim())){
                if (!a(columns).contains(key)) columns.push(key);
            }
        });
        return columns;
    }, []);
}
