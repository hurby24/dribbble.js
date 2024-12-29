import { ApiClient } from "../internal/base/apiCleint";
import type { FetchOptions, FetchResponse } from "../internal/base/types";
import type { User } from "./types";

/**
 * Provides methods for interacting with user-related API endpoints.
 *
 * @remarks
 * This class extends {@link ApiClient} to interact with user-related endpoints, allowing you to fetch details about the currently authenticated user.
 *
 * @example
 * ```typescript
 * const usersClient = new Users();
 *
 * // Fetch user details
 * const userResponse = await usersClient.getUser();
 * console.log(userResponse.data.name); // Outputs the user's name
 * ```
 */
export class Users extends ApiClient {
	/**
	 * Fetches details of the currently authenticated user.
	 *
	 * @returns A promise that resolves to a {@link FetchResponse} containing the authenticated {@link User} object.
	 *
	 * @example
	 * ```typescript
	 * const userResponse = await usersClient.getUser();
	 * console.log(userResponse.data.email); // Outputs the user's email
	 * ```
	 */
	public async getUser(): Promise<FetchResponse<User>> {
		const fetchOptions: FetchOptions = {
			path: "/v2/user",
		};
		return await this.fetch<User>(fetchOptions);
	}
}
