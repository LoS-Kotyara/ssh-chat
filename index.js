"use strict";

require("datejs");

const Server = require("ssh2").Server;
const config = require("./config.json");
const messages = require("node-yaml").readSync("./messages.yaml");
const commands = require("./core/commands");
require('./helpers/log');
const hostKeys = [require("fs").readFileSync(config.hostKeys)];

global.App = {
	path: __dirname,
	config,
	messages,
	commands,
};

let server = new Server({ hostKeys }, require("./core/index"));

server.listen(config.port, function () {
	console.log("Listening on port " + this.address().port);
});
