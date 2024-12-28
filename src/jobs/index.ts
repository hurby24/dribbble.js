import { ApiClient } from "../internal/base/apiCleint";
import type { FetchOptions, FetchResponse } from "../internal/base/types";
import type { Job, CreateJobParams, UpdateJobParams } from "./types";

export class Jobs extends ApiClient {
	public async getJob(id: number): Promise<FetchResponse<Job>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/jobs/${id}`,
		};

		return await this.fetch<Job>(fetchOptions);
	}

	public async postJob(params: CreateJobParams): Promise<FetchResponse<Job>> {
		const fetchOptions: FetchOptions = {
			path: "/v2/jobs",
			method: "POST",
			body: params,
		};

		return await this.fetch<Job>(fetchOptions);
	}

	public async updateJob(
		id: number,
		params: UpdateJobParams,
	): Promise<FetchResponse<Job>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/jobs/${id}`,
			method: "PUT",
			body: params,
		};

		return await this.fetch<Job>(fetchOptions);
	}
}
