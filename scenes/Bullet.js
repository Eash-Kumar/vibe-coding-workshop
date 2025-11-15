// scenes/Bullet.js

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    fire(x, y, rotation) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.scene.physics.velocityFromRotation(rotation, 400, this.body.velocity);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y <= 0 || this.y >= 600 || this.x <= 0 || this.x >= 800) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
