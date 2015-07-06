#!/usr/bin/env node
"use strict";
var columnLayout = require("../");
var tr = require("transform-tools");
var cliArgs = require("command-line-args");
var pkg = require("../package");
var collectJson = require("collect-json");
var ansi = require("ansi-escape-sequences");

var cli = cliArgs([
    { name: "help", type: Boolean, alias: "h" },
    { name: "width", type: String, multiple: true, alias: "w", description: "specify a list of column widths in the format '<column>:<width>', for example:\n$ cat <json data> | column-layout --width \"column 1: 10\" \"column 2: 30\"" }
]);
var options = cli.parse();

if (options.help){
    console.error(cli.getUsage({
        title: "column-layout",
        description: "Pretty-print JSON data in columns",
        header: pkg.description,
        forms: [
            "$ cat <json data> | column-format <options>"
        ]
    }));
    process.exit(0);
}

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
    .pipe(collectJson(function(json){
        var clOptions = { viewWidth: process.stdout.columns };
        if (columns.length) clOptions.columns = columns;
        return columnLayout(json, clOptions);
    }))
    .on("error", function(err){
        console.error(ansi.format(err.message, "red"));
        process.exit(1);
    })
    .pipe(process.stdout);
