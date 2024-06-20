import Item from "./Item.js";

export default class Static extends Item {
    constructor(file, tile, x, y, weight) {
        super(file, tile, x, y)
        this.weight = weight
    }

    display() {
        let index = game.map.getSquareIndex({x: this.position.x, y: this.position.y})
        game.map.grid.listSquare[index].tile.weight = this.weight
        super.display()
    }
}