// ==UserScript==
// @name        Augenzuckerl
// @version     1.9.0
// @author      holzmaster
// @namespace   holzmaster
// @include     https://pr0gramm.com*
// @updateURL   https://holzmaster.github.io/augenzuckerl/augenzuckerl.user.js
// @downloadURL https://holzmaster.github.io/augenzuckerl/augenzuckerl.user.js
// @icon        https://pr0gramm.com/media/pr0gramm-favicon.png
// @grant       none
// ==/UserScript==

function addGlobalStyle(css) {
	const style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	document.head.appendChild(style);
}

addGlobalStyle(`
#head {
	width: 100% !important;

	display: flex;
	justify-content: center;

	background-color: rgba(0, 0, 0, 0.9);
}
@supports(backdrop-filter: blur()) {
	#head {
		background-color: rgba(0, 0, 0, 0.58) !important;
		backdrop-filter: blur(30px);
	}
}

#head-content {
	background-color: transparent;
	width: 1052px;
}


.subtitle {
	color: #888; /* the original uses the primary color everywhere, which is pretty heavy */
}
`);
