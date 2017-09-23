const localw3c = require('../bin/w3clink');
const alerts = require('../src/alerts.js');
const fs = require('fs');
const assert = require('chai').assert;
const expect = require('chai').expect;
var htmlvalidator = require('../src/htmlvalidator');
var links = require('../src/links');

const sampleHTML = fs.readFileSync(process.cwd() + '/test/testHTML.html','utf8');
const sampleHTMLRule1 = fs.readFileSync(process.cwd() + '/test/testHTML-rule1.html','utf8');

const cheerio = require('cheerio');


describe('CLI app main', function () {
    it('Command line initialization should return true', function () {
        var result = localw3c.cliApp(process.argv);
        assert.equal(result, true);
    });
});



describe('Alerts', function () {
    it('alertWarning should return undefined',function () {
        var alertWarning = alerts.alertWarning('Test Message');
        assert.equal(typeof alertWarning, 'undefined');
    });
    it('alertError should return undefined',function () {
        var alertError = alerts.alertError('Test Message');
        assert.equal(typeof alertError, 'undefined');
    });
    it('alertSuggestion should return undefined',function () {
        var alertSuggestion = alerts.alertSuggestion('Test Message');
        assert.equal(typeof alertSuggestion, 'undefined');
    });
    
});


describe('HTML Validator',function () {
    it('setGlobals should return undefined',function () {
        var result = htmlvalidator.setGlobals({
            localUrl : '',
            localHost : '',
            verbose : true,
            onlyhtml : false,
            suggestions : false
        });
        assert.equal(typeof result, 'undefined');
    });
    
    it('Sample HTML validation Should return an object', function () {
        var $ = cheerio.load(sampleHTML);
        var result = htmlvalidator.validateHtml($);
        expect(result).to.be.a('object');
    });

    it('Sample HTML(Violates RULE SET #1) validation Should return an object', function () {
        var $ = cheerio.load(sampleHTMLRule1);
        var result = htmlvalidator.validateHtml($);
        expect(result).to.be.a('object');
    });
});


describe('Links', function () {
    it('setGlobals should return undefined',function () {
        var result = htmlvalidator.setGlobals({
            localUrl : '',
            localHost : '',
            verbose : true,
            onlyhtml : false,
            suggestions : false
        });
        assert.equal(typeof result, 'undefined');
    });

    it('isLocal should return true for same host url', function () {
        links.setGlobals({
            localHost : 'localhost'
        });
        var result = links.isLocal('http://localhost/samplepage/');
        assert.equal(result, true);
    });


    it('isLocal should return false for different host url', function () {
        links.setGlobals({
            localHost : 'www.example.lk'
        });
        var result = links.isLocal('http://www.example.com/samplepage/');
        assert.equal(result, false);
    });

    it('linkChecker should return an array', function(){
        var $ = cheerio.load(sampleHTML);
        var result = links.linkChecker($,'http://localhost/samplepage/');
        expect(result).to.be.a('array');
    });

});

/*
* TODO - write unit test cases for w3clink.js 
* */

