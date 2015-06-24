"use strict";
var wrap = require("word-wrap");
var s = require("string-tools");

module.exports = columns;

function columns(data, options){
    options = options || {};

    return data.reduce(function(prev, row){
        return prev + Object.keys(row).reduce(function(prev, col){
            var colValue = wrap(row[col], { width: 40, trim: true }).split(/\n/);
            if (prev !== null){
                var prevSplit = prev.split(/\n/);
                for (var i = 0; i < Math.max(colValue.length, prevSplit.length); i++){
                    colValue[i] = getVal(prevSplit[i]) + getVal(colValue[i]);
                }
            }
            return colValue.join("\n") + "\n";
        }, null);
    }, "");
}

function getVal(val){
    return s.padRight(val, 42);
}
