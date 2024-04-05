const si = require('systeminformation');

// promises style - new since version 3
si.cpu()
	.then((data) => console.log(data))
	.catch((error) => console.error(error));

si.graphics()
	.then((data) => console.log(data))
	.catch((error) => console.error(error));

si.blockDevices()
	.then((data) => console.log(data))
	.catch((error) => console.error(error));

si.cpuTemperature()
	.then((data) => console.log(data))
	.catch((error) => console.error(error));

si.usb()
	.then((data) => console.log(data))
	.catch((error) => console.error(error));

si.diskLayout()
	.then((data) => console.log(data))
	.catch((error) => console.error(error));

setInterval(function () {
	si.networkStats().then((data) => {
		console.log(data);
	});
}, 1000);
