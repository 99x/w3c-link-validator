#!/usr/bin/env node

'use strict'

var localw3c = require('../src/localw3c');
var program = require('commander');
const version = "1.0.0";


program.version(version)
    .option('check, --check <url> [verbose]', 'Validate links and html both');


program.parse(process.argv);

if(typeof program.check != 'undefined'){
    var url = program.check;
    localw3c.init({
        localUrl : url,
        verbose : program.args.indexOf('verbose') != -1
    });
    localw3c.exec();
}

console.log(program.args);









