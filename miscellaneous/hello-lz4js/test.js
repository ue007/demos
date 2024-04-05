var lz4 = require("lz4js");
var fs = require("fs");
 
// Compress 128 bytes of zero.
var compressed = lz4.compress(new Array(128));
 
// Decompress.
var decompressed = lz4.decompress(compressed);
 
// Compress file.bin to file.lz4.
var data = fs.readFileSync("package.json");
compressed = Buffer.from(lz4.compress(data));
fs.writeFileSync('package.lz4', compressed);



