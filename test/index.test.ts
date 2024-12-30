import { describe, expect, it } from "bun:test";
import * as exports from "../src";

describe("Export", () => {
	it("Should return all exported", () => {
		const shouldBeExports = ["Dribbble", "Users", "Shots", "Projects", "Jobs"];
		expect(Object.keys(exports).length).toBe(shouldBeExports.length);
	});
});
