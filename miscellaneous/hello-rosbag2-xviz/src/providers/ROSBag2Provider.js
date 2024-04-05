// Copyright (c) 2019 Uber Technologies, Inc.
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
/* global console */
/* eslint-disable no-console */
import { XVIZData, XVIZEnvelope } from '@xviz/io';
import { XVIZMetadataBuilder } from '@xviz/builder';
import { ROSBag } from '../core/ros-bag';
import { ROSConfig } from '../core/ros-config';
import { MessageIterator } from './MessageIterator';

export class ROSBag2Provider {
	constructor({ root, options }) {
		this.bagPath = root.endsWith('.db3') ? root : `${root}.db3`;
		this.BagClass = (options && options.BagClass) || ROSBag;

		// These likely come from ROSBag2Provider arguments passed
		// when added to the XVIZProviderFactory
		this.ros2xvizFactory = options && options.ros2xvizFactory;
		this.rosConfig = options && options.rosConfig && new ROSConfig(options.rosConfig);

		this.options = options || {};
		this.metadata = null;
		this.ros2xviz = null;
		this.isValid = false;

		if (!this.ros2xvizFactory) {
			throw new Error('The ROSBag2Provider requires a ROS2XVIZFactory instance');
		}
	}

	log(msg) {
		const { logger } = this.options;
		if (logger && logger.info) {
			logger.info(msg);
		}
	}

	async init() {
		console.log('ROSBag2Provider init');
		try {
			// options: {logger}
			this.ros2xviz = this.ros2xvizFactory.create(this.rosConfig, this.options);
			this.bag = new this.BagClass(this.bagPath, this.rosConfig, this.options);

			if (this.bag) {
				this.isValid = await this.bag.init(this.ros2xviz);
				if (this.isValid) {
					this._getMetadata();
				}
			}
		} catch (err) {
			console.log(err);
		}
	}

	valid() {
		return this.isValid;
	}

	_getMetadata() {
		if (this.valid) {
			const xvizMetadataBuilder = new XVIZMetadataBuilder();
			this.bag.getMetadata(xvizMetadataBuilder, this.ros2xviz);
			xvizMetadataBuilder.logInfo({
				description: 'Conversion of ROS2 DB3 data set into XVIZ',
				license: 'CC BY-NC-SA 3.0',
				'license link': '<a href="http://creativecommons.org/licenses/by-nc-sa/3.0/">http://creativecommons.org/licenses/by-nc-sa/3.0/</a>',
				uri: '<a href="https://github.com/uber/xviz-data">https://github.com/uber/xviz-data</a>',
				source: {
					title: 'Vision meets Robotics: The ROS2 DB3 Dataset',
					author: 'Jeff',
					link: '<a href="http://www.cvlibs.net/datasets/kitti/raw_data.php">http://www.cvlibs.net/datasets/kitti/raw_data.php</a>',
					copyright:
						'All datasets and benchmarks on <a href="http://www.cvlibs.net/datasets/kitti">this page</a> are copyright by us and published under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License. This means that you must attribute the work in the manner specified by the authors, you may not use this work for commercial purposes and if you alter, transform, or build upon this work, you may distribute the resulting work only under the same license.',
				},
			});

			const rawMetadata = xvizMetadataBuilder.getMetadata();
			this.metadata = XVIZEnvelope.Metadata(rawMetadata);
		}
	}

	xvizMetadata() {
		if (!this.metadata) {
			this._getMetadata();
		}

		if (this.metadata) {
			return new XVIZData(this.metadata);
		}

		return null;
	}

	getMessageIterator({ startTime, endTime } = {}) {
		// metadata
		let { start_time: start, end_time: end } = this.metadata.data.log_info;

		// bounds check params
		if (startTime) {
			if (startTime >= start && startTime <= end) {
				start = startTime;
			}
		}

		if (endTime) {
			if (endTime >= start && endTime <= end) {
				end = endTime;
			} else {
				// TODO: allow default duration to be an option
				end = start + 30;
			}
		}

		return new MessageIterator(start, end, 0.1);
	}

	async xvizMessage(iterator) {
		const {
			valid,
			data: { start, end },
		} = iterator.next();
		if (!valid) {
			return null;
		}
		const frames = await this.bag.readMessages(start, end);
		console.log(frames);

		if (Object.keys(frames).length === 0) return null;

		const msg = await this.ros2xviz.buildMessage(frames);

		if (msg) {
			return new XVIZData(XVIZEnvelope.StateUpdate(msg));
		}

		return null;
	}
}
