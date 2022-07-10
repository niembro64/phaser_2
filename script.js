var config = {
    scale: {
        width: 800,
        height: 500,
    },
    pixelArt: true,
    type: Phaser.AUTO,
    backgroundColor: '#2d2d2d',
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

game: new Phaser.Game(config);

function preload() {
    for (let i = 0; i < numPlayers; i++) {
        this.load.image("character_" + i, "character_" + i + ".png");
        this.load.image("tail_" + i, "tail_" + i + ".png");
    }
}

function create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // cursorsWASD = this.input.keyboard.createCursorKeys();
    for (let i = 0; i < numPlayers; i++) {
        p[i].cursorsWASD = this.input.keyboard.addKeys(p[i].keyboard);
        // p[i].cursorsARROWS = this.input.keyboard.createCursorKeys();

        p[i].particles = this.add.particles("tail_" + i);
        p[i].emitter = p[i].particles.createEmitter({
            speed: p[i].SPEED_OF_TAIL / 0.6,
            scale: { start: 0.06, end: 0 },
            lifespan: p[i].LENGTH_OF_TAIL,
            blendMode: "ADD",
        });
        p[i].player = this.physics.add.image(10, 10, "character_" + i);

        p[i].player.setPosition(100 * i + 250, 50);
        p[i].velocity.x = 1000 * i - 1500;

        p[i].player.setCollideWorldBounds(true);
        p[i].emitter.startFollow(p[i].player);
    }
}

function update() {
    updateVelocity();
    updateSpeedWASD();
    updateLeftRightFlipFlop();
    udpateJumpFlipFlop();
    updateTurbo();
}
const updateVelocity = () => {
    for (let i = 0; i < numPlayers; i++) {
        p[i].player.setVelocityX(p[i].velocity.x);
        p[i].player.setVelocityY(p[i].velocity.y);
        p[i].velocity.x = p[i].velocity.x / p[i].SIDE_DECAY;
        p[i].velocity.y = p[i].velocity.y / p[i].DOWN_DECAY + p[i].GRAVITY;
    }
};

const updateTurbo = () => {
    for (let i = 0; i < numPlayers; i++) {
        if (p[i].cursorsWASD.fast.isDown) {
            p[i].turboFlipFlop = true;
        } else {
            p[i].turboFlipFlop = false;
        }
        p[i].turboMultiply = p[i].turboFlipFlop ? p[i].TURBO_MULTIPLIER : 1;
    }
};
const udpateJumpFlipFlop = () => {
    for (let i = 0; i < numPlayers; i++) {
        if (p[i].cursorsWASD.jump.isDown) {
            if (p[i].flipFlop.u) {
                p[i].velocity.y = -p[i].JUMP_POWER;
                p[i].flipFlop.u = false;
            }
        }
        if (p[i].cursorsWASD.jump.isUp) {
            p[i].flipFlop.u = true;
        }
    }
};

const updateLeftRightFlipFlop = () => {
    for (let i = 0; i < numPlayers; i++) {
        if (p[i].cursorsWASD.left.isDown) {
            if (p[i].flipFlop.l) {
                p[i].velocity.x = -p[i].FULL_SPEED;
                p[i].flipFlop.l = false;
            }
        } else {
            p[i].flipFlop.l = true;
        }
        if (p[i].cursorsWASD.right.isDown) {
            if (p[i].flipFlop.r) {
                p[i].velocity.x = p[i].FULL_SPEED;
                p[i].flipFlop.r = false;
            }
        } else {
            p[i].flipFlop.r = true;
        }
    }
};
const updateSpeedWASD = () => {
    for (let i = 0; i < numPlayers; i++) {
        if (p[i].cursorsWASD.up.isDown) {
            p[i].velocity.y -= p[i].VERTICAL_SPEED * p[i].turboMultiply;
        }
        if (p[i].cursorsWASD.down.isDown) {
            p[i].velocity.y += p[i].VERTICAL_SPEED * p[i].turboMultiply;
        }
        if (p[i].cursorsWASD.left.isDown) {
            p[i].velocity.x -= p[i].HORIZONTAL_SPEED * p[i].turboMultiply;
        }
        if (p[i].cursorsWASD.right.isDown) {
            p[i].velocity.x += p[i].HORIZONTAL_SPEED * p[i].turboMultiply;
        }
    }
};
