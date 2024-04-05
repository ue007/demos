const fs = require('fs');
const buf = fs.readFileSync('./test.wasm');
const lib = WebAssembly.instantiate(new Uint8Array(buf)).then((res) => {
	for (var i = 1; i <= 10; i++) {
		console.log('The factorial of ' + i + ' = ' + res.instance.exports._Z4facti(i));
	}
});
