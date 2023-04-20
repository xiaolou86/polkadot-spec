import safeEventListener from "../safeEventListener";

const injectCss = () => {
	const timeoutMs = 500;

	const injectCssClasses = () => {
		const div = document.getElementsByClassName("theme-doc-markdown markdown");
		let children = div[0].children;
		if (
			children[0].children[0].tagName === "H1" &&
			children[0].children[0].innerHTML.toLowerCase().includes("glossary")
		) {
			for (let i = 0; i < children.length; i++) {
				if (children[i].tagName === "P") {
					children[i].classList.add("glossary-term");
				}
				if (children[i].tagName === "UL") {
					children[i].classList.add("glossary-definition");
				}
			}
		}
	};

	return {
		name: 'injectGlossaryCss',
		injectHtmlTags() {
			return {
				postBodyTags: [{
					tagName: 'script',
					innerHTML: `
						(${safeEventListener.toString()})(${injectCssClasses.toString()}, ${timeoutMs})
					`
				}],
			};
		},
	};
};

export = injectCss;
