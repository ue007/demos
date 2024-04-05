const { open } = require('rosbag');

async function logMessagesFromFooBar() {
	// open a new bag at a given file location:
	const bag = await open('./fixtures/example.bag');
	console.log(bag);

	console.log(bag.header);
	console.log(bag.chunkInfos);
	console.log(bag.connections);

	// reads topics
	const topics = Object.keys(bag.connections).map((con) => bag.connections[con].topic);
	console.log(topics);

	// read all messages from both the '/foo' and '/bar' topics:
	await bag.readMessages({ topics: ['/rosout'] }, (result) => {
		// topic is the topic the data record was in
		// in this case it will be either '/foo' or '/bar'
		console.log(result.topic);
		// message is the parsed payload
		// this payload will likely differ based on the topic
		console.log(result.message);
	});
}

logMessagesFromFooBar();
