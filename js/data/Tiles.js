/**
 * Class Tiles: Access the tiles from the tileManager
 */
export default class Tiles {
    /**
     * Method get: Get the tile's image
     * @param {string} file File where the image is stored 
     * @param {object} tile Tile information
     * @returns Tile's image 
     */
    static get(file, tile) {
        return game.tileManager.listFile[file].listItem[this[tile.namespace][tile.key]]
    }

    /**
     * Method getByIndex: Get the tile's image by index
     * @param {string} file File where the image is stored 
     * @param {int} tile Tile's index
     * @returns Tile's image
     */
    static getByIndex(file, tile) {
        return game.tileManager.listFile[file].listItem[tile]
    }
}

Tiles.MAP = {}
Tiles.MAP.GRASS = 0
Tiles.MAP.GROUND = 1
Tiles.MAP.TREE = 2
Tiles.MAP.BUISSON = 3

Tiles.PATH = {}
Tiles.PATH.NODE = 0

Tiles.CHAR = {}
Tiles.CHAR.BAS0 = 0
Tiles.CHAR.BAS1 = 1
Tiles.CHAR.DROITE0 = 2
Tiles.CHAR.DROITE1 = 3
Tiles.CHAR.HAUT0 = 4
Tiles.CHAR.HAUT1 = 5
Tiles.CHAR.GAUCHE0 = 6
Tiles.CHAR.GAUCHE1 = 7