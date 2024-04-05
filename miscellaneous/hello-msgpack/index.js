const { encode, decode } = require('@msgpack/msgpack');

const object = {
	nil: null,
	integer: 1,
	float: Math.PI,
	string: 'Hello, world!',
	binary: Uint8Array.from([1, 2, 3]),
	array: [10, 20, 30],
	map: { foo: 'bar' },
	timestampExt: new Date(),
};

const encoded = encode(object);
console.log(encoded);
const decoded = decode(encoded);
console.log(decoded);
