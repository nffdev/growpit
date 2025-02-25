export class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.players = new Map();
        this.bots = new Map();
        this.projectiles = new Set();
        this.lastTime = 0;
        this.deltaTime = 0;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.mapWidth = 2000;
        this.mapHeight = 2000;
        this.camera = { x: 0, y: 0 };
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addPlayer(player) {
        this.players.set(player.id, player);
    }

    addBot(bot) {
        this.bots.set(bot.id, bot);
    }

    update(currentTime) {
        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.updatePlayers();
        this.updateBots();
        this.updateProjectiles();
        this.checkCollisions();
        
        const mainPlayer = this.players.values().next().value;
        if (mainPlayer) {
            this.camera.x = mainPlayer.x - this.canvas.width / 2;
            this.camera.y = mainPlayer.y - this.canvas.height / 2;
        }

        this.render();
        requestAnimationFrame((time) => this.update(time));
    }

    updatePlayers() {
        for (let player of this.players.values()) {
            player.update(this.deltaTime);
            this.keepInBounds(player);
        }
    }

    updateBots() {
        for (let bot of this.bots.values()) {
            bot.update(this.deltaTime, this.players);
            this.keepInBounds(bot);
        }
    }

    updateProjectiles() {
        for (let projectile of this.projectiles) {
            projectile.update(this.deltaTime);
            if (projectile.shouldBeRemoved) {
                this.projectiles.delete(projectile);
            }
        }
    }

    keepInBounds(entity) {
        entity.x = Math.max(0, Math.min(entity.x, this.mapWidth));
        entity.y = Math.max(0, Math.min(entity.y, this.mapHeight));
    }

    checkCollisions() {
        for (let projectile of this.projectiles) {
            for (let player of this.players.values()) {
                if (this.checkCollision(projectile, player)) {
                    player.takeDamage(projectile.damage);
                    this.projectiles.delete(projectile);
                }
            }
            for (let bot of this.bots.values()) {
                if (this.checkCollision(projectile, bot)) {
                    bot.takeDamage(projectile.damage);
                    this.projectiles.delete(projectile);
                }
            }
        }
    }

    checkCollision(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (a.radius + b.radius);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.save();
        this.ctx.translate(-this.camera.x, -this.camera.y);

        this.drawGrid();

        for (let player of this.players.values()) {
            player.draw(this.ctx);
        }
        for (let bot of this.bots.values()) {
            bot.draw(this.ctx);
        }
        for (let projectile of this.projectiles) {
            projectile.draw(this.ctx);
        }

        this.ctx.restore();
    }

    drawGrid() {
        const gridSize = 50;
        const startX = Math.floor(this.camera.x / gridSize) * gridSize;
        const startY = Math.floor(this.camera.y / gridSize) * gridSize;
        const endX = startX + this.canvas.width + gridSize;
        const endY = startY + this.canvas.height + gridSize;

        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;

        for (let x = startX; x < endX; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, startY);
            this.ctx.lineTo(x, endY);
            this.ctx.stroke();
        }

        for (let y = startY; y < endY; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(startX, y);
            this.ctx.lineTo(endX, y);
            this.ctx.stroke();
        }
    }

    start() {
        requestAnimationFrame((time) => this.update(time));
    }
}
