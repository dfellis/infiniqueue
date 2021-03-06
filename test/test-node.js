var jscoverage = require('jscoverage');
jscoverage.enableCoverage(true);
var InfiniQueue = jscoverage.require(module, '../lib/infiniqueue');
var coveralls = require('coveralls');
var tests = require('./test');
tests.getInjectedVals(InfiniQueue);

for(var key in tests) {
    if(key !== 'getInjectedVals' && key !== 'testPerfNode' && key !== 'testPerfBrowser') exports[key] = tests[key];
}

exports.jscoverage = function(test) {
    test.expect(1);
    jscoverage.coverageDetail();
    var coverageStats = jscoverage.coverageStats();
    Object.keys(coverageStats).forEach(function(file) {
        test.equal(coverageStats[file].total, coverageStats[file].touched, 'All lines of code exercised by the tests');
    });
    if(process.env.TRAVIS) coveralls.handleInput(jscoverage.getLCOV());
    test.done();
};
