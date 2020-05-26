"use strict";

const glob = require("glob");

let list = {};

let PATH = require('path').dirname(require.main.filename) + '/commands'

glob.sync(PATH + '/*.js').forEach(e => {
	let name = require('path').basename(e).replace(/\..+$/, '');
	list[name] = require(e);
});

module.exports = list;