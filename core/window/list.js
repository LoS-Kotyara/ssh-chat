"use strict";

const blessed = require('blessed');


module.exports = screen => {
	const list = new blessed.list({
		top: 0,
		right: 0,
		bottom: 2,
		width: '20%',
		mouse: true,
		scrollable: true,
		selected: true,
		style: {
			bg: '#aaaaaa',
			fg: 'black',
			selected: {
				bg: 'blue'
			}
		}
	});

	screen.append(list);
	return list;
}