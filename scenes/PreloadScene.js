// scenes/PreloadScene.js

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Load assets here
        this.load.image('car', 'assets/Topdown_vehicle_sprites_pack/Audi.png');
        this.load.image('enemy', 'assets/Topdown_vehicle_sprites_pack/Black_viper.png');
        this.load.image('powerup', 'assets/powerup.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('obstacle', 'assets/obstacle.png');
    }

    create() {
        this.scene.start('MainMenuScene');
    }
}
