import { version } from "./../../package.json";
import SVGHelper from "./SVGHelper.js";
import UIIcons from "../svg/icons-combined.svg";

let plugin = function() {
	const deInit = function() {};
	const init = function(opts) {
		deInit();
		opts.rootEl.addEventListener("contentEnd", () => {
			const videoplayer = opts.rootEl.$slvideojs;
			videoplayer.deInitUI();
			videoplayer.initUI("endscreenVideoRecommendationsPlugin");

			const videos = [
				"https://evilcdn.net/willst-du.mp4",
				"https://evilcdn.net/bleib-in-der-schule.mp4",
				"https://evilcdn.net/strassensport_-_es_wird_langsam_wieder_zeit_fuer_den_strand.mp4",
				"https://evilcdn.net/remember-the-name.mp4",
				"https://evilcdn.net/Rob_Bailey_and_The_Hustle_Standard_-_BEAST_-_Official_Music_Video.mp4",
				"https://evilcdn.net/vegan-anthem.mp4",
				"https://evilcdn.net/gladiators-vegan-rap-anthem.mp4",
				"https://evilcdn.net/ich-sing-nicht-mehr.mp4"
			];

			const videoSrc = videos[Math.floor(Math.random() * videos.length)];

			let timerInterval = null;

			let remainingTime = 5;

			const remainingTimeContainer = document.createElement("span");
			const remainingTimeTextContainer = document.createElement("div");
			remainingTimeContainer.innerHTML = remainingTime;
			remainingTimeTextContainer.style.position = "absolute";
			remainingTimeTextContainer.style.width = "100%";
			remainingTimeTextContainer.style.height = "100%";
			remainingTimeTextContainer.style.textAlign = "center";
			remainingTimeTextContainer.style.color = "white";
			remainingTimeTextContainer.style.fontWeight = "bold";
			remainingTimeTextContainer.innerHTML = "Next video in ";
			remainingTimeTextContainer.appendChild(remainingTimeContainer);

			videoplayer
				.getEl()
				.querySelector(".ui-elements")
				.appendChild(remainingTimeTextContainer);

			timerInterval = setInterval(() => {
				if (remainingTime === 0) {
					clearInterval(timerInterval);
					videoplayer.deInitUI();
					videoplayer.initUI("default");
					videoplayer.setContentVideo({
						src: videoSrc
					});
					videoplayer.play();
					return;
				}
				remainingTime--;
				remainingTimeContainer.innerHTML = remainingTime;
			}, 1000);
		});
	};
	return {
		init: init,
		deInit: deInit
	};
};
plugin.pluginName = "endscreenVideoRecommendationsPlugin";
plugin.pluginVersion = version;

let ui = function() {
	let originalUIName = "";

	let globals = {
		_initialized: false,
		controlsBar: null,
		progress: null,
		progressBar: null,
		rootEl: null,
		uiContainer: null,
		uiElementsContainer: null,
		videoEl: null,
		videoplayer: null
	};

	const uiElementsContainerClickHandler = evt => {
		const videoplayer = globals.videoplayer;
		switch (evt.target) {
		case globals.replayButton:
			videoplayer.replay();
			videoplayer.deInitUI();
			videoplayer.initUI(originalUIName);
			break;
		case globals.enterFullscreenButton:
			videoplayer.toggleFullscreen();
			break;
		default:
			break;
		}
	};

	const setupControls = () => {
		globals.uiElementsContainer = document.createElement("div");
		globals.uiElementsContainer.classList.add("ui-elements");

		// Loading Spinner
		globals.loadingSpinner = document.createElement("div");
		globals.loadingSpinner.classList.add("loading-spinner");
		globals.loadingSpinnerAnimation = document.createElement("div");
		globals.loadingSpinnerAnimation.classList.add("animation");
		globals.loadingSpinner.appendChild(globals.loadingSpinnerAnimation);
		globals.loadingSpinner.classList.add("hidden");

		// Controls Bar
		globals.controlsBar = document.createElement("div");
		globals.controlsBar.classList.add("controls");

		// Controls Bar Buttons
		globals.controlsBarButtons = document.createElement("div");
		globals.controlsBarButtons.classList.add("buttons");

		// Controls Bar Buttons Left
		globals.controlsBarButtonsLeft = document.createElement("div");
		globals.controlsBarButtonsLeft.classList.add("left");

		// Controls Bar Buttons Right
		globals.controlsBarButtonsRight = document.createElement("div");
		globals.controlsBarButtonsRight.classList.add("right");

		globals.replayButton = SVGHelper("restart");
		globals.controlsBarButtonsLeft.appendChild(globals.replayButton);

		globals.enterFullscreenButton = SVGHelper("enter-fullscreen");
		globals.controlsBarButtonsRight.appendChild(globals.enterFullscreenButton);

		globals.exitFullscreenButton = SVGHelper("exit-fullscreen", {
			svgAttributes: [["class", "hidden"]]
		});
		globals.controlsBarButtonsRight.appendChild(globals.exitFullscreenButton);

		globals.controlsBarButtons.appendChild(globals.controlsBarButtonsLeft);
		globals.controlsBarButtons.appendChild(globals.controlsBarButtonsRight);

		globals.controlsBar.appendChild(globals.controlsBarButtons);

		globals.uiElementsContainer.appendChild(globals.loadingSpinner);
		globals.uiElementsContainer.appendChild(globals.controlsBar);
		globals.uiContainer.appendChild(globals.uiElementsContainer);
	};

	const removeEventListeners = () => {
		globals.uiElementsContainer.removeEventListener(
			"click",
			uiElementsContainerClickHandler
		);
	};

	const setupEventListeners = () => {
		globals.uiElementsContainer.addEventListener(
			"click",
			uiElementsContainerClickHandler
		);
	};

	const setup = function(videoplayer) {
		globals.rootEl = videoplayer.getEl();
		globals.videoEl = globals.rootEl.querySelector("video");
		globals.uiContainer = globals.rootEl.querySelector(".ui-container");
		globals.videoplayer = videoplayer;

		globals.rootEl.classList.add("endscreen-video-recommendations-plugin");

		setupControls();
	};

	// Add icons
	if (
		!document.getElementById(
			"slvideojsEndscreenVideoRecommendationsPluginIcons"
		)
	) {
		const iconContainer = document.createElement("div");
		iconContainer.id = "slvideojsEndscreenVideoRecommendationsPluginIcons";
		iconContainer.style.display = "none";
		iconContainer.innerHTML = UIIcons;
		document.body.appendChild(iconContainer);
	}

	const uiDeInit = function() {
		if (globals._initialized === false) return;
		removeEventListeners();
		globals.uiElementsContainer.parentNode.removeChild(
			globals.uiElementsContainer
		);
		globals.rootEl.classList.remove("endscreen-video-recommendations-plugin");
		for (let k in globals) {
			globals[k] = null;
		}
		globals._initialized = false;
	};

	const uiInit = function(videoplayer) {
		originalUIName = videoplayer.getPreviousUIName();
		setup(videoplayer);
		setupEventListeners();
		globals._initialized = true;
	};

	return {
		init: uiInit,
		deInit: uiDeInit
	};
};

ui.uiName = "endscreenVideoRecommendationsPlugin";
ui.uiVersion = version;

if (typeof slvideojs !== "undefined") {
	slvideojs.registerUI(ui, () => {});
	slvideojs.registerPlugin(plugin, () => {});
}

export default ui;
