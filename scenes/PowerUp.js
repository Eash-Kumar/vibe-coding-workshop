// scenes/PowerUp.js

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'powerup');
        this.scene = scene;
    }

    spawn(x, y, type) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.type = type;

        // Set the tint based on the power-up type
        if (type === 'speed') {
            this.setTint(0x00ff00); // Green for speed
        } else if (type === 'shield') {
            this.setTint(0x0000ff); // Blue for shield
        } else if (type === 'weapon') {
            this.setTint(0xff0000); // Red for weapon
        }
    }
}
