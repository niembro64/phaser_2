var config = {
    scale: {
        width: 800,
        height: 500,
    },
    // pixelArt: true,
    type: Phaser.AUTO,
    parent: "yourgamediv",
    backgroundColor: "#0072bc",
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var p1 = {
    player: null,
    TURBO_MULTIPLIER: 3,
    HORIZONTAL_SPEED: 40,
    VERTICAL_SPEED: 12,
    GRAVITY: 50,
    FULL_SPEED: 200,
    SIDE_DECAY: 1.2,
    DOWN_DECAY: 1.06,
    JUMP_POWER: 1600,
    LENGTH_OF_TAIL: 1000,
    SPEED_OF_TAIL: 30,

    cursorsARROWS: null,
    cursorsWASD: null,
    velocity: { x: 0, y: 0 },
    flipFlop: { r: false, l: false, u: false, d: false },
    turboFlipFlop: false,
    turboMultiply: 0,
    particles: null,
    emitter: null,
};
game: new Phaser.Game(config);

function preload() {
    this.load.image("block", "kirbsmallboi.png");
    this.load.image("sky", "kirbsmallboi.png");
    this.load.image("logo", "kirbsmallboi.png");
    this.load.image("red", "red_dot.png");
}

function create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // cursorsWASD = this.input.keyboard.createCursorKeys();
    p1.cursorsARROWS = this.input.keyboard.createCursorKeys();
    p1.cursorsWASD = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        b: Phaser.Input.Keyboard.KeyCodes.J,
        a: Phaser.Input.Keyboard.KeyCodes.K,
    });

    p1.particles = this.add.particles("red");
    p1.emitter = p1.particles.createEmitter({
        speed: p1.SPEED_OF_TAIL,
        scale: { start: 0.05, end: 0 },
        lifespan: p1.LENGTH_OF_TAIL,
        blendMode: "ADD",
    });
    p1.player = this.physics.add.image(10, 10, "block");
    p1.player.setCollideWorldBounds(true);
    p1.emitter.startFollow(p1.player);
}

function update() {
    updateVelocity();
    updateSpeedWASD();
    updateLeftRightFlipFlop();
    udpateJumpFlipFlop();
    updateTurbo();
}
const updateVelocity = () => {
    p1.player.setVelocityX(p1.velocity.x);
    p1.player.setVelocityY(p1.velocity.y);
    p1.velocity.x = p1.velocity.x / p1.SIDE_DECAY;
    p1.velocity.y = p1.velocity.y / p1.DOWN_DECAY + p1.GRAVITY;
};

const updateTurbo = () => {
    if (p1.cursorsWASD.b.isDown) {
        p1.turboFlipFlop = true;
    } else {
        p1.turboFlipFlop = false;
    }
    p1.turboMultiply = p1.turboFlipFlop ? p1.TURBO_MULTIPLIER : 1;
};
const udpateJumpFlipFlop = () => {
    if (p1.cursorsWASD.a.isDown) {
        if (p1.flipFlop.u) {
            p1.velocity.y = -p1.JUMP_POWER;
            p1.flipFlop.u = false;
        }
    }
    if (p1.cursorsWASD.a.isUp) {
        p1.flipFlop.u = true;
    }
};

const updateLeftRightFlipFlop = () => {
    if (p1.cursorsWASD.left.isDown) {
        if (p1.flipFlop.l) {
            p1.velocity.x = -p1.FULL_SPEED;
            p1.flipFlop.l = false;
        }
    } else {
        p1.flipFlop.l = true;
    }
    if (p1.cursorsWASD.right.isDown) {
        if (p1.flipFlop.r) {
            p1.velocity.x = p1.FULL_SPEED;
            p1.flipFlop.r = false;
        }
    } else {
        p1.flipFlop.r = true;
    }
};
const updateSpeedWASD = () => {
    if (p1.cursorsWASD.left.isDown) {
        p1.velocity.x -= p1.HORIZONTAL_SPEED * p1.turboMultiply;
    }
    if (p1.cursorsWASD.right.isDown) {
        p1.velocity.x += p1.HORIZONTAL_SPEED * p1.turboMultiply;
    }
    if (p1.cursorsWASD.up.isDown) {
        p1.velocity.y -= p1.VERTICAL_SPEED * p1.turboMultiply;
    }
    if (p1.cursorsWASD.down.isDown) {
        p1.velocity.y += p1.VERTICAL_SPEED * p1.turboMultiply;
    }
};

const onClickHandler = () => {
    console.log("CLICK");
};
