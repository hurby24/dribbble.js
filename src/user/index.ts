import { ApiClient } from "../internal/base/apiCleint";
import type { FetchOptions, FetchResponse } from "../internal/base/types";
import type { User } from "./types";

/**
 * Represents the Users API client for interacting with user-related endpoints.
 *
 * @remarks
 * This class extends the {@link ApiClient} to provide methods specific to user data.
 *
 * @example
 * ```typescript
 * const usersClient = new Users();
 * const user = await usersClient.getUser();
 * console.log(user.data); // Access user details
 * ```
 */
export class Users extends ApiClient {
	/**
	 * Fetches details of the currently authenticated user.
	 *
	 * @returns A promise that resolves to a {@link FetchResponse} containing a {@link User} object.
	 *
	 * @example
	 * ```typescript
	 * const userResponse = await usersClient.getUser();
	 * console.log(userResponse.data.name); // Outputs the user's name
	 * ```
	 */
	public async getUser(): Promise<FetchResponse<User>> {
		const fetchOptions: FetchOptions = {
			path: "/v2/user",
		};
		return await this.fetch<User>(fetchOptions);
	}
}
