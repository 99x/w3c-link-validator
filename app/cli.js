#!/usr/bin/env node

'use strict'

var localw3c = require('./lib/localw3c');
var program = require('commander');
const version = "1.0.0";


program.version(version)
    .option('-a, --all <url>', 'Validate links and html both');


program.parse(process.argv);

if(typeof program.all != 'undefined'){
    var url = program.all;
    localw3c.init({
        localUrl : url
    });
    localw3c.exec();
}








