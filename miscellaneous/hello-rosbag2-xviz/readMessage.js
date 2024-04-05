const { Rosbag2, ROS2_TO_DEFINITIONS, ROS2_DEFINITIONS_ARRAY, MessageIterator } = require('@foxglove/rosbag2');
const { openNodejsFile, openNodejsDirectory } = require('@foxglove/rosbag2-node');
const { MessageReader } = require('@foxglove/rosmsg2-serialization');
const { CdrReader, CdrSizeCalculator, CdrWriter } = require('@foxglove/cdr');

// debug
console.log(Rosbag2);
// console.log(openNodejsFile, openNodejsDirectory);

async function readMessage() {
	const bag = await openNodejsFile('./assets/bags/talker/talker.db3');

	// timerange
	const [startTime, endTime] = await bag.timeRange();
	console.log(startTime, endTime);

	console.log(`startTime:${startTime} endTime:${endTime}`);

	// topics
	const topicDefs = await bag.readTopics();
	console.log(`topicDefs:${topicDefs}`);

	// message counts: Map<string, number> {'/topic':10,'/rosout':10}
	const messageCounts = await bag.messageCounts();
	console.log(`messageCounts:${messageCounts}`);
	console.log(`messageCounts keys:${messageCounts.keys()}`);
	console.log(`messageCounts values:${messageCounts.values()}`);

	let hasAnyMessages = false;

	for (const item of messageCounts.values()) {
		if (item > 0) {
			hasAnyMessages = true;
			break;
		}
	}
	if (!hasAnyMessages) {
		throw new Error('Bag contains no messages');
	}

	let allMessageCount = 0;
	for (const item of messageCounts.values()) {
		allMessageCount += item;
	}
	console.log('\x1B[32m%s\x1B[0m', `Bag contains ${allMessageCount} messages!`);

	// message
	const messageIterator = bag.readMessages();
	console.log(messageIterator);
	for await (const msg of bag.readMessages()) {
		console.log(msg);
	}
}

async function readMessageFromRaw() {
	const bag = await openNodejsFile('./assets/bags/talker/talker.db3');

	// timerange
	const [startTime, endTime] = await bag.timeRange();
	console.log(startTime, endTime);

	console.log(`startTime:${startTime} endTime:${endTime}`);

	// topics
	const topicDefs = await bag.readTopics();
	console.log(`topicDefs:${topicDefs}`);

	// message counts: Map<string, number> {'/topic':10,'/rosout':10}
	const messageCounts = await bag.messageCounts();
	console.log(`messageCounts:${messageCounts}`);
	console.log(`messageCounts keys:${messageCounts.keys()}`);
	console.log(`messageCounts values:${messageCounts.values()}`);

	let hasAnyMessages = false;

	for (const item of messageCounts.values()) {
		if (item > 0) {
			hasAnyMessages = true;
			break;
		}
	}
	if (!hasAnyMessages) {
		throw new Error('Bag contains no messages');
	}

	let allMessageCount = 0;
	for (const item of messageCounts.values()) {
		allMessageCount += item;
	}
	console.log('\x1B[32m%s\x1B[0m', `Bag contains ${allMessageCount} messages!`);

	// parse raw message
	const problems = [];
	const topics = [];
	const topicStats = new Map();
	const datatypes = new Map();
	const messageDefinitionsByTopic = {};
	const parsedMessageDefinitionsByTopic = {};

	for (const topicDef of topicDefs) {
		const numMessages = messageCounts.get(topicDef.name);

		topics.push({ name: topicDef.name, schemaName: topicDef.type });
		if (numMessages != undefined) {
			topicStats.set(topicDef.name, { numMessages });
		}

		const parsedMsgdef = ROS2_TO_DEFINITIONS.get(topicDef.type);
		if (parsedMsgdef == undefined) {
			problems.push({
				severity: 'warn',
				message: `Topic "${topicDef.name}" has unsupported datatype "${topicDef.type}"`,
				tip: 'ROS 2 .db3 files do not contain message definitions, so only well-known ROS types are supported in Foxglove Studio. As a workaround, you can convert the db3 file to mcap using the mcap CLI. For more information, see: https://foxglove.dev/docs/studio/connection/local-file',
			});
			continue;
		}

		const fullParsedMessageDefinitions = [parsedMsgdef];
		const messageDefinition = JSON.stringify(fullParsedMessageDefinitions);
		datatypes.set(topicDef.type, { name: topicDef.type, definitions: parsedMsgdef.definitions });
		messageDefinitionsByTopic[topicDef.name] = messageDefinition;
		parsedMessageDefinitionsByTopic[topicDef.name] = fullParsedMessageDefinitions;
	}

	// console.log(`problems:${problems}`);
	// console.log(`topicStats:${topicStats}`);
	// console.log(`datatypes:${datatypes}`);
	// console.log(`messageDefinitionsByTopic:${messageDefinitionsByTopic}`);
	// console.log(`parsedMessageDefinitionsByTopic:${parsedMessageDefinitionsByTopic}`);
	// datatypes.forEach((v, k) => {
	// 	console.log(v, k);
	// });

	const rowIterators = bag.databases_.map((db) => db.readMessages());
	const messageIterator = new MessageIterator(rowIterators, (rawMessage) => {
		console.log('rawMessage:', rawMessage);
		// Find or create a message reader for this message
		let reader = bag.messageReaders_.get(rawMessage.topic.type);
		if (reader == undefined) {
			const msgdef = ROS2_TO_DEFINITIONS.get(rawMessage.topic.type);
			if (msgdef == undefined) {
				throw new Error(`Unknown message type: ${rawMessage.topic.type}`);
			}
			reader = new MessageReader([msgdef, ...ROS2_DEFINITIONS_ARRAY]);
			bag.messageReaders_.set(rawMessage.topic.type, reader);
		}
		// return reader.readMessage(rawMessage.data);
		const cdrReader = new CdrReader(rawMessage.data);
		const result = reader.readComplexType(reader.rootDefinition, cdrReader);
		result.author = 'Jeff';
		return result;
	});
	for await (const msg of messageIterator) {
		console.log(msg);
	}
}
// readMessage();
readMessageFromRaw();
