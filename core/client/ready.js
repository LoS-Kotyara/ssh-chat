"use strict";

const user_shell = require('./shell');

function ready() {
	let user = getUser(this);
	this.once('session', (accept, reject) => {
		accept()
		.once('pty', function(accept, reject, info) {
			user.rows = info.rows;
			user.cols = info.cols;
			user.term = info.term;
			accept && accept();
		})
		.on('window-change', function(accept, reject, info) {
			user.rows = info.rows;
			user.cols = info.cols;
			if (user.shell) {
				user.shell.rows = user.rows;
				user.shell.columns = user.cols;
				user.shell.emit('resize');
			}
			accept && accept();
		})
		.once('shell', (accept, reject) => {
			let shell = accept();
			shell.user = user;
			user_shell(shell)
		})
	})
}

module.exports  = ready;