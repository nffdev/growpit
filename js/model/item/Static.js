import Item from "./Item.js";

/**
 * Class Static: a variant of Item that is unsolid and not mobile
 * @param {string} file The file where the texture is stored
 * @param {object} tile The texture infos
 * @param {int} x The item's horizontal position
 * @param {int} y The item's vertical position
 * @param {float} weight The item's weight on the map
 */
export default class Static extends Item {
    constructor(file, tile, x, y, weight) {
        super(file, tile, x, y)
        this.weight = weight
    }

    /**
     * Method display: change the same square's properties and display the item
     */
    display() {
        let index = game.map.getSquareIndex({x: this.position.x, y: this.position.y})
        game.map.grid.listSquare[index].tile.weight = this.weight
        super.display()
    }
}