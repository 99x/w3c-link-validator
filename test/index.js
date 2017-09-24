const w3clinkBin = require('../bin/w3clink');
const w3clink = require('../src/w3clink');
const alerts = require('../src/alerts.js');
const fs = require('fs');
const assert = require('chai').assert;
const expect = require('chai').expect;
var htmlvalidator = require('../src/htmlvalidator');
var links = require('../src/links');

const sampleHTML = fs.readFileSync(process.cwd() + '/test/testHTML.html','utf8');
const sampleHTMLRule1 = fs.readFileSync(process.cwd() + '/test/testHTML-rule1.html','utf8');
const sampleHTMLRule2 = fs.readFileSync(process.cwd() + '/test/testHTML-rule2.html','utf8');
const sampleHTMLRule3 = fs.readFileSync(process.cwd() + '/test/testHTML-rule3.html','utf8');
const sampleHTMLRule4 = fs.readFileSync(process.cwd() + '/test/testHTML-rule4.html','utf8');

const cheerio = require('cheerio');


describe('CLI app main', function () {
    it('Command line initialization should return true', function () {
        var result = w3clinkBin.cliApp(process.argv);
        assert.equal(result, true);
    });

    it('Command line initialization(with parameters) should return true', function () {
        var result = w3clinkBin.cliApp([
            '',
            '',
            'check',
            'http://example.com',
            'onlyhtml'
        ]);
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

    it('Sample HTML(Violates RULE SET #2) validation Should return an object', function () {
        htmlvalidator.setGlobals({
            localUrl : '',
            localHost : '',
            verbose : true,
            onlyhtml : false,
            suggestions : true
        });
        var $ = cheerio.load(sampleHTMLRule2);
        var result = htmlvalidator.validateHtml($);
        expect(result).to.be.a('object');
    });

    it('Sample HTML(Violates RULE SET #3) validation Should return an object', function () {
        var $ = cheerio.load(sampleHTMLRule3);
        var result = htmlvalidator.validateHtml($);
        expect(result).to.be.a('object');
    });

    it('Sample HTML(Violates RULE SET #4) validation Should return an object', function () {
        var $ = cheerio.load(sampleHTMLRule4);
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

describe('Main file', function(){

    it('w3clink initialization should return undefined', function(){
        var result = w3clink.init({
            localUrl : 'http://localhost/samplepage/',
            localHost : '',
            verbose : true,
            onlyhtml : false,
            suggestions : false
        });

        assert.equal(typeof result, 'undefined');


    });

    it('isLocal should return true for same host url', function () {
        var result = w3clink.isLocal('http://localhost/samplepage/');
        assert.equal(result, true);
    });


    it('isLocal should return false for different host url', function () {
        var result = w3clink.isLocal('http://www.example.com/samplepage/');
        assert.equal(result, false);
    });


    it('Validation execution should be executed without crash and return undefined', function(){
        var result = w3clink.exec();
        assert.equal(typeof result, 'undefined');
    });

    it('displaySummary should return undefined',function(){
        var result = w3clink.displaySummary();
        assert.equal(typeof result, 'undefined');
    });

});

