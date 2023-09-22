import Canvas from "./Canvas.js"

export default class ClickManager {
    constructor(size) {
        this.canvas = new Canvas()
        this.canvas.setStep(size)
        this.canvas.element.classList.add("top")

        this.canvas.element.addEventListener("click", (e) => {
            this.click(e)
        })

        this.canvas.element.addEventListener("contextmenu", (e) => {
            this.rightClick(e)
        })
    }

    click(e) {
        game.map.onClick(this.getClickPosition(e))
    }

    rightClick(e) {
        game.map.onRightClick(this.getClickPosition(e))
    }

    getClickPosition(e) {
        return {x: Math.floor(e.layerX / this.canvas.stepX), y: Math.floor(e.layerY / this.canvas.stepY)}
    }
}