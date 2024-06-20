import ClickManager from './ClickManager.js'
import Square from './Square.js'
import Grid from './astar/Grid.js'
import Canvas from './Canvas.js'

/**
 * Class Map: Represents the game's map
 */
export default class Map {
    constructor() {
        this.listSquare = Array()
        this.canvas = new Canvas()
    }

    /**
     * Method loadMap: Load the map with passed data
     * @param {string} file Json of the map 
     */
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

    /**
     * Method display: Display each square of the map
     */
    display() {
        for(let square of this.listSquare) {
            if(square.tile.key !== "NONE") {
                square.display(this.canvas, this.file)
            }
        }
    }

    /**
     * Method onClick: Called on click
     * @param {callback} callback Action to execute on click 
     */
    onClick(callback) {
        this.click = callback
    }

    /**
     * Method onRightClick: Called on right click
     * @param {callback} callback Action to execute on right click 
     */
    onRightClick(callback) {
        this.rightClick = callback
    }

    /**
     * Method getSquare: Find a tile in the map
     * @param {object} position position of the tile 
     * @returns The Square object of the tile
     */
    getSquare(position) {
        return this.listSquare.find(square => square.position.x == position.x && square.position.y == position.y)
    }

    /**
     * Method getSquareIndex: Find the index of a tile in the map
     * @param {object} position position of the tile 
     * @returns The index of the tile in the map
     */
    getSquareIndex(position) {
        return this.listSquare.findIndex(square => square.position.x == position.x && square.position.y == position.y)
    }

    /**
     * Method getTileByIndex: Create a tile object of the given index
     * @param {int} index Index of the tile info
     * @returns Tile object with the index of the tile in the file it background and weight
     */
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