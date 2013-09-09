function Link(val, next) {
    this.val = val;
    this.next = next;
    return this;
}

function InfiniQueue() {
    this.length = 0;
    this.start = undefined;
    this.end = undefined;
    return this;
}

InfiniQueue.prototype.enqueue = function enqueue(val) {
    var link = new Link(val, undefined);
    if(this.end) this.end.next = link;
    this.end = link;
    this.start = this.start || link;
    this.length++;
};

InfiniQueue.prototype.dequeue = function dequeue() {
    if(this.start) {
        this.length--;
        var outVal = this.start.val;
        this.start = this.start.next;
        return outVal;
    }
};

InfiniQueue.prototype.shutdown = function shutdown(done) {
    this.start = undefined;
    this.end = undefined;
    this.length = 0;
    if(done && done instanceof Function) done();
};

module.exports = InfiniQueue;