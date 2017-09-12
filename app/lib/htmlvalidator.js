var alerts = require('./alerts');

var validateHtml = function ($) {
    var htmlTag = $('html');

    if(htmlTag.length == 0){
        alerts.alertWarning('<html> tag is missing.');
    }

    var imgs = $('img');
    imgs.each(function (i,elm) {
        if(typeof $(elm).attr('alt') == 'undefined'){
            console.log($.html(elm));
            alerts.alertWarning('alt attribute needs to be added');
        }
    });
};



module.exports.validateHtml = validateHtml;