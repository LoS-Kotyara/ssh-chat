"use strict";

const MAX_NAME_LEN = 10;
const PROMPT_NAME = 'Enter a nickname to use (max ' + MAX_NAME_LEN + ' chars): ';
const PROMPT_NAME_USE = 'That nickname is already in use.\n' + PROMPT_NAME;
const PROMPT_NAME_NULL = 'A nickname is required.\n' + PROMPT_NAME;
const PROMPT_NAME_LONG = 'That nickname is too long.\n' + PROMPT_NAME;

function testNick(nick) {
	if(!nick) return PROMPT_NAME_NULL;
	let prompt = PROMPT_NAME;
	let lowered = nick.toLowerCase();

	if(!nick.trim().length) prompt = PROMPT_NAME_NULL;
	if(nick.length > MAX_NAME_LEN) prompt = PROMPT_NAME_LONG;
	if (nick.length > 0 && nick.length <= MAX_NAME_LEN) {
		if(Users.some(user => user.name.toLowerCase() === lowered)){
			prompt = PROMPT_NAME_USE;
		} else {
			return true;
		}
	}

	return prompt;
}


function Auth(ctx) {
	let user = getUser(ctx);

	user.name = ctx.username;
	let prompt = testNick(user.name);
	if (prompt === true) return ctx.accept();

	if (ctx.method !== 'keyboard-interactive') {
		return ctx.reject(['keyboard-interactive']);
	}

	ctx.prompt(prompt, function retryPrompt(answers) {
		if (answers.length === 0) return ctx.reject(['keyboard-interactive']);
		user.name = answers[0];
		let prompt = testNick(user.name);
		if (typeof prompt === 'string') return ctx.prompt(prompt, retryPrompt(ctx));
		ctx.accept();
	});
}

module.exports = Auth;
