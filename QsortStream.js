var util = require('util');
var stream = require('stream');
var SS = require('stream-stream');

function defaultCompare(a, b) {
    return a < b;
}

function QsortStream (compare, options) {
    if(!(this instanceof QsortStream)) return new QsortStream(compare, options);

    if(!options) {
        options = {};
        if(typeof compare === 'object') {
            options = compare;
            compare = null;
        }
    }

    this._compare = compare || options.compare || defaultCompare;
    
    options.objectMode = true;
    stream.Transform.call(this, options);

}
util.inherits(QsortStream, stream.Transform);

QsortStream.prototype._transform = function _transform(chunk, encoding, callback) {
    this.push(chunk);
    callback()
};

QsortStream.prototype._flush = function _flush(callback) {
    this.push(null);
};


module.exports = QsortStream;
