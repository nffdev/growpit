import Canvas from "./Canvas.js"

export default class Character {
    constructor(name, type, x, y, direction) {
        this.canvas = new Canvas()
        this.canvas.element.style.zIndex = 2
        this.canvas.setStep(game.map.size)
        this.name = name
        this.type = type
        this.position = {x:x, y:y}
        this.direction = direction

        switch(this.type) {
            case "Player":
                this.life = 50
                this.speed = 20
                this.file = "Slime_vert"
                break
            case "Npc":
                this.life = 100
                this.speed = 30
                this.file = "Slime_vert"
        }

        this.tile = {
            namespace: "CHAR",
            key: direction + 0,
            direction: direction,
            value: 0
        }

    }

    display() {
        this.canvas.draw(this.file, this.tile, {x: this.position.x, y: this.position.y})
    }

    animate() {
        setInterval(() => {
            this.canvas.clear()
            this.nextTile()
            this.canvas.draw(this.file, this.tile, {x: this.position.x, y: this.position.y})
        }, 300)
    }

    nextTile() {
        if(this.tile.value >= 1) {
            this.tile.value = 0
        } else {
            this.tile.value += 1
        }
        this.tile.key = this.direction + this.tile.value
    }

    async moveTo(path) {
        if(!this.moving) {
            this.stop = false
            this.moving = true
            for(let square of path) {
                if(square.position.x == this.position.x && square.position.y == this.position.y) {
                    continue
                }
                this.tile.direction = this.getDirection(square.position)
                let frame = 0
                let next = true
                while(next) {
                    frame = frame + (1 / square.weight)
                    if(frame >= 24) {
                        frame = 23
                        next = false
                    }
                    this.canvas.clear()
                    this.tile.value = Math.floor(frame / 12)
                    this.tile.key = this.tile.direction + this.tile.value
                    this.canvas.drawPixel(this.file, this.tile, this.getMovementPixel({number: frame, total: 24}))
                    await new Promise(resolve => setTimeout(resolve, this.speed))
                }
                this.position = square.position
                if(this.stop) {
                    break
                }
            }
            this.canvas.clear()
            this.tile.value = 0
            this.tile.key = this.tile.direction + this.tile.value
            this.canvas.draw(this.file, this.tile, this.position)
            this.moving = false
        }
        return true
    }

    getDirection(position) {
        switch(true) {
            case position.x > this.position.x:
                return "DROITE"
            case position.x < this.position.x:
                return "GAUCHE"
            case position.y > this.position.y:
                return "BAS"
            case position.y < this.position.y:
                return "HAUT"
        }
    }

    getMovementPixel(frame) {
        switch(this.tile.direction) {
            case "DROITE":
                return {x: (this.position.x * this.canvas.stepX) + (this.canvas.stepX * frame.number / frame.total), y: this.position.y * this.canvas.stepY}
            case "GAUCHE":
                return {x: (this.position.x * this.canvas.stepX) - (this.canvas.stepX * frame.number / frame.total), y: this.position.y * this.canvas.stepY}
            case "BAS":
                return {x: this.position.x * this.canvas.stepX, y: (this.position.y * this.canvas.stepY) + (this.canvas.stepY * frame.number / frame.total)}
            case "HAUT":
                return {x: this.position.x * this.canvas.stepX, y: (this.position.y * this.canvas.stepY) - (this.canvas.stepY * frame.number / frame.total)}
        }
    }
}