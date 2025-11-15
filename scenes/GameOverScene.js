// scenes/GameOverScene.js

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create(data) {
        // Add a semi-transparent background
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRect(200, 150, 400, 300);

        // Display score
        this.add.text(400, 250, 'Game Over', {
            fontSize: '64px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        this.add.text(400, 350, 'Score: ' + data.score, {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        // Add restart button
        const restartButton = this.add.text(400, 450, 'Restart', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        restartButton.setInteractive();
        restartButton.on('pointerdown', () => {
            this.scene.start('GameplayScene');
        });
    }
}
