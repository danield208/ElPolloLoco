document.addEventListener("DOMContentLoaded", () => {
	checkWindowInterval = setInterval(() => {
		checkForMobile();
	}, 20);

	muteButton = document.querySelector("#MuteButton");
	muteButton.addEventListener("click", () => {
		muteButton.classList.toggle("active");
		if (muted) muted = false;
		else muted = true;
	});
	checkImages = setInterval(() => {
		if (!ImageSrcContentLoaded) {
			setNewImage();
			initImageCache();
		}
		startFirstInit();
	}, 1);
});

function checkForMobile() {
	let width = window.innerWidth;
	let height = window.innerHeight;

	if (width <= 1086 || height <= 648) {
		if (width < height) {
			PressButton = false;
			document.getElementById("warning").style = "display: flex;";
		} else {
			document.getElementById("warning").style = "display: none;";
			PressButton = true;
		}
		drawTouchButtons = true;
	} else {
		document.getElementById("warning").style = "display: none;";
		drawTouchButtons = false;
	}
}

canvas.addEventListener("click", (event) => {
	if (PressButton && event.pointerType != "touch") {
		const rect = canvas.getBoundingClientRect();
		clickX = event.clientX - rect.left;
		clickY = event.clientY - rect.top;
		if (checkForButton()) {
			init();
		}
		clickX = 0;
		clickY = 0;
	} else if (PressButton) {
		if (checkForButton()) {
			init();
		}
		clickX = 0;
		clickY = 0;
	}
});

document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "a":
			keys.left = true;
			break;
		case "d":
			keys.right = true;
			break;
		case " ":
			keys.space = true;
			break;
		case "l":
			keys.throw = true;
			break;
	}
});

document.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "a":
			keys.left = false;
			break;
		case "d":
			keys.right = false;
			break;
		case " ":
			keys.space = false;
			break;
		case "l":
			keys.throw = false;
			break;
	}
});

document.addEventListener("touchstart", (event) => {
	clickX = (canvas.width / window.innerWidth) * event.touches[0].clientX;
	clickY = (canvas.height / window.innerHeight) * event.touches[0].clientY;
});

document.addEventListener("touchend", (event) => {
	keys.left = false;
	keys.right = false;
	keys.space = false;
	keys.throw = false;
});
