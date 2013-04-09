var qsort = require('../');
var sink = require('stream-sink');


exports.testNoValue = function(test) {
    var s = qsort();
    var source = [];
    s.pipe(sink({objectMode: true})).on('data', function(data) {
        clearTimeout(to);
        test.equal(JSON.stringify(data), JSON.stringify(source), 'data should be identical');
        test.done();
    });
    source.forEach(function(e) {
        s.write(e);
    })
    s.end()
    var to = setTimeout(function() {
        test.fail('too long');
        test.done();
    }, 100)
}

