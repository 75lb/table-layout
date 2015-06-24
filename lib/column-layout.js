"use strict";
var wrap = require("word-wrap");
var s = require("string-tools");
var a = require("array-tools");
var o = require("object-tools");

module.exports = columns;

function columns(data, options){
    options = options || {};
    if (data.options && data.data){
        options = o.extend(data.options, options);
        data = data.data;
    }
    var columns = options.columns;
    return data.reduce(function(prev, row){
        return prev + Object.keys(row).reduce(function(prev, col){
            var colValue = wrap(String(row[col] || ""), { width: getWidth(columns, col), trim: true }).split(/\n/);
            if (prev !== null){
                var prevSplit = prev.split(/\n/);
                for (var i = 0; i < Math.max(colValue.length, prevSplit.length); i++){
                    colValue[i] = getVal(columns, col, prevSplit[i]) + getVal(columns, col, colValue[i]);
                }
            }
            return colValue.join("\n");
        }, null) + "\n";
    }, "");
}

function getVal(columns, col, val){
    return s.padRight(val || "", getWidth(columns, col) + 2);
}

function getWidth(columns, col){
    var column = a.findWhere(columns, { name: col });
    return (column && column.width) || 40;
}