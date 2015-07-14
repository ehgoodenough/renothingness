this.getAdjacentDirections = function() {
    var directions = []
    for(var key in Directions) {
        var rx = room.position.rx + Directions[key].vector.rx
        var ry = room.position.ry + Directions[key].vector.ry
        if(dungeon.hasRoom(rx, ry) == false) {
            directions.push(direction)
        }
    }
    return directions
}

this.getRandomAdjacentDirection = function() {
    var directions = this.getAdjacentDirections()
    return directions[Math.floor(Random() * directions.length)]
}

this.makeAdjacentRoom = function(protoroom) {
    var direction = this.getRandomAdjacentDirection()
    if(direction == undefined) {throw new Error("DEAD_END")}
    
    protoroom.position = {
        "rx": this.position.rx + direction.vector.rx,
        "ry": this.position.ry + direction.vector.ry,
    }
    var room = new Room(this.dungeon, protoroom)
    
    this.doorways.push(direction)
    room.doorways.push(direction.getOpposite())
    
    return room
}