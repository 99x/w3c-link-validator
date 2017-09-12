const url = require('url');
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


var isAbsolute = function (link) {
    return link.indexOf('http://') === 0 || link.indexOf('https://') === 0;
};

var makeLinkFromRelative = function (root,link) {
    return  root + '/'+ link;
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
    console.log(chalk.green.bold('PARSING ROOT '),chalk.white(rootUrl));


    request(rootUrl, function (error, response, body) {
        var $ = cheerio.load(body);
        var links = $('a');
        links.each(function (i, elm) {
            if (typeof elm.attribs != 'undefined') {
                if (typeof elm.attribs.href != 'undefined') {
                    var innerLink = elm.attribs.href;

                    if(isLocal(innerLink)){
                        if(!isAbsolute(innerLink))
                            innerLink = makeLinkFromRelative(rootUrl,innerLink);
                        request(innerLink, function (error, response, body) {
                           if(!error)
                                console.log('LINK ',chalk.yellow(innerLink) +' '+ _status.showStatus(response.statusCode));
                        });
                    }
                    else{
                        request(innerLink, function (error, response, body) {
                            if(!error)
                                console.log('LINK ',chalk.yellow(innerLink) +' '+ _status.showStatus(response.statusCode));
                        });
                    }
                }
            }

        });
    });





};


exports.init = initValidator;
exports.run = runValidator;
