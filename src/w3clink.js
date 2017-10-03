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
var validationResult = {
    problems : 0,
    suggestions : 0
};

var globalOptions = {
    localUrl : '',
    localHost : '',
    verbose : true,
    onlyhtml : false,
    suggestions : false
};

var isLocal = function (link) {
    var urlinfo = url.parse(link);
    var host = urlinfo.host;
    return (host == globalOptions.localHost || host==null);
};

var isHtmlResponse  = function(header){
    return (header['content-type'].search('text/html') != -1);
};


var execute = function () {
    runValidator(urlQueue[0]);
};


var initValidator = function (options) {
    if(typeof globalOptions.localUrl != 'undefined') {
        globalOptions.localUrl = options.localUrl;
        globalOptions.localHost = url.parse(options.localUrl).host;
        globalOptions.verbose = options.verbose;
        globalOptions.onlyhtml = options.onlyhtml;
        globalOptions.suggestions = options.suggestions;

        htmlvalidator.setGlobals(globalOptions);
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

    var startTime = new Date().getTime();

    request(rootUrl, function (error, response, body) {
        var runtime = ((new Date().getTime() - startTime) / 1000).toFixed(2);
        if(!error) {
            if(response.statusCode == 200){
                console.log('STATUS\t' + chalk.green('200 OK'));
            }
            else {
                console.log('STATUS\t' + chalk.rgb(200,0,0)(response.statusCode + ' ' + http.STATUS_CODES[response.statusCode]));
                totalDeadLinks++;
            }

            console.log('ELAPSED\t' + runtime + ' secs');

            if(isLocal(rootUrl) && isHtmlResponse(response.headers)) {
                console.log('');
                var $ = cheerio.load(body);
                var htmlValidation = htmlvalidator.validateHtml($);
                validationResult.problems += htmlValidation.problems;
                validationResult.suggestions += htmlValidation.suggestions;
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
    console.log('OVERALL LINK SUMMARY');
    console.log(chalk.rgb(0,200,0)(figures.tick) + ' Total links        : ' + totalLinkschecked );
    console.log((totalDeadLinks == 0 ? chalk.rgb(0,200,0)(figures.tick) :  chalk.rgb(200,0,0)(figures.cross))   + ' Dead links         : ' + totalDeadLinks);
    console.log((totalDeadLinks == 0 ? chalk.rgb(0,200,0)(figures.tick) :  chalk.rgb(200,0,0)(figures.cross))   + ' Dead link Ratio    : ' + deadRatio.toFixed(2) + '%');

    console.log('');
    console.log('OVERALL HTML SUMMARY');
    console.log((validationResult.problems == 0 ? chalk.rgb(0,200,0)(figures.tick) :  chalk.rgb(200,0,0)(figures.cross))   + ' HTML Problems      : ' + validationResult.problems);
    if(globalOptions.verbose)
        console.log((validationResult.suggestions == 0 ? chalk.rgb(200,200,0)(figures.info) :  chalk.rgb(200,200,0)(figures.info))   + ' HTML Suggestions   : ' + validationResult.suggestions);
};

module.exports.init = initValidator;
module.exports.run = runValidator;
module.exports.exec = execute;
module.exports.isLocal = isLocal;
module.exports.isHtmlResponse = isHtmlResponse;
module.exports.displaySummary = displaySummary;
