// ==UserScript==
// @name        Augenzuckerl
// @version     2.0.0
// @author      holzmaster
// @namespace   holzmaster
// @include     https://pr0gramm.com*
// @updateURL   https://holzmaster.github.io/augenzuckerl/augenzuckerl.user.js
// @downloadURL https://holzmaster.github.io/augenzuckerl/augenzuckerl.user.js
// @icon        https://pr0gramm.com/media/pr0gramm-favicon.png
// @run-at      document-end
// ==/UserScript==

function addGlobalStyle(css) {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  document.head.appendChild(style);
}
function addGlobalScript(src) {
  const e = document.createElement('script');
  e.type = 'text/javascript';
  e.innerHTML = src;
  document.body.appendChild(e);
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


addGlobalScript("(" + (() => {
  /**
 * @param {{ width: number, height: number }} previewSize
 */
  function createCanvas(previewSize) {
    const c = document.createElement("canvas");
    c.width = previewSize.width;
    c.height = previewSize.height;
    c.style.width = "100%";
    c.style.height = "100%";
    c.style.inset = "0";
    c.style.position = "absolute";
    c.style.backgroundColor = "transparent";
    // c.style.border = "1px solid green";
    return c;
  }

  /**
   * @param {HTMLCanvasElement} source
   * @param {CanvasRenderingContext2D} ctx
   */
  function savePreviousAnimatedCanvas(source, ctx) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(source, 0, 0, w, h);
  }

  /**
   * @param {CanvasImageSource} source
   * @param {{ width: number, height: number }} previewSize
   * @param {number} blurSize
   * @param {CanvasRenderingContext2D} ctx
   */
  function drawAnimationFrame(source, previewSize, blurSize, ctx) {
    ctx.clearRect(0, 0, previewSize.width, previewSize.height);

    const padding = blurSize * 2;
    ctx.drawImage(source, padding, padding, previewSize.width - padding * 2, previewSize.height - padding * 2);
  }

  function main(width, height, v) {

    const previewSize = {
      width: (width / 10) | 0,
      height: (height / 10) | 0,
    };
    const blurSize = 5;

    const stableCanvas = createCanvas(previewSize);
    const stableContext = stableCanvas.getContext("2d");

    const animatedCanvas = createCanvas(previewSize);
    const animatedContext = animatedCanvas.getContext("2d");
    animatedContext.filter = `blur(${blurSize}px) saturate(300%) brightness(80%)`;
    animatedContext.globalAlpha = 0.7;
    animatedContext.globalCompositeOperation = "screen";

    const cinematics = document.createElement("div");
    cinematics.style.backgroundColor = "transparent";
    cinematics.style.zIndex = "-1";
    cinematics.style.position = "absolute";
    cinematics.style.inset = "0";
    cinematics.style.display = "flex";

    const canvasContainer = document.createElement("div");
    canvasContainer.style.width = "100%";
    canvasContainer.style.height = "100%";
    canvasContainer.style.position = "absolute";
    canvasContainer.style.inset = "0";
    canvasContainer.style.pointerEvents = "none";
    canvasContainer.style.transform = "scale(1.1, 1.25)";
    canvasContainer.style.backgroundColor = "transparent";

    canvasContainer.append(stableCanvas, animatedCanvas);
    cinematics.appendChild(canvasContainer);
    v.parentElement.prepend(cinematics);

    function animationStep() {
      savePreviousAnimatedCanvas(animatedCanvas, stableContext);
      drawAnimationFrame(v, previewSize, blurSize, animatedContext);
    }

    const animation = animatedCanvas.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 5000,
      fill: "forwards",
    });

    animation.addEventListener("finish", () => {
      if (v instanceof HTMLVideoElement) {
        setTimeout(() => {
          animationStep();

          // TODO: Check if the user has the current tab opened
          // TODO: Cancel animation if the video stopped
          animation.play();
        }, 2000);
      }
    }, { passive: true });

    animationStep();
    animation.play();
  }

  const show = function (rowIndex, itemData, defaultHeight, jumpToComment) {
    this.parent(rowIndex, itemData, defaultHeight, jumpToComment);

    const itemImage = document.getElementsByClassName("item-image")[0];
    if (!itemImage) {
      return;
    }
    const currentImageOrVideo = itemImage.getElementsByClassName("item-image-actual")[0];
    if (!currentImageOrVideo) {
      return;
    }

    main(itemData.width, itemData.height, currentImageOrVideo);
  };

  const old = p.View.Stream.Item;
  p.View.Stream.Item = old.extend({
    show,
  });
  p.View.Stream.Item.TARGET = old.TARGET;

}).toString() + ")()");

