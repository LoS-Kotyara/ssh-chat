"use strict";

function getUser(st) {
	let stream = false;

	switch (st.constructor.name){
		case 'Client':
			stream = st._sshstream;
			break;
		case 'Channel':
			stream = st._client._sshstream;
			break;
		case 'AuthContext':
			stream = st._stream;
			break;
		case 'KeyboardAuthContext':
			stream = st._stream;
			break;
		case 'Screen':
			return st.userData;
			break;
	}
	if(stream && !stream.data) stream.data = {};
	return stream.data;
}

function rndColor() {
	let color = ((1<<24)*Math.random()|0).toString(16);
	if(color.length < 6) color+='0';
	return color;
}
function createUser(client) {
	return Object.assign(getUser(client), {
		client,
		name: '',
		stream: false,
		shell: false,
		output: false,
		window: {},
		color: rndColor(),
		rows: 24,
		cols: 80
	});
}

global.getUser = getUser;
module.exports = { getUser, createUser, rndColor };