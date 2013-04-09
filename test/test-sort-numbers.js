var qsort = require('../');
var sink = require('stream-sink');


exports.testSortNumbers = function(test) {
    var s = qsort();
    // removed 0 as there is a bug in node v0.10.3
    // with transform streams in objectMode
    // see https://github.com/joyent/node/pull/5181
    var source = [8, 5, 1, 4, 3, 9, 18, 45, 3];
    s.pipe(sink({objectMode: true})).on('data', function(data) {
        clearTimeout(to);
        test.equal(JSON.stringify(data), JSON.stringify(source.sort()), 'data should be identical');
        test.done();
    });
    source.forEach(function(e) {
        s.write(e);
    })
    s.end()

    var to = setTimeout(function() {
        test.fail('too long');
        test.done();
    }, 100);
}
