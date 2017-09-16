const url = require('url');
const path = require('path');
const request = require('request');
const http = require('http');
const cheerio = require('cheerio');
const chalk = require('chalk');
const links = require('./links');
const htmlvalidator = require('./htmlvalidator');
const alerts = require('./alerts');
const figures = require('figures');

var urlQueue = [];
var crawledUrls = [];
var totalLinkschecked = 0;
var totalDeadLinks = 0;

var globalOptions = {
    localUrl : '',
    localHost : '',
    verbose : true,
    onlyhtml : false
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
        globalOptions.verbose = options.verbose;
        globalOptions.onlyhtml = options.onlyhtml;

        links.setGlobals(globalOptions);
        urlQueue.push(options.localUrl);
    }
    else {
        throw 'Local URL is required!';
    }
};

var runValidator =  function(rootUrl){
    crawledUrls.push(rootUrl);
    totalLinkschecked++;

    urlQueue.splice(0,1);


    var urlinfo = url.parse(rootUrl);
    var _link = urlinfo.href;
    var _base = path.basename(urlinfo.pathname);

    console.log('\n');
    console.log(chalk.rgb(0,200,200).bold(chalk.yellow(figures.play) +' '+ chalk.underline(_link)) + '\n');
    console.log('BASE\t' + (_base=='' ? '/' : _base));

    request(rootUrl, function (error, response, body) {
        if(!error) {
            if(response.statusCode == 200){
                console.log('STATUS\t' + chalk.green('200 OK'));
            }
            else {
                console.log('STATUS\t' + chalk.rgb(200,0,0)(response.statusCode + ' ' + http.STATUS_CODES[response.statusCode]));
                totalDeadLinks++;
            }
            if(isLocal(rootUrl)) {
                console.log('');
                var $ = cheerio.load(body);
                htmlvalidator.validateHtml($);
                var _links = links.linkChecker($, rootUrl);

                for (var i = 0; i < _links.length; i++) {
                    var _slink = _links[i].replace(/#.*/g, '');
                    if (crawledUrls.indexOf(_slink) == -1 && urlQueue.indexOf(_slink) == -1)
                        if(!globalOptions.onlyhtml)
                            urlQueue.push(_slink);
                }
            }



        }
        else{
            alerts.alertError(error.message);
            totalDeadLinks++;
        }

        if (urlQueue.length > 0) {
            var furl = urlQueue[0];
            runValidator(furl);

        }
        else{
            displaySummary();
            return;
        }

    });


};


var displaySummary = function () {
    var deadRatio = totalDeadLinks / totalLinkschecked * 100;
    console.log('');
    console.log('SUMMARY');
    console.log(chalk.yellow(figures.play) + ' Total links        : ' + totalLinkschecked );
    console.log((totalDeadLinks == 0 ? chalk.rgb(0,200,0)(figures.tick) :  chalk.rgb(200,0,0)(figures.cross))   + ' Dead links         : ' + totalDeadLinks);
    console.log((totalDeadLinks == 0 ? chalk.rgb(0,200,0)(figures.tick) :  chalk.rgb(200,0,0)(figures.cross))   + ' Dead link Ratio    : ' + deadRatio.toFixed(2) + '%');
}

module.exports.init = initValidator;
module.exports.run = runValidator;
module.exports.exec = execute;
