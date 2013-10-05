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

InfiniQueue.prototype.enqueueWrapped = function enqueueWrapped(wrappedVal) {
    if(this.end) this.end.next = wrappedVal;
    this.end = wrappedVal;
    this.start = this.start || wrappedVal;
    this.length++;
};

InfiniQueue.prototype.dequeueWrapped = function dequeueWrapped() {
    if(this.start) {
        this.length--;
        var outWrapped = this.start;
        this.start = this.start.next;
        return outWrapped;
    }
};

InfiniQueue.prototype.shutdown = function shutdown(done) {
    this.start = undefined;
    this.end = undefined;
    this.length = 0;
    if(done && done instanceof Function) done();
};

module.exports = InfiniQueue;