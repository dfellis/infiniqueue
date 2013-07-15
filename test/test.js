var InfiniQueue;

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

exports.getInfiniQueue = function(iq) {
    InfiniQueue = iq;
};

exports.testPerf = function(test) {
    bootstrap(test);
    test.expect(3);
    stretchMemory(200000);
    var naive100k = naiveQueue(100000);
    var naive200k = naiveQueue(200000);
    test.ok(naive100k > naive200k, 'if this fails InfiniQueue is unnecessary');
    var infini100k = infiniQueue(100000);
    var infini200k = infiniQueue(200000);
    test.ok(naive100k > infini100k, 'InfiniQueue is not magic');
    test.ok(infini200k > naive200k, 'InfiniQueue is faster than a naive queue');
    test.done();
};