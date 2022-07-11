var config = {
    scale: {
        width: 800,
        height: 400,
    },
    pixelArt: true,
    type: Phaser.AUTO,
    parent: "yourgamediv",
    backgroundColor: "#0072bc",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

game: new Phaser.Game(config);

function preload() {
    for (let i = 0; i < numPlayers; i++) {
        this.load.image("character_" + i, "character_" + i + ".png");
        this.load.image("tail_" + i, "tail_" + i + ".png");
    }
}

function create() {
    players.forEach((p, i) => {
        p.cursorsWASD = this.input.keyboard.addKeys(p.keyboard);
        // p.cursorsARROWS = this.input.keyboard.createCursorKeys();

        p.particles = this.add.particles("tail_" + i);
        p.emitter = p.particles.createEmitter({
            speed: p.SPEED_OF_TAIL / 0.6,
            scale: { start: 0.06, end: 0 },
            lifespan: p.LENGTH_OF_TAIL,
            blendMode: "ADD",
        });
        p.player = this.physics.add.image(10, 10, "character_" + i);

        p.player.setPosition(100 * i + 250, 50);
        p.velocity.x = 1000 * i - 1500;

        p.player.setCollideWorldBounds(true);
        p.emitter.startFollow(p.player);
    });
}

function update() {
    updateVelocity();
    updateSpeedWASD();
    updateLeftRightFlipFlop();
    udpateJumpFlipFlop();
    updateTurbo();
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

const updateVelocity = () => {
    players.forEach((p, i) => {
        p.player.setVelocityX(p.velocity.x);
        p.player.setVelocityY(p.velocity.y);
        p.velocity.x = p.velocity.x / p.SIDE_DECAY;
        p.velocity.y = p.velocity.y / p.DOWN_DECAY + p.GRAVITY;
    });
};

const updateTurbo = () => {
    players.forEach((p, i) => {
        if (p.cursorsWASD.fast.isDown) {
            p.turboFlipFlop = true;
        } else {
            p.turboFlipFlop = false;
        }
        p.turboMultiply = p.turboFlipFlop ? p.TURBO_MULTIPLIER : 1;
    });
};
const udpateJumpFlipFlop = () => {
    players.forEach((p, i) => {
        if (p.cursorsWASD.jump.isDown) {
            if (p.flipFlop.u) {
                p.velocity.y = -p.JUMP_POWER;
                p.flipFlop.u = false;
            }
        }
        if (p.cursorsWASD.jump.isUp) {
            p.flipFlop.u = true;
        }
    });
};

const updateLeftRightFlipFlop = () => {
    players.forEach((p, i) => {
        if (p.cursorsWASD.left.isDown) {
            if (p.flipFlop.l) {
                p.velocity.x = -p.FULL_SPEED;
                p.flipFlop.l = false;
            }
        } else {
            p.flipFlop.l = true;
        }
        if (p.cursorsWASD.right.isDown) {
            if (p.flipFlop.r) {
                p.velocity.x = p.FULL_SPEED;
                p.flipFlop.r = false;
            }
        } else {
            p.flipFlop.r = true;
        }
    });
};
const updateSpeedWASD = () => {
    players.forEach((p, i) => {
        if (p.cursorsWASD.up.isDown) {
            p.velocity.y -= p.VERTICAL_SPEED * p.turboMultiply;
        }
        if (p.cursorsWASD.down.isDown) {
            p.velocity.y += p.VERTICAL_SPEED * p.turboMultiply;
        }
        if (p.cursorsWASD.left.isDown) {
            p.velocity.x -= p.HORIZONTAL_SPEED * p.turboMultiply;
        }
        if (p.cursorsWASD.right.isDown) {
            p.velocity.x += p.HORIZONTAL_SPEED * p.turboMultiply;
        }
    });
};
