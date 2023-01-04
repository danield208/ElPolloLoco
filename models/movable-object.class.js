class MovableObject extends DrawableObject {
	speed = 0.4;
	speedY = 0;
	acceleration = 2.5;
	energy = 100;
	lastHit = 0;
	otherDirection = false;

	applyGravity(ctx) {
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
		// let ind = 0 % 6; % = mathematischer rest => 0, Rest 0; wenn ind = 1 => 0, Rest 1
		// i = 0, 1, 2, 3, 4, 5 und dann wieder 0. Modular greift nur das nach dem Komma auf
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

	// isColliding(obj) {
	// 	return (
	// 		this.X + this.width >= obj.X &&
	// 		this.X <= obj.X + obj.width &&
	// 		this.Y + this.offsetY + this.height >= obj.Y &&
	// 		this.Y + this.offsetY <= obj.Y + obj.height &&
	// 		obj.onCollisionCourse
	// 	); // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
	// }
}
