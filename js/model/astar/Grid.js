import Node from "./Node.js"

/**
 * Class Grid: represents the map with obstacles
 * @param {array} listSquare The list of the map's squares
 * @param {object} size The grid's size
 */
export default class Grid {
    constructor(listSquare, size) {
        this.size = size
        this.listSquare = listSquare
    }

    /**
     * Method getPath: get the path between origin and destination
     * @param {Square} origin The origin square 
     * @param {Square} destination The destination square
     * @returns Path
     */
    getPath(origin, destination) {
        let path = Array()
        let hierarchicPath = this.findPath(origin, destination)
        while(hierarchicPath) {
            path.push(hierarchicPath)
            hierarchicPath = hierarchicPath.parent
        }
        return path.reverse()
    }

    /**
     * Method findPath: search the best nodes for the path
     * @param {Square} origin The origin Square 
     * @param {Square} destination The destination square
     * @returns The last node checked
     */
    findPath(origin, destination) {
        origin = new Node(origin)
        destination = new Node(destination)
        origin.g = 0
        origin.f = 0

        this.openList = [origin]
        this.closeList = []
        do{
            let bestNode = this.getBestNode()
            this.openList = this.openList.filter(node => node.position != bestNode.position)
        
            let checkList = this.getChildNode(bestNode, destination)

            for(let checkNode of checkList) {
                if(!checkNode.isBlocked) {
                    if(checkNode.position == destination.position) {
                        return checkNode
                    }
                    if (!this.openList.some(node => checkNode.position == node.position && node.f <= checkNode.f) && !this.closeList.some(node => checkNode.position == node.position)) {
                        this.openList.push(checkNode)
                    }
                }
            }
            this.closeList.push(bestNode)
        }while(this.openList.length !== 0)
        return null
    }

    /**
     * Method getBestNode: get the best node from the openList
     * @returns The best Node
     */
    getBestNode() {
        let bestNode = null
        for(let node of this.openList) {
            if(bestNode == null) {
                bestNode = node
            }else if(node.f < bestNode.f) {
                bestNode = node
            }
        }
        return bestNode
    }

    /**
     * Method getChildNode: get the 4 nearest nodes
     * @param {Node} parent the parent node 
     * @param {Node} destination The destination node
     * @returns An array of the 4 nodes
     */
    getChildNode(parent, destination) {
        let checkList = Array()

        if(parent.position.x > 0) {
            let nodeLeft = new Node(this.listSquare.find(square => square.position.x == parent.position.x - 1 && square.position.y == parent.position.y))
            nodeLeft.heuristic(parent, destination)
            checkList.push(nodeLeft)
        }

        if(parent.position.x < this.size.width - 1) {
            let nodeRight = new Node(this.listSquare.find(square => square.position.x == parent.position.x + 1 && square.position.y == parent.position.y))
            nodeRight.heuristic(parent, destination)
            checkList.push(nodeRight)
        }

        if(parent.position.y > 0) {
            let nodeTop = new Node(this.listSquare.find(square => square.position.x == parent.position.x && square.position.y == parent.position.y - 1))
            nodeTop.heuristic(parent, destination)
            checkList.push(nodeTop)
        }

        if(parent.position.y < this.size.height - 1) {
            let nodeBottom = new Node(this.listSquare.find(square => square.position.x == parent.position.x && square.position.y == parent.position.y + 1))
            nodeBottom.heuristic(parent, destination)
            checkList.push(nodeBottom)
        }

        return checkList
    }
}