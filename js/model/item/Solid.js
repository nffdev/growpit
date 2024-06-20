import Item from "./Item.js";

/**
 * Class Solid: a variant of Item that is an obstacle
 */
export default class Solid extends Item {
    /**
     * Method display: change the same square properties and display the item
     */
    display() {
        let index = game.map.getSquareIndex({x: this.position.x, y: this.position.y})
        game.map.grid.listSquare[index].tile.isBlocked = true
        super.display()
    }
}