var alerts = require('./alerts');
var chalk = require('chalk');

var validateHtml = function ($) {
    console.log(chalk.rgb(0,200,200)('[VALIDATING HTML]\n'));

    var htmlTag = $('html');

    if(htmlTag.length == 0){
        alerts.alertWarning('<html> tag is missing.');
        console.log('');
    }

    var imgs = $('img');
    for(var i=0; i<imgs.length; i++) {
        var elm = imgs[i];
        if (typeof $(elm).attr('alt') == 'undefined') {
            alerts.alertWarning('alt attribute needs to be added');
            console.log($.html(elm));
            console.log('');
        }
    }

};



module.exports.validateHtml = validateHtml;