#!/usr/bin/env node
"use strict";
var columnLayout = require("../");
var tr = require("transform-tools");
var cliArgs = require("command-line-args");

var options = cliArgs([
    { name: "width", type: Array, alias: "w" }
]).parse();

var columns = [];
if (options.width){
    options.width.forEach(function(columnWidth){
        var split = columnWidth.split(":").map(function(item){
            return item.trim();
        });
        if (split[0] && split[1]){
            columns.push({ name: split[0], width: Number(split[1]) });
        }
    })
}

process.stdin
    .pipe(tr.collectJson({ through: function(json){
        var clOptions = { viewWidth: process.stdout.columns };
        if (columns.length) clOptions.columns = columns;
        return columnLayout(json, clOptions);
    }}))
    .pipe(process.stdout);
