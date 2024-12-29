import { ApiClient } from "../internal/base/apiCleint";
import type { FetchOptions, FetchResponse } from "../internal/base/types";
import type { Job, CreateJobParams, UpdateJobParams } from "./types";

/**
 * Provides methods for managing jobs via the API.
 *
 * @remarks
 * This class extends {@link ApiClient} to interact with job-related endpoints, including fetching, creating, and updating jobs.
 *
 * @example
 * ```typescript
 * const jobsClient = new Jobs();
 *
 * // Fetch a job
 * const job = await jobsClient.getJob(123);
 * console.log(job.data.title);
 *
 * // Create a job
 * const newJob = await jobsClient.postJob({ title: "New Job", description: "Job description" });
 * console.log(newJob.data.id);
 *
 * // Update a job
 * const updatedJob = await jobsClient.updateJob(123, { title: "Updated Title" });
 * console.log(updatedJob.data.title);
 * ```
 */
export class Jobs extends ApiClient {
	/**
	 * Retrieves a job by its ID.
	 *
	 * @param id - The unique identifier of the job.
	 * @returns A promise that resolves to a {@link FetchResponse} containing the job data.
	 *
	 * @example
	 * ```typescript
	 * const job = await jobsClient.getJob(123);
	 * console.log(job.data.title);
	 * ```
	 */
	public async getJob(id: number): Promise<FetchResponse<Job>> {
		const fetchOptions: FetchOptions = {
			path: `/v2/jobs/${id}`,
		};

		return await this.fetch<Job>(fetchOptions);
	}

	/**
	 * Creates a new job with the specified parameters.
	 *
	 * @param params - The parameters for creating a job. See {@link CreateJobParams}.
	 * @returns A promise that resolves to a {@link FetchResponse} containing the newly created job data.
	 *
	 * @example
	 * ```typescript
	 * const newJob = await jobsClient.postJob({
	 *   title: "New Job",
	 *   description: "Job description",
	 * });
	 * console.log(newJob.data.id);
	 * ```
	 */
	public async postJob(params: CreateJobParams): Promise<FetchResponse<Job>> {
		const fetchOptions: FetchOptions = {
			path: "/v2/jobs",
			method: "POST",
			body: params,
		};

		return await this.fetch<Job>(fetchOptions);
	}

	/**
	 * Updates an existing job by its ID with the specified parameters.
	 *
	 * @param id - The unique identifier of the job to update.
	 * @param params - The parameters for updating the job. See {@link UpdateJobParams}.
	 * @returns A promise that resolves to a {@link FetchResponse} containing the updated job data.
	 *
	 * @example
	 * ```typescript
	 * const updatedJob = await jobsClient.updateJob(123, {
	 *   title: "Updated Title",
	 * });
	 * console.log(updatedJob.data.title);
	 * ```
	 */
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
