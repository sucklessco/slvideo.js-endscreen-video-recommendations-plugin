import { version } from "./../package.json";
import { expect } from "chai";
import ui from "../src/js/gorilla-videoplayer-default-ui.js";

describe("version", function() {
	it("should return the current version", function() {
		expect(ui.version).to.equal(version);
	});
});

