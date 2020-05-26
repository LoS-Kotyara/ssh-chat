"use strict";

const blessed = require('blessed');

module.exports = (screen) => {
	const box = new blessed.box({
		mouse: true,
		bottom: 1,
		height: 1,
		left: 0,
		right: 0,
		style: {
			fg: 'black',
			bg: 'blue'
		},
		content: '[Online: 2]'

	});

	screen.append(box);
	return box;
}