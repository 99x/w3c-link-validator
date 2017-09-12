const url = require('url');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const _status = require('./status');

var globalOptions = {
    localUrl : '',
    localHost : ''
};
var crawledUrls = [];



var isLocal = function (link) {
    var urlinfo = url.parse(link);
    var host = urlinfo.host;
    return (host == globalOptions.localHost || host==null);
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
    console.log(urlinfo);
    var _link = urlinfo.href;
    var _base = path.basename(urlinfo.pathname);


    console.log(chalk.green.bold('VALIDATION RUNNING ON '));
    console.log('URL : ' + _link);
    console.log('base : ' + _base);


    request(rootUrl, function (error, response, body) {
        var $ = cheerio.load(body);
        var links = $('a');

        links.each(function (i, elm) {
            if (typeof elm.attribs != 'undefined') {
                if (typeof elm.attribs.href != 'undefined') {
                    var innerLink = elm.attribs.href;
                    if(isLocal(innerLink)){
                        //if(!isAbsolute(innerLink))
                            innerLink = url.resolve(rootUrl,innerLink);
                        request(innerLink, function (error, response, body) {
                           if(!error) {
                               console.log('LINK ', chalk.yellow(innerLink) + ' ' + _status.showStatus(response.statusCode));
                               if(response.statusCode != 200){
                                   console.log(chalk.red('Problem on '));
                                   console.log(chalk.white($.html(elm)));
                               }
                           }
                        });
                    }
                    else{
                        request(innerLink, function (error, response, body) {
                            if(!error) {
                                console.log('LINK ', chalk.yellow(innerLink) + ' ' + _status.showStatus(response.statusCode));
                                if(response.statusCode != 200){
                                    console.log(chalk.red('Problem on '));
                                    console.log(chalk.white($.html(elm)));
                                }
                            }
                        });
                    }
                }
            }

        });
    });





};


exports.init = initValidator;
exports.run = runValidator;


initValidator({localUrl : 'http://localhost:80/w3ctest/'});
runValidator(globalOptions.localUrl);