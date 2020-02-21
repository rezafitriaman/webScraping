const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/searchresults.nl.html?label=gen173nr-1DCAEoggI46AdIM1gEaKkBiAEBmAEcuAEXyAEM2AED6AEBiAIBqAIDuAKQsrXyBcACAQ&sid=d0a163fe193ed68a79d61284cd7f6748&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.nl.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaKkBiAEBmAEcuAEXyAEM2AED6AEBiAIBqAIDuAKQsrXyBcACAQ%3Bsid%3Dd0a163fe193ed68a79d61284cd7f6748%3Bsb_price_type%3Dtotal%26%3B&sr_autoscroll=1&ss=Luchthaven+Jakarta+Soekarno-Hatta%2C+Jakarta%2C+Provincie+Jakarta%2C+Indonesi%C3%AB&is_ski_area=&checkin_year=2020&checkin_month=2&checkin_monthday=20&checkout_year=2020&checkout_month=2&checkout_monthday=22&group_adults=1&group_children=0&no_rooms=1&map=1&b_h4u_keep_filters=&from_sf=1&ss_raw=jakarta&ac_position=1&ac_langcode=nl&ac_click_type=b&dest_id=85&dest_type=airport&iata=CGK&place_id_lat=-6.12658&place_id_lon=106.654&search_pageview_id=91636f486307004e&search_selected=true&search_pageview_id=91636f486307004e&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0#map_closed';

(async () => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.setViewport({ width: 2560, height: 1440});

	await page.goto(bookingUrl);

	// get hotel details
	let hotelData = await page.evaluate(() => {
		let hotels = [];
		// get the hotel elements
		let hotelsElms = document.('div.sr_property_block[data-hotelid]');
		// get the hotel data
		hotelsElms.forEach(hotelsElm => {
			let hotelJson = {};

		})
	});
})();
