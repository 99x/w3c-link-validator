const url = require('url');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const links = require('./links');
const htmlvalidator = require('./htmlvalidator');


var globalOptions = {
    localUrl : '',
    localHost : ''
};




var initValidator = function (options) {
    if(typeof globalOptions.localUrl != 'undefined') {
        globalOptions.localUrl = options.localUrl;
        globalOptions.localHost = url.parse(options.localUrl).host;
    }
    else {
        throw 'Local URL is required!';
    }
};

var runValidator =  function(rootUrl){
    if(typeof rootUrl == 'undefined')
        rootUrl = globalOptions.localUrl;

    var urlinfo = url.parse(rootUrl);
    var _link = urlinfo.href;
    var _base = path.basename(urlinfo.pathname);


    console.log(chalk.black.bgWhite.bold('VALIDATION RUNNING ON '));
    console.log('URL : ' + _link);
    console.log('BASE : ' + _base);
    console.log(chalk.bold('------------'));


    request(rootUrl, function (error, response, body) {
        var $ = cheerio.load(body);
        links.linkChecker($, rootUrl);
        htmlvalidator.validateHtml($)
    });





};


module.exports.init = initValidator;
module.exports.run = runValidator;


initValidator({localUrl : 'http://localhost:80/test/examples.html'});
runValidator();