/**
 * Class Node: represents a square in the grid
 * @param {Square} square Square to convert into a node
 */
export default class Node {
    constructor(square) {
        this.position = square.position;
        this.square = square;
        this.weight = square.tile.weight ? square.tile.weight : 0.6;
        this.isBlocked = square.tile.isBlocked ? square.tile.isBlocked : false;
    }

    /**
     * Method heuristic: affect the weight for the node
     * @param {Node} parent Parent node
     * @param {Node} destination Destination node
     */
    heuristic(parent, destination) {
        this.parent = parent;
        this.g = this.parent.g + 1;
        this.h = (Math.abs(this.position.x - destination.position.x) + Math.abs(this.position.y - destination.position.y)) * this.weight;
        this.f = this.h + this.g;
    }
}