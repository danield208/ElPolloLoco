function startFirstInit() {
	if (newImageContentLoaded == 28) initStartscreen();
}

function setStartscreenOptions() {
	tryAgainButtonAttributes();
	StartButtonAttributes();
	RightButtonAttributes();
	LeftButtonAttributes();
	UpButtonAttributes();
	ThrowButtonAttributes();
}

function tryAgainButtonAttributes() {
	TryAgainButtonWidth = TryAgain.width / 2;
	TryAgainButtonHeight = TryAgain.height / 2;
	TryAgainButtonPositionX = canvas.width / 2 - TryAgainButtonWidth / 2;
	TryAgainButtonPositionY = canvas.height / 7 - TryAgainButtonHeight / 2;
}
function StartButtonAttributes() {
	StartButtonWidth = StartButton.width / 2;
	StartButtonHeight = StartButton.height / 2;
	StartButtonPositionX = canvas.width / 2 - StartButtonWidth / 2;
	StartButtonPositionY = canvas.height / 7 - StartButtonHeight / 2;
}

function RightButtonAttributes() {
	ArrowButtonRightPositionX = 120;
	ArrowButtonRightPositionY = canvas.height - 20 - ButtonHeight;
}

function LeftButtonAttributes() {
	ArrowButtonLeftPositionX = 30 * -1 - ButtonWidth;
	ArrowButtonLeftPositionY = canvas.height - 20 - ButtonHeight;
}

function UpButtonAttributes() {
	ArrowButtonUPPositionX = canvas.width - 90;
	ArrowButtonUPPositionY = canvas.height - 20 - ButtonHeight;
}

function ThrowButtonAttributes() {
	BottleButtonPositionX = canvas.width - 180;
	BottleButtonPositionY = canvas.height - 20 - ButtonHeight;
}

function initStartscreen() {
	clearInterval(checkImages);
	setStartscreenOptions();
	ctx.drawImage(Startscreen, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(StartButton, StartButtonPositionX, StartButtonPositionY, StartButtonWidth, StartButtonHeight);
	ctx.fillStyle = "red";
	PressButton = true;
}
