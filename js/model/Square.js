export default class Square {
    constructor(x, y, tile) {
        this.position = {x:x, y:y}
        this.tile = tile

        switch(Math.floor(Math.random() * 10)) {
            case 0 :
            case 1 :
            case 2 :
            case 3 :
                this.tile = {namespace: "MAP",key: "GRASS"}
                break
            case 4 :
            case 5 :
            case 6 :
                this.tile = {namespace: "MAP",key: "GROUND"}
                break
            case 7 :
            case 8 :
                this.tile = {namespace: "MAP",key: "TREE"}
                break
            case 9 :
                this.tile = {namespace: "MAP",key: "BUISSON"}
                break
        }
    }

    display(canvas) {
        if(this.tile.key == "BUISSON" || this.tile.key == "TREE") {
            canvas.draw("Simple_tileset", {namespace: "MAP", key: "GRASS"}, {x: this.position.x, y: this.position.y})
        }
        canvas.draw("Simple_tileset", this.tile, {x: this.position.x, y: this.position.y})
    }

    displayPath(canvas) {
        canvas.draw("Simple_tile", {namespace: "PATH", key: "NODE"}, {x: this.position.x, y: this.position.y})
    }
}