import ClickManager from './ClickManager.js'
import Square from './Square.js'
import Grid from './astar/Grid.js'
import Canvas from './Canvas.js'

export default class Map {
    constructor() {
        this.listSquare = Array()
        this.canvas = new Canvas()
    }

    async loadMap(file) {
        let result = await fetch(`js/data/${file}.json`)
        let data = await result.json()
        Object.assign(this, data)
        this.canvas.setStep(this.size)
        this.clickManager = new ClickManager(this.size)
        if(this.listSquare.length > 0) {
            this.squareNums = this.listSquare
            this.listSquare = Array()
            for(let x = 0;x < this.size.width; x++) {
                for(let y = 0;y < this.size.height; y++) {
                    this.listSquare.push(new Square(x, y, data, this.getTileByIndex(this.squareNums[y][x])))
                }
            }
        } else {
            this.listSquare = Array()
            for(let x = 0;x < this.size.width; x++) {
                for(let y = 0;y < this.size.height; y++) {
                    this.listSquare.push(new Square(x, y, data))
                }
            }
        }

        this.grid = new Grid(this.listSquare, this.size) 
    }

    display() {
        for(let square of this.listSquare) {
            if(square.tile.key !== "NONE") {
                square.display(this.canvas, this.file)
            }
        }
    }

    onClick(callback) {
        this.click = callback
    }

    onRightClick(callback) {
        this.rightClick = callback
    }

    getSquare(position) {
        return this.listSquare.find(square => square.position.x == position.x && square.position.y == position.y)
    }

    getTileByIndex(index) {
        let tile = {
            index: index,
            weight: this.weights[index] ? this.weights[index] : 1.5,
        }
        if(this.obstacles.includes(index)) {
            tile.isBlocked = true
        }
        if(this.backgrounds) {
            if(this.backgrounds[index] !== undefined && this.backgrounds[index] !== index) {
                tile.background = this.getTileByIndex(this.backgrounds[index])
            }
        }
        return tile
    }
}