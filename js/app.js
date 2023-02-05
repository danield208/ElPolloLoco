let canvas;
let world;
let keyboard = new Keyboard();
let canvasInit;
let gameInit;

document.addEventListener("DOMContentLoaded", () => {
	canvas = document.querySelector("canvas");
	// gameInit = new Game(canvas, keyboard);
	startGame();
});

function startGame() {
	world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
	if (event.code == "KeyW") keyboard.UP = true;
	if (event.code == "KeyS") keyboard.DOWN = true;
	if (event.code == "KeyA") keyboard.LEFT = true;
	if (event.code == "KeyD") keyboard.RIGHT = true;
	if (event.code == "Space") keyboard.SPACE = true;
	if (event.code == "KeyK") keyboard.THROW = true;
	if (event.code == "Escape") keyboard.ESC = true;
});

window.addEventListener("keyup", (event) => {
	if (event.code == "KeyW") keyboard.UP = false;
	if (event.code == "KeyS") keyboard.DOWN = false;
	if (event.code == "KeyA") keyboard.LEFT = false;
	if (event.code == "KeyD") keyboard.RIGHT = false;
	if (event.code == "Space") keyboard.SPACE = false;
	if (event.code == "KeyK") keyboard.THROW = false;
	if (event.code == "Escape") keyboard.ESC = false;
});
