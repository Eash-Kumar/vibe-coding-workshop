// main.js

// Import scenes
import PreloadScene from './scenes/PreloadScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import GameplayScene from './scenes/GameplayScene.js';
import GameOverScene from './scenes/GameOverScene.js';

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#008000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        PreloadScene,
        MainMenuScene,
        GameplayScene,
        GameOverScene
    ]
};

// Create a new Phaser game instance
const game = new Phaser.Game(config);
