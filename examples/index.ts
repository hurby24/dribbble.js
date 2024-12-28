import { Dribbble, type DribbbleConfig } from "../src";

if (
	!process.env.DRIBBBLE_CLIENT_ID ||
	!process.env.DRIBBBLE_CLIENT_SECRET ||
	!process.env.DRIBBBLE_REDIRECT_URI
) {
	throw new Error("Please set environment variables");
}
const config: DribbbleConfig = {
	clientId: process.env.DRIBBBLE_CLIENT_ID,
	clientSecret: process.env.DRIBBBLE_CLIENT_SECRET,
	redirectURI: process.env.DRIBBBLE_REDIRECT_URI,
};

const dribbble = new Dribbble(config);

const state = dribbble.generateState();

const url = dribbble.createAuthorizationURL(state, ["public", "upload"]);

console.log(url);
