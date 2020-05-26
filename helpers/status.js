"use strict";

const { parse } = require('../core/messages');

function tempMsg(txt, userData, color = 'blue') {
	let status = userData.window.status;
	status.style.bg = color;
	status.setContent(parse(txt, userData));
	userData.window.screen.render();

	setTimeout(() => {
		status.setContent(parse(App.messages.status, userData));
		status.style.bg = 'blue';
		userData.window.screen.render();
	}, 3000)
}

function info(txt, userData) {
	tempMsg(txt, userData)
}

function danger(txt, userData) {
	tempMsg(txt, userData, 'red')
}

module.exports = { tempMsg, info, danger };