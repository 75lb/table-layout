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
    // cols.toString(); return ""
}

function ColumnLayout(data, options){
    if (!(this instanceof ColumnLayout)) return new ColumnLayout(data, options);
    var self = this;
    options = options || { viewWidth: 100 };

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
    options.columns = a(options.columns)
        .where(function(columnOption){
            return typeof columnOption.width === "undefined" || columnOption.nowrap;
        })
        .map(autosizeColumn.bind(null, rows))
        .val();

    var totalContentWidth = total(options.columns, "width");
    var widthDiff = totalContentWidth + (options.columns.length * 2) - options.viewWidth;

    /* make adjustments if the total width is above the available width */
    if (widthDiff > 0){
        autoSizeColumnWidths(options.columns, options.viewWidth, rows)
    }

    // console.log(options);

    this.dataSplit = this.data.map(renderRow.bind(null, options.columns));
    // console.log(this.dataSplit);
}

ColumnLayout.prototype.toString = function(){
    return this.dataSplit.reduce(function(output, row){
        output += mergeArrays(row).join("\n") + "\n";
        // console.dir(output);
        return output;
    }, "");
};

function getColumnWidth(data, columnName){
    return data.reduce(function(columnWidth, row){
        var width = String(row[columnName]).length;
        if (width > columnWidth) columnWidth = width;
        return columnWidth;
    }, 0);
}

function getMostLines(cellLinesRow){
    return cellLinesRow.reduce(function(mostLines, cellLines){
        if (cellLines.length > mostLines) mostLines = cellLines.length;
        return mostLines;
    }, 0);
}

function mergeArrays(arrays){
    // console.dir(arrays);
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

function total(rows, columnName){
    return rows.reduce(function(total, row){
        return total + Number(row[columnName]);
    }, 0);
}

function getWrappableColumns(rows, columnOptions){
    var wrappableColumns = rows.reduce(function(wrappable, row){
        o.each(row, function(val, key){
            if (/\s+/.test(String(val).trim())){
                if (!a(wrappable).contains(key)) wrappable.push(key);
            }
        });
        return wrappable;
    }, []);
    return a(wrappableColumns).where(function(wrappableCol){
        var colOption = a(columnOptions).findWhere({ name: wrappableCol });
        return !(colOption.nowrap || colOption.line);
    }).val();
}

function getUnWrappableColumns(rows, columnOptions){
    return a(columnOptions)
        .pluck("name")
        .without(getWrappableColumns(rows, columnOptions))
        .val();
}

function getCellLines(columnOptions, row, column){
    var cellValue = row[column];
    var width = a(columnOptions).findWhere({ name: column }).width;
    cellValue = String(typeof cellValue === "undefined" || cellValue === null ? "" : cellValue);
    cellValue = wrap(cellValue, { width: width, trim: true });
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
            var mostLines = getMostLines(cellLinesRow);
            cellLinesRow = cellLinesRow.map(function(cellLines, index){
                var width = a(columnOptions).findWhere({ name: Object.keys(row)[index] }).width;
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
    return s.padRight(value, width + 2);
}

function autoSizeColumnWidths(columnOptions, viewWidth, data){
    var wrappableColumns = getWrappableColumns(data, columnOptions);
    var unWrappableColumns = getUnWrappableColumns(data, columnOptions);
    var totalWidthOfUnwrappableColumns = total(
        a(columnOptions).where(function(col){
            return a(unWrappableColumns).contains(col.name);
        }).val(),
        "width"
    );
    var remainingWidth = viewWidth - totalWidthOfUnwrappableColumns;
    var reductionShare = Math.floor(remainingWidth / wrappableColumns.length);
    wrappableColumns.forEach(function(columnName){
        a(columnOptions).findWhere({ name: columnName }).width = reductionShare - 2;
    });
}

function autoSizeColumnWidth(columnOption, viewWidth, data){
    var wrappableColumns = getWrappableColumns(data, columnOptions);
    var unWrappableColumns = getUnWrappableColumns(data, columnOptions);
    var totalWidthOfUnwrappableColumns = total(
        a(columnOptions).where(function(col){
            return a(unWrappableColumns).contains(col.name);
        }).val(),
        "width"
    );
    var remainingWidth = viewWidth - totalWidthOfUnwrappableColumns;
    var reductionShare = Math.floor(remainingWidth / wrappableColumns.length);
    wrappableColumns.forEach(function(columnName){
        a(columnOptions).findWhere({ name: columnName }).width = reductionShare - 2;
    });
}

function autosizeColumn(rows, columnOption){
    columnOption.width = getColumnWidth(rows, columnOption.name);
    return columnOption;
}

function createColumnOption(name){
    return { name: name };
}
