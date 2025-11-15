// scenes/MainMenuScene.js

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        this.add.text(400, 250, 'Car Game', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);

        const startButton = this.add.text(400, 350, 'Start', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameplayScene');
        });
    }
}
