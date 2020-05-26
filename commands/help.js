"use strict";

const { localMessage } = require('../core/messages');
const { tempMsg } = require('../helpers/status');

module.exports = (user) => {
	tempMsg('Help', user);
	localMessage(App.messages.help, user);
};