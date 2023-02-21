// ANCHOR images
// background
let air;
let bgLayer1_1;
let bgLayer1_2;
let bgLayer2_1;
let bgLayer2_2;
let bgLayer3_1;
let bgLayer3_2;
let clouds1;
let clouds2;

// ANCHOR Starscreen, Game over, Win
let GameOver;
let Startscreen;
let YouWin;

// ANCHOR Buttons
let StartButton;
let TryAgain;
let bottleButton;
let arrowButton;
let arrowButtonUP;

// ANCHOR Healthbar
let char_health_0;
let char_health_20;
let char_health_40;
let char_health_60;
let char_health_80;
let char_health_100;

// ANCHOR Icons
let CoinIcon;
let BottleIcon;

let IMAGE_CHICKEN_NORMAL_DEAD;
let IMAGES_CHICKEN_SMALL_DEAD;
let BasicBottle;

function setNewImage() {
	ImageSrcContentLoaded = true;
	NewImage_Background();
	NewImage_Screens();
	NewImage_Message();
	NewImage_Buttons();
	NewImage_Icons();
	NewImage_Healthbar();
	NewImage_EnemyDead();

	setImageAttributes();
	setImageSRC();
}

function NewImage_Background() {
	air = new Image();
	air.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer1_1 = new Image();
	bgLayer1_1.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer1_2 = new Image();
	bgLayer1_2.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer2_1 = new Image();
	bgLayer2_1.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer2_2 = new Image();
	bgLayer2_2.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer3_1 = new Image();
	bgLayer3_1.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer3_2 = new Image();
	bgLayer3_2.onload = () => {
		newImageContentLoaded++;
	};
	clouds1 = new Image();
	clouds1.onload = () => {
		newImageContentLoaded++;
	};
	clouds2 = new Image();
	clouds2.onload = () => {
		newImageContentLoaded++;
	};
}

function NewImage_Screens() {
	GameOver = new Image();
	GameOver.onload = () => {
		newImageContentLoaded++;
	};
	Startscreen = new Image();
	Startscreen.onload = () => {
		newImageContentLoaded++;
	};
}

function NewImage_Message() {
	YouWin = new Image();
	YouWin.onload = () => {
		newImageContentLoaded++;
	};
}

function NewImage_Buttons() {
	StartButton = new Image();
	StartButton.onload = () => {
		newImageContentLoaded++;
	};
	TryAgain = new Image();
	TryAgain.onload = () => {
		newImageContentLoaded++;
	};
	bottleButton = new Image();
	bottleButton.onload = () => {
		newImageContentLoaded++;
	};
	arrowButton = new Image();
	arrowButton.onload = () => {
		newImageContentLoaded++;
	};
	arrowButtonUP = new Image();
	arrowButtonUP.onload = () => {
		newImageContentLoaded++;
	};
}
function NewImage_Icons() {
	CoinIcon = new Image();
	CoinIcon.onload = () => {
		newImageContentLoaded++;
	};
	BottleIcon = new Image();
	BottleIcon.onload = () => {
		newImageContentLoaded++;
	};
	BasicBottle = new Image();
	BasicBottle.onload = () => {
		newImageContentLoaded++;
	};
}

function NewImage_Healthbar() {
	char_health_0 = new Image();
	char_health_0.onload = () => {
		newImageContentLoaded++;
	};
	char_health_20 = new Image();
	char_health_20.onload = () => {
		newImageContentLoaded++;
	};
	char_health_40 = new Image();
	char_health_40.onload = () => {
		newImageContentLoaded++;
	};
	char_health_60 = new Image();
	char_health_60.onload = () => {
		newImageContentLoaded++;
	};
	char_health_80 = new Image();
	char_health_80.onload = () => {
		newImageContentLoaded++;
	};
	char_health_100 = new Image();
	char_health_100.onload = () => {
		newImageContentLoaded++;
	};
}

function NewImage_EnemyDead() {
	IMAGE_CHICKEN_NORMAL_DEAD = new Image();
	IMAGE_CHICKEN_NORMAL_DEAD.onload = () => {
		newImageContentLoaded++;
	};
	IMAGES_CHICKEN_SMALL_DEAD = new Image();
	IMAGES_CHICKEN_SMALL_DEAD.onload = () => {
		newImageContentLoaded++;
	};
}

function setImageSRC() {
	air.src = "img/5_background/layers/air.png";
	bgLayer1_1.src = "img/5_background/layers/1_first_layer/1.png";
	bgLayer1_2.src = "img/5_background/layers/1_first_layer/2.png";
	bgLayer2_1.src = "img/5_background/layers/2_second_layer/1.png";
	bgLayer2_2.src = "img/5_background/layers/2_second_layer/2.png";
	bgLayer3_1.src = "img/5_background/layers/3_third_layer/1.png";
	bgLayer3_2.src = "img/5_background/layers/3_third_layer/2.png";
	clouds1.src = "img/5_background/layers/4_clouds/1.png";
	clouds2.src = "img/5_background/layers/4_clouds/2.png";
	GameOver.src = "img/9_intro_outro_screens/GameOver.png";
	Startscreen.src = "img/9_intro_outro_screens/Startscreen.png";
	YouWin.src = "img/9_intro_outro_screens/YouWin.png";
	TryAgain.src = "img/buttons/TryAgain.png";
	StartButton.src = "img/buttons/Start.png";
	bottleButton.src = "img/Keys/bottle.png";
	arrowButton.src = "img/Keys/button_right.png";
	arrowButtonUP.src = "img/Keys/button_up.png";
	CoinIcon.src = "img/7_statusbars/3_icons/icon_coin.png";
	BottleIcon.src = "img/7_statusbars/3_icons/icon_salsa_bottle.png";
	BasicBottle.src = "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png";
	char_health_0.src = "img/7_statusbars/1_statusbar/Statusbar Health/0.png";
	char_health_20.src = "img/7_statusbars/1_statusbar/Statusbar Health/20.png";
	char_health_40.src = "img/7_statusbars/1_statusbar/Statusbar Health/40.png";
	char_health_60.src = "img/7_statusbars/1_statusbar/Statusbar Health/60.png";
	char_health_80.src = "img/7_statusbars/1_statusbar/Statusbar Health/80.png";
	char_health_100.src = "img/7_statusbars/1_statusbar/Statusbar Health/100.png";
	IMAGE_CHICKEN_NORMAL_DEAD.src = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
	IMAGES_CHICKEN_SMALL_DEAD.src = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
}

function setImageAttributes() {
	StartButton.style.cursor = "pointer";
	StartButton.style.opacity = "pointer";
}
