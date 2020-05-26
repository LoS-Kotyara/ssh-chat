"use strict";

const { localMessage, parse } = require('../messages');

module.exports = (userData) => {
	localMessage(parse(App.messages.MOTD, userData) + '\n', userData);
	history.forEach( e => localMessage(e, userData));

	let txt = parse(App.messages.connect, userData);
	addLog(txt);
	Users.forEach(_user => {
		if (userData.window.list) userData.window.list.add(_user.name);
		if (_user.window.list && _user.shell !== userData.shell ) _user.window.list.add(userData.name);

		_user.window.status.setContent(parse(App.messages.status, _user));
		_user.output.add(txt);
		_user.window.screen.render();
	});
	userData.window.screen.render();

}