var tape = require('tape');
var InfiniQueue = require('../lib/infiniqueue');
var tests = require('./test');
tests.getInjectedVals(InfiniQueue, 400000);

for(var key in tests) {
    if(key !== 'getInjectedVals') tape(key, tests[key]);
}
