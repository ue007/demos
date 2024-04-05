// Copyright (c) 2019 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* global Buffer */
/* eslint-disable camelcase */
import { open, TimeUtil } from 'rosbag';
import { quaternionToEuler } from '../common/quaternion';
import { openNodejsFile, openNodejsDirectory } from '@foxglove/rosbag2-node';

export class ROSBag {
	constructor(bagPath, rosConfig, options = {}) {
		this.bagPath = bagPath;
		this.rosConfig = rosConfig;
		this.options = options;

		this.bagContext = {};
		this.topicMessageTypes = {};
	}

	// Open the ROS Bag and collect information
	async init(ros2xviz) {
		const bag = await this._openBag();

		await this._initBag(bag);

		// If we already have types for every topic, then we do not need to scan the bag file.
		if (this.rosConfig.needsTopicTypes()) {
			this._gatherTopicsTypes(bag);
		}

		this._initTopics(ros2xviz);
		console.log('init ros2xviz');

		return true;
	}

	async _openBag() {
		return await openNodejsFile(this.bagPath);
	}

	/**
	 * Clients may subclass and expand this method
	 * in order to support any special processing for their specific
	 * topics.
	 *
	 * Extracts:
	 *   frameIdToPoseMap: ROS /tf transform tree
	 *   start_time,
	 *   end_time,
	 *   origin: map origin
	 */
	async _initBag(bag) {
		const TF = '/tf';
		const TF_STATIC = '/tf_static';
		const [startTime, endTime] = await bag.timeRange();
		
		console.log('startTime',startTime);
		console.log('endTime',endTime);

		this.bagContext.start_time = TimeUtil.toDate(startTime).getTime() / 1e3;
		this.bagContext.end_time = TimeUtil.toDate(endTime).getTime() / 1e3;

		const frameIdToPoseMap = {};

		// await bag.readMessages({ topics: [TF, TF_STATIC] }, ({ topic, message }) => {
		// 	message.transforms.forEach((t) => {
		// 		frameIdToPoseMap[t.child_frame_id] = {
		// 			...t.transform.translation,
		// 			...quaternionToEuler(t.transform.rotation),
		// 		};
		// 	});
		// });

		// tf
		for await (const msg of bag.readMessages({ topics: [TF, TF_STATIC] })) {
			console.log(msg);
			// 	message.transforms.forEach((t) => {
			// 		frameIdToPoseMap[t.child_frame_id] = {
			// 			...t.transform.translation,
			// 			...quaternionToEuler(t.transform.rotation),
			// 		};
			// 	});
		}

		this.bagContext.frameIdToPoseMap = frameIdToPoseMap;
		console.log(this.bagContext);
	}

	// Collecting the topic & types can be expensive, so we only
	// collect them if they are not already in the configuration
	_gatherTopicsTypes(bag) {
		// const topics = this.rosConfig.topics;
		// for (const conn in bag.connections) {
		// 	const { topic, type } = bag.connections[conn];
		// 	// Filter if 'topics' are provided
		// 	if (!topics || topics.includes(topic)) {
		// 		// Validate that the message type does not change
		// 		if (this.topicMessageTypes[topic] && this.topicMessageTypes[topic] !== type) {
		// 			throw new Error(`Unexpected change in topic type ${topic} has ${this.topicMessageTypes[topic]} with new type ${type}`);
		// 		} else if (!this.topicMessageTypes[topic]) {
		// 			// track we have seen it and add to list
		// 			this.topicMessageTypes[topic] = type;
		// 		}
		// 	}
		// }
	}

	// Using topics and message type, ensure we create a converter
	// for each topic.
	_initTopics(ros2xviz) {
		ros2xviz.initializeConverters(this.topicMessageTypes, this.bagContext);
	}

	getMetadata(metadataBuilder, ros2xviz) {
		ros2xviz.buildMetadata(metadataBuilder, this.bagContext);

		metadataBuilder.startTime(this.bagContext.start_time);
		metadataBuilder.endTime(this.bagContext.end_time);
	}

	// Synchronize xviz messages by timestep
	async readMessages(start, end) {
		const bag = await this._openBag();
		const frames = {};

		const options = {
			topics: this.rosConfig.topics,
		};

		if (start) {
			options.startTime = TimeUtil.fromDate(new Date(start * 1e3));
		}

		if (end) {
			options.endTime = TimeUtil.fromDate(new Date(end * 1e3));
		}

		/**
		 * {
  			topic: {
  			  name: '/topic',
  			  type: 'std_msgs/msg/String',
  			  serializationFormat: 'cdr',
  			  offeredQosProfiles: [ [Object] ]
  			},
  			timestamp: { sec: 1585866239, nsec: 113147889 },
  			data: <Buffer 00 01 00 00 10 00 00 00 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21 20 38 00>,
  			value: { data: 'Hello, world! 8' }
			}
		 */
		for await (const msg of bag.readMessages({
			topics: options.topics,
			startTime: options.startTime,
			endTime: options.endTime,
			rawMessages: false,
		})) {
			if (msg.topic && msg.topic.name) {
				frames[msg.topic.name] = frames[msg.topic.name] || [];
				frames[msg.topic.name].push(msg);
			}
		}
		return frames;
	}
}
