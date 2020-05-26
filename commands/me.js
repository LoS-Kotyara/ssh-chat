"use strict";

const { userBroadcast, parse } = require('../core/messages');
const { tempMsg } = require('../helpers/status');

module.exports = (user, ...args) => {
	let txt = args.join(' ');
	userBroadcast(txt, user, App.messages.third_person)
};