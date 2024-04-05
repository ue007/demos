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
import Converter from './converter';
import { TimeUtil } from 'rosbag';

// Currently every message *MUST* have a pose. However, if we don't have one
// we can create a fake pose at (0, 0, 0) which time is set by the topic message
// timestamp.
export class TopicConverter extends Converter {
	constructor(config) {
		super(config);
	}

	static get name() {
		return 'TopicConverter';
	}

	// Should never match anything, but an empty string seems too fragile
	static get messageType() {
		return 'xviz_msgs/topic';
	}

	async convertMessage(frame, xvizBuilder) {
		console.log(frame, xvizBuilder);
		const position = this.config.position || [Math.random() * 180, 0, 0];

		const msg = frame[this.topic];
		if (!msg) {
			return;
		}

		/**
		 * data:Uint8Array(24) [0, 1, 0, 0, 16, 0, 0, 0, 72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33, 32, 48, 0],
		 * timestamp:{sec: 1585866235, nsec: 112609068}
		 * topic:{name: '/topic', type: 'std_msgs/msg/String', serializationFormat: 'cdr', offeredQosProfiles: Array(1)},
		 * value:{data: 'Hello, world! 0'}
		 */
		const { timestamp, value } = msg[msg.length - 1];
		xvizBuilder.pose(this.xvizStream).position(...position);
		xvizBuilder.timestamp(TimeUtil.toDate(timestamp).getTime() / 1e3);

		xvizBuilder
			.primitive('/object/tracking_point')
			.circle([10, 10, 0], 1)
			.id(value.data + '-circle')
			.style({ fill_color: '#048' });

		xvizBuilder
			.primitive('/object/shape')
			.polygon([
				[10, 14, 0],
				[7, 10, 0],
				[13, 6, 0],
			])
			.id(value.data + '-shape')
			.style({
				fill_color: '#08f',
				height: 3.6,
			});
	}

	getMetadata(xvizMetaBuilder) {
		xvizMetaBuilder.stream(this.xvizStream).category('topic');
	}
}
