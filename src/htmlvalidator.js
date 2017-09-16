var alerts = require('./alerts');
var chalk = require('chalk');
const figures = require('figures');

var globalOptions = {
    localUrl : '',
    localHost : '',
    verbose : true
};

var setGlobals = function (options) {
    globalOptions = options;
}

var validateHtml = function ($) {
    var totalProblems = 0;
    var totalSuggestions = 0;

    console.log(chalk.yellow(figures.pointer) + chalk.rgb(200,200,200)(' Checking HTML guidelines..\n'));

    /*
    *  Reference : https://google.github.io/styleguide/htmlcssguide.html
    * */

    /*
    *  RULE 1 - !DOCTYPE syntax
    *  Reference : https://google.github.io/styleguide/htmlcssguide.html#Document_Type
    *
    * */
    if($.html().search('<!DOCTYPE') != 0){
        alerts.alertWarning('The doctype is required just above the <html> tag, at the very start of each document you write.');
        totalProblems++;
    }

    /*
    *  RULE 2 - alt attribute
    *  Reference : https://google.github.io/styleguide/htmlcssguide.html#Multimedia_Fallback
    *
    * */

    var imgs = $('img');
    for(var i=0; i<imgs.length; i++) {
        var elm = imgs[i];
        var elmAlt = $(elm).attr('alt');
        var elmHtml = $.html(elm);

        if (typeof elmAlt  == 'undefined') {
            alerts.alertWarning('Make sure to offer alternative access. For images that means use of meaningful alternative text');
            console.log(chalk.grey(elmHtml));
            console.log('');
            totalProblems++;
        }
        else{
            if(globalOptions.verbose){
                if(elmAlt == ''){
                    alerts.alertSuggestion('alt attribute is empty. If this image targets SEO, add meaningful alternative text.');
                    console.log(chalk.grey(elmHtml));
                    console.log('');
                    totalSuggestions++;
                }
            }
        }
    }


    console.log();
    console.log('HTML SUMMARY');
    if(totalProblems == 0 ){
        console.log(chalk.rgb(0,200,0)(figures.tick) + ' no problem found');
    }
    else {
        console.log(chalk.rgb(200,0,0)(figures.cross) + ' %d problem(s) found', totalProblems);
    }
    if(totalSuggestions != 0){
        console.log(chalk.rgb(200,200,0)(figures.info) + ' %d suggestions', totalProblems);
    }
    console.log();
};



module.exports.validateHtml = validateHtml;