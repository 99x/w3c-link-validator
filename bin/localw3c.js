#!/usr/bin/env node

'use strict'

var localw3c = require('../src/localw3c');
var program = require('commander');
const version = "1.0.0";


var cliApp = function () {

    program.version(version)
        .option('check, --check <url> [verbose] [onlyhtml]', 'Validate links and html both');

    program.parse(process.argv);

    if (typeof program.check != 'undefined') {
        var url = program.check;
        localw3c.init({
            localUrl: url,
            verbose: program.args.indexOf('verbose') != -1,
            onlyhtml: program.args.indexOf('onlyhtml') != -1
        });
        localw3c.exec();
    }

    return true;

}

module.exports.cliApp = cliApp;

cliApp();







