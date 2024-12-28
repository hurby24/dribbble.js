export interface DribbbleConfig {
	clientId: string;
	clientSecret: string;
	redirectURI: string;
}

export interface DribbbleAuthResponse {
	accessToken: string | null;
	tokenType: string;
	scope: string;
	createdAt: number | null;
	error?: string;
}
