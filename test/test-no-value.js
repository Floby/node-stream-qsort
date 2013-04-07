var qsort = require('../');
var sink = require('stream-sink');


exports.testOneValue = function(test) {
    var s = qsort();
    var source = [];
    s.pipe(sink({objectMode: true})).on('data', function(data) {
        test.equal(JSON.stringify(data), JSON.stringify(source), 'data should be identical');
        test.done();
    });
    source.forEach(function(e) {
        s.write(e);
    })
    s.end()
}

