var InfiniQueue = require('../lib/infiniqueue');
var tests = require('./test');
tests.getInjectedVals(InfiniQueue, 150000);

for(var key in tests) {
    if(key === 'testPerfNode') exports[key] = tests[key];
}
