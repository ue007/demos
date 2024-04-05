const ffmpeg = require('ffmpeg.js');
const fs = require('fs');
const testData = new Uint8Array(fs.readFileSync('test.webm'));
console.log(testData);
// Encode test video to VP8.
const result = ffmpeg({
	MEMFS: [{ name: 'test.webm', data: testData }],
	arguments: ['-i', 'test.webm', '-c:v', 'libvpx', '-an', 'out.webm'],
});
console.log(result);

// Write out.webm to disk.
const out = result.MEMFS[0];
console.log(out);
fs.writeFileSync(out.name, Buffer(out.data));
