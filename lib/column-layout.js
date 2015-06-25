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
    
    if (options.columns){
        options.columns = options.columns.map(function(columnOptions){
            if (columnOptions.nowrap) {
                columnOptions.width = getColumnWidth(self.data, columnOptions.name);
            }
            return columnOptions;
        });
    } else {
        options.columns = getUniquePropertyNames(this.data).map(function(column){
            return { name: column, width: getColumnWidth(self.data, column) };
        });
        var totalWidth = total(options.columns, "width");
        var widthDiff = totalWidth + (options.columns.length * 2) - options.viewWidth;
        // console.log(totalWidth, options.viewWidth, widthDiff);
        if (widthDiff > 0){
            a.sortBy(options.columns, "width");
            var widestColumn = a(options.columns).last();
            widestColumn.width -= widthDiff;
        }
        // console.log(options.columns);
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

ColumnLayout.prototype.getVal = function(col, val){
    return s.padRight(val || "", this.getColumnOptionsWidth(col) + 2);
};

ColumnLayout.prototype.getColumnOptionsWidth = function(col){
    var column = a.findWhere(this.options.columns, { name: col });
    return (column && column.width) || null;
};

ColumnLayout.prototype.getLongestLine = function(col){
    return this.data.reduce(function(longestLine, row){
        
    }, 0);
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
