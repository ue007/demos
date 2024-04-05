const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	console.log('start open baidu.com!');
	await page.goto('http://baidu.com');

	console.log('start screenshot!');
	await page.screenshot({ path: 'baidu.png' });

	console.log('close!');
	await browser.close();
})();
