import Tiles from "/js/data/Tiles.js";

/**
 * Class Canvas: represents an html canvas
 * @param {*} element Canvas html element (optional)
 */
export default class Canvas {
    constructor(element) {
        if(element == undefined) {
            this.element = document.createElement("canvas");
            document.getElementById("console").appendChild(this.element);
        } else {
        this.element = element;
        }
        this.context = this.element.getContext('2d');
        this.element.classList.add("canvas");

        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;

        this.element.width = this.width;
        this.element.height = this.height;
    }

    /**
     * Method setstep: Set the size of the tiles
     * @param {object} size Object with the width and the height
     */
    setStep(size) {
        this.stepX = this.width / size.width;
        this.stepY = this.height / size.height;
    }

    /**
     * Method draw: draw the tile in the canvas
     * @param {string} file File where the tile is stored
     * @param {object} tile The tile to draw 
     * @param {object} position The position where draw
     */
    draw(file, tile, position) {
        let image = undefined;
        if(Number.isInteger(tile.index)) {
            image = Tiles.getByIndex(file, tile.index);
        } else {
            image = Tiles.get(file, tile);
        }
        this.context.drawImage(image, 
            0, 
            0, 
            image.width, 
            image.height, 
            position.x * this.stepX, 
            position.y * this.stepY, 
            this.stepX, 
            this.stepY);
    }

    /**
     * Method drawPixel: Draw the tile out the grid
     * @param {string} file Where the tile is stored 
     * @param {object} tile Tile to draw
     * @param {object} pixel Pixel where draw in the canvas
     */
    drawPixel(file, tile, pixel) {
        let image = Tiles.get(file, tile);
        this.context.drawImage(image, 
            0, 
            0, 
            image.width, 
            image.height, 
            pixel.x,
            pixel.y,
            this.stepX, 
            this.stepY);
    }

    /**
     * Method clear: Clear the canvas
     */
    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }
}