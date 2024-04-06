export default class Square {
    constructor(x, y, tile) {
        this.position = {x:x, y:y}
        this.tile = tile

        if(tile === undefined || tile.key === "RANDOM") {
            switch(Math.floor(Math.random() * 10)) {
                case 0 :
                case 1 :
                case 2 :
                case 3 :
                    this.tile = {namespace: "MAP",key: "GRASS", weight: 0.7}
                    break
                case 4 :
                case 5 :
                case 6 :
                    this.tile = {namespace: "MAP",key: "GROUND", weight: 0.6}
                    break
                case 7 :
                case 8 :
                    this.tile = {namespace: "MAP",key: "TREE", weight: 1, isBlocked: true}
                    break
                case 9 :
                    this.tile = {namespace: "MAP",key: "BUISSON", weight: 1.5}
                    break
            }
        }
    }

    display(canvas, file) {
        if(this.tile.key == "BUISSON" || this.tile.key == "TREE") {
            canvas.draw(file, {namespace: "MAP", key: "GRASS"}, {x: this.position.x, y: this.position.y})
        }
        canvas.draw(file, this.tile, {x: this.position.x, y: this.position.y})
    }

    displayPath(canvas) {
        canvas.draw("Simple_tile", {namespace: "PATH", key: "NODE"}, {x: this.position.x, y: this.position.y})
    }
}