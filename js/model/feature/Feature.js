import Canvas from '../Canvas.js';

/**
 * Class Feature: Represents an feature
 * @param {string} file the file where the texture is stored
 * @param {object} tile the texture infos
 * @param {int} x Feature's horizontal position
 * @param {int} y Feature's vertical position
 */
export default class Feature {
    constructor(file, tile, x, y) {
        this.canvas = new Canvas();
        this.canvas.element.style.zIndex = 1;
        this.canvas.setStep(game.map.size);
        this.file = file;
        this.tile = tile;
        this.position = {x:x, y:y};
    }

    /**
     * Method display: display the feature in the canvas
     */
    display() {
        this.canvas.draw(this.file, this.tile, {x: this.position.x, y: this.position.y});
    }
}