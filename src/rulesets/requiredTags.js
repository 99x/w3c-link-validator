module.exports = [
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