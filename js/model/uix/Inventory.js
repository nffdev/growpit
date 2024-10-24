import Canvas from '../Canvas.js';

/**
 * Class Inventory: Represents an Inventory
 * @param {string} key the localStorage key
 */
export default class Inventory {
    constructor(key) {
        this.canvas = new Canvas();
        this.canvas.element.style.zIndex = 1;
        this.canvas.setStep(game.map.size);
        this.key = key;
    }

    /**
     * Method init: initialize the inventory
     */
    async init() {
        let data = JSON.parse(localStorage.getItem(this.key));
        if(data && await this.verifyEntries(data.inventory, data.hash)) {
            this.size = data.inventory.size;
            this.items = data.inventory.items;
        } else {
            this.reset();
        }
    }

    /**
     * Method reset: reset the inventory
     */
    async reset() {
        this.size = 5;
        this.items = [];
        let data = {size: 5, items: []};
        let hash = await this.hashData(data);
        localStorage.setItem('inventory', JSON.stringify({inventory: data, hash: hash}));
    }

    /**
     * 
     * @param {*} data 
     * @returns 
     */
    async hashData(data) {
        const enc = new TextEncoder();
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", enc.encode(JSON.stringify(data)));
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async verifyEntries(data, hash) {
        if((await this.hashData(data)) === hash) {
            return true;
        } else {
            console.error('Données corrompues ou anormalement modifiées ! L\'inventaire a été réinitialisé !');
            this.reset();
            return false;
        }
    }

    /**
     * Method display: display the Inventory in the canvas
     */
    display() {
        //this.canvas.draw(this.file, this.tile, {x: this.position.x, y: this.position.y});
    }
}