export default function SVGHelper(type, opts) {
	opts = opts || {};
	opts.svgAttributes = opts.svgAttributes || [];
	opts.svgAttributes.push(["role", "presentation"]);
	opts.svgAttributes.push(["focusable", "false"]);

	const namespace = "http://www.w3.org/2000/svg";
	const iconPrefix = "gvp";
	const iconPath = "#" + iconPrefix;
	const icon = document.createElementNS(namespace, "svg");

	opts.svgAttributes.forEach(attr => {
		icon.setAttribute(attr[0], attr[1]);
	});

	const use = document.createElementNS(namespace, "use");
	const path = iconPath + "-" + type;

	if ("href" in use) {
		use.setAttributeNS("http://www.w3.org/1999/xlink", "href", path);
	}
	if (opts.useAttributes && opts.useAttributes.length) {
		opts.useAttributes.forEach(attr => {
			use.setAttribute(attr[0], attr[1]);
		});
	}

	use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", path);

	icon.appendChild(use);

	return icon;
}
