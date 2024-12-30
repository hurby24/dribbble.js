import { beforeAll, describe, expect, it } from "bun:test";
import { Users, type User } from "../../src";

const accessToken = process.env.ACCESS_TOKEN;

describe("Users", () => {
	let usersClient: Users;

	beforeAll(() => {
		if (!accessToken) {
			throw new Error("ACCESS_TOKEN must be provided");
		}
		usersClient = new Users({ accessToken });
	});

	it("Should fetch authenticated user", async () => {
		const userResponse = await usersClient.getUser();

		expect(userResponse.data).toBeDefined();
		expect(userResponse.error).toBeNull();
		expect(userResponse.success).toBe(true);
		expect(userResponse.statusCode).toBe(200);
		expect(userResponse.rateLimit).toBeDefined();

		const user = userResponse.data as User;
		expect(user).toBeDefined();
	});
});
