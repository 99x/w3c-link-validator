var chalk = require('chalk');


var alertWarning = function (msg) {
    console.log(chalk.bgYellow.black(' WARNING ') + ' ' + msg);
}



module.exports.alertWarning = alertWarning;