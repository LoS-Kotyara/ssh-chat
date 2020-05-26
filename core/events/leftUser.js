"use strict";

const { parse } = require('../messages');


module.exports = (userData) => {
	if (userData.shell) {
		let txt = parse(App.messages.disconnect, userData);
		addLog(txt);
		Users.splice(Users.findIndex(e => e.name === userData.name), 1);
		Users.forEach(user => {
			user.window.status.setContent(parse(App.messages.status, user));
			user.window.list.removeItem(userData.name);
			user.output.add(txt);
			user.window.screen.render();
		});
	}
}