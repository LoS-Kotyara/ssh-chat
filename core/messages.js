"use strict";

const escape = require('blessed').escape;
let lastMessage = new Date().getDate();


function formatMessage(msg, output) {
	output.parseTags = true;
	msg = output._parseTags(msg);
	output.parseTags = false;
	return msg;
}

function userBroadcast(msg, userData, format) {
	let user_msg = parse(format || App.messages.msg, userData).replace('%msg%', msg);
	addLog(user_msg);
	Users.forEach(user => {
		if(lastMessage !== new Date().getDate()) {
			let date = parse(App.messages.newDay, user);
			user.output.add(date);
		}
		user.output.add(user_msg);
	});
	lastMessage = new Date().getDate();
}

function localMessage(msg, userData) {
	let output = userData.output;
	output.add(msg);
}

function parse(txt, userData) {
	let date = new Date();

	txt = txt
	.replace('%user%', escape(userData.name))
	.replace('%count_user%', Users.length)
	.replace('%color_user%', userData.color)
	.replace('%time%', (new Date()).toString('HH:mm'))
	.replace('%date%', (new Date()).toString('dd.MM.yyyy'));

	return formatMessage(txt, userData.output).trim().replace('%\\n%', '\n')
}

module.exports = { userBroadcast, localMessage, formatMessage, parse};