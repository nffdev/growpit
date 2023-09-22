export default class Tiles {
    static get(file, tile) {
        return game.tileManager.listFile[file].listItem[this[tile.namespace][tile.key]]
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