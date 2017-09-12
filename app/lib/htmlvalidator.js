var alerts = require('./alerts');

var validateHtml = function ($) {
    var htmlTag = $('html');

    if(htmlTag.length == 0){
        alerts.alertWarning('<html> tag is missing.');
        console.log('');
    }

    var imgs = $('img');
    imgs.each(function (i,elm) {
        if(typeof $(elm).attr('alt') == 'undefined'){
            alerts.alertWarning('alt attribute needs to be added');
            console.log($.html(elm));
            console.log('');
        }
    });
};



module.exports.validateHtml = validateHtml;