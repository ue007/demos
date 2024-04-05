const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	console.log('start open baidu.com!');
	await page.goto('https://baidu.com', {
		waitUntil: 'networkidle2',
	});

	console.log('start generate pdf!');
	await page.pdf({ path: 'baidu.pdf', format: 'a4' });
	
	console.log('close!');
	await browser.close();
})();
