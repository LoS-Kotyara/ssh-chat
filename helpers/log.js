"use strict";

global.history = [];

var RE_SPECIAL = /(\^|\x1B)\[{1,2}([0-9]{1,3}(;[0-9]{1,3})*?)?[mGK]/g;

global.addLog = msg => {
	history.push(msg);
	if(history.length > 100) history.shift();
	console.log(msg.replace(RE_SPECIAL, ''));
};