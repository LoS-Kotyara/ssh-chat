"use strict";

const { createUser } = require("../helpers/user");
const { formatMessage } = require("./messages");

global.Users = [];
module.exports = function Clients(client) {
	let userData = createUser(client);
	client.on("authentication", require("./client/authentication"));
	client.on("ready", require("./client/ready"));
	client.on("end", () => require("./events/leftUser")(userData));
	client.on("error", () => {});
};
