var chalk = require('chalk');

var showStatus = function(statusCode){
    switch (statusCode){
        case 200:
            return statusCode + ' ' + chalk.green('[SUCCESS]');
            break;
        case 404:
            return statusCode + ' ' + chalk.red('[NOT FOUND]');
            break;
    }
};

exports.showStatus = showStatus;