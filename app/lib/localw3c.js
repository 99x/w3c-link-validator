const url = require('url');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const links = require('./links');
const htmlvalidator = require('./htmlvalidator');

var urlQueue = [];
var crawledUrls = [];

var globalOptions = {
    localUrl : '',
    localHost : ''
};

var isLocal = function (link,root) {
    var urlinfo = url.parse(link);
    var host = urlinfo.host;
    return (host == globalOptions.localHost || host==null);
};


var execute = function () {
    runValidator(urlQueue[0]);
}


var initValidator = function (options) {
    if(typeof globalOptions.localUrl != 'undefined') {
        globalOptions.localUrl = options.localUrl;
        globalOptions.localHost = url.parse(options.localUrl).host;
        urlQueue.push(options.localUrl);
    }
    else {
        throw 'Local URL is required!';
    }
};

var runValidator =  function(rootUrl){
    crawledUrls.push(rootUrl);
    if(!isLocal(rootUrl)){
        return;
    }

    urlQueue.splice(0,1);


    var urlinfo = url.parse(rootUrl);
    var _link = urlinfo.href;
    var _base = path.basename(urlinfo.pathname);


    console.log(chalk.black.bgWhite.bold('VALIDATION RUNNING ON '));
    console.log('URL : ' + _link);
    console.log('BASE : ' + _base);
    console.log(chalk.bold('------------'));

    request(rootUrl, function (error, response, body) {
        if(!error) {
            var $ = cheerio.load(body);
            htmlvalidator.validateHtml($);
            var _links = links.linkChecker($, rootUrl);

            for (var i = 0; i < _links.length; i++) {
                var _slink = _links[i].replace(/#.*/g,'');
                if (crawledUrls.indexOf(_slink) == -1 && urlQueue.indexOf(_slink) == -1)
                    if(isLocal(_slink))
                        urlQueue.push(_slink);
            }

            if (urlQueue.length > 0) {
                var furl = urlQueue[0];
                runValidator(furl);

            }
        }
        else{
            console.log(error);
        }

    });


};


module.exports.init = initValidator;
module.exports.run = runValidator;
module.exports.exec = execute;

//initValidator({localUrl : 'http://localhost/test/'});
//urlQueue.push(globalOptions.localUrl);
//runValidator(urlQueue[0]);

