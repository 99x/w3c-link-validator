var alerts = require('./alerts');
var chalk = require('chalk');
const figures = require('figures');

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

    var requiredTags = [
        {
            tag : 'html',
            error : '<html> tag should appear directly after doctype declaration.',
            root : null,
            rootError : null
        },
        {
            tag : 'head',
            error : '<head> tag should have appeared.',
            root : 'html',
            rootError : '<head> tag should be added inside <html> tag.'
        },
        {
            tag : 'title',
            error : '<title> tag should have appeared in order to display the title of the document.',
            root : 'head',
            rootError : '<title> tag should be added inside <head> tag.'
        },
        {
            tag : 'body',
            error : 'The content of the web page should be wrapped by (inside) <body> tag.',
            root : 'html',
            rootError : '<body> tag should be added inside <html> tag.'
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
    *  RULE 2 - Required Attributes
    *  Reference : https://google.github.io/styleguide/htmlcssguide.html#Multimedia_Fallback
    *
    * */


    var requiredAttribs = [
        {
            tag : 'img',
            attribute : 'alt',
            error : 'Make sure to offer alternative access. For images this means use of meaningful alternative text.',
            level : 1,
            showEmptySuggestion : true,
            emptySuggestion : 'Make sure to offer alternative access. For images this means use of meaningful alternative text.'
        },
    ];

    for(var requiredAttributesIndex in requiredAttribs){
        var requiredAttribute = requiredAttribs[requiredAttributesIndex];
        var requiredAttributesDom = $(requiredAttribute.tag);
        for(var i=0; i<requiredAttributesDom.length; i++) {
            var elm = requiredAttributesDom[i];
            var elmAttrib = $(elm).attr(requiredAttribute.attribute);
            var elmHtml = $.html(elm);

            if (typeof elmAttrib  == 'undefined') {
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
                    if(elmAttrib == ''){
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
     *  RULE 3 - obsolete elements
     *  Reference https://www.w3.org/TR/html51/obsolete.html#non-conforming-features
     *  TODO: all obsolete elements should be added to obsoleteTags array below.
     *
     */
    var obsoleteTags = [
        {
            tag : 'applet',
            error : '<applet> is completely obsolete, and must not be used by authors.',
            solution : 'Use <embed> or <object> instead.'
        },
        {
            tag : 'acronym',
            error : '<acronym> is completely obsolete, and must not be used by authors.',
            solution : 'Use <abbr> instead.'
        },
        {
            tag : 'bgsound',
            error : '<bgsound> is completely obsolete, and must not be used by authors.',
            solution : 'Use <audio> instead.'
        },
        {
            tag : 'dir',
            error : '<dir> is completely obsolete, and must not be used by authors.',
            solution : 'Use <ul> instead.'
        },
        {
            tag : 'frame',
            error : '<frame> is completely obsolete, and must not be used by authors.',
            solution : 'Use either <iframe> with CSS, or render invariant parts into the page server-side, generating complete pages with said parts merged.'
        },
        {
            tag : 'frameset',
            error : '<frameset> is completely obsolete, and must not be used by authors.',
            solution : 'Use either <iframe> with CSS, or render invariant parts into the page server-side, generating complete pages with said parts merged.'
        },
        {
            tag : 'noframes',
            error : '<noframes> is completely obsolete, and must not be used by authors.',
            solution : 'Use either <iframe> with CSS, or render invariant parts into the page server-side, generating complete pages with said parts merged.'
        },
        {
            tag : 'hgroup',
            error : '<hgroup> is completely obsolete, and must not be used by authors.',
            solution : 'To mark up subheadings, consider putting the subheading in a <p> after the <h1>...<h6> containing the main heading, or putting the subheading directly in the <h1>...<h6> containing the main heading, but separated from the main heading by punctuation and/or within, for example, a <span class="subheading"> to apply differentiated styling (to .subheading class).\n' +
            'Headings and subheadings, alternative titles, or taglines can be grouped using the <header> or <div>.'
        },
        {
            tag : 'isindex',
            error : '<isindex> is completely obsolete, and must not be used by authors.',
            solution : 'Use an explicit <form> and <input type="text"> (text field) combination instead.'
        },
        {
            tag : 'listing',
            error : '<listing> is completely obsolete, and must not be used by authors.',
            solution : 'Use <pre> and <code> instead.'
        },
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


    /**
    *  RULE 4 - obsolete attributes
    *  Reference  https://w3c.github.io/html/obsolete.html#element-attrdef-a-charset
    *  TODO: all other obsolete attributes to obsoleteAttributes array
    *
    * */


    var obsoleteAttributes = [
        {
            tags : 'a,link',
            attribute : 'charset',
            error : 'charset attribute on <link> and <a> is completely obsolete, and must not be used by authors.',
            solution : 'Use a HTTP Content-Type header on the linked resource instead.'
        },
        {
            tags : 'a',
            attribute : 'coords',
            error : 'coords attribute on <a> is completely obsolete, and must not be used by authors.',
            solution : 'Use <area> instead of <a> for image maps.'
        },
        {
            tags : 'a',
            attribute : 'shape',
            error : 'shape attribute on <a> is completely obsolete, and must not be used by authors.',
            solution : 'Use <area> instead of <a> for image maps.'
        },
        {
            tags : 'a,link',
            attribute : 'methods',
            error : 'methods attribute on <link> and <a> is completely obsolete, and must not be used by authors.',
            solution : 'Use the HTTP OPTIONS feature instead.'
        },
        {
            tags : 'a,embed,img,option',
            attribute : 'name',
            error : 'name attribute on <a>, <embed>, <img> and <option> is completely obsolete, and must not be used by authors.',
            solution : 'Use the id attribute instead.'
        },
        {
            tags : 'a,link',
            attribute : 'urn',
            error : 'urn attribute on <link> and <a> is completely obsolete, and must not be used by authors.',
            solution : 'Specify the preferred persistent identifier using the href attribute instead.'
        },
        {
            tags : 'form',
            attribute : 'accept',
            error : 'accept attribute on <form> is completely obsolete, and must not be used by authors.',
            solution : 'Use the accept attribute directly on the <input> instead.'
        },
        {
            tags : 'area',
            attribute : 'nohref',
            error : 'nohref attribute on <area> is completely obsolete, and must not be used by authors.',
            solution : 'Omitting the href attribute is sufficient as is not necessary (Omit it altogether).'
        },
        {
            tags : 'head',
            attribute : 'profile',
            error : 'profile attribute on <head> is completely obsolete, and must not be used by authors.',
            solution : 'When used for declaring which meta terms are used in the document it is not necessary (omit it altogether), and register the names.\n' +
            'When used for triggering specific user agent behaviors use <link> (element) instead.'
        },
        {
            tags : 'h1,h2,h3,h4,h5,h6',
            attribute : 'align',
            error : 'align attribute in <h1>...<h6> is completely obsolete, and must not be used by authors.',
            solution : 'Use CSS instead.'
        },
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