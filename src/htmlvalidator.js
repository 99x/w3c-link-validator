var alerts = require('./alerts');
const chalk = require('chalk');
const figures = require('figures');
const { requiredTags, requiredAttr, obsoleteTags, obsoleteAttr } = require('./rulesets');

var globalOptions = {
    localUrl : '',
    localHost : '',
    verbose : true,
    onlyhtml : false,
    suggestions : false
};

var totalHtmlProblems = 0;
var totalHtmlSuggestions = 0;

var setGlobals = function (options) {
    globalOptions = options;
};

var validateHtml = function ($) {
    var totalProblems = 0;
    var totalSuggestions = 0;

    console.log(chalk.yellow(figures.pointer) + chalk.rgb(200,200,200)(' Checking HTML guidelines...\n'));

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
        alerts.alertWarning('Doctype declaration is required above the <html> tag, at the very start of each document you write.');
        totalProblems++;
    }

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
    *  RULE 2 - Required Attributes
    *  Reference : https://google.github.io/styleguide/htmlcssguide.html#Multimedia_Fallback
    *
    * */
    for(var requiredAttributesIndex in requiredAttr){
        var requiredAttribute = requiredAttr[requiredAttributesIndex];
        var requiredAttributesDom = $(requiredAttribute.tag);
        for(var i=0; i<requiredAttributesDom.length; i++) {
            var elm = requiredAttributesDom[i];
            var elmAttr = $(elm).attr(requiredAttribute.attribute);
            var elmHtml = $.html(elm);

            if (typeof elmAttr  == 'undefined') {
                if(requiredAttribute.level == 0) {
                    alerts.alertError(requiredAttribute.error);
                }
                else if(requiredAttribute.level == 1) {
                    alerts.alertWarning(requiredAttribute.error);
                }
                else {
                    if(globalOptions.suggestions)
                        alerts.alertSuggestion(requiredAttribute.error);
                }

                console.log(chalk.grey(elmHtml));
                console.log('');
                totalProblems++;
            }
            else{
                if(globalOptions.suggestions && requiredAttribute.showEmptySuggestion){
                    if(elmAttr == ''){
                        alerts.alertSuggestion(requiredAttribute.emptySuggestion);
                        console.log(chalk.grey(elmHtml));
                        console.log('');
                        totalSuggestions++;
                    }
                }
            }
        }
    }


    /**
     *  RULE 3 - Obsolete Tags
     *  Reference https://www.w3.org/TR/html51/obsolete.html#non-conforming-features
     *  TODO: all obsolete elements should be added to obsoleteTags array below.
     *
     */
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


    /**
    *  RULE 4 - Obsolete Attributes
    *  Reference  https://w3c.github.io/html/obsolete.html#element-attrdef-a-charset
    *  TODO: all other obsolete attributes to obsoleteAttributes array
    *
    * */
    for(var obsoleteAttributesIndex in obsoleteAttr){
        var obsoleteAttribute = obsoleteAttr[obsoleteAttributesIndex];
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
    if(totalProblems == 0){
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