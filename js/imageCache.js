let imageCache = {};

// ANCHOR src Arrays
const IMAGES_IDLE = [
	"img/2_character_pepe/1_idle/I-1.png",
	"img/2_character_pepe/1_idle/I-2.png",
	"img/2_character_pepe/1_idle/I-3.png",
];
const IMAGES_WALK = [
	"img/2_character_pepe/2_walk/W-21.png",
	"img/2_character_pepe/2_walk/W-22.png",
	"img/2_character_pepe/2_walk/W-23.png",
	"img/2_character_pepe/2_walk/W-24.png",
	"img/2_character_pepe/2_walk/W-25.png",
	"img/2_character_pepe/2_walk/W-26.png",
];
const IMAGES_JUMP = [
	"img/2_character_pepe/3_jump/J-31.png",
	"img/2_character_pepe/3_jump/J-32.png",
	"img/2_character_pepe/3_jump/J-33.png",
	"img/2_character_pepe/3_jump/J-34.png",
	"img/2_character_pepe/3_jump/J-35.png",
	"img/2_character_pepe/3_jump/J-36.png",
	"img/2_character_pepe/3_jump/J-37.png",
	"img/2_character_pepe/3_jump/J-38.png",
	"img/2_character_pepe/3_jump/J-39.png",
];
const IMAGES_HURT = [
	"img/2_character_pepe/4_hurt/H-41.png",
	"img/2_character_pepe/4_hurt/H-42.png",
	"img/2_character_pepe/4_hurt/H-43.png",
];
const IMAGES_DEAD = [
	"img/2_character_pepe/5_dead/D-51.png",
	"img/2_character_pepe/5_dead/D-52.png",
	"img/2_character_pepe/5_dead/D-53.png",
	"img/2_character_pepe/5_dead/D-54.png",
	"img/2_character_pepe/5_dead/D-55.png",
	"img/2_character_pepe/5_dead/D-56.png",
	"img/2_character_pepe/5_dead/D-57.png",
];
const IMAGES_CHICKEN_NORMAL = [
	"img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
	"img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
	"img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
];
const IMAGES_CHICKEN_SMALL = [
	"img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
	"img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
	"img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
];
const IMAGES_BOSS_WALK = [
	"img/4_enemie_boss_chicken/1_walk/G1.png",
	"img/4_enemie_boss_chicken/1_walk/G2.png",
	"img/4_enemie_boss_chicken/1_walk/G3.png",
	"img/4_enemie_boss_chicken/1_walk/G4.png",
];
const IMAGES_BOSS_HURT = [
	"img/4_enemie_boss_chicken/4_hurt/G21.png",
	"img/4_enemie_boss_chicken/4_hurt/G22.png",
	"img/4_enemie_boss_chicken/4_hurt/G23.png",
];
const IMAGES_BOSS_DEAD = [
	"img/4_enemie_boss_chicken/5_dead/G24.png",
	"img/4_enemie_boss_chicken/5_dead/G25.png",
	"img/4_enemie_boss_chicken/5_dead/G26.png",
];
const IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
const IMAGES_BottleGround = [
	"img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
	"img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
];
const IMAGES_BottleThrown = [
	"img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
	"img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
	"img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
	"img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
];
const IMAGES_BottleSplash = [
	"img/6_salsa_bottle/bottle_splash/1_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/2_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/3_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/4_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/5_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/6_bottle_splash.png",
];

function initImageCache() {
	addToImageCache(IMAGES_DEAD);
	addToImageCache(IMAGES_HURT);
	addToImageCache(IMAGES_IDLE);
	addToImageCache(IMAGES_JUMP);
	addToImageCache(IMAGES_WALK);
	addToImageCache(IMAGES_CHICKEN_NORMAL);
	addToImageCache(IMAGES_CHICKEN_SMALL);
	addToImageCache(IMAGES_BOSS_WALK);
	addToImageCache(IMAGES_BOSS_HURT);
	addToImageCache(IMAGES_BOSS_DEAD);
	addToImageCache(IMAGES_COIN);
	addToImageCache(IMAGES_BottleGround);
	addToImageCache(IMAGES_BottleThrown);
	addToImageCache(IMAGES_BottleSplash);
}

function addToImageCache(imageArray) {
	imageArray.forEach((path) => {
		let img = new Image();
		img.src = path;
		imageCache[path] = img;
	});
	addToImageCacheDone++;
}
