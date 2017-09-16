const url = require('url');
const request = require('request');
const chalk = require('chalk');
const _status = require('./status');

var globalOptions = {
    localUrl : '',
    localHost : '',
    verbose : true
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



    var urls = [];
    if(links.length == 0){
        console.log();
    }
    else {
        console.log(chalk.italic('Adding ' + links.length+ ' link(s) to the queue...\n'));
        for (var i = 0; i < links.length; i++) {
            var innerLink = $(links[i]).attr('href');
            if (typeof innerLink != 'undefined') {
                if (isLocal(innerLink)) {
                    try {
                        innerLink = url.resolve(rootUrl, innerLink);
                        if(globalOptions.verbose)
                            console.log('LOCAL ' + chalk.grey(innerLink));
                    }

                    catch (err) {

                    }
                }
                else {
                    if(globalOptions.verbose)
                        console.log('LIVE  ' +  chalk.grey(innerLink));
                }

                try {
                    urls.push(url.resolve(rootUrl, innerLink));
                }
                catch (e) {
                }
            }
        }
    }
    return urls;
};


module.exports.linkChecker = linkChecker;
module.exports.setGlobals = setGlobals;
