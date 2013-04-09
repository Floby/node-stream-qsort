var qsort = require('../');
var sink = require('stream-sink');
var as = require('./arraystream');


exports.testSortStringsLowercase = function(test) {
    var source = ['disney', 'world', 'a', 'aba', 'hello', '8', 'CAPITAL'];

    var compare = function CustomCompare (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return a.localeCompare(b);
    }
    var s = qsort(compare);

    as(source).pipe(s).pipe(sink({objectMode: true})).on('data', function(data) {
        clearTimeout(to);
        test.equal(JSON.stringify(data), JSON.stringify(source.sort(compare)), 'data should be identical');
        test.done();
    });

    var to = setTimeout(function() {
        test.fail('too long');
        test.done();
    }, 100);
}



