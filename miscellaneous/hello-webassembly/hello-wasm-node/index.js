const fs = require('fs');
const wasmBuffer = fs.readFileSync('./test.wasm');
const Module = require('./test.js');
const wasm = Module({ wasmBinaryFile: 'test.wasm' });
console.log(wasm);
wasm.then((wasmModule) => {
	console.log(wasmModule._add(10, 2));
});
// console.log(wasm.onRuntimeInitialized);
// wasm.onRuntimeInitialized = function () {
// 	console.log(wasm._add(40, 40));
// };

// Assume add.wasm file exists that contains a single function adding 2 provided arguments

// WebAssembly.instantiate(wasmBuffer).then((wasmModule) => {
// 	console.log(wasmModule.instance.exports);
// 	const { add } = wasmModule.instance.exports;
// 	console.log(add(100, 2));
// });

// const fs = require('fs');
// const buf = fs.readFileSync('./addTwo.wasm');
// const lib = await WebAssembly.instantiate(new Uint8Array(buf)).then((res) => res.instance.exports);

// const Benchmark = require('benchmark');

// const suite = new Benchmark.Suite();

// suite
// 	.add('wasm', function () {
// 		lib.addTwo(2, 2);
// 	})
// 	.add('js', function () {
// 		addTwo(2, 2);
// 	})
// 	.on('cycle', function (event) {
// 		console.log(String(event.target));
// 	})
// 	.on('complete', function () {
// 		console.log('Fastest is ' + this.filter('fastest').map('name'));
// 	})
// 	.run();

// function addTwo(a, b) {
// 	return a + b;
// }
