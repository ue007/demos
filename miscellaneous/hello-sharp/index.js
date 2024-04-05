const sharp = require('sharp');

sharp('input.png')
	.rotate()
	.resize(200)
	.jpeg({ mozjpeg: true })
	.toBuffer()
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log(err);
	});
