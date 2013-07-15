var ARRCOUNT = 100000;

function InfiniQueue() {
    this.length = 0;
    this.arrs = [];
    return this;
}

InfiniQueue.prototype.enqueue = function enqueue(val) {
    var arrIndex = Math.floor(this.length/ARRCOUNT);
    this.length++;
    this.arrs[arrIndex] = this.arrs[arrIndex] || [];
    this.arrs[arrIndex].push(val);
};

InfiniQueue.prototype.dequeue = function dequeue() {
    this.length--;
    var arrIndex = Math.floor(this.length/ARRCOUNT);
    return this.arrs[arrIndex].shift();
};

InfiniQueue.prototype.shutdown = function shutdown(done) {
    this.arrs = [];
    this.count = 0;
    if(done && done instanceof Function) done();
};

module.exports = InfiniQueue;