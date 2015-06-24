#!/usr/bin/env node
"use strict";
var columns = require("../");
var tr = require("transform-tools");

process.stdin
    .pipe(tr.collectJson({ through: function(json){
        return columns(json, { viewWidth: process.stdout.columns });
    }}))
    .pipe(process.stdout);
