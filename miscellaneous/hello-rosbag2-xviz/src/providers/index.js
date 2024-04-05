// node
import fs from 'fs';

// xviz
import { XVIZProviderFactory } from '@xviz/io';

import { ROSBag } from '../core/ros-bag';
import { ROS2XVIZFactory } from '../core/ros-2-xviz-factory';
import { ROSBag2Provider } from './ROSBag2Provider';
import { DEFAULT_CONVERTERS } from '../messages';

export { MessageIterator } from './MessageIterator';
export { ROSBag2Provider } from './ROSBag2Provider';

export function register(rosConfig, { converters = DEFAULT_CONVERTERS, BagClass = ROSBag } = {}) {
	if (!rosConfig) {
		throw new Error(`Setting up ROS2 Provider with ${rosConfig}`);
	} else {
		console.log('config', rosConfig);
		console.log('converters', converters);
		console.log('BagClass:', BagClass);
	}

	const ros2xvizFactory = new ROS2XVIZFactory(converters);

	console.log(ros2xvizFactory);

	// className, args
	XVIZProviderFactory.addProviderClass(ROSBag2Provider, {
		rosConfig,
		ros2xvizFactory,
		BagClass,
	});

	console.log('XVIZProviderFactory.providerClasses:', XVIZProviderFactory.providerClasses);
	console.log('register successful!');
}
