var Directions = require("<scripts>/data/Directions")
var Tilesets = require("<scripts>/data/Tilesets")
var Tilemaps = require("<scripts>/data/Tilemaps")

var Tile = function(dungeon, room, prototile) {
    this.value = prototile.value
    
    this.position = {}
    this.position.rx = room.position.rx
    this.position.ry = room.position.ry
    this.position.r_x = prototile.position.r_x
    this.position.r_y = prototile.position.r_y
    this.position.x = room.position.x + prototile.position.r_x
    this.position.y = room.position.y + prototile.position.r_x
    
    room.tiles[this.position.r_x + "x" + this.position.r_y] = this
    dungeon.tiles[this.position.x + "x" + this.position.y] = this
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
    
    this.dungeon = dungeon
    this.dungeon.rooms[this.position.rx + "x" + this.position.ry] = this
    
    this.hasDoorway = function(key) {
        return this.doorways.indexOf(Directions[key]) != -1
    }
    
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
    
    this.makeTiles = function() {
        var tilemap = this.tilemap || Tilemaps.empty
        for(var r_x = 0; r_x < this.width; r_x++) {
            for(var r_y = 0; r_y < this.height; r_y++) {
                var value = tilemap.layers[0].data[r_y * tilemap.width + r_x] - 1
                var tile = new Tile(this.dungeon, this, {
                    "position": {"r_x": r_x, "r_y": r_y},
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
}

var Dungeon = function(rooms) {
    
    this.tiles = new Object()
    this.rooms = new Object()
    
    this.makeRoom = function(protoroom) {
        var room = new Room(this, protoroom)
        return room
    }
    
    this.addRoom = function(room) {
        this.rooms[room.position.rx + "x" + room.position.ry] = room
        return room
    }
    
    this.getRoom = function(rx, ry) {
        return this.rooms[rx + "x" + ry]
    }
    
    this.hasRoom = function(rx, ry) {
        return this.rooms[rx + "x" + ry] != undefined
    }
    
    for(var index in rooms) {
        this.makeRoom(rooms[index])
    }
}

var protodungeon = require("<scripts>/data/Protodungeon")
var dungeon = new Dungeon(protodungeon)

for(var coords in dungeon.rooms) {
    var room = dungeon.rooms[coords]
    room.makeTiles()
}



var DungeonStore = Phlux.createStore({
    initiateStore: function() {
        this.data = dungeon
    },
    getRoom: function(rx, ry) {
        return this.data.rooms[rx + "x" + ry]
    }
})

module.exports = DungeonStore
