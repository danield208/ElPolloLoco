class World {
	character = new Character();
	level = level1;
	canvas;
	ctx;
	keyboard;
	camera_x = 0;
	statusBar = new StatusBar();
	throwableObjects = [];
	bottlesToThrow = 20;
	paused = false;

	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();
		this.setWorld();
		this.checkCollisions();
		this.run();
	}

	setWorld() {
		this.character.World = this;
	}

	run() {
		setInterval(() => {
			this.checkCollisions();
			this.checkThrowObjects();
		}, 200);
	}

	checkCollisions() {
		this.level.enemies.forEach((enemy) => {
			if (this.character.isColliding(enemy)) {
				this.character.hit();
				this.statusBar.setPercentage(this.character.energy);
			}
		});
	}

	checkThrowObjects() {
		if (this.keyboard.THROW) {
			let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
			this.throwableObjects.push(bottle);
		}
	}

	draw() {
		if (this.paused == false) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			this.ctx.translate(this.camera_x, 0);
			this.addObjectsToMap(this.level.backgroundObjects);

			this.ctx.translate(-this.camera_x, 0); // back
			// SPACE FOR FIXED OBJECT -----------------------------------
			this.addToMap(this.statusBar);
			this.ctx.translate(this.camera_x, 0); // forwards

			this.addToMap(this.character);
			this.addObjectsToMap(this.level.clouds);
			this.addObjectsToMap(this.level.enemies);
			this.addObjectsToMap(this.throwableObjects);

			this.ctx.translate(-this.camera_x, 0);
		}

		// FPS
		let self = this;
		requestAnimationFrame(() => {
			self.draw();
			self.gamePaused();
		});
	}

	gamePaused() {
		if (this.keyboard.PAUSE) {
			if (this.paused) {
				this.paused = false;
			} else this.paused = true;
		}
	}

	addObjectsToMap(objects) {
		objects.forEach((o) => {
			this.addToMap(o);
		});
	}

	addToMap(mo) {
		if (mo.otherDirection) {
			this.flipImage(mo);
		}
		mo.draw(this.ctx);
		mo.drawFrame(this.ctx);

		if (mo.otherDirection) {
			this.flipImageBack(mo);
		}
	}

	flipImage(mo) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1, 1);
		mo.x = mo.x * -1;
	}

	flipImageBack(mo) {
		mo.x = mo.x * -1;
		this.ctx.restore();
	}
}
