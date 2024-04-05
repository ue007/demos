var lz4 = require('lz4js');
var fs = require('fs');

var data = fs.readFileSync('./fixtures/example.bag');

var compressed = Buffer.from(lz4.compress(data));

fs.writeFileSync('./fixtures/test-example-lz4.bag', compressed);
