class Background {
	constructor({ x, image, type = "none" }) {
		this.image = image;
		this.width = this.image.width;
		this.height = this.image.height;
		this.position = {
			x: x,
			y: 0,
		};
		if (type == "cloud") this.update();
	}

	draw() {
		ctx.drawImage(this.image, this.position.x, this.position.y, canvas.width, canvas.height);
	}

	// cloud move speed
	update() {
		this.draw();
		this.position.x -= 0.18;
	}
}
