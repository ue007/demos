var path = '/Users/merlot/Documents/Zone/ue007/hello/hello-fetch/data.json';
var fs = require('fs');
fs.readFile(path, 'utf8', function (err, data) {
	if (err) throw err;
	console.log(data);
});
