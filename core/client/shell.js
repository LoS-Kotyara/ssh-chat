"use strict";

const window = require('../window/index');
const newUser = require('../events/newUser')

module.exports = (shell) => {
	let user = getUser(shell);


	Object.assign(shell, {
		rows: user.rows || 24,
		columns: user.cols || 80,
		isTTY: true,
		setRawMode: () => {}
	});

	Users.push(user);
	shell.on('error', () => {});
	user.shell = shell;
	user.window = window(shell);

	let screen = user.window.screen;
	screen.render();
	screen.program.emit('resize');
	newUser(user);
}