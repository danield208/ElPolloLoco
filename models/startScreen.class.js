class Startscreen extends Canvas {
	START_IMAGE = "../img/9_intro_outro_screens/start/startscreen_1.png";
	x = 0;
	y = 0;
	width = 720;
	height = 480;

	constructor() {
		super();
		this.loadStartScreen();
	}

	loadStartScreen() {
		this.loadImage(this.START_IMAGE);
		setTimeout(() => {
			this.draw();
		}, 200);
	}
}
