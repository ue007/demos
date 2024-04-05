// node
import process from 'process';

// xviz
import { XVIZFormatWriter } from '@xviz/io';
import { FileSource, FileSink } from '@xviz/io/node';
import { XVIZProviderFactory } from '@xviz/io';
import { StartEndOptions } from '@xviz/ros';

// foxglove
import { ROS2_TO_DEFINITIONS, ROS2_DEFINITIONS_ARRAY, MessageIterator } from '@foxglove/rosbag2';
import { openNodejsFile } from '@foxglove/rosbag2-node';
import { MessageReader } from '@foxglove/rosmsg2-serialization';
import { CdrReader } from '@foxglove/cdr';

// inner
import { createDir, deleteDirRecursive } from './util';

/**
 * convert Args
 * @param {*} inArgs
 * @returns
 */
export function convertArgs(inArgs) {
	const cmd = 'convert [-d output] <bag>';

	return inArgs.command(
		cmd,
		'Convert a rosbag db3 to xviz',
		{
			...StartEndOptions,
			directory: {
				alias: 'd',
				describe: 'Directory to save XVIZ data',
				type: 'string',
				required: true,
			},
			format: {
				describe: 'Output data format',
				default: 'JSON_STRING',
				choices: ['JSON_STRING', 'BINARY_GLB'],
				nargs: 1,
			},
		},
		convertCmd
	);
}

/**
 *
 * @param {*} args
 * @returns
 */
export async function convertCmd(args) {
	const { bag, directory, start, end, format } = args;

	// Setup output directory
	try {
		deleteDirRecursive(directory);
	} catch (err) {
		// ignore
	}

	createDir(directory);

	/**
	 * _: [ 'convert' ],
	 * d: './xviz-data/ros22xviz/talker',
	 * directory: './xviz-data/ros22xviz/talker',
	 * format: 'BINARY_GLB',
	 * '$0': 'index.js',
	 * bag: './assets/bags/talker/talker.db3'
	 */
	console.log('入参：', args);

	const source = new FileSource(bag);
	console.log(XVIZProviderFactory.providerClasses);

	/**
	 * XVIZProviderFactoryClass
	 * {className: XVIZJSONProvider},
	 * {className: XVIZBinaryProvider},
	 * {className: XVIZProtobufProvider}
	 * {className: ROSProvider}
	 */
	const provider = await XVIZProviderFactory.open({
		options: { ...args },
		source,
		root: bag,
	});

	console.log('provider:', provider);
	if (!provider) {
		throw new Error('Failed to create ROSBag2Provider');
	}

	// This abstracts the details of the filenames expected by our server
	const sink = new FileSink(directory);

	const iterator = provider.getMessageIterator({ startTime: start, endTime: end });
	const isValid = iterator.valid();

	if (!isValid) {
		throw new Error('Error creating and iterator');
	} else {
		console.log('iterator is valid:', isValid);
	}

	const writer = new XVIZFormatWriter(sink, { format });
	console.log('create XVIZFormatWriter:', format);

	const md = provider.xvizMetadata();
	// Augment metadata with timing information
	// if provided
	setMetadataTimes(md.message().data, start, end);

	writer.writeMetadata(md);

	// If we get interrupted make sure the index is written out
	signalWriteIndexOnInterrupt(writer);

	// Process data
	let frameSequence = 0;
	while (iterator.valid()) {
		const data = await provider.xvizMessage(iterator);
		if (data) {
			process.stdout.write(`Writing frame ${frameSequence}\r`);
			writer.writeMessage(frameSequence, data);
			frameSequence += 1;
		} else {
			console.log(`No data for frame ${frameSequence}`);
		}
	}

	writer.close();
}

/* eslint-disable camelcase */
function setMetadataTimes(metadata, start, end) {
	if (start || end) {
		if (start) {
			const logInfo = metadata.log_info || {};
			logInfo.start_time = start;
		}

		if (end) {
			const logInfo = metadata.log_info || {};
			logInfo.end_time = end;
		}
	}
}
/* eslint-enable camelcase */
function signalWriteIndexOnInterrupt(writer) {
	process.on('SIGINT', () => {
		console.log('Aborting, writing index file.');
		writer.close();
		process.exit(0); // eslint-disable-line no-process-exit
	});
}
