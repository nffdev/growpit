import Map from './Map.js';

export default class Square {
    constructor(x, y, data, tile) {
        this.position = {x:x, y:y}
        this.tile = tile
        this.data = data

        if(tile === undefined) {
            let max = game.tileManager.listFile[data.file].listItem.length
            let rand = Math.floor((Math.random() * max * 10) / 10)
            let map = new Map()
            Object.assign(map, data)
            this.tile = map.getTileByIndex(rand)
            /* switch(Math.floor(Math.random() * 10)) {
                case 0 :
                case 1 :
                case 2 :
                case 3 :
                    this.tile = {index: 0, weight: 0.7}
                    break
                case 4 :
                case 5 :
                case 6 :
                    this.tile = {index: 1, weight: 0.6}
                    break
                case 7 :
                case 8 :
                    this.tile = {index: 2, weight: 1, isBlocked: true, background: {index: 0}}
                    break
                case 9 :
                    this.tile = {index: 3, weight: 1.5, background: {index: 0}}
                    break
            } */
        }
    }

    display(canvas, file) {
        if(this.tile.background) {
            let square = new Square(this.position.x, this.position.y, this.data, this.tile.background)
            square.display(canvas, file)
        }
        canvas.draw(file, this.tile, {x: this.position.x, y: this.position.y})
    }

    displayPath(canvas) {
        canvas.draw("Simple_tile", {namespace: "PATH", key: "NODE"}, {x: this.position.x, y: this.position.y})
    }
}