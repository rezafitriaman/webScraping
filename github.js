const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function run() {
	const USERNAME_SELECTOR = '#login_field';
	const PASSWORD_SELECTOR = '#password';
	const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';
	const SEARCH_SELECTOR = 'body > div.position-relative.js-header-wrapper > header > ' +
		'div.Header-item.Header-item--full.flex-column.flex-lg-row.width-full.flex-order-2.flex-lg-order-none.mr-0.mr-lg-' +
		'3.mt-3.mt-lg-0.Details-content--hidden > div > div > form > label > input.form-control.input-sm.header-search-' +
		'input.jump-to-field.js-jump-to-field.js-site-search-focus';

	const userToSearch = 'john';
	const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;
	const browser = await puppeteer.launch({
		headless: false,
		ignoreHTTPSErrors: true,
		args:[
			'--start-fullscreen'
		]
	});
	// extract emails this is the selector
	const PARENT_LIST = '#user_search_results > div.user-list > .user-list-item > .flex-auto';

	const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > .d-flex a.mr-1'; //'#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a';
	const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > .d-flex .muted-link'; //'#user_search_results > div.user-list > div:nth-child(2) > div.d-flex > div > ul > li:nth-child(2) > a';
	const LENGTH_SELECTOR_CLASS = '.user-list-item';


	const page = await browser.newPage();
	await page.setViewport({ width: 2560, height: 1440});

	await page.goto('https://github.com/login');

	await page.click(USERNAME_SELECTOR);
	await page.keyboard.type(CREDS.username);

	await page.click(PASSWORD_SELECTOR);
	await page.keyboard.type(CREDS.password);
	await page.waitFor(2*1000);

	await page.click(BUTTON_SELECTOR);
	await page.waitFor(2*1000);

	await page.goto(searchUrl);
	await page.waitFor(2*1000);
	// geth length of the list
	let listLength = await page.evaluate((sel) => {
		return document.querySelectorAll(sel).length;
	}, LENGTH_SELECTOR_CLASS);

	console.log(listLength);
	// get the username and email
	let userNameaAndEmail = await page.evaluate((elms) => {
		document.querySelectorAll(elms).forEach(elm => {
			console.log(elm);
			let userName = elm.querySelectorAll('.d-flex')[0].querySelector('a').innerText;
			let email = () => {
				if(elm.querySelectorAll('.d-flex')[1].querySelector('.muted-link') !== null) {
					return elm.querySelectorAll('.d-flex')[1].querySelector('.muted-link').innerText;
				}
			};

			if (email() !== undefined) {
				console.log(userName + ' -> ' + email());
			}

		});
	}, PARENT_LIST);

	await page.waitForNavigation();

	browser.close();
}

run();


