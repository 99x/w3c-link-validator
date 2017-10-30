module.exports = [
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
    {
        tag : 'center',
        error : '<center> is concidered obsolete due to its presentational nature, and must not be used by authors.',
        solution : 'Use  CSS’s <text-align> property.'
    },
    
];