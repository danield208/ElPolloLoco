function init() {
	drawObject = new DrawObject();

	PressButton = false;

	// init arrays
	clouds = [];
	enemies = [];
	bottles = [];
	coinsArray = [];
	timoutArray = [];
	backgroundsLayer_one = [];
	backgroundsLayer_two = [];
	backgroundsLayer_three = [];

	// set default values
	bossHealth = 100;
	bottleAmount = 12;
	timestamp_ThrownBottle = new Date().getTime();

	frameRateTimeStamp = new Date().getTime();

	flip = true;
	initWin = true;
	bossHit = false;
	wonGame = false;
	bossSpawned = false;
	flippingImage = false;
	stopAnimation = false;
	setWinTimestamp = false;

	lastPosition = "right";
	playerJumping = false;
	doesObjectHitEnemy = false;

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

	clouds = [
		new Background({ x: -canvas.width, image: clouds2, type: "cloud" }),
		new Background({ x: 0, image: clouds1, type: "cloud" }),
		new Background({ x: canvas.width, image: clouds2, type: "cloud" }),
		new Background({ x: canvas.width * 2, image: clouds1, type: "cloud" }),
		new Background({ x: canvas.width * 3, image: clouds2, type: "cloud" }),
		new Background({ x: canvas.width * 4, image: clouds1, type: "cloud" }),
		new Background({ x: canvas.width * 5, image: clouds2, type: "cloud" }),
		new Background({ x: canvas.width * 6, image: clouds1, type: "cloud" }),
		new Background({ x: canvas.width * 7, image: clouds2, type: "cloud" }),
	];

	for (let i = 0; i < bottleAmount; i++) {
		bottles.push(new Bottle({}));
	}

	player = new Player();

	let ChickenAmount;
	function randomChickenSpawn() {
		ChickenAmount = Math.floor(Math.random() * 13);
		if (ChickenAmount <= 5) {
			randomChickenSpawn();
			return;
		}
		for (let i = 0; i < ChickenAmount; i++) {
			const chickentype = setType();
			enemies.push(new Enemy(chickentype));
		}
	}
	randomChickenSpawn();

	let CoinsAmount;
	function randomCoinSpawn() {
		CoinsAmount = Math.floor(Math.random() * 13);
		if (CoinsAmount <= 5) {
			randomCoinSpawn();
			return;
		}
		for (let i = 0; i < CoinsAmount; i++) {
			coinsArray.push(new Coin());
		}
	}
	randomCoinSpawn();

	function setType() {
		if (Math.random() < 0.5) return "normal";
		else return "small";
	}

	animate();
}
