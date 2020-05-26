"use strict";

const { rndColor } = require('../helpers/user');
const { tempMsg } = require('../helpers/status');

module.exports = (user, ...args) => {
	let color = rndColor();
	tempMsg('your new color #' + color, user);
	user.color = color;
};