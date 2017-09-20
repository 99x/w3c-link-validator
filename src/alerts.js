var chalk = require('chalk');


var alertWarning = function (msg) {
    console.log(chalk.bgRgb(170,170,0)(' WARNING ') + ' ' + msg);
};

var alertError = function (msg) {
    console.log(chalk.bgRgb(170,0,0).black('  ERROR  ') + ' ' + msg);
}

var alertSuggestion = function (msg) {
    console.log(chalk.bgCyan.white(' SUGGEST ') + ' ' + msg);
}




module.exports.alertWarning = alertWarning;
module.exports.alertError = alertError;
module.exports.alertSuggestion = alertSuggestion;