class Game {
	Canvas;
	Context;
	Startscreen;
	Keybaord;
	GameRunning = false;

	constructor(canvas, keyboard) {
		this.initDefaults(canvas, keyboard);
		this.setStartscreen();
		this.listenForKeys();
	}

	initDefaults(canvas, keyboard) {
		this.Canvas = canvas;
		this.Context = canvas.getContext("2d");
		this.Keybaord = keyboard;
	}

	setStartscreen() {
		this.Startscreen = new Startscreen(this.Canvas, this.Context);
	}

	listenForKeys() {
		window.addEventListener("keydown", () => {
			if (this.Keybaord.ESC && !this.GameRunning) {
				this.GameRunning = true;
				startGame();
			} else if (this.Keybaord.ESC) {
				setTimeout(() => {
					this.stopGame();
				}, 50);
			}
		});
	}

	stopGame() {
		location.reload();
	}
}
