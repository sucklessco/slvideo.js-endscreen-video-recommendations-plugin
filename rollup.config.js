import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import svg from "rollup-plugin-svg";

export default {
	input: "src/js/app.js",
	output: {
		file: "dist/slvideojs-endscreen-video-recommendations-plugin.js",
		format: "iife"
	},
	watch: {
		chokidar: true,
		clearScreen: true,
		exclude: "",
		include: "src/**"
	},
	plugins: [
		svg(),
		json(),
		babel({
			exclude: "node_modules/**",
			babelHelpers: "bundled",
			presets: [
				[
					"@babel/preset-env",
					{
						targets: {
							browsers: "> 0.5%, ie >= 11"
						},
						modules: false,
						spec: true,
						useBuiltIns: "usage",
						forceAllTransforms: true,
						corejs: {
							version: 3,
							proposals: false
						}
					}
				]
			]
		})
	]
};
