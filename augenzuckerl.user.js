// ==UserScript==
// @name		Augenzuckerl
// @version		1.0.2
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
		background-color: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(30px);
	}
}

@media only screen and (min-width: 600px) {
	#head {
		box-shadow: rgba(0, 0, 0, 0.55) 0px 20px 20px -10px;
	}
}

a.thumb {
	backgorund-color: #212121;
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
`);
