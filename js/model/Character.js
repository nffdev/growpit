import Canvas from "./Canvas.js"

/**
 * Class Character: Represents a character in the game
 * @param {string} name Name of the character
 * @param {string} type Type of the character
 * @param {int} x Character's horizontal position
 * @param {int} y Character's vertical position
 * @param {string} direction Character's orientation
 */
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

    /**
     * Method display: Show the character in the map
     */
    display() {
        this.canvas.draw(this.file, this.tile, {x: this.position.x, y: this.position.y})
    }

    /**
     * Method animate: Display an animation for the character
     */
    animate() {
        setInterval(() => {
            this.canvas.clear()
            this.nextTile()
            this.canvas.draw(this.file, this.tile, {x: this.position.x, y: this.position.y})
        }, 300)
    }

    /**
     * Method nextTile: Get the next tile of the animation
     */
    nextTile() {
        if(this.tile.value >= 1) {
            this.tile.value = 0
        } else {
            this.tile.value += 1
        }
        this.tile.key = this.direction + this.tile.value
    }

    /**
     * Method moveTo: move the character through the given path
     * @param {array} path The path to follow 
     * @returns Returns true when finished
     */
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

    /**
     * Method getDirection: Get the direction for the move
     * @param {object} position Position of the tile to target 
     * @returns Orientation of the character to target
     */
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

    /**
     * Method getMovementPixel: Get the pixel to move on
     * @param {int} frame Step of the movement  
     * @returns The position of the new display
     */
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