import { beforeAll, describe, expect, it } from "bun:test";
import { Projects, type Project } from "../../src";

const accessToken = process.env.ACCESS_TOKEN;

describe("Shots", () => {
	let projectsClient: Projects;
	let projectId: number;

	beforeAll(() => {
		if (!accessToken) {
			throw new Error("ACCESS_TOKEN must be provided");
		}
		projectsClient = new Projects({ accessToken });
	});

	it("Should create a project", async () => {
		const projectsResponse = await projectsClient.createProject({
			name: "test project",
			description: "test project description",
		});

		expect(projectsResponse.data).toBeDefined();
		expect(projectsResponse.error).toBeNull();
		expect(projectsResponse.success).toBe(true);
		expect(projectsResponse.statusCode).toBe(200);
		expect(projectsResponse.rateLimit).toBeDefined();

		const data = projectsResponse.data as Project;
		expect(data).toBeDefined();
		projectId = data.id;
	});

	it("Should fetch authenticated user's projects", async () => {
		const projectsResponse = await projectsClient.getProjects();

		expect(projectsResponse.data).toBeDefined();
		expect(projectsResponse.error).toBeNull();
		expect(projectsResponse.success).toBe(true);
		expect(projectsResponse.statusCode).toBe(200);
		expect(projectsResponse.rateLimit).toBeDefined();

		const shots = projectsResponse.data as Project[];
		expect(shots).toBeDefined();
	});

	it("Should update a project", async () => {
		const updatedProject = await projectsClient.updateProject(projectId, {
			name: "test project updated",
		});

		expect(updatedProject.data).toBeDefined();
		expect(updatedProject.error).toBeNull();
		expect(updatedProject.success).toBe(true);
		expect(updatedProject.statusCode).toBe(200);
		expect(updatedProject.rateLimit).toBeDefined();

		const updatedProjectData = updatedProject.data as Project;
		expect(updatedProjectData).toBeDefined();
		updatedProjectData.name = "test project updated";
	});

	it("Should delete a project", async () => {
		const deleteResponse = await projectsClient.deleteProject(projectId);

		expect(deleteResponse.data).toBeDefined();
		expect(deleteResponse.error).toBeNull();
		expect(deleteResponse.success).toBe(true);
		expect(deleteResponse.statusCode).toBe(204);
		expect(deleteResponse.rateLimit).toBeDefined();
	});
});
