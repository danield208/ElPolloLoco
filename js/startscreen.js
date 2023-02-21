function startFirstInit() {
	if (newImageContentLoaded == 28) initStartscreen();
}

function setStartscreenOptions() {
	TryAgainButtonWidth = TryAgain.width / 2;
	TryAgainButtonHeight = TryAgain.height / 2;
	TryAgainButtonPositionX = canvas.width / 2 - TryAgainButtonWidth / 2;
	TryAgainButtonPositionY = canvas.height / 7 - TryAgainButtonHeight / 2;

	StartButtonWidth = StartButton.width / 2;
	StartButtonHeight = StartButton.height / 2;
	StartButtonPositionX = canvas.width / 2 - StartButtonWidth / 2;
	StartButtonPositionY = canvas.height / 7 - StartButtonHeight / 2;

	ButtonWidth = 80;
	ButtonHeight = 80;

	ArrowButtonRightPositionX = 120;
	ArrowButtonRightPositionY = canvas.height - 20 - 80;

	ArrowButtonLeftPositionX = 30 * -1 - 80;
	ArrowButtonLeftPositionY = canvas.height - 20 - 80;

	ArrowButtonUPPositionX = canvas.width - 90;
	ArrowButtonUPPositionY = canvas.height - 20 - 80;

	BottleButtonPositionX = canvas.width - 180;
	BottleButtonPositionY = canvas.height - 20 - 80;
}

function initStartscreen() {
	clearInterval(checkImages);
	setStartscreenOptions();
	ctx.drawImage(Startscreen, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(StartButton, StartButtonPositionX, StartButtonPositionY, StartButtonWidth, StartButtonHeight);
	ctx.fillStyle = "red";
	PressButton = true;
}
