import { ApiClient } from "../internal/base/apiCleint";
import type { FetchOptions, FetchResponse } from "../internal/base/types";
import type { Project, ProjectParams } from "./types";

/**
 * Provides methods for managing projects via the API.
 *
 * @remarks
 * This class extends {@link ApiClient} to interact with project-related endpoints, including listing, creating, updating, and deleting projects.
 *
 * @example
 * ```typescript
 * const projectsClient = new Projects();
 *
 * // Fetch projects
 * const projects = await projectsClient.getProjects();
 * console.log(projects.data);
 *
 * // Create a project
 * const newProject = await projectsClient.createProject({
 *   name: "New Project",
 *   description: "Project description",
 * });
 * console.log(newProject.data.id);
 *
 * // Update a project
 * const updatedProject = await projectsClient.updateProject(123, {
 *   name: "Updated Name",
 * });
 * console.log(updatedProject.data.name);
 *
 * // Delete a project
 * const deleteResponse = await projectsClient.deleteProject(123);
 * console.log(deleteResponse);
 * ```
 */
export class Projects extends ApiClient {
	/**
	 * Fetches a paginated list of projects.
	 *
	 * @param page - The page number to retrieve. Defaults to `1`.
	 * @param per_page - The number of projects per page. Defaults to `30`.
	 * @returns A promise that resolves to a {@link FetchResponse} containing an array of {@link Project} objects.
	 *
	 * @example
	 * ```typescript
	 * const projects = await projectsClient.getProjects(1, 20);
	 * console.log(projects.data);
	 * ```
	 */
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

	/**
	 * Creates a new project with the specified parameters.
	 *
	 * @param params - The parameters for creating a project. See {@link ProjectParams}.
	 * @returns A promise that resolves to a {@link FetchResponse} containing the newly created {@link Project}.
	 *
	 * @example
	 * ```typescript
	 * const newProject = await projectsClient.createProject({
	 *   name: "New Project",
	 *   description: "Project description",
	 * });
	 * console.log(newProject.data.id);
	 * ```
	 */
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

	/**
	 * Updates an existing project by its ID with the specified parameters.
	 *
	 * @param id - The unique identifier of the project to update.
	 * @param params - The parameters for updating the project. See {@link ProjectParams}.
	 * @returns A promise that resolves to a {@link FetchResponse} containing the updated {@link Project}.
	 *
	 * @example
	 * ```typescript
	 * const updatedProject = await projectsClient.updateProject(123, {
	 *   name: "Updated Project Name",
	 * });
	 * console.log(updatedProject.data.name);
	 * ```
	 */
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

	/**
	 * Deletes an existing project by its ID.
	 *
	 * @param id - The unique identifier of the project to delete.
	 * @returns A promise that resolves to a {@link FetchResponse} indicating the deletion result.
	 *
	 * @example
	 * ```typescript
	 * const deleteResponse = await projectsClient.deleteProject(123);
	 * console.log(deleteResponse);
	 * ```
	 */
	public async deleteProject(id: number): Promise<FetchResponse<Project>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/projects/${id}`,
			method: "DELETE",
		};

		return await this.fetch<Project>(fetchOptions);
	}
}
