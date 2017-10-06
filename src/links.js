const url = require('url');
const chalk = require('chalk');

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
    return (host == globalOptions.localHost || host == null);
};


var setGlobals = function (options) {
    globalOptions = options;
};


var linkChecker = function ($, rootUrl) {
    var links = $('a');



    var urls = [];
    if(links.length == 0){
        /** TODO: ? */
    }
    else {
        console.log(chalk.italic('Adding ' + links.length + ' link(s) to the queue...\n'));
        for (var i = 0; i < links.length; i++) {
            var innerLink = $(links[i]).attr('href');
            if (typeof innerLink != 'undefined') {
                if (isLocal(innerLink)) {
                    try {
                        innerLink = url.resolve(rootUrl, innerLink);
                        if(globalOptions.verbose)
                            console.log('INT  ' + chalk.grey(innerLink));
                    }

                    catch (err) {
                        console.error('URL Parse error.');
                    }
                }
                else {
                    if(globalOptions.verbose)
                        console.log('EXT  ' + chalk.grey(innerLink));
                }

                try {
                    urls.push(url.resolve(rootUrl, innerLink));
                }
                catch (err) {
                    console.error('URL Parse error.');
                }
            }
        }
    }
    return urls;
};


module.exports.linkChecker = linkChecker;
module.exports.setGlobals = setGlobals;
module.exports.isLocal = isLocal;