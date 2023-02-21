class DrawObject {
	currentImage;
	currentImageCounter = 0;

	constructor() {}

	loadSingleImage(path) {
		this.currentImage = new Image();
		this.currentImage.src = path;
	}

	playAnimation(images) {
		let index = this.currentImageCounter % images.length;
		let path = images[index];
		this.currentImage = imageCache[path];
		this.currentImageCounter++;
	}
}
