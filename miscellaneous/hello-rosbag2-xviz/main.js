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
/* eslint-disable camelcase */
import { alias } from 'yargs';
import { register, convertArgs } from './src';

/**
 * set up ros2 provider
 * @param {*} args
 */
function setupROSProvider(args) {
	register({
		topicConfig: [
			{
				topic: '/topic',
				type: 'std_msgs/msg/String',
				converter: 'TopicConverter',
				config: {
					xvizStream: 'xviz_msgs/topic',
				},
			},
		],
	});
}

function main() {
	let args = alias('h', 'help');
	args = convertArgs(args);

	// This will parse and execute the server command
	args.middleware(setupROSProvider).parse();
}

main();
