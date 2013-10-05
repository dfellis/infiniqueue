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

exports.enqueueDequeue = function(test) {
    bootstrap(test);
    test.expect(4);
    var testQueue = new InfiniQueue();
    test.equal(testQueue.length, 0);
    testQueue.enqueue(5);
    test.equal(testQueue.length, 1);
    test.equal(testQueue.dequeue(), 5);
    test.equal(testQueue.length, 0);
    test.done();
};

exports.enqueueOrder = function(test) {
    bootstrap(test);
    test.expect(8);
    var testQueue = new InfiniQueue();
    testQueue.enqueue(1);
    testQueue.enqueue(2);
    testQueue.enqueue(3);
    testQueue.enqueue(4);
    testQueue.enqueue(5);
    test.equal(testQueue.length, 5);
    test.equal(testQueue.dequeue(), 1);
    test.equal(testQueue.dequeue(), 2);
    test.equal(testQueue.dequeue(), 3);
    test.equal(testQueue.dequeue(), 4);
    test.equal(testQueue.dequeue(), 5);
    test.equal(testQueue.dequeue(), undefined);
    test.equal(testQueue.length, 0);
    test.done();
};

exports.enqueueAndShutdown = function(test) {
    bootstrap(test);
    test.expect(2);
    var testQueue = new InfiniQueue();
    testQueue.enqueue(1);
    testQueue.enqueue(2);
    testQueue.enqueue(3);
    testQueue.enqueue(4);
    testQueue.enqueue(5);
    test.equal(testQueue.length, 5);
    testQueue.shutdown();
    test.equal(testQueue.length, 0);
    test.done();
};

exports.enqueueDequeueWrapped = function(test) {
    bootstrap(test);
    test.expect(2);
    var testQueue = new InfiniQueue();
    testQueue.enqueue(1);
    var wrappedVal = testQueue.dequeueWrapped();
    test.equal(wrappedVal.val, 1);
    testQueue.enqueueWrapped(wrappedVal);
    test.equal(testQueue.length, 1);
    testQueue.shutdown();
    test.done();
};

exports.testPerf = function(test) {
    bootstrap(test);
    test.expect(2);
    stretchMemory(BigArr);
    var naive100k = naiveQueue(100000);
    var naiveBig = naiveQueue(BigArr);
    test.ok(naive100k > naiveBig, 'if this fails InfiniQueue is unnecessary');
    infiniQueue(100000);
    var infiniBig = infiniQueue(BigArr*50);
    test.ok(infiniBig > naiveBig, 'InfiniQueue is faster than a naive queue');
    test.done();
};