export default class Node {
    constructor(square) {
        this.position = square.position
        this.square = square
        this.isBlocked = false
        switch(square.tile.key) {
            /* case "TREE":
                this.isBlocked = true
                break
            case "GRASS":
                this.weight = 0.7
                break
            case "GROUND":
                this.weight = 0.6
                break
            case "BUISSON":
                this.weight = 1.5
                break */
            default:
                this.weight = square.tile.weight ? square.tile.weight : 0.6
                this.isBlocked = square.tile.isBlocked ? square.tile.isBlocked : false
                break
        }
        //this.isBlocked = square.tile.key == "TREE"
    }

    heuristic(parent, destination) {
        this.parent = parent
        this.g = this.parent.g + 1
        this.h = (Math.abs(this.position.x - destination.x) + Math.abs(this.position.y - destination.y)) * this.weight
        this.f = this.h + this.g
    }
}