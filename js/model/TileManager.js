/**
 * Class TileManager: Manage the files 
 * for the tiles (tileset, tiles). 
 * Images need to be .png
 */
export default class TileManager {
    constructor() {
        this.listFile = {}
    }

    /**
     * Method loadFile, get an image and cut it into tiles.
     * Tiles are stored in the listFile[file] property
     * @param {string} folder Folder where the file is stored (path)
     * @param {string} file File containing the image (Must be .png and without extension)
     * @param {int} elementX Number of tiles in the image width
     * @param {int} elementY Number of tiles in the image height
     */
    async loadFile(folder, file, elementX, elementY) {
        let result = await fetch(`/tiles/${folder}/${file}.png`)
        this.listFile[file] = {
            full : await createImageBitmap(await result.blob()),
            listItem: []
        }
        let stepX = this.listFile[file].full.width / elementX
        let stepY = this.listFile[file].full.height / elementY
        for(let y = 0;y < elementY;y++) {
            for(let x = 0;x < elementX;x++) {
                this.listFile[file].listItem.push(await createImageBitmap(this.listFile[file].full, 
                    x * stepX,
                    y * stepY,
                    stepX,
                    stepY))
            }
        }
    }
}