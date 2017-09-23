#!/usr/bin/env node

'use strict'

var w3clink = require('../src/w3clink');
var program = require('commander');
const version = "1.0.0";


var cliApp = function () {

    program.version(version)
        .option('check, --check <url> [verbose] [onlyhtml] [suggestions]', 'Validate links and html both');

    program.parse(process.argv);

    if (typeof program.check != 'undefined') {
        var url = program.check;
        w3clink.init({
            localUrl : url,
            verbose : program.args.indexOf('verbose') != -1,
            onlyhtml : program.args.indexOf('onlyhtml') != -1,
            suggestions : program.args.indexOf('suggestions') != -1
        });
        w3clink.exec();
    }

    return true;

}

module.exports.cliApp = cliApp;

cliApp();







