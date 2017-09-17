const localw3c = require('./../bin/localw3c');
const assert = require('chai').assert;


var k = localw3c.cliApp();

describe('App', function () {
    it('Command line execution should return true', function () {
        var result = localw3c.cliApp(process.argv);
        assert.equal(result, true);
    })
});

