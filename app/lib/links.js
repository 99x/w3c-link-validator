const url = require('url');
const request = require('request');
const chalk = require('chalk');
const _status = require('./status');

var globalOptions = {
    localUrl : '',
    localHost : ''
};

var isLocal = function (link) {
    var urlinfo = url.parse(link);
    var host = urlinfo.host;
    return (host == globalOptions.localHost || host==null);
};


var setGlobals = function (options) {
    globalOptions = options;
}


var linkChecker = function ($, rootUrl) {
    var links = $('a');


    links.each(function (i, elm) {
        if (typeof elm.attribs != 'undefined') {
            if (typeof elm.attribs.href != 'undefined') {
                var innerLink = elm.attribs.href;
                if(isLocal(innerLink)){

                    innerLink = url.resolve(rootUrl,innerLink);
                    /*request(innerLink, function (error, response, body) {
                        if(!error) {
                            console.log('LINK ', chalk.yellow(innerLink) + ' ' + _status.showStatus(response.statusCode));
                            if(response.statusCode != 200){
                                console.log(chalk.red('Problem on '));
                                console.log(chalk.white($.html(elm)));
                            }
                        }
                    });*/
                    console.log('validate local '+innerLink);
                }
                else{
                    /*request(innerLink, function (error, response, body) {
                        if(!error) {
                            console.log('LINK ', chalk.yellow(innerLink) + ' ' + _status.showStatus(response.statusCode));
                            if(response.statusCode != 200){
                                console.log(chalk.red('Problem on '));
                                console.log(chalk.white($.html(elm)));
                            }
                        }
                    });*/
                    console.log('validate live '+innerLink);
                }
            }
        }

    });
    var urls = [];
    for(var i=0; i<links.length; i++){
        var _slink = $(links[i]).attr('href');
        try {
            urls.push(url.resolve(rootUrl, _slink));
        }
        catch (e){}
    }
    return urls;
};


module.exports.linkChecker = linkChecker;
module.exports.setGlobals = setGlobals;
