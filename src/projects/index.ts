import { ApiClient } from "../internal/base/apiCleint";
import type { FetchOptions, FetchResponse } from "../internal/base/types";
import type { Project, ProjectParams } from "./types";

export class Projects extends ApiClient {
	public async getProjects(
		page = 1,
		per_page = 30,
	): Promise<FetchResponse<Project[]>> {
		const fetchOptions: FetchOptions = {
			path: "/v2/user/projects",
			query: {
				page,
				per_page,
			},
		};
		return await this.fetch<Project[]>(fetchOptions);
	}

	public async createProject(
		params: ProjectParams,
	): Promise<FetchResponse<Project>> {
		const fetchOptions: FetchOptions = {
			path: "/v2/projects",
			method: "POST",
			body: params,
		};

		return await this.fetch<Project>(fetchOptions);
	}

	public async updateProject(
		id: number,
		params: ProjectParams,
	): Promise<FetchResponse<Project>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/projects/${id}`,
			method: "PUT",
			body: params,
		};

		return await this.fetch<Project>(fetchOptions);
	}

	public async deleteProject(id: number): Promise<FetchResponse<Project>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/projects/${id}`,
			method: "DELETE",
		};

		return await this.fetch<Project>(fetchOptions);
	}
}
