var util = require('util');
var stream = require('stream');
var SS = require('stream-stream');

/**
 * this defaultCompare function works like
 * the default compare function for Array.sort
 * which means elements are sorted lexicographically
 * see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort
 */
function defaultCompare(a, b) {
    a = a.toString();
    b = b.toString();
    if(a < b) return -1;
    else if(a > b) return 1;
    else return 0;
}

var count = 0;

function QsortStream (compare, options) {
    if(!(this instanceof QsortStream)) return new QsortStream(compare, options);
    this._id = count++;
    if(!options) {
        options = {};
        if(typeof compare === 'object') {
            options = compare;
            compare = null;
        }
    }

    this._compare = compare || options.compare || defaultCompare;
    
    options.objectMode = true;
    stream.Duplex.call(this, options);

    this._options = options;

    this._output = SS(options);
    this._output.on('end', function() {
      this._ended = true;
      this.read(0);
    }.bind(this));
    this._output.on('readable', function() {
      this.read(0);
    }.bind(this))

    this.on('readable', function() {
    });

    var oldPush = this.push;
    this.push = function(v) {
        console.log('pushing', v)
        return oldPush.call(this, v);
    }
}
util.inherits(QsortStream, stream.Duplex);

QsortStream.prototype._getPivot = function _getPivot() {
    return this._pivot;
};
QsortStream.prototype._setPivot = function _setPivot(pivot) {
    this._pivot = pivot;
    this._pivotStream = new stream.PassThrough(this._options);
    this._pivotStream.end(this._pivot);
};
QsortStream.prototype._hasPivot = function _hasPivot() {
    return typeof this._pivot !== 'undefined'
};

QsortStream.prototype._write = function _write(chunk, encoding, callback) {
    if(!this._hasPivot()) {
        this._setPivot(chunk);
    }
    else {
        if(this.compare(chunk, this._getPivot())) {
            this._addMin(chunk);
        }
        else {
            this._addMax(chunk);
        }
    }
    callback();
};

QsortStream.prototype._addMin = function _addMin(chunk) {
    if(!this._minStream) {
        this._minStream = new QsortStream(this._options);
        this._output.write(this._minStream);
    }

    if(chunk === 0) console.log('writing ZERO')
    this._minStream.write(chunk)
};

QsortStream.prototype._addMax = function _addMax(chunk) {
    if(!this._maxStream) {
        this._maxStream = new QsortStream(this._options);
    }
    this._maxStream.write(chunk);
};

QsortStream.prototype._read = function _read(size) {
    var res = this._output.read(size);
    if(res === null) {
        if(this._ended) return this.push(null);
        else this._readableState.reading = false;
    }
    else {
        this.push(res);
    }
};

QsortStream.prototype.end = function end() {
    QsortStream.super_.prototype.end.apply(this, arguments);
    if(this._getPivot()) {
        this._output.write(this._pivotStream);
    }
    if(this._maxStream) {
        this._maxStream.end();
        this._output.write(this._maxStream);
    }
    if(this._minStream) {
        this._minStream.end();
    }
    this._output.end();
};

QsortStream.prototype.compare = function compare(a, b) {
    return this._compare(a, b) < 0;
};


module.exports = QsortStream;
