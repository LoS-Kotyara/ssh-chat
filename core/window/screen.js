"use strict";


const blessed = require('blessed');

module.exports = (stream) => {
	const screen = new blessed.screen({
		autoPadding: true,
		smartCSR: true,
		program: new blessed.program({
			input: stream,
			output: stream
		}),
		useBCE: true,
		extended: true
	});

	let userData = getUser(stream);
	screen.title = 'SSH Chatting as ' + userData.name;

	return screen;
}