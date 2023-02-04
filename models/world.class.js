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
		this.worldDraw();
		this.setWorld();
		this.checkCollisions();
		this.run();
	}

	checkThrowObjects() {
		if (this.keyboard.THROW) {
			let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
			this.throwableObjects.push(bottle);
		}
	}

	worldDraw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.setCameraWhileWalking();
		this.addToMap(this.statusBar);
		// FPS
		requestAnimationFrame(() => {
			this.worldDraw();
		});
	}

	setCameraWhileWalking() {
		this.ctx.translate(this.camera_x, 0);
		this.ctx.translate(-this.camera_x, 0); // back
		this.ctx.translate(this.camera_x, 0); // forwards

		// add backgrounds
		this.addObjectsToMap(this.level.backgroundObjects);
		// Add interactive objects
		this.addToMap(this.character);
		this.addObjectsToMap(this.level.coins);
		this.addObjectsToMap(this.level.clouds);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);

		this.ctx.translate(-this.camera_x, 0);
	}

	addObjectsToMap(objects) {
		objects.forEach((object) => {
			this.addToMap(object);
		});
	}

	addToMap(movableObj) {
		if (movableObj.otherDirection) {
			this.flipImage(movableObj);
		}

		movableObj.draw(this.ctx);
		movableObj.drawHitbox(this.ctx);

		if (movableObj.otherDirection) {
			this.flipImageBack(movableObj);
		}
	}

	flipImage(movableObj) {
		this.ctx.save();
		this.ctx.translate(movableObj.width, 0);
		this.ctx.scale(-1, 1);
		movableObj.x = movableObj.x * -1;
	}

	flipImageBack(movableObj) {
		movableObj.x = movableObj.x * -1;
		this.ctx.restore();
	}

	setWorld() {
		this.character.World = this;
	}

	checkCollisions() {
		this.level.enemies.forEach((enemy) => {
			if (this.character.isColliding(enemy)) {
				this.character.hit();
				this.statusBar.setPercentage(this.character.energy);
			}
		});
	}

	run() {
		setInterval(() => {
			this.checkCollisions();
			this.checkThrowObjects();
		}, 200);
	}
}
