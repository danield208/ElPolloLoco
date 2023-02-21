const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// ANCHOR for clicking/touching buttons
function checkForButton() {
	return (
		clickX > StartButtonPositionX && // clickX > picture left
		clickX < StartButtonPositionX + StartButtonWidth && // clickX < picture right
		clickY > StartButtonPositionY && // clixkY > picture top
		clickY < StartButtonPositionY + StartButtonHeight // clickY < picture bottom
	);
}

function checkForButtonCollision(button) {
	if (button == "right") {
		return checkButtonRight();
	} else if (button == "left") {
		return checkButtonLeft();
	} else if (button == "up") {
		return checkButtonUp();
	} else if (button == "throw") {
		return checkButtonThrow();
	}
}

function checkButtonRight() {
	return (
		clickX > ArrowButtonRightPositionX && // clickX > picture left
		clickX < ArrowButtonRightPositionX + ButtonWidth && // clickX < picture right
		clickY > ArrowButtonRightPositionY && // clixkY > picture top
		clickY < ArrowButtonRightPositionY + ButtonHeight // clickY < picture bottom
	);
}
function checkButtonLeft() {
	return (
		clickX > ArrowButtonLeftPositionX * -1 - 80 && // clickX > picture left
		clickX < ArrowButtonLeftPositionX * -1 - 80 + ButtonWidth && // clickX < picture right
		clickY > ArrowButtonLeftPositionY && // clixkY > picture top
		clickY < ArrowButtonLeftPositionY + ButtonHeight // clickY < picture bottom
	);
}
function checkButtonUp() {
	return (
		clickX > ArrowButtonUPPositionX && // clickX > picture left
		clickX < ArrowButtonUPPositionX + ButtonWidth && // clickX < picture right
		clickY > ArrowButtonUPPositionY && // clixkY > picture top
		clickY < ArrowButtonUPPositionY + ButtonHeight // clickY < picture bottom
	);
}
function checkButtonThrow() {
	return (
		clickX > BottleButtonPositionX && // clickX > picture left
		clickX < BottleButtonPositionX + ButtonWidth && // clickX < picture right
		clickY > BottleButtonPositionY && // clixkY > picture top
		clickY < BottleButtonPositionY + ButtonHeight // clickY < picture bottom
	);
}
