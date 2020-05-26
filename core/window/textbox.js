"use strict";

const blessed = require('blessed');


const { userBroadcast } = require('../messages');

var RE_SPECIAL = /[\x00-\x1F\x7F]+|(?:\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K])/g;
var MAX_MSG_LEN = 128;


module.exports = (screen) => {
	
	let userData = getUser(screen);
	const input = new blessed.textbox({
		mouse: true,
		bottom: 0,
		height: 1,
		width: '100%',
		inputOnFocus: true,
		style: {
			fg: 'while',
			bg: 'black'
		}
	});
	screen.append(input);

	screen.on('click', function(data) {
		input.focus();
		screen.render();
	});

	input.key(['tab'], function(ch, key) {
		let val = this.value;
		if(val.slice(0,1) === '/') {
			let find = val.slice(1).trim();
			let cmd = Object.keys(App.commands).filter(e => e.startsWith(find));
			if(!cmd.length) cmd = Object.keys(App.commands);
			this.setValue('/' + cmd[0]);
		} else {
			let list = userData.window.list;
			let txt = this.value.trim() + ' ' + list.value;
			this.setValue(txt.trim());
		}
		screen.render();
	});


	input.key(['escape'], function(ch, key) {
		input.focus();
		screen.render();
	});

	input.key(['C-d'], function(ch, key) {
		screen.destroy();
		return userData.shell.end();
	});

	input.key(['up'], function(ch, key) {
		let list = userData.window.list;
		list.select(list.selected - 1)
		screen.render();
	});

	input.key(['down'], function(ch, key) {
		let list = userData.window.list;
		list.select(list.selected + 1)
		screen.render();
	});

	input.focus();

	input.on('submit', function(line) {
		input.clearValue();
		screen.render();
		if (!input.focused) input.focus();
		line = line.replace(RE_SPECIAL, '').trim();
		line = line.slice(0, MAX_MSG_LEN);

		if(!line) return;
		if(line[0] === '/'){
			line = line.slice(1);
			let args =  line.split(' ');
			let cmd = Object.keys(App.commands).find(e => e.startsWith(args[0]));
			if(!cmd) return;
			App.commands[cmd](userData, ...args.slice(1));
		} else userBroadcast(line, userData);
	});
}