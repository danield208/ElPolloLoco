class Canvas {
	// ANCHOR load canvas tag
	canvas = document.querySelector("canvas");
	ctx;

	// ANCHOR variables - drawable objects
	img;
	imageCache = {};
	currentImage = 0;

	// ANCHOR variables - movable objects
	speed = 0.4;
	speedY = 0;
	acceleration = 2.5;
	energy = 100;
	lastHit = 0;
	otherDirection = false;
	currentImage = 0;

	constructor() {
		this.ctx = this.canvas.getContext("2d");
	}

	// ANCHOR drawable objects
	draw() {
		this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	loadImages(arr) {
		arr.forEach((path) => {
			let img = new Image();
			img.src = path;
			img.style = "transform: scaleX(-1)";
			this.imageCache[path] = img;
		});
	}

	drawHitbox() {
		if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
			this.ctx.beginPath();
			this.ctx.lineWidth = "5";
			this.ctx.strokeStyle = "blue";
			this.ctx.rect(this.x, this.y, this.width, this.height);
			this.ctx.stroke();
		}
	}

	// ANCHOR movable objects
	applyGravity() {
		setInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			}
		}, 1000 / 25);
	}

	isAboveGround() {
		if (this instanceof ThrowableObject) {
			//throwable objects should always fall
			return true;
		} else {
			return this.y < 155;
		}
	}

	moveRight() {
		this.x += this.speed;
	}

	moveLeft() {
		this.x -= this.speed;
	}

	playAnimation(images) {
		let ind = this.currentImage % images.length;
		let path = images[ind];
		this.img = this.imageCache[path];
		this.currentImage++;
	}

	jump() {
		this.speedY = 30;
	}

	isColliding(mo) {
		return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
	}

	hit() {
		this.energy -= 2;
		if (this.energy < 0) {
			this.energy = 0;
		} else {
			this.lastHit = new Date().getTime();
		}
	}

	isDead() {
		return this.energy == 0;
	}

	isHurt() {
		let timepassed = new Date().getTime() - this.lastHit; //difference in ms
		return timepassed < 1000;
	}
}
