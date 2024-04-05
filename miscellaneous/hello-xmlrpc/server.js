var xmlrpc = require('xmlrpc');

// Creates an XML-RPC server to listen to XML-RPC method calls
var server = xmlrpc.createServer({ host: 'localhost', port: 9095 });
// Handle methods not found
server.on('NotFound', function (method, params) {
	console.log('Method ' + method + ' does not exist');
});
// Handle method calls by listening for events with the method call name
server.on('anAction', function (err, params, callback) {
	console.log("Method call params for 'anAction': " + params);

	// ...perform an action...

	// Send a method response with a value
	callback(null, 'aResult');
});
console.log('XML-RPC server listening on port 9095');
