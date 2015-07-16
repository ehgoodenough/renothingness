var Directions = require("<scripts>/data/Directions")

var Tile = function(prototile) {
    this.value = prototile.value || 0
    this.position = {
        "tx": prototile.position.tx || 0,
        "ty": prototile.position.ty || 0,
    }
}

var Room = function(dungeon, protoroom) {
    this.position = {"rx": 0, "ry": 0}
    this.tiles = {}
    this.doorways = {}
    this.width = RWIDTH
    this.height = RHEIGHT
    
    var room = this
    for(var key in protoroom) {
        room[key] = protoroom[key]
    }
    
    this.position.x = this.position.rx * this.width
    this.position.y = this.position.ry * this.height
    
    var tilemap = this.tilemap
    for(var tx = 0; tx < this.width; tx++) {
        for(var ty = 0; ty < this.height; ty++) {
            var value = tilemap.layers[0].data[ty * tilemap.width + tx] - 1
            this.tiles[tx + "x" + ty] = new Tile({
                "position": {"tx": tx, "ty": ty},
                "value": value,
            })
        }
    }
    for(var index in this.doorways) {
        var direction = this.doorways[index]
        var x = (this.width - 1) / 2
        var y = (this.height - 1) / 2
        x += x * direction.vector.rx
        y += y * direction.vector.ry
        this.tiles[x + "x" + y].value = 0
    }
}

var Dungeon = function(protodungeon) {
    var dungeon = this
    
    dungeon.name = protodungeon.name || ""
    
    dungeon.rooms = {}
    for(var index in protodungeon.rooms) {
        var protoroom = protodungeon.rooms[index]
        var key = protoroom.position.rx + "x" + protoroom.position.ry
        dungeon.rooms[key] = new Room(dungeon, protoroom)
    }
}

Dungeon.prototype.getRoom = function(pos) {
    return this.rooms[pos.rx + "x" + pos.ry]
}

Dungeon.prototype.hasRoom = function(rx, ry) {
    return !!this.rooms[rx + "x" + ry]
}

module.exports = Dungeon
