import Map from './Map.js';
import TileManager from './TileManager.js';
import Character from './Character.js';
import * as features from './feature/index.js';
import * as uix from './uix/index.js';

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
        this.tileManager = new TileManager();
        await this.tileManager.loadFile("character", "Slime_vert", 2, 4);
        await this.tileManager.loadFile("character", "Grand_slime_vert", 2, 4);
        await this.tileManager.loadFile("feature", "Lamp", 1, 1);
        await this.tileManager.loadFile("map", "Simple_tileset", 4, 1);
        await this.tileManager.loadFile("map", "Wooden_tileset", 6, 6);
        await this.tileManager.loadFile("map", "Simple_tile", 1, 1);
        await this.tileManager.loadFile("ui", "Inventory", 1, 2);
        
        this.map = new Map();
        await this.map.loadMap('map-wood');
        this.map.display();

        this.characters = Array();
        this.features = Array();
        //this.items = Array();

        this.inventory = new uix.Inventory('inventory');
        this.inventory.init();
        

        let player = new Character("Slimy", "Player", 23, 13, "BAS");
        player.display();

        /* let npc = new Character("Slimo", "Npc", 23, 12, "BAS");
        npc.display(); */
       
        this.changeOnClick('move', {character: player});
        
        /* this.map.onRightClick = (position) => {
        let npath = this.map.grid.getPath(this.map.getSquare(npc.position), this.map.getSquare(position));
        npc.moveTo(npath);
        } */
        this.characters.push(player);

        let solid = new features.Solid('Simple_tileset', {index: 2}, 12, 10);
        solid.display();

        let staticItem = new features.Static('Simple_tileset', {index: 3}, 15, 12, 1.5);
        staticItem.display();

        let lamp = new features.Solid('Lamp', {index: 0}, 2, 1);
        lamp.display();

        this.features.push(solid, staticItem, lamp);
    }

    /**
     * Method changeOnClick: Change the action onClick
     * @param {string} keyword The action name 
     * @param {object} data The data needed by the action
     */
    changeOnClick(keyword, data) {
        switch(keyword) {
            case 'move':
                this.map.onClick = (position) => {
                    this.moveOnClick(position, data.character);
                }
                break;
        }
    }
    
    /**
     * Method moveOnClick: Default action for click (move character)
     * @param {object} position Destination position
     * @param {Character} character Character to move 
     */
    moveOnClick(position, character) {
        if(!character.moving) {
            let ppath = this.map.grid.getPath(this.map.getSquare(character.position), this.map.getSquare(position));
            character.moveTo(ppath).then(() => {
                if(character.queue) {
                    this.moveOnClick(character.queue, character);
                    character.queue = undefined;
                }
            });
        } else {
            character.queue = position;
            character.stop = true;
        }
    }
}