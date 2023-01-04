class DrawableObject {
	x = 120;
	img;
	width = 100;
	height = 150;
	imageCache = {};
	currentImage = 0;

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	drawFrame(ctx) {
		if (this instanceof Character || this instanceof Chicken) {
			ctx.beginPath();
			ctx.lineWidth = "5";
			ctx.strokeStyle = "blue";
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		}
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
}
