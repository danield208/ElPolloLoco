const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// background
const air = new Image();
air.src = "img/5_background/layers/air.png";

const bgLayer1_1 = new Image();
bgLayer1_1.src = "img/5_background/layers/1_first_layer/1.png";
const bgLayer1_2 = new Image();
bgLayer1_2.src = "img/5_background/layers/1_first_layer/2.png";
const bgLayer2_1 = new Image();
bgLayer2_1.src = "img/5_background/layers/2_second_layer/1.png";
const bgLayer2_2 = new Image();
bgLayer2_2.src = "img/5_background/layers/2_second_layer/2.png";
const bgLayer3_1 = new Image();
bgLayer3_1.src = "img/5_background/layers/3_third_layer/1.png";
const bgLayer3_2 = new Image();
bgLayer3_2.src = "img/5_background/layers/3_third_layer/2.png";

const clouds1 = new Image();
clouds1.src = "img/5_background/layers/4_clouds/1.png";
const clouds2 = new Image();
clouds2.src = "img/5_background/layers/4_clouds/2.png";

// statusbar
// character
const char_health_0 = new Image();
char_health_0.src = "img/7_statusbars/1_statusbar/Statusbar Health/0.png";
const char_health_20 = new Image();
char_health_20.src = "img/7_statusbars/1_statusbar/Statusbar Health/20.png";
const char_health_40 = new Image();
char_health_40.src = "img/7_statusbars/1_statusbar/Statusbar Health/40.png";
const char_health_60 = new Image();
char_health_60.src = "img/7_statusbars/1_statusbar/Statusbar Health/60.png";
const char_health_80 = new Image();
char_health_80.src = "img/7_statusbars/1_statusbar/Statusbar Health/80.png";
const char_health_100 = new Image();
char_health_100.src = "img/7_statusbars/1_statusbar/Statusbar Health/100.png";

const mapOffset = 60;
const gravity = 1.2;
const keys = {
	left: false,
	right: false,
	space: false,
};

class Player {
	constructor() {
		this.width = 50;
		this.height = 100;
		this.speed = 8;
		this.jumpHieght = 25;
		this.health = 100;
		this.CharHealthBar;
		this.position = {
			x: canvas.width / 2,
			y: 0,
		};
		this.velocity = {
			x: 0,
			y: 0,
		};
	}

	checkHealth() {
		if (this.health == 100) this.CharHealthBar = char_health_100;
		else if (this.health >= 80) this.CharHealthBar = char_health_80;
		else if (this.health >= 60) this.CharHealthBar = char_health_60;
		else if (this.health >= 40) this.CharHealthBar = char_health_40;
		else if (this.health >= 20) this.CharHealthBar = char_health_20;
		else if (this.health == 0) this.CharHealthBar = char_health_0;
	}

	draw() {
		ctx.fillStyle = "red";
		ctx.fillRect(player.position.x, player.position.y, this.width, this.height);
		ctx.drawImage(this.CharHealthBar, 0, 0, 200, 50);
	}

	update() {
		this.checkHealth();
		this.draw();
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
	}
}

class Background {
	constructor({ x, image }) {
		this.image = image;
		this.width = this.image.width;
		this.height = this.image.height;
		this.position = {
			x: x,
			y: 0,
		};
	}

	draw() {
		ctx.drawImage(this.image, this.position.x, this.position.y, canvas.width, canvas.height);
	}
}

class Enemy {
	enemySpeed;

	constructor() {
		this.width = 80;
		this.height = 80;
		this.position = {
			x: 0,
			y: canvas.height - mapOffset - this.height,
		};

		this.initEnemy();
	}

	initEnemy() {
		this.setEnemySpawn();
		this.setEnemySpeed();
	}

	setEnemySpawn() {
		this.position.x = Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * 5 + canvas.width;
		if (this.position.x < 1000) this.setEnemySpawn();
		else if (this.position.x > backgroundsLayer_one[8].position.x - 100) this.setEnemySpawn();
	}

	setEnemySpeed() {
		this.enemySpeed = Math.floor(Math.random() * 10);
		if (this.enemySpeed == 0) this.initEnemy();
		if (this.enemySpeed > 4) this.initEnemy();
	}

	draw() {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();
		if (player.position.x < this.position.x) this.position.x -= this.enemySpeed;
		else if (player.position.x > this.position.x) this.position.x += this.enemySpeed;
	}
}

let backgroundsLayer_one = [];
let backgroundsLayer_two = [];
let backgroundsLayer_three = [];
let enemies = [];
// let clouds = [];
let airBackground;
let player;

