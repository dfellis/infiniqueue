var InfiniQueue, BigArr;

function stretchMemory(count) {
    var arr = [];
    for(var i = 0; i < count; i++) {
        arr.push(i);
    }
}

function naiveQueue(count) {
    var startTime = Date.now();
    var arr = [];
    for(var i = 0; i < count; i++) {
        arr.push(i);
    }

    while(arr.length) {
        arr.shift();
    }
    var endTime = Date.now();
    var totalTime = endTime - startTime;
    var perf = 1000*count / totalTime;
    console.log('naiveQueue ' + count + ': ' + totalTime + 'ms ' + perf + ' items/sec');
    return perf;
}

function infiniQueue(count) {
    var startTime = Date.now();
    var queue = new InfiniQueue();
    for(var i = 0; i < count; i++) {
        queue.enqueue(i);
    }

    while(queue.length) {
        queue.dequeue();
    }
    var endTime = Date.now();
    var totalTime = endTime - startTime;
    var perf = 1000*count / totalTime;
    console.log('infiniQueue ' + count + ': ' + totalTime + 'ms ' + perf + ' items/sec');
    queue.shutdown();
    return perf;
}

function bootstrap(test) {
    test.expect = test.expect || test.plan;
    test.done = test.done || test.end;
}

exports.getInjectedVals = function(iq, big) {
    InfiniQueue = iq;
    BigArr = big;
};

exports.testPerf = function(test) {
    bootstrap(test);
    test.expect(2);
    stretchMemory(BigArr);
    var naive100k = naiveQueue(100000);
    var naiveBig = naiveQueue(BigArr);
    test.ok(naive100k > naiveBig, 'if this fails InfiniQueue is unnecessary');
    infiniQueue(100000);
    var infiniBig = infiniQueue(BigArr*10);
    test.ok(infiniBig > naiveBig, 'InfiniQueue is faster than a naive queue');
    test.done();
};