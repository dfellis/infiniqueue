var tape = require('tape');
var InfiniQueue = require('../lib/infiniqueue');
var tests = require('./test');
tests.getInfiniQueue(InfiniQueue);

for(var key in tests) {
    if(key !== 'getInfiniQueue') tape(key, tests[key]);
}
