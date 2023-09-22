import Map from './Map.js'
import TileManager from './Tilemanager.js'
import Character from './Character.js'

export default class Game {
    constructor() {
    }

    async init() {
        this.tileManager = new TileManager()
        await this.tileManager.loadFile("map", "Simple_tileset", 4, 1)
        await this.tileManager.loadFile("map", "Simple_tile", 1, 1)
        await this.tileManager.loadFile("character", "Slime_vert", 2, 4)
        
        this.map = new Map()
        await this.map.loadMap('map1')
        this.map.display()

        this.character = Array()

        let player = new Character("Slimy", "Player", 5, 5, "BAS")
        player.display()
        //player.animate()

        /*let path = this.map.grid.getPath(this.map.listSquare[0], this.map.listSquare[224])
        for(let square of path) {
            square.displayPath(this.map.canvas)
            await new Promise(resolve => setTimeout(resolve, 25))
        }*/
        
        this.map.onClick = (position) => {
            let path = this.map.grid.getPath(this.map.getSquare(player.position), this.map.getSquare(position))
            player.moveTo(path)
        }

        this.character.push(player)
    }
}