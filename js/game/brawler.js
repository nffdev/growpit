export class Brawler {
    constructor(x, y, name) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.x = x;
        this.y = y;
        this.name = name;
        this.radius = 20;
        this.speed = 200;
        this.maxHealth = 3000;
        this.health = this.maxHealth;
        this.damage = 400;
        this.attackSpeed = 0.8; 
        this.lastAttackTime = 0;
        this.superCharge = 0;
        this.maxSuperCharge = 100;
        
        this.maxAmmo = 3;
        this.ammo = this.maxAmmo;
        this.reloadTime = 1.5;
        this.reloadTimer = 0;
        this.isReloading = false;

        this.velocity = { x: 0, y: 0 };
        this.direction = 0; 
    }

    update(deltaTime) {
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;

        if (this.isReloading) {
            this.reloadTimer += deltaTime;
            if (this.reloadTimer >= this.reloadTime) {
                this.ammo = this.maxAmmo;
                this.isReloading = false;
                this.reloadTimer = 0;
            }
        }
    }

    move(dx, dy) {
        const length = Math.sqrt(dx * dx + dy * dy);
        if (length > 0) {
            this.velocity.x = (dx / length) * this.speed;
            this.velocity.y = (dy / length) * this.speed;
            this.direction = Math.atan2(dy, dx);
        } else {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

    attack(targetX, targetY) {
        const currentTime = performance.now();
        if (currentTime - this.lastAttackTime < 1000 / this.attackSpeed) return null;
        if (this.ammo <= 0) {
            this.startReload();
            return null;
        }

        this.lastAttackTime = currentTime;
        this.ammo--;

        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const angle = Math.atan2(dy, dx);

        return new Projectile(
            this.x,
            this.y,
            angle,
            this.damage,
            this.id
        );
    }

    startReload() {
        if (!this.isReloading && this.ammo < this.maxAmmo) {
            this.isReloading = true;
            this.reloadTimer = 0;
        }
    }

    useSuper() {
        if (this.superCharge >= this.maxSuperCharge) {
            this.superCharge = 0;
            return this.superAbility();
        }
        return null;
    }

    superAbility() {
        // TODO : implement
        return null;
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health <= 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.health > 0 ? '#4CAF50' : '#ff0000';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x + Math.cos(this.direction) * this.radius,
            this.y + Math.sin(this.direction) * this.radius
        );
        ctx.strokeStyle = '#000';
        ctx.stroke();

        const healthBarWidth = 40;
        const healthBarHeight = 4;
        const healthPercentage = this.health / this.maxHealth;
        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(
            this.x - healthBarWidth/2,
            this.y - this.radius - 10,
            healthBarWidth,
            healthBarHeight
        );
        
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(
            this.x - healthBarWidth/2,
            this.y - this.radius - 10,
            healthBarWidth * healthPercentage,
            healthBarHeight
        );

        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y - this.radius - 15);
    }
}

export class Projectile {
    constructor(x, y, angle, damage, ownerId) {
        this.x = x;
        this.y = y;
        this.speed = 400;
        this.radius = 5;
        this.damage = damage;
        this.ownerId = ownerId;
        this.velocity = {
            x: Math.cos(angle) * this.speed,
            y: Math.sin(angle) * this.speed
        };
        this.lifetime = 2; 
        this.currentLife = 0;
        this.shouldBeRemoved = false;
    }

    update(deltaTime) {
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
        
        this.currentLife += deltaTime;
        if (this.currentLife >= this.lifetime) {
            this.shouldBeRemoved = true;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffff00';
        ctx.fill();
    }
}
