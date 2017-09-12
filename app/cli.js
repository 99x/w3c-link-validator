#!/usr/bin/env node

'use strict'

var localw3c = require('./lib/localw3c');
var args = process.argv;

if(typeof args[2] != 'undefined'){
    var url = args[2];
    localw3c.init({
        localUrl : url
    });
    localw3c.run();
}







