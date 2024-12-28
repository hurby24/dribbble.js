import { ApiClient } from "../internal/base/apiCleint";
import type { FetchOptions, FetchResponse } from "../internal/base/types";
import type { Shot, UpdateShotParams } from "./types";

export class Shots extends ApiClient {
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

	public async getShot(id: number): Promise<FetchResponse<Shot>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/shots/${id}`,
		};
		return await this.fetch<Shot>(fetchOptions);
	}

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

	public async deleteShot(id: number): Promise<FetchResponse<Shot>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/shots/${id}`,
			method: "DELETE",
		};
		return await this.fetch<Shot>(fetchOptions);
	}
}
