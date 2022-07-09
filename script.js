var config = {
    scale: {
        width: 800,
        height: 600,
    },
    // pixelArt: true,d
    type: Phaser.AUTO,
    parent: "yourgamediv",
    backgroundColor: "#0072bc",
    physics: {
        default: "arcade",
        arcade: {
            // debug: true,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};
const TURBO_MULTIPLIER = 3;
const HORIZONTAL_SPEED = 20;
const VERTICAL_SPEED = 12;
const GRAVITY = 50;
var FULL_SPEED = 200;
var SIDE_DECAY = 1.1;
var DOWN_DECAY = 1.06;
var JUMP_POWER = 1600;

var cursorsARROWS;
var cursorsWASD;
var player;
var velocity = { x: 0, y: 0 };
var flipFlop = { r: false, l: false, u: false, d: false };
var turboFlipFlop = false;
var turboMultiply = 0;
var game = new Phaser.Game(config);

function preload() {
    this.load.image("block", "kirbsmallboi.png");
    this.load.image("sky", "kirbsmallboi.png");
    this.load.image("logo", "kirbsmallboi.png");
    this.load.image("red", "green_check.png");
}

function create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // cursorsWASD = this.input.keyboard.createCursorKeys();
    cursorsARROWS = this.input.keyboard.createCursorKeys();
    cursorsWASD = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        b: Phaser.Input.Keyboard.KeyCodes.J,
        a: Phaser.Input.Keyboard.KeyCodes.K,
    });

    var particles = this.add.particles("red");
    var emitter = particles.createEmitter({
        // speed: 100,
        speedY: 1,
        scale: { start: 0.5, end: 0 },
        lifespan: 100,
        blendMode: "ADD",
    });
    player = this.physics.add.image(10, 10, "block");
    player.setCollideWorldBounds(true);
    emitter.startFollow(player);
}

function update() {
    player.setVelocityX(velocity.x);
    player.setVelocityY(velocity.y);
    velocity.x = velocity.x / SIDE_DECAY;
    velocity.y = velocity.y / DOWN_DECAY + GRAVITY;

    updateSpeedWASD();
    updateLeftRightFlipFlop();
    udpateJumpFlipFlop();
    updateTurboFlipFlop();

    turboMultiply = turboFlipFlop ? TURBO_MULTIPLIER : 1;
}

const updateTurboFlipFlop = () => {
    if (cursorsARROWS.left.isDown) {
        turboFlipFlop = true;
    } else {
        turboFlipFlop = false;
    }
};
const udpateJumpFlipFlop = () => {
    if (cursorsARROWS.up.isDown) {
        if (flipFlop.u) {
            velocity.y = -JUMP_POWER;
            flipFlop.u = false;
        }
    }
    if (cursorsARROWS.up.isUp) {
        flipFlop.u = true;
    }
};

const updateLeftRightFlipFlop = () => {
    if (cursorsWASD.left.isDown) {
        if (flipFlop.l) {
            velocity.x = -FULL_SPEED;
            flipFlop.l = false;
        }
    } else {
        flipFlop.l = true;
    }
    if (cursorsWASD.right.isDown) {
        if (flipFlop.r) {
            velocity.x = FULL_SPEED;
            flipFlop.r = false;
        }
    } else {
        flipFlop.r = true;
    }
};
const updateSpeedWASD = () => {
    if (cursorsWASD.left.isDown) {
        velocity.x -= HORIZONTAL_SPEED * turboMultiply;
    }
    if (cursorsWASD.right.isDown) {
        velocity.x += HORIZONTAL_SPEED * turboMultiply;
    }
    if (cursorsWASD.up.isDown) {
        velocity.y -= VERTICAL_SPEED * turboMultiply;
    }
    if (cursorsWASD.down.isDown) {
        velocity.y += VERTICAL_SPEED * turboMultiply;
    }
};

const onClickHandler = () => {
    console.log("CLICK");
};
