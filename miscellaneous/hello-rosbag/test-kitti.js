const { open } = require('rosbag');
var lz4 = require('lz4js');
var fs = require('fs');

const FILENAME = 'example';

function getFixture(filename = FILENAME) {
	return `${__dirname}/fixtures/${filename}.bag`;
}

async function fullyReadBag(name, opts) {
	const filename = getFixture(name);
	const bag = await open(filename);
	const messages = [];
	await bag.readMessages(opts || {}, (msg) => {
		messages.push(msg);
	});
	return messages;
}

async function logMessagesFromFooBar() {
	const messages = await fullyReadBag('kitti_2011_09_26_drive_0005_synced', {
		topics: ['/kitti/velo/pointcloud'],
		decompress: {
			lz4: (buffer) => {
				const unCompress = Buffer.from(lz4.decompress(buffer));
				console.log(unCompress);
				return unCompress;
			},
		},
	});
	const topics = messages.map((msg) => msg.topic);
	console.log(topics.length, 1351);
	topics.forEach((topic) => {
		console.log(topic);
	});
}

logMessagesFromFooBar();
