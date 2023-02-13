class Canvas {
	// ANCHOR load canvas tag
	canvas = document.querySelector("canvas");
	ctx;

	// ANCHOR Intervalls
	Intervals = [];

	// ANCHOR variables - drawable objects
	img;
	imageCache = {};
	currentImage = 0;
	instances = [
		this instanceof Character,
		this instanceof Chicken,
		this instanceof Endboss,
		this instanceof SmallChicken,
		this instanceof Coin,
	];

	// ANCHOR variables - movable objects
	speed = 0.4;
	speedY = 0;
	acceleration = 2.5;
	energy = 100;
	lastHit = 0;
	otherDirection = false;

	constructor() {
		this.ctx = this.canvas.getContext("2d");
		this.applyGravity();
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
		this.instances.forEach((instance) => {
			if (instance) {
				this.ctx.beginPath();
				this.ctx.lineWidth = "5";
				this.ctx.strokeStyle = "blue";
				this.ctx.rect(this.x, this.y, this.width, this.height);
				this.ctx.stroke();
			}
			if (instance) {
				this.ctx.beginPath();
				this.ctx.lineWidth = "3";
				this.ctx.strokeStyle = "red";
				this.ctx.rect(
					this.x + this.offset.LEFT,
					this.y + this.offset.TOP,
					this.width - this.offset.RIGHT,
					this.height - this.offset.BOTTOM
				);
				this.ctx.stroke();
			}
		});
	}

	// ANCHOR movable objects
	applyGravity() {
		if (this instanceof Character || this instanceof ThrowableObject)
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

	doTheThing() {
		setTimeout(() => {}, 100);
	}

	animate(images) {
		setInterval(() => {
			this.playAnimation(images);
		}, 200);
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 30);
	}

	isColliding(mo) {
		return (
			this.x + this.width - this.offset.RIGHT >= mo.x + mo.offset.LEFT &&
			this.y + this.height - this.offset.BOTTOM >= mo.y + mo.offset.TOP &&
			this.x + this.offset.LEFT <= mo.x + mo.width - mo.offset.RIGHT &&
			this.y + this.offset.TOP <= mo.y + mo.height - mo.offset.BOTTOM
		);
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
