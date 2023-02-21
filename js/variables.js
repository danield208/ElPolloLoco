// ANCHOR for starting Game
let PressButton = false;

// ANCHOR Parents
let drawObject;

// ANCHOR set Framerate
let frameRateTimeStamp;
let frameRate = 1000 / 70;

// ANCHOR walkingsound
const walkingsound = new Audio("audio/char_walking.mp3");
walkingsound.volume = 0.1;

// ANCHOR Variables init()
// Arrays
let clouds;
let enemies;
let bottles;
let coinsArray;
let timoutArray;
let backgroundsLayer_one;
let backgroundsLayer_two;
let backgroundsLayer_three;

// strings
let lastPosition;

// number with new Date()
let timestamp_ThrownBottle;

let bossStats;
let bossHealth;

let player;
let airBackground;

// numbers
let enemyDamage;
const gravity = 1.2;
const mapOffset = 50;
let bottleAmount = 12;
const timeDelay = 400;
let bossDeadAnimationTimestamp;

// booleans
const keys = {
	left: false,
	right: false,
	space: false,
	throw: false,
};
let flip;
let bossHit;
let wonGame;
let initWin;
let bossSpawned;
let flippingImage;
let playerJumping;
let stopAnimation;
let setWinTimestamp;
let doesObjectHitEnemy;
let globalCurrentImage;

// ANCHOR Image loading
let addToImageCacheDone = 0;
let imageCacheLoaded = false;
let newImageContentLoaded = 0;
let ImageSrcContentLoaded = false;
let checkImages;
let drawTouchButtons = false;

// ANCHOR Button Values
let TryAgainButtonWidth;
let TryAgainButtonHeight;
let TryAgainButtonPositionX;
let TryAgainButtonPositionY;

let StartButtonWidth;
let StartButtonHeight;
let StartButtonPositionX;
let StartButtonPositionY;

let ButtonWidth;
let ButtonHeight;

let ArrowButtonRightPositionX;
let ArrowButtonRightPositionY;

let ArrowButtonLeftPositionX;
let ArrowButtonLeftPositionY;

let ArrowButtonUPPositionX;
let ArrowButtonUPPositionY;

let BottleButtonPositionX;
let BottleButtonPositionY;

// ANCHOR html element
let muteButton;
let muted = true;

let checkWindowInterval;

// ANCHOR eventListener.js
let clickX;
let clickY;