function init() {
	backgroundsLayer_one = [
		new Background({ x: -canvas.width, image: bgLayer1_2 }),
		new Background({ x: 0, image: bgLayer1_1 }),
		new Background({ x: canvas.width, image: bgLayer1_2 }),
		new Background({ x: canvas.width * 2, image: bgLayer1_1 }),
		new Background({ x: canvas.width * 3, image: bgLayer1_2 }),
		new Background({ x: canvas.width * 4, image: bgLayer1_1 }),
		new Background({ x: canvas.width * 5, image: bgLayer1_2 }),
		new Background({ x: canvas.width * 6, image: bgLayer1_1 }),
		new Background({ x: canvas.width * 7, image: bgLayer1_2 }),
	];
	backgroundsLayer_two = [
		new Background({ x: -canvas.width, image: bgLayer2_2 }),
		new Background({ x: 0, image: bgLayer2_1 }),
		new Background({ x: canvas.width, image: bgLayer2_2 }),
		new Background({ x: canvas.width * 2, image: bgLayer2_1 }),
		new Background({ x: canvas.width * 3, image: bgLayer2_2 }),
		new Background({ x: canvas.width * 4, image: bgLayer2_1 }),
		new Background({ x: canvas.width * 5, image: bgLayer2_2 }),
		new Background({ x: canvas.width * 6, image: bgLayer2_1 }),
		new Background({ x: canvas.width * 7, image: bgLayer2_2 }),
	];
	backgroundsLayer_three = [
		new Background({ x: -canvas.width, image: bgLayer3_2 }),
		new Background({ x: 0, image: bgLayer3_1 }),
		new Background({ x: canvas.width, image: bgLayer3_2 }),
		new Background({ x: canvas.width * 2, image: bgLayer3_1 }),
		new Background({ x: canvas.width * 3, image: bgLayer3_2 }),
		new Background({ x: canvas.width * 4, image: bgLayer3_1 }),
		new Background({ x: canvas.width * 5, image: bgLayer3_2 }),
		new Background({ x: canvas.width * 6, image: bgLayer3_1 }),
		new Background({ x: canvas.width * 7, image: bgLayer3_2 }),
	];
	airBackground = new Background({ x: 0, image: air });

	enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

	player = new Player();
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	airBackground.draw();

	backgroundsLayer_three.forEach((background) => {
		background.draw();
	});
	backgroundsLayer_two.forEach((background) => {
		background.draw();
	});
	backgroundsLayer_one.forEach((background) => {
		background.draw();
	});

	player.update();

	enemies.forEach((enemy) => {
		enemy.update();
	});

	// movement
	// if (keys.left && player.position.x > 30) {
	// 	// player.velocity.x = -player.speed;
	// } else if (keys.right && player.position.x + player.width < 150) {
	// 	// player.velocity.x = player.speed;
	// } else {
	if (keys.right && backgroundsLayer_one[8].position.x > 50) {
		backgroundsLayer_three.forEach((background) => {
			background.position.x -= player.speed * 0.44;
		});
		backgroundsLayer_two.forEach((background) => {
			background.position.x -= player.speed * 0.66;
		});
		backgroundsLayer_one.forEach((background) => {
			background.position.x -= player.speed;
		});
		enemies.forEach((enemy) => {
			enemy.position.x -= player.speed;
		});
	} else if (keys.left && backgroundsLayer_one[0].position.x < -50) {
		backgroundsLayer_three.forEach((background) => {
			background.position.x += player.speed * 0.44;
		});
		backgroundsLayer_two.forEach((background) => {
			background.position.x += player.speed * 0.66;
		});
		backgroundsLayer_one.forEach((background) => {
			background.position.x += player.speed;
		});
		enemies.forEach((enemy) => {
			enemy.position.x += player.speed;
		});
	}
	// }

	// || chicken is hit on head
	if (keys.space && player.velocity.y == 0) {
		player.velocity.y -= player.jumpHieght;
	}

	// apply gravity
	if (player.position.y + player.height + player.velocity.y <= canvas.height - mapOffset) player.velocity.y += gravity;
	else player.velocity.y = 0;
}

init();
animate();

document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "a":
			keys.left = true;
			break;

		case "d":
			keys.right = true;
			break;
		case " ":
			keys.space = true;
			break;
	}
});

document.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "a":
			keys.left = false;
			break;

		case "d":
			keys.right = false;
			break;
		case " ":
			keys.space = false;
			break;
	}
});
