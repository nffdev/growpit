import Feature from "./Feature.js";

/**
 * Class Static: a variant of Feature that is unsolid and not mobile
 * @param {string} file The file where the texture is stored
 * @param {object} tile The texture infos
 * @param {int} x The feature's horizontal position
 * @param {int} y The feature's vertical position
 * @param {float} weight The feature's weight on the map
 */
export default class Static extends Feature {
    constructor(file, tile, x, y, weight) {
        super(file, tile, x, y);
        this.weight = weight;
    }

    /**
     * Method display: change the same square's properties and display the feature
     */
    display() {
        let index = game.map.getSquareIndex({x: this.position.x, y: this.position.y});
        game.map.grid.listSquare[index].tile.weight = this.weight;
        super.display();
    }
}