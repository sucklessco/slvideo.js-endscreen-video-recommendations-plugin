import { version } from "./../../package.json";
import ui from "./app.js";

test("version to be the current version", () => {
	expect(version).toBe(ui.uiVersion);
});

test("uiName to be the endscreenVideoRecommendationsPlugin", () => {
	expect(ui.uiName).toBe("endscreenVideoRecommendationsPlugin");
});
