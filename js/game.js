let canvas;
let world;
let keyboard = new Keyboard();

document.addEventListener("DOMContentLoaded", () => {
	canvas = document.querySelector("canvas");
	world = new World(canvas, keyboard);
});

window.addEventListener("keydown", (event) => {
	if (event.code == "KeyW") keyboard.UP = true;
	if (event.code == "KeyS") keyboard.DOWN = true;
	if (event.code == "KeyA") keyboard.LEFT = true;
	if (event.code == "KeyD") keyboard.RIGHT = true;
	if (event.code == "Space") keyboard.SPACE = true;
	if (event.code == "KeyK") keyboard.THROW = true;
});

window.addEventListener("keyup", (event) => {
	if (event.code == "KeyW") keyboard.UP = false;
	if (event.code == "KeyS") keyboard.DOWN = false;
	if (event.code == "KeyA") keyboard.LEFT = false;
	if (event.code == "KeyD") keyboard.RIGHT = false;
	if (event.code == "Space") keyboard.SPACE = false;
	if (event.code == "KeyK") keyboard.THROW = false;
});
