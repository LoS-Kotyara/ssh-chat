"use strict";

const blessed = require('blessed');

module.exports = function (shell) {
	let user = getUser(shell);
	let screen = require('./screen')(shell);
	screen.userData = user;


	let output = user.output = require('./output')(screen);
	let list = require('./list')(screen);
	const input = require('./textbox')(screen);
	const status = require('./status')(screen);


	user.window = {
		screen, output, list, input, status
	};

	return {
		screen, output, list, input, status
	};
};