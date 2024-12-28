type ApiVersion = "v2";

export interface FetchResponse<T> {
	success: boolean;
	statusCode: number | null;
	data: T | null;
	error: DribbbleError | null;
	rateLimit?: RateLimit;
	links?: PaginationLinks;
}

export interface DribbbleError {
	message: string;
	cause?: string;
	errors?: {
		attribute: string;
		message: string;
	}[];
}

export interface RateLimit {
	limit: number;
	remaining: number;
	reset: number;
}

export interface PaginationLinks {
	prev?: string;
	next?: string;
}

export interface ApiClientConfig {
	accessToken: string;
	baseUrl?: string;
	OnError?: (error: DribbbleError) => void;
	rateLimitHandler?: (rateLimit: RateLimit) => void;
}

export interface FetchOptions {
	path: `/${ApiVersion}/${string}`;
	method?: "GET" | "POST" | "PUT" | "DELETE";
	query?: Record<string, number | string>;
	body?: unknown;
}
