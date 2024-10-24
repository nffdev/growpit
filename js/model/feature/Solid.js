import Feature from "./Feature.js";

/**
 * Class Solid: a variant of Feature that is an obstacle
 */
export default class Solid extends Feature {
    /**
     * Method display: change the same square properties and display the feature
     */
    display() {
        let index = game.map.getSquareIndex({x: this.position.x, y: this.position.y});
        game.map.grid.listSquare[index].tile.isBlocked = true;
        super.display();
    }
}