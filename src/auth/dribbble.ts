import type { DribbbleConfig, DribbbleAuthResponse } from "./types";
const authorizationEndpoint = "https://dribbble.com/oauth/authorize";
const tokenEndpoint = "https://dribbble.com/oauth/token";

export class Dribbble {
	private clientId: string;
	private clientSecret: string;
	private redirectURI: string;

	constructor(config: DribbbleConfig) {
		this.clientId = config.clientId;
		this.clientSecret = config.clientSecret;
		this.redirectURI = config.redirectURI;
	}

	public createAuthorizationURL(state: string, scopes: string[]): string {
		const url = new URL(authorizationEndpoint);
		url.searchParams.set("response_type", "code");
		url.searchParams.set("client_id", this.clientId);
		url.searchParams.set("state", state);
		url.searchParams.set("scope", scopes.join(" "));
		url.searchParams.set("redirect_uri", this.redirectURI);
		return url.href;
	}

	public async validateAuthorizationCode(
		code: string,
	): Promise<DribbbleAuthResponse> {
		const body = new URLSearchParams();
		body.set("grant_type", "authorization_code");
		body.set("code", code);
		body.set("redirect_uri", this.redirectURI);
		body.set("client_id", this.clientId);
		body.set("client_secret", this.clientSecret);

		const bodyBytes = new TextEncoder().encode(body.toString());
		const request = new Request(tokenEndpoint, {
			method: "POST",
			body: bodyBytes,
		});

		request.headers.set("Content-Type", "application/x-www-form-urlencoded");
		request.headers.set("Accept", "application/json");

		let fetchResponse: Response;
		const response = {
			accessToken: null,
			tokenType: "",
			scope: "",
			createdAt: null,
		};
		try {
			fetchResponse = await fetch(request);
		} catch {
			Object.assign(response, { error: "Failed to fetch" });
			return response;
		}
		let data = null;
		try {
			data = await fetchResponse.json();
		} catch {
			Object.assign(response, { error: "Failed to parse JSON" });
			return response;
		}

		if (typeof data !== "object" || data === null) {
			Object.assign(response, { error: "Unexpected response body data" });
			return response;
		}

		if (fetchResponse.ok) {
			response.accessToken = data.access_token;
			response.tokenType = data.token_type;
			response.createdAt = data.created_at;
			response.scope = data.scope;
		} else {
			Object.assign(response, { error: data.error });
		}

		return response;
	}

	public generateState(): string {
		const randomValues = crypto.getRandomValues(new Uint8Array(32));
		return btoa(String.fromCharCode(...randomValues))
			.replaceAll("+", "-")
			.replaceAll("/", "_")
			.replaceAll("=", "");
	}
}
