function InfiniQueue() {
    this.ROWLEN = 10000;
    this.length = 0;
    this.matrix = [new Array(this.ROWLEN)];
    this.start = 0;
    this.end = -1;
    return this;
}

InfiniQueue.prototype.enqueue = function enqueue(val) {
    this.end++;
    var row = (this.end / this.ROWLEN) | 0;
    var col = this.end % this.ROWLEN;
    if(typeof(this.matrix[row]) !== 'object') {
        this.matrix[row] = new Array(this.ROWLEN);
    }
    this.matrix[row][col] = val;
    this.length++;
};

InfiniQueue.prototype.dequeue = function dequeue() {
    if(this.length) {
        var row = (this.start / this.ROWLEN) | 0;
        var col = this.start % this.ROWLEN;
        var val = this.matrix[row][col];
        this.start++;
        if(this.start === this.ROWLEN) {
            this.matrix.shift();
            this.start -= this.ROWLEN;
            this.end -= this.ROWLEN;
        }
        this.length--;
        return val;
    } else {
        return undefined;
    }
};

InfiniQueue.prototype.shutdown = function shutdown(done) {
    this.start = 0;
    this.end = -1;
    this.length = 0;
    this.matrix = [new Array(this.ROWLEN)];
    if(done && done instanceof Function) done();
};

module.exports = InfiniQueue;