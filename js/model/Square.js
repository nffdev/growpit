import Map from './Map.js';

/**
 * Class Square: Represents a tile in the map
 * @param {int} x Tile's horizontal position (begins at 0)
 * @param {int} y Tile's vertical position (begins at 0)
 * @param {object} data Json infos for the tiles
 * @param {object} tile Object representing the tile, if undefined, get a random tile from data
 */
export default class Square {
    constructor(x, y, data, tile) {
        this.position = {x:x, y:y};
        this.tile = tile;
        this.data = data;

        if(tile === undefined) {
            let max = game.tileManager.listFile[data.file].listItem.length;
            let rand = Math.floor((Math.random() * max * 10) / 10);
            let map = new Map();
            Object.assign(map, data);
            this.tile = map.getTileByIndex(rand);
        }
    }

    /**
     * Method display: display the tile in the map, backgrounds are also managed
     * @param {object} canvas Canvas where display 
     * @param {string} file File where the tile is stored
     */
    display(canvas, file) {
        if(this.tile.background) {
            let square = new Square(this.position.x, this.position.y, this.data, this.tile.background);
            square.display(canvas, file);
        }
        canvas.draw(file, this.tile, {x: this.position.x, y: this.position.y});
    }
}