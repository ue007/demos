const { open } = require('rosbag');

async function logMessagesFromFooBar() {
	// open a new bag at a given file location:
	const bag = await open('./fixtures/example.bag');

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
