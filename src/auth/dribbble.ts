import type { DribbbleConfig, DribbbleAuthResponse } from "./types";
const authorizationEndpoint = "https://dribbble.com/oauth/authorize";
const tokenEndpoint = "https://dribbble.com/oauth/token";

/**
 * Provides an OAuth 2.0 client for interacting with Dribbble's authentication and token APIs.
 *
 * @remarks
 * This class allows creating authorization URLs, validating authorization codes, and generating secure state strings.
 *
 * @example
 * ```typescript
 * const dribbble = new Dribbble({
 *   clientId: "your-client-id",
 *   clientSecret: "your-client-secret",
 *   redirectURI: "https://your-redirect-uri.com"
 * });
 *
 * const state = dribbble.generateState();
 * const authURL = dribbble.createAuthorizationURL(state, ["public"]);
 * console.log(authURL);
 *
 * // After receiving the authorization code:
 * const authResponse = await dribbble.validateAuthorizationCode("auth-code");
 * console.log(authResponse.accessToken);
 * ```
 */
export class Dribbble {
	private clientId: string;
	private clientSecret: string;
	private redirectURI: string;

	/**
	 * Creates a new instance of the Dribbble OAuth client.
	 *
	 * @param config - Configuration object containing the client ID, client secret, and redirect URI.
	 */
	constructor(config: DribbbleConfig) {
		this.clientId = config.clientId;
		this.clientSecret = config.clientSecret;
		this.redirectURI = config.redirectURI;
	}

	/**
	 * Generates an authorization URL for Dribbble's OAuth 2.0 flow.
	 *
	 * @param state - A unique string to maintain state between the request and callback.
	 * @param scopes - An array of scopes to request from the user.
	 * @returns The authorization URL for Dribbble.
	 *
	 * @example
	 * ```typescript
	 * const state = dribbble.generateState();
	 * const authURL = dribbble.createAuthorizationURL(state, ["public", "write"]);
	 * console.log(authURL);
	 * ```
	 */
	public createAuthorizationURL(state: string, scopes: string[]): string {
		const url = new URL(authorizationEndpoint);
		url.searchParams.set("response_type", "code");
		url.searchParams.set("client_id", this.clientId);
		url.searchParams.set("state", state);
		url.searchParams.set("scope", scopes.join(" "));
		url.searchParams.set("redirect_uri", this.redirectURI);
		return url.href;
	}

	/**
	 * Validates an authorization code and retrieves an access token from Dribbble.
	 *
	 * @param code - The authorization code received from Dribbble.
	 * @returns A promise that resolves to a {@link DribbbleAuthResponse} containing the access token and other details.
	 *
	 * @example
	 * ```typescript
	 * const authResponse = await dribbble.validateAuthorizationCode("auth-code");
	 * console.log(authResponse.accessToken);
	 * ```
	 */
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
		const response: DribbbleAuthResponse = {
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

	/**
	 * Generates a cryptographically secure state string for OAuth 2.0.
	 *
	 * @returns A Base64-encoded state string.
	 *
	 * @example
	 * ```typescript
	 * const state = dribbble.generateState();
	 * console.log(state); // Use this as the `state` parameter in your auth request.
	 * ```
	 */
	public generateState(): string {
		const randomValues = crypto.getRandomValues(new Uint8Array(32));
		return btoa(String.fromCharCode(...randomValues))
			.replaceAll("+", "-")
			.replaceAll("/", "_")
			.replaceAll("=", "");
	}
}
