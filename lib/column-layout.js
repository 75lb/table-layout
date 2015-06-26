"use strict";
var wrap = require("word-wrap");
var s = require("string-tools");
var a = require("array-tools");
var o = require("object-tools");

module.exports = columnLayout;

function columnLayout(data, options){
    /* option to display all unique field names  */
    var cols = ColumnLayout(data, options);
    return cols.toString();
}

function ColumnLayout(data, options){
    if (!(this instanceof ColumnLayout)) return new ColumnLayout(data, options);
    var self = this;
    options = options || {};
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
    
    /* for 'nowrap' columns, set the width to that of the widest value in the column */
    if (options.columns){
        options.columns = options.columns.map(function(columnOptions){
            if (columnOptions.nowrap) {
                columnOptions.width = getColumnWidth(self.data, columnOptions.name);
            }
            return columnOptions;
        });

    /* if no column options supplied, create them. */
    } else {
        options.columns = getUniquePropertyNames(this.data).map(function(column){
            return { name: column, width: getColumnWidth(self.data, column) };
        });
        var totalWidth = total(options.columns, "width");
        var widthDiff = totalWidth + (options.columns.length * 2) - options.viewWidth;
        
        /* make adjustments if the total width is above the available width */
        if (widthDiff > 0){
            var wrappableColumns = getWrappableColumns(data);
            var unWrappableColumns = getUnWrappableColumns(data);
            var totalWidthOfUnwrappableColumns = total(unWrappableColumns, "width");
            var remainingWidth = options.viewWidth - totalWidthOfUnwrappableColumns;
            var reductionShare = Math.floor(remainingWidth / wrappableColumns.length);
            wrappableColumns.forEach(function(columnName){
                a(options.columns).findWhere({ name: columnName }).width = reductionShare - 2;
            });
            
            // var wrappableColumns = getWrappableColumns(data);
            // if (wrappableColumns.length){
            //     var reductionShare = Math.floor(widthDiff / wrappableColumns.length);
            //     console.log(totalWidth, options.viewWidth, wrappableColumns.length, reductionShare);
            //     wrappableColumns.forEach(function(columnName){
            //         a(options.columns).findWhere({ name: columnName }).width -= reductionShare;
            //     });
            //     console.log(options.columns);
            // }
            
            // a.sortBy(options.columns, "width");
            // var widestColumn = a(options.columns).last();
            // widestColumn.width -= widthDiff;
        }
    }

    this.dataSplit = this.data.map(function(row){
        
        /* create a cellLines array for each column */
        var cells = Object.keys(row).map(function(col){
            var cellValue = String(typeof row[col] === "undefined" || row[col] === null ? "" : row[col]);
            var columnOptions = a(self.options.columns).findWhere({ name: col });
            cellValue = wrap(cellValue, { width: columnOptions.width, trim: true });
            var cellLines = cellValue.split(/\n/).map(function(cellLine){
                return s.padRight(cellLine, columnOptions.width + 2);
            });
            return cellLines;
        });
        
        /* fill empty cell lines */
        if (cells.length > 1){
            var mostLines = getMostLines(cells);
            cells = cells.map(function(cellLines, index){
                var columnOptions = a(self.options.columns).findWhere({ name: Object.keys(row)[index] });
                for (var i = 0; i < mostLines; i++){
                    if (typeof cellLines[i] === "undefined") cellLines.push(s.repeat(" ", columnOptions.width + 2));
                }
                return cellLines;
            });
        }
        return cells;
    });
}

ColumnLayout.prototype.toString = function(){
    return this.dataSplit.reduce(function(output, row){
        output += mergeArrays(row).join("\n") + "\n";
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

function getMostLines(cells){
    return cells.reduce(function(mostLines, cell){
        if (cell.length > mostLines) mostLines = cell.length;
        return mostLines;
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

function getUniquePropertyNames(recordset){
    return recordset.reduce(function(propertyNames, record){
        Object.keys(record).forEach(function(key){
            if (!a.contains(propertyNames, key)) propertyNames.push(key);
        });
        return propertyNames;
    }, []);
}

function total(recordset, columnName){
    return recordset.reduce(function(total, row){
        return total + Number(row[columnName]);
    }, 0);
}

function getWrappableColumns(recordset){
    return recordset.reduce(function(wrappable, record){
        o.each(record, function(val, key){
            if (/\s+/.test(String(val).trim())){
                if (!a(wrappable).contains(key)) wrappable.push(key);
            }
        });
        return wrappable;
    }, []);
}
function getUnWrappableColumns(recordset){
    return a(recordset)
        .without(getWrappableColumns(recordset))
        .pluck("name")
        .val();
}
