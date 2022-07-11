var config = {
    scale: {
        width: 800,
        height: 400,
    },
    pixelArt: false,
    type: Phaser.AUTO,
    parent: 'yourgamediv',
    backgroundColor: '#0072bc',
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var numPlayers = 4;
var players = [
    {
        player_internal: null,
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
        cursorsWASD: null,
        velocity: { x: 0, y: 0 },
        flipFlop: { r: false, l: false, u: false, d: false },
        turboFlipFlop: false,
        turboMultiply: 0,
        particles: null,
        emitter: null,
        keyboard: {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            fast: Phaser.Input.Keyboard.KeyCodes.Z,
            jump: Phaser.Input.Keyboard.KeyCodes.X,
        },
    },
    {
        player_internal: null,
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
        cursorsWASD: null,
        velocity: { x: 0, y: 0 },
        flipFlop: { r: false, l: false, u: false, d: false },
        turboFlipFlop: false,
        turboMultiply: 0,
        particles: null,
        emitter: null,
        keyboard: {
            up: Phaser.Input.Keyboard.KeyCodes.T,
            down: Phaser.Input.Keyboard.KeyCodes.G,
            left: Phaser.Input.Keyboard.KeyCodes.F,
            right: Phaser.Input.Keyboard.KeyCodes.H,
            fast: Phaser.Input.Keyboard.KeyCodes.V,
            jump: Phaser.Input.Keyboard.KeyCodes.B,
        },
    },
    {
        player_internal: null,
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
        cursorsWASD: null,
        velocity: { x: 0, y: 0 },
        flipFlop: { r: false, l: false, u: false, d: false },
        turboFlipFlop: false,
        turboMultiply: 0,
        particles: null,
        emitter: null,
        keyboard: {
            up: Phaser.Input.Keyboard.KeyCodes.I,
            down: Phaser.Input.Keyboard.KeyCodes.K,
            left: Phaser.Input.Keyboard.KeyCodes.J,
            right: Phaser.Input.Keyboard.KeyCodes.L,
            fast: Phaser.Input.Keyboard.KeyCodes.O,
            jump: Phaser.Input.Keyboard.KeyCodes.P,
        },
    },
    {
        player_internal: null,
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
        cursorsWASD: null,
        velocity: { x: 0, y: 0 },
        flipFlop: { r: false, l: false, u: false, d: false },
        turboFlipFlop: false,
        turboMultiply: 0,
        particles: null,
        emitter: null,
        keyboard: {
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            fast: Phaser.Input.Keyboard.KeyCodes.END,
            jump: Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN,
        },
    },
];

game: new Phaser.Game(config);
var platforms;

// export interface player {
//     player_internal: any;
//     TURBO_MULTIPLIER: number;
//     HORIZONTAL_SPEED: number;
//     VERTICAL_SPEED: number;
//     GRAVITY: number;
//     FULL_SPEED: number;
//     SIDE_DECAY: number;
//     DOWN_DECAY: number;
//     JUMP_POWER: number;
//     LENGTH_OF_TAIL: number;
//     SPEED_OF_TAIL: number;
//     cursorsWASD: any;
//     velocity: { x: number; y: number };
//     flipFlop: { r: boolean; l: boolean; u: boolean; d: boolean };
//     turboFlipFlop: boolean;
//     turboMultiply: number;
//     particles: any;
//     emitter: any;
//     keyboard: {
//         up: any;
//         down: any;
//         left: any;
//         right: any;
//         fast: any;
//         jump: any;
//     };
// }

function preload() {
    players.forEach((p, i) => {
        this.load.image('character_' + i, 'character_' + i + '.png');
        this.load.image('tail_' + i, 'tail_' + i + '.png');
        this.load.image('platform', 'platform.png');
    });
}

function create() {
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 300, 'platform').setScale(0.5).refreshBody();
    platforms.create(500, 200, 'platform').setScale(0.25, 0.5).refreshBody();
    players.forEach((p, i) => {
        p.cursorsWASD = this.input.keyboard.addKeys(p.keyboard);
        // p.cursorsARROWS = this.input.keyboard.createCursorKeys();

        p.particles = this.add.particles('tail_' + i);
        p.emitter = p.particles.createEmitter({
            speed: p.SPEED_OF_TAIL / 0.6,
            scale: { start: 0.06, end: 0 },
            lifespan: p.LENGTH_OF_TAIL,
            blendMode: 'ADD',
        });
        p.player_internal = this.physics.add.sprite(10, 10, 'character_' + i);

        p.player_internal.setPosition(100 * i + 250, 50);
        p.velocity.x = 1000 * i - 1500;

        p.player_internal.setCollideWorldBounds(true);
        p.emitter.startFollow(p.player_internal);
        this.physics.add.collider(p.player_internal, platforms);
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
        p.player_internal.setVelocityX(p.velocity.x);
        p.player_internal.setVelocityY(p.velocity.y);
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

const onClickHandler = () => {
    console.log('CLICK');
};

const c = document.getElementById('controls');

let htmlString = '';

players.forEach((p, i) => {
    if (i === 3) {
        htmlString += `
        <ul class="created">
            <li>P${i + 1}<li>
            <li>&nbsp;&nbsp;&nbsp;UP: UP</li>
            <li>&nbsp;DOWN: DOWN</li>
            <li>&nbsp;LEFT: LEFT</li>
            <li>RIGHT: RIGHT</li>
            <li>&nbsp;FAST: END</li>
            <li>&nbsp;JUMP: PAGEDOWN</li>
        </ul>`;
    } else {
        htmlString += `
    <ul class="created">
    <li>P${i + 1}<li>
    <li>&nbsp;&nbsp;&nbsp;UP: ${String.fromCharCode(p.keyboard.up)}</li>
    <li>&nbsp;DOWN: ${String.fromCharCode(p.keyboard.down)}</li>
    <li>&nbsp;LEFT: ${String.fromCharCode(p.keyboard.left)}</li>
    <li>RIGHT: ${String.fromCharCode(p.keyboard.right)}</li>
        <li>&nbsp;FAST: ${String.fromCharCode(p.keyboard.fast)}</li>
        <li>&nbsp;JUMP: ${String.fromCharCode(p.keyboard.jump)}</li>
    </ul>
    `;
    }
});

c.innerHTML = htmlString;
