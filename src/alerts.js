var chalk = require('chalk');


var alertWarning = function (msg) {
    console.log(chalk.bgYellow.black(' WARNING ') + ' ' + msg);
};

var alertError = function (msg) {
    console.log(chalk.bgRed.black(' ERROR ') + ' ' + msg);
}



module.exports.alertWarning = alertWarning;
module.exports.alertError = alertError;