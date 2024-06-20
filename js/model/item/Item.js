import Canvas from '../Canvas.js'

export default class Item {
    constructor(file, tile, x, y) {
        this.canvas = new Canvas()
        this.canvas.element.style.zIndex = 1
        this.canvas.setStep(game.map.size)
        this.file = file
        this.tile = tile
        this.position = {x:x, y:y}
    }

    display() {
        this.canvas.draw(this.file, this.tile, {x: this.position.x, y: this.position.y})
    }
}