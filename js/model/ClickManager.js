import Canvas from "./Canvas.js"

/**
 * Class ClickManager: Manage the clicks
 */
export default class ClickManager {
    constructor(size) {
        this.canvas = new Canvas()
        this.canvas.setStep(size)
        this.canvas.element.classList.add("top")

        this.canvas.element.addEventListener("click", (e) => {
            this.click(e)
        })

        this.canvas.element.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            this.rightClick(e)
        })
    }

    /**
     * Method click: Call the onClick method
     * @param {event} e Click event 
     */
    click(e) {
        game.map.onClick(this.getClickPosition(e))
    }

    /**
     * Method rightClick: Call the onRightClick method
     * @param {event} e Right click event 
     */
    rightClick(e) {
        game.map.onRightClick(this.getClickPosition(e))
    }

    /**
     * Method getClickPosition: Get the position of the click in the map
     * @param {event} e Click event
     * @returns Object position with the position of the click
     */
    getClickPosition(e) {
        return {x: Math.floor(e.layerX / this.canvas.stepX), y: Math.floor(e.layerY / this.canvas.stepY)}
    }
}