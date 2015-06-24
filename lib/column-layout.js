"use strict";
var wrap = require("word-wrap");
var s = require("string-tools");
var a = require("array-tools");
var o = require("object-tools");

module.exports = columnLayout;

function columnLayout(data, options){
    var cols = Columns(data, options);
    return cols.toString();
}

function Columns(data, options){
    if (!(this instanceof Columns)) return new Columns(data, options);
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
}

Columns.prototype.toString = function(){
    var self = this;
    return this.data.reduce(function(prev, row){
        return prev + Object.keys(row).reduce(function(prev, col){
            var colValue = wrap(String(row[col] || ""), { width: self.getWidth(col), trim: true }).split(/\n/);
            if (prev !== null){
                var prevSplit = prev.split(/\n/);
                for (var i = 0; i < Math.max(colValue.length, prevSplit.length); i++){
                    colValue[i] = self.getVal(col, prevSplit[i]) + self.getVal(col, colValue[i]);
                }
            }
            return colValue.join("\n");
        }, null) + "\n";
    }, "");
};

Columns.prototype.getVal = function(col, val){
    return s.padRight(val || "", this.getWidth(col) + 2);
};

Columns.prototype.getWidth = function(col){
    var column = a.findWhere(this.options.columns, { name: col });
    return (column && column.width) || 40;
};
