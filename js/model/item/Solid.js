import Item from "./Item.js";

export default class Solid extends Item {
    display() {
        let index = game.map.getSquareIndex({x: this.position.x, y: this.position.y})
        game.map.grid.listSquare[index].tile.isBlocked = true
        super.display()
    }
}