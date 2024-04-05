var lz4 = require('lz4js');
var fs = require('fs');

var data = fs.readFileSync('./package.lz4');

console.log(data);


var uncompressed = Buffer.from(lz4.decompress(data));

fs.writeFileSync('./out/package.json', uncompressed);
