// imuNode.js
// by Dheera Venkatraman (`echo qurren | sed -e "s/\(.*\)/\1@\1.arg/" | tr a-z n-za-m`)

// This is a roslite.js node that runs inside a web browser and makes use of the
// HTML5 Web Sensors API to publish IMU data to /imu/data at 60 Hz.

(() => {
	let nh = ros.initNode('imu_node');
	let pub_imu_data = nh.advertise('/imu/data', 'sensor_msgs/Imu');
	let msg = { '@type': 'sensor_msgs/Imu' };
	const gimbal = new Gimbal();
	gimbal.enable();
	setInterval(() => {
		gimbal.update();
		const lastDataTime = Date.now();
		msg.yaw = (gimbal.yaw * 180) / Math.PI;
		msg.pitch = (gimbal.pitch * 180) / Math.PI;
		msg.roll = (gimbal.roll * 180) / Math.PI;
		msg.quaternion = {
			x: (gimbal.quaternion.x * 180) / Math.PI,
			y: (gimbal.quaternion.y * 180) / Math.PI,
			z: (gimbal.quaternion.z * 180) / Math.PI,
			w: (gimbal.quaternion.w * 180) / Math.PI,
		};
		// Gimbal.quaternion contains combined rotations
		msg.header = {
			timestamp: lastDataTime / 1000.0,
			frame_id: 'imu',
		};
		pub_imu_data.publish(msg);
	}, 5000);

	// if (!DeviceMotionEvent || !DeviceMotionEvent.requestPermission) {
	// 	alert('This browser does not support requesting DeviceMotionEvent permission.');
	// } else {
	// 	DeviceMotionEvent.requestPermission().then((response) => {
	// 		// Access granted by user
	// 		if (response == 'granted') {
	// 			gimbal.enable();
	// 			setInterval(() => {
	// 				const lastDataTime = Date.now();
	// 				msg.yaw = gimbal.yaw;
	// 				msg.pitch = gimbal.pitch;
	// 				msg.roll = gimbal.roll;
	// 				msg.quaternion = gimbal.quaternion;
	// 				// Gimbal.quaternion contains combined rotations
	// 				msg.header = {
	// 					timestamp: lastDataTime / 1000.0,
	// 					frame_id: 'imu',
	// 				};
	// 				pub_imu_data.publish(msg);
	// 			}, 4000);
	// 		} else {
	// 			// Access denied by user
	// 		}
	// 	});
	// }

	// let gyroscopeSensor = null;
	// if (window.Gyroscope) {
	// 	gyroscopeSensor = new Gyroscope({
	// 		frequency: 30,
	// 		referenceFrame: 'device',
	// 	});
	// 	gyroscopeSensor.addEventListener('reading', (e) => {
	// 		msg.angular_velocity = {
	// 			x: gyroscopeSensor.x,
	// 			y: gyroscopeSensor.y,
	// 			z: gyroscopeSensor.z,
	// 		};
	// 	});
	// 	gyroscopeSensor.start();
	// } else {
	// 	console.log('imu_node: Gyroscope not found');
	// }

	// let linearAccelerationSensor = null;
	// if (window.LinearAccelerationSensor) {
	// 	linearAccelerationSensor = new LinearAccelerationSensor({
	// 		frequency: 30,
	// 		referenceFrame: 'device',
	// 	});
	// 	linearAccelerationSensor.addEventListener('reading', (e) => {
	// 		msg.linear_acceleration = {
	// 			x: linearAccelerationSensor.x,
	// 			y: linearAccelerationSensor.y,
	// 			z: linearAccelerationSensor.z,
	// 		};
	// 	});
	// 	linearAccelerationSensor.start();
	// } else {
	// 	console.log('imu_node: LinearAccelerationSensor not found');
	// }

	// let orientationSensor = null;
	// if (window.AbsoluteOrientationSensor) {
	// 	orientationSensor = new AbsoluteOrientationSensor({
	// 		frequency: 30,
	// 		referenceFrame: 'device',
	// 	});
	// 	orientationSensor.addEventListener('reading', (e) => {
	// 		msg.orientation = {
	// 			x: orientationSensor.quaternion[0],
	// 			y: orientationSensor.quaternion[1],
	// 			z: orientationSensor.quaternion[2],
	// 			w: orientationSensor.quaternion[3],
	// 		};
	// 		msg.header = {
	// 			timestamp: orientationSensor.timestamp,
	// 			frame_id: 'imu',
	// 		};
	// 		pub_imu_data.publish(msg);
	// 	});
	// 	orientationSensor.start();
	// } else {
	// 	console.log('imu_node: AbsoluteOrientationSensor not found');
	// }
})();
