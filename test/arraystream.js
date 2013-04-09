var util = require('util');
var stream = require('stream');

function ArrayStream (array) {
    if(!(this instanceof ArrayStream)) return new ArrayStream(array);
    stream.Readable.call(this, {objectMode:true});
    this._source = array.slice();
}
util.inherits(ArrayStream, stream.Readable);

ArrayStream.prototype._read = function(size) {
    var chunk = this._source.shift();
    this.push(chunk);
}
module.exports = ArrayStream;
