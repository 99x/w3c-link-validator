module.exports = [
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
    {
        tags : 'img',
        attribute : 'border',
        error : 'border attribute in <img> is completely obsolete, and will trigger warnings in conformance checkers.',
        solution : 'Use CSS instead .'
    },
];
