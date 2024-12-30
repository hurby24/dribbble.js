import { beforeAll, describe, expect, it } from "bun:test";
import { Shots, type Shot } from "../../src";

const accessToken = process.env.ACCESS_TOKEN;

describe("Shots", () => {
	let shotsClient: Shots;

	beforeAll(() => {
		if (!accessToken) {
			throw new Error("ACCESS_TOKEN must be provided");
		}
		shotsClient = new Shots({ accessToken });
	});

	it("Should fetch authenticated user's shots", async () => {
		const shotsResponse = await shotsClient.getShots();

		expect(shotsResponse.data).toBeDefined();
		expect(shotsResponse.error).toBeNull();
		expect(shotsResponse.success).toBe(true);
		expect(shotsResponse.statusCode).toBe(200);
		expect(shotsResponse.rateLimit).toBeDefined();

		const shots = shotsResponse.data as Shot[];
		expect(shots).toBeDefined();
	});

	it("Should fetch a shot", async () => {
		const shot = await shotsClient.getShot(17216021);

		expect(shot.data).toBeDefined();
		expect(shot.error).toBeNull();
		expect(shot.success).toBe(true);
		expect(shot.statusCode).toBe(200);
		expect(shot.rateLimit).toBeDefined();

		const shotData = shot.data as Shot;
		expect(shotData).toBeDefined();
	});

	it("Should update a shot", async () => {
		const updatedShot = await shotsClient.updateShot(17216021, {
			title: "test title",
		});

		expect(updatedShot.data).toBeDefined();
		expect(updatedShot.error).toBeNull();
		expect(updatedShot.success).toBe(true);
		expect(updatedShot.statusCode).toBe(200);
		expect(updatedShot.rateLimit).toBeDefined();

		const updatedShotData = updatedShot.data as Shot;
		expect(updatedShotData).toBeDefined();
		updatedShotData.title = "test title";
	});
});
