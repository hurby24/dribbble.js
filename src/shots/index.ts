import { ApiClient } from "../internal/base/apiCleint";
import type { FetchOptions, FetchResponse } from "../internal/base/types";
import type { Shot, UpdateShotParams } from "./types";

/**
 * Provides methods for managing shots via the API.
 *
 * @remarks
 * This class extends {@link ApiClient} to interact with shot-related endpoints, including listing, fetching, updating, and deleting shots.
 *
 * @example
 * ```typescript
 * const shotsClient = new Shots();
 *
 * // Fetch shots
 * const shots = await shotsClient.getShots();
 * console.log(shots.data);
 *
 * // Fetch a specific shot
 * const shot = await shotsClient.getShot(123);
 * console.log(shot.data.title);
 *
 * // Update a shot
 * const updatedShot = await shotsClient.updateShot(123, { title: "Updated Title" });
 * console.log(updatedShot.data.title);
 *
 * // Delete a shot
 * const deleteResponse = await shotsClient.deleteShot(123);
 * console.log(deleteResponse);
 * ```
 */
export class Shots extends ApiClient {
	/**
	 * Fetches a paginated list of shots.
	 *
	 * @param page - The page number to retrieve. Defaults to `1`.
	 * @param per_page - The number of shots per page. Defaults to `30`.
	 * @returns A promise that resolves to a {@link FetchResponse} containing an array of {@link Shot} objects.
	 *
	 * @example
	 * ```typescript
	 * const shots = await shotsClient.getShots(1, 20);
	 * console.log(shots.data);
	 * ```
	 */
	public async getShots(
		page = 1,
		per_page = 30,
	): Promise<FetchResponse<Shot[]>> {
		const fetchOptions: FetchOptions = {
			path: "/v2/user/shots",
			query: {
				page,
				per_page,
			},
		};
		return await this.fetch<Shot[]>(fetchOptions);
	}

	/**
	 * Fetches a specific shot by its ID.
	 *
	 * @param id - The unique identifier of the shot.
	 * @returns A promise that resolves to a {@link FetchResponse} containing the shot data.
	 *
	 * @example
	 * ```typescript
	 * const shot = await shotsClient.getShot(123);
	 * console.log(shot.data.title);
	 * ```
	 */
	public async getShot(id: number): Promise<FetchResponse<Shot>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/shots/${id}`,
		};
		return await this.fetch<Shot>(fetchOptions);
	}

	/**
	 * Updates an existing shot by its ID with the specified parameters.
	 *
	 * @param id - The unique identifier of the shot to update.
	 * @param params - The parameters for updating the shot. See {@link UpdateShotParams}.
	 * @returns A promise that resolves to a {@link FetchResponse} containing the updated shot data.
	 *
	 * @example
	 * ```typescript
	 * const updatedShot = await shotsClient.updateShot(123, { title: "Updated Title" });
	 * console.log(updatedShot.data.title);
	 * ```
	 */
	public async updateShot(
		id: number,
		params: UpdateShotParams,
	): Promise<FetchResponse<Shot>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/shots/${id}`,
			method: "PUT",
			body: params,
		};

		return await this.fetch<Shot>(fetchOptions);
	}

	/**
	 * Deletes a shot by its ID.
	 *
	 * @param id - The unique identifier of the shot to delete.
	 * @returns A promise that resolves to a {@link FetchResponse} indicating the deletion result.
	 *
	 * @example
	 * ```typescript
	 * const deleteResponse = await shotsClient.deleteShot(123);
	 * console.log(deleteResponse);
	 * ```
	 */
	public async deleteShot(id: number): Promise<FetchResponse<Shot>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/shots/${id}`,
			method: "DELETE",
		};
		return await this.fetch<Shot>(fetchOptions);
	}
}
