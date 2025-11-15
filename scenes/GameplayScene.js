// scenes/GameplayScene.js
import Bullet from './Bullet.js';
import Enemy from './Enemy.js';
import PowerUp from './PowerUp.js';
export default class GameplayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameplayScene' });
    }

    create() {
        // Add player car
        this.player = this.physics.add.sprite(400, 300, 'car');
        this.player.setCollideWorldBounds(true);

        // Add controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Create bullet group
        this.bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });

        // Add obstacles
        this.obstacles = this.physics.add.staticGroup();
        this.obstacles.create(100, 100, 'obstacle');
        this.obstacles.create(500, 200, 'obstacle');
        this.obstacles.create(200, 400, 'obstacle');
        this.obstacles.create(600, 500, 'obstacle');

        // Add collision between player and obstacles
        this.physics.add.collider(this.player, this.obstacles, this.playerHitObstacle, null, this);

        // Add collision between bullets and enemies
        this.physics.add.collider(this.bullets, this.enemies, this.bulletHitEnemy, null, this);

        // Add collision between player and enemies
        this.physics.add.collider(this.player, this.enemies, this.playerHitEnemy, null, this);

        // Add collision between player and power-ups
        this.physics.add.collider(this.player, this.powerUps, this.playerCollectPowerUp, null, this);

        // Add health and score
        this.player.health = 100;
        this.score = 0;

        // Add HUD
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRect(0, 0, 800, 100);

        this.healthText = this.add.text(16, 16, 'Health: 100', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        });
        this.scoreText = this.add.text(16, 50, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        });

        // Add enemies
        this.enemies = this.physics.add.group({
            classType: Enemy,
            maxSize: 5,
            runChildUpdate: true
        });

        this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // Add power-ups
        this.powerUps = this.physics.add.group({
            classType: PowerUp,
            maxSize: 3,
            runChildUpdate: true
        });

        this.time.addEvent({
            delay: 5000,
            callback: this.spawnPowerUp,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        // Car movement
        if (this.cursors.up.isDown) {
            const speed = this.player.speedBoost ? 400 : 200;
            this.physics.velocityFromRotation(this.player.rotation, speed, this.player.body.acceleration);
        } else {
            this.player.setAcceleration(0);
        }

        if (this.cursors.left.isDown) {
            this.player.setAngularVelocity(-300);
        } else if (this.cursors.right.isDown) {
            this.player.setAngularVelocity(300);
        } else {
            this.player.setAngularVelocity(0);
        }

        // Shooting
        if (this.player.weaponBoost) {
            if (this.spacebar.isDown) {
                const bullet = this.bullets.get();
                if (bullet) {
                    bullet.fire(this.player.x, this.player.y, this.player.rotation);
                }
            }
        } else {
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                const bullet = this.bullets.get();
                if (bullet) {
                    bullet.fire(this.player.x, this.player.y, this.player.rotation);
                }
            }
        }

        // Game over condition
        if (this.player.health <= 0) {
            this.scene.start('GameOverScene', { score: this.score });
        }
    }

    playerHitObstacle(player, obstacle) {
        if (!this.player.shielded) {
            this.player.health -= 10;
            this.healthText.setText('Health: ' + this.player.health);
        }
    }

    spawnEnemy() {
        const enemy = this.enemies.get();
        if (enemy) {
            const x = Math.random() * 800;
            const y = Math.random() * 600;
            enemy.spawn(x, y);
        }
    }

    bulletHitEnemy(bullet, enemy) {
        bullet.setActive(false);
        bullet.setVisible(false);
        enemy.setActive(false);
        enemy.setVisible(false);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    playerHitEnemy(player, enemy) {
        if (!this.player.shielded) {
            this.player.health -= 20;
            this.healthText.setText('Health: ' + this.player.health);
        }
        enemy.setActive(false);
        enemy.setVisible(false);
    }

    spawnPowerUp() {
        const powerUp = this.powerUps.get();
        if (powerUp) {
            const x = Math.random() * 800;
            const y = Math.random() * 600;
            const types = ['speed', 'shield', 'weapon'];
            const type = types[Math.floor(Math.random() * types.length)];
            powerUp.spawn(x, y, type);
        }
    }

    playerCollectPowerUp(player, powerUp) {
        powerUp.setActive(false);
        powerUp.setVisible(false);

        if (powerUp.type === 'speed') {
            this.player.speedBoost = true;
            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    this.player.speedBoost = false;
                }
            });
        } else if (powerUp.type === 'shield') {
            this.player.shielded = true;
            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    this.player.shielded = false;
                }
            });
        } else if (powerUp.type === 'weapon') {
            this.player.weaponBoost = true;
            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    this.player.weaponBoost = false;
                }
            });
        }
    }
}
