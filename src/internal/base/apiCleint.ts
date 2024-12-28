import type {
	RateLimit,
	PaginationLinks,
	ApiClientConfig,
	FetchResponse,
	FetchOptions,
	DribbbleError,
} from "./types.ts";

export class ApiClient {
	protected baseUrl: string;
	protected accessToken: string;
	protected OnError?: (error: DribbbleError) => void;
	protected rateLimitHandler?: (rateLimit: RateLimit) => void;

	constructor(config: ApiClientConfig) {
		this.baseUrl = config.baseUrl || "https://api.dribbble.com";
		this.accessToken = config.accessToken;
		this.OnError = config.OnError;
		this.rateLimitHandler = config.rateLimitHandler;
	}

	public async fetch<T>(
		options: FetchOptions,
		needAccessToken = true,
	): Promise<FetchResponse<T>> {
		const response = {
			success: false,
			statusCode: null,
			data: null,
			error: null,
			rateLimit: undefined,
			links: undefined,
		};
		try {
			if (needAccessToken && !this.accessToken) {
				const error: DribbbleError = {
					message: "Access token is required.",
					cause: "Dribbble API Error",
				};
				Object.assign(response, { error });
				if (this.OnError) {
					this.OnError(error);
				}
				return response as FetchResponse<T>;
			}

			const { path, method = "GET", query, body } = options;
			const _options: FetchRequestInit = {
				method,
			};

			const url = new URL(`${this.baseUrl}${path}`);
			for (const key in query) {
				url.searchParams.append(key, String(query[key]));
			}

			_options.headers = new Headers();
			_options.headers.set("Content-Type", "application/json");

			if (needAccessToken) {
				_options.headers.set("Authorization", `Bearer ${this.accessToken}`);
			}

			if (["PUT", "POST"].includes(method)) {
				_options.body = body ? JSON.stringify(body) : null;
			}

			const fetchResponse = await fetch(url.href, _options);
			const data = await fetchResponse.json();
			const fetchOk = fetchResponse.ok;
			const fetchStatus = fetchResponse.status;

			if (fetchOk) {
				Object.assign(response, {
					success: true,
					statusCode: fetchStatus,
					data: data as T,
					error: null,
					rateLimit: this.extractRateLimit(fetchResponse.headers),
					links: this.extractLinks(fetchResponse.headers),
				});
				if (this.rateLimitHandler && response.rateLimit) {
					this.rateLimitHandler(response.rateLimit);
				}
			} else {
				let errorMessage = "Unknown error occurred.";
				let errorDetails = [];

				if (data && typeof data === "object" && "message" in data) {
					errorMessage = data.message;
					errorDetails = data.errors || [];
				}

				const error: DribbbleError = {
					message: errorMessage,
					cause: "Dribbble API Error",
					errors: errorDetails,
				};

				Object.assign(response, { error, statusCode: fetchStatus });
			}
		} catch (error) {
			Object.assign(response, { error: error as Error });
		}
		if (response.error && this.OnError) {
			this.OnError(response.error);
		}
		return response as FetchResponse<T>;
	}

	private extractRateLimit(headers: Headers): RateLimit | undefined {
		const limit = headers.get("x-ratelimit-limit");
		const remaining = headers.get("x-ratelimit-remaining");
		const reset = headers.get("x-ratelimit-reset");

		if (!limit || !remaining || !reset) return undefined;

		return {
			limit: Number.parseInt(limit, 10),
			remaining: Number.parseInt(remaining, 10),
			reset: Number.parseInt(reset, 10),
		};
	}

	private extractLinks(headers: Headers): PaginationLinks | undefined {
		const linkHeader = headers.get("link");
		if (!linkHeader) return undefined;

		const links: PaginationLinks = {};
		const parts = linkHeader.split(",").map((part) => part.trim());
		parts.map((part) => {
			const match = part.match(/<(.*)>; rel="(\w+)"/);
			if (match) {
				const [, url, rel] = match;
				if (rel === "prev") links.prev = url;
				if (rel === "next") links.next = url;
			}
		});
		return links;
	}
}
