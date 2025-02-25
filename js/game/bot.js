import { Brawler } from './brawler.js';

export class Bot extends Brawler {
    constructor(x, y, name) {
        super(x, y, name);
        this.state = 'idle';
        this.targetPlayer = null;
        this.visionRange = 300;
        this.attackRange = 200;
        this.fleeHealthThreshold = 0.3;
        this.updateTimer = 0;
        this.updateInterval = 0.1; 
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.wanderRadius = 100;
        this.wanderDistance = 50;
    }

    update(deltaTime, players) {
        super.update(deltaTime);

        this.updateTimer += deltaTime;
        if (this.updateTimer >= this.updateInterval) {
            this.updateTimer = 0;
            this.updateBehavior(players);
        }
    }

    updateBehavior(players) {
        let closestPlayer = null;
        let closestDistance = Infinity;

        for (let player of players.values()) {
            const distance = this.getDistanceTo(player);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestPlayer = player;
            }
        }

        this.targetPlayer = closestPlayer;

        if (!this.targetPlayer) {
            this.state = 'wander';
        } else if (this.health / this.maxHealth < this.fleeHealthThreshold) {
            this.state = 'flee';
        } else if (closestDistance <= this.attackRange) {
            this.state = 'attack';
        } else if (closestDistance <= this.visionRange) {
            this.state = 'chase';
        } else {
            this.state = 'wander';
        }

        switch (this.state) {
            case 'wander':
                this.wander();
                break;
            case 'chase':
                this.chase();
                break;
            case 'attack':
                this.attackTarget();
                break;
            case 'flee':
                this.flee();
                break;
        }
    }

    wander() {
        this.wanderAngle += (Math.random() - 0.5) * 0.5;
        const targetX = this.x + Math.cos(this.wanderAngle) * this.wanderRadius;
        const targetY = this.y + Math.sin(this.wanderAngle) * this.wanderRadius;

        const dx = targetX - this.x;
        const dy = targetY - this.y;
        this.move(dx, dy);
    }

    chase() {
        if (!this.targetPlayer) return;

        const dx = this.targetPlayer.x - this.x;
        const dy = this.targetPlayer.y - this.y;
        this.move(dx, dy);
    }

    attackTarget() {
        if (!this.targetPlayer) return;

        const dx = this.targetPlayer.x - this.x;
        const dy = this.targetPlayer.y - this.y;
        this.direction = Math.atan2(dy, dx);

        return this.attack(this.targetPlayer.x, this.targetPlayer.y);
    }

    flee() {
        if (!this.targetPlayer) return;

        const dx = this.x - this.targetPlayer.x;
        const dy = this.y - this.targetPlayer.y;
        this.move(dx, dy);
    }

    getDistanceTo(entity) {
        const dx = entity.x - this.x;
        const dy = entity.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
