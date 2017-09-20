var alerts = require('./alerts');
var chalk = require('chalk');
const figures = require('figures');

var globalOptions = {
    localUrl : '',
    localHost : '',
    verbose : true,
    onlyhtml : false
};

var totalHtmlProblems = 0;
var totalHtmlSuggestions = 0;

var setGlobals = function (options) {
    globalOptions = options;
}

var validateHtml = function ($) {
    var totalProblems = 0;
    var totalSuggestions = 0;

    console.log(chalk.yellow(figures.pointer) + chalk.rgb(200,200,200)(' Checking HTML guidelines..\n'));

    /*
    *  References
    *  https://google.github.io/styleguide/htmlcssguide.html
    *  https://www.w3.org/TR/html5/syntax.html#obsolete-permitted-doctype
    * */

    /*
    *  RULE 1 - Required tags - !DOCTYPE syntax, html, head, title and body
    *  Reference : https://google.github.io/styleguide/htmlcssguide.html#Document_Type
    *
    * */
    if($.html().search('<!DOCTYPE') != 0){
        alerts.alertWarning('The doctype is required just above the <html> tag, at the very start of each document you write.');
        totalProblems++;
    }

    var requiredTags = [
        {
            tag : 'html',
            error : '<html> tag should be appeared just after the doctype declaration',
            root : null,
            rootError : null
        },
        {
            tag : 'head',
            error : '<head> tag should be appeared',
            root : 'html',
            rootError : '<head> should be added inside <html>'
        },
        {
            tag : 'title',
            error : '<title> tag should be appeared in order to display the title of document',
            root : 'head',
            rootError : '<title> should be added inside <head>'
        },
        {
            tag : 'body',
            error : 'The content of web page should be wrapped with <body> tag',
            root : 'html',
            rootError : '<body> should be added inside <html>'
        },
    ];

    for(var requireTagsIndex in requiredTags){
        var requiredTag = requiredTags[requireTagsIndex];
        var requiredTagDom = $(requiredTag.tag);
        if(requiredTagDom.length == 0){
            alerts.alertError(requiredTag.error);
            totalProblems++;
        }
        else if(requiredTag.root != null){
            var childNode = $(requiredTag.root + ' ' + requiredTag.tag);
            if(childNode.length == 0){
                alerts.alertError(requiredTag.rootError);
                totalProblems++;
            }
        }
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

    /*
     *  RULE 3 - obsolete elements
     *  Reference https://www.w3.org/TR/html51/obsolete.html#non-conforming-features
     *  TODO - all obsolete elements should be added to obsoleteTags array below.
     *
     */
    var obsoleteTags = [
        {
            tag : 'applet',
            error : '<applet> is entirely obsolete, and must not be used by authors.',
            solution : 'Use <embed> or <object> instead'
        },
        {
            tag : 'acronym',
            error : '<acronym> is entirely obsolete, and must not be used by authors.',
            solution : 'Use <abbr> instead.'
        }
    ];
    for(var obsoleteTagIndex  in obsoleteTags){
        var obsoleteTag = obsoleteTags[obsoleteTagIndex];
        var obsoleteTagDom = $(obsoleteTag.tag);
        for(var i=0; i<obsoleteTagDom.length; i++){
            var obsoleteTagHtml = $.html(obsoleteTagDom[i]);
            alerts.alertWarning(obsoleteTag.error + ' ' +  obsoleteTag.solution);
            console.log(chalk.grey(obsoleteTagHtml));
            totalProblems++;
        }
    }


    /*
    *  RULE 4 - obsolete attributes
    *  Reference  https://w3c.github.io/html/obsolete.html#element-attrdef-a-charset
    *  TODO - all other obsolete attributes to obsoleteAttributes array
    * */


    var obsoleteAttributes = [
        {
            tags : 'a',
            attribute : 'charset',
            error : 'charset attribute in <a> is entirely obsolete, and must not be used by authors',
            solution : ''
        }
        ,
        {
            tags : 'h1,h2,h3,h4,h5,h6',
            attribute : 'align',
            error : 'align attribute in <h1>..<h6> is entirely obsolete, and must not be used by authors',
            solution : 'use CSS instead.'
        }
    ];

    for(var obsoleteAttributesIndex in obsoleteAttributes){
        var obsoleteAttribute = obsoleteAttributes[obsoleteAttributesIndex];
        var obsoleteAttributeDom = $(obsoleteAttribute.tags);
        for(var i=0; i<obsoleteAttributeDom.length; i++){
            if(typeof $(obsoleteAttributeDom[i]).attr(obsoleteAttribute.attribute) != 'undefined'){
                var obsoleteAttributeHtml = $.html(obsoleteAttributeDom[i]);
                alerts.alertWarning(obsoleteAttribute.error+ ' ' + obsoleteAttribute.solution);
                console.log(chalk.grey(obsoleteAttributeHtml));
                totalProblems++;
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
        console.log(chalk.rgb(200,200,0)(figures.info) + ' %d suggestion(s)', totalSuggestions);
    }
    console.log();

    totalHtmlProblems = totalProblems;
    totalHtmlSuggestions = totalSuggestions;

    var prop = {
        problems : totalHtmlProblems,
        suggestions : totalHtmlSuggestions
    };

    return prop;
};



module.exports.validateHtml = validateHtml;
module.exports.setGlobals = setGlobals;