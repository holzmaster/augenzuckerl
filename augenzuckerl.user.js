// ==UserScript==
// @name		Augenzuckerl
// @version		1.7.0
// @author		holzmaster
// @namespace	holzmaster
// @include		http://pr0gramm.com*
// @include		https://pr0gramm.com*
// @updateURL	https://holzmaster.github.io/augenzuckerl/augenzuckerl.user.js
// @downloadURL	https://holzmaster.github.io/augenzuckerl/augenzuckerl.user.js
// @icon		http://pr0gramm.com/media/pr0gramm-favicon.png
// @grant		none
// ==/UserScript==

function addGlobalStyle(css) {
	const style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	document.head.appendChild(style);
}

addGlobalStyle(`
#head {
	width: revert !important;

	display: flex;
	justify-content: center;

	background-color: rgba(0, 0, 0, 0.9);
}
@supports(backdrop-filter: blur()) {
	#head {
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(30px);
	}
}

a.thumb {
	/* fix to make not-yet-loaded thumbnails not appear white */
	background-color: #212121;
}

#head-content {
	background-color: revert;
	width: 1052px;
}

.search-form {
	padding-top: 18px;
}
div.search-row {
	margin: 0 15px 18px 15px !important;
}

.tip-menu-inner {
	padding: 0;
}
.tip-menu {
	background-color: black;
	filter: drop-shadow(0 20px 30px #000);
}

.tip-menu[style*="block"] {
	animation: popup-fadein 0.125s;
	animation-timing-function: cubic-bezier(.19 ,1, .22, 1);
}

@keyframes popup-fadein {
	0% {
		opacity: 0;
		transform: translateY(50px);
	}
	100% {
		opacity: 1;
		transform: 0;
	}
}

input[type=radio].box-from-label + label::before {
	border-radius: 8px; /* radio buttons should be round */
	border-width: 1.4px; /* 1px seems too thin */
}

.tip-menu::after {
	top: -8px !important; /* the triangle is off by one on my machine */
}

.subtitle {
	color: #888; /* the original uses the primary color everywhere, which is pretty heavy */
}
`);
