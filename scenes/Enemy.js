// scenes/Enemy.js

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        this.scene = scene;
    }

    spawn(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setCollideWorldBounds(true);
    }

    update(time, delta) {
        // Simple AI: move forward and turn randomly
        this.scene.physics.velocityFromRotation(this.rotation, 100, this.body.velocity);
        if (Math.random() < 0.01) {
            this.setAngularVelocity((Math.random() - 0.5) * 200);
        }
    }
}
