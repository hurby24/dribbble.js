import { ApiClient } from "../internal/base/apiCleint";
import type { FetchOptions, FetchResponse } from "../internal/base/types";
import type { User } from "./types";

export class Users extends ApiClient {
	public async getUser(): Promise<FetchResponse<User>> {
		const fetchOptions: FetchOptions = {
			path: "/v2/user",
		};
		return await this.fetch<User>(fetchOptions);
	}
}
