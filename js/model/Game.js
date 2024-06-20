import Map from './Map.js'
import TileManager from './Tilemanager.js'
import Character from './Character.js'
import Solid from './item/Solid.js'
import Static from './item/Static.js'

/**
 * Class Game: Represents the game
 */
export default class Game {
    constructor() {
    }

    /**
     * Method init: executes the game
     */
    async init() {
        this.tileManager = new TileManager()
        await this.tileManager.loadFile("map", "Simple_tileset", 4, 1)
        await this.tileManager.loadFile("map", "Wooden_tileset", 6, 6)
        await this.tileManager.loadFile("map", "Simple_tile", 1, 1)
        await this.tileManager.loadFile("character", "Slime_vert", 2, 4)
        
        this.map = new Map()
        await this.map.loadMap('map-wood')
        this.map.display()

        this.characters = Array()
        this.items = Array()

        let player = new Character("Slimy", "Player", 23, 13, "BAS")
        player.display()

        /* let npc = new Character("Slimo", "Npc", 23, 12, "BAS")
        npc.display() */
       
        this.map.onClick = (position) => {
            this.moveOnClick(position, player)
        }
        
        /* this.map.onRightClick = (position) => {
        let npath = this.map.grid.getPath(this.map.getSquare(npc.position), this.map.getSquare(position))
        npc.moveTo(npath)
        } */
        this.characters.push(player)

        let solid = new Solid('Simple_tileset', {index: 2}, 12, 10)
        solid.display()

        let staticItem = new Static('Simple_tileset', {index: 3}, 15, 12, 1.5)
        staticItem.display()

        this.items.push(solid, staticItem)
    }
    
    /**
     * Method moveOnClick: Default action for click (move character)
     * @param {object} position Destination position
     * @param {Character} character Character to move 
     */
    moveOnClick(position, character) {
        let ppath = this.map.grid.getPath(this.map.getSquare(character.position), this.map.getSquare(position))
        console.log(ppath);
        character.moveTo(ppath).then((resolve, reject) => {
            this.map.onClick = (position) => {
                this.moveOnClick(position, character)
            }
        })
        this.map.onClick = () => {
            this.stopMove(character)
        }
    }

    /**
     * Method stopMove: Action on click (stop character move)
     * @param {Character} character Character to stop move 
     */
    stopMove(character) {
        character.stop = true
        this.map.onClick = (position) => {
            this.moveOnClick(position, character)
        }
    }
}