[![Build Status](https://travis-ci.org/Floby/node-stream-qsort.png?branch=master)](https://travis-ci.org/Floby/node-stream-qsort)

stream-qsort
============

> A sorting stream using the qsort algorithm

Install
-------

    npm install stream-qsort

Usage
-----

```javascript
var qsort = require('stream-qsort');
var data = [1, 8, 5, 0, 4, 19, 3];
var sort = qsort();
sort.on('data', console.log);

data.forEach(function(e) {
    sort.write(e);
});
sort.end();

// output
// 0
// 1
// 19
// 3
// 4
// 5
// 8

```

As you can see, the default compare function sorts
19 right after 1 and before 3. This is because the contract
of the QsortStream is to use the same compare functions as
Array.sort().

See the [official doc on sort](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort)

API
---

#### new QsortStream([compare], [options])

Creates a new QsortStream. Additionnally to the default Duplex streams options
you can specifies these

* `compare`: A function to compare two values

You can also specify the compare function directly as an argument


_QsortStream forces both readable and writable sides to objectMode_


Contributing
------------

Anyone is welcome to submit issues and pull requests on [github](http://github.com/floby/node-stream-qsort)


License
-------

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Florent Jaby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
