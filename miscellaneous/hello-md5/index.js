var fs = require('fs');
var md5 = require('md5');

fs.readFile('example.txt', function (err, buf) {
	console.log(buf);
	console.log(md5(buf));
});


console.log(md5('message'));