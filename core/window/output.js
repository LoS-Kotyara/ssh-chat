"use strict";

const blessed = require('blessed');


module.exports = screen => {
	let output =new blessed.log({
		top: 0,
		left: 0,
		width: '80%',
		bg: 'black',
		bottom: 2,
		scrollOnInput: true,
		scrollable: true,
		mouse: true,
		childOffset: 1
	});


	screen.append(output);
	return output;
};