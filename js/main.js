import { GameEngine } from './game/engine.js';
import { Brawler } from './game/brawler.js';
import { Bot } from './game/bot.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const engine = new GameEngine(canvas);

    const player = new Brawler(
        Math.random() * engine.mapWidth,
        Math.random() * engine.mapHeight,
        'Player'
    );
    engine.addPlayer(player);

    for (let i = 0; i < 5; i++) {
        const bot = new Bot(
            Math.random() * engine.mapWidth,
            Math.random() * engine.mapHeight,
            `Bot ${i + 1}`
        );
        engine.addBot(bot);
    }

    const keys = new Set();
    
    document.addEventListener('keydown', (e) => {
        keys.add(e.key.toLowerCase());
        if (e.key.toLowerCase() === 'r') {
            player.startReload();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        keys.delete(e.key.toLowerCase());
    });

    let mouseX = 0;
    let mouseY = 0;

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left + engine.camera.x;
        mouseY = e.clientY - rect.top + engine.camera.y;
        
        const dx = mouseX - player.x;
        const dy = mouseY - player.y;
        player.direction = Math.atan2(dy, dx);
    });

    canvas.addEventListener('mousedown', (e) => {
        const projectile = player.attack(mouseX, mouseY);
        if (projectile) {
            engine.projectiles.add(projectile);
        }
    });

    setInterval(() => {
        let dx = 0;
        let dy = 0;

        if (keys.has('w')) dy -= 1;
        if (keys.has('s')) dy += 1;
        if (keys.has('a')) dx -= 1;
        if (keys.has('d')) dx += 1;

        player.move(dx, dy);
    }, 1000 / 60);

    engine.start();
});