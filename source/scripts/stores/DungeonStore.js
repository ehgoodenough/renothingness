var tilemap = require("<assets>/tilemaps/empty.json")

var Directions = {
    NORTH: {
        rx: 0,
        ry: -1,
        key: "NORTH",
        getOpposite: function() {
            return Directions.SOUTH
        }
    },
    SOUTH: {
        rx: 0,
        ry: +1,
        key: "SOUTH",
        getOpposite: function() {
            return Directions.NORTH
        }
    },
    WEST: {
        rx: -1,
        ry: 0,
        key: "WEST",
        getOpposite: function() {
            return Directions.EAST
        }
    },
    EAST: {
        rx: +1,
        ry: 0,
        key: "EAST",
        getOpposite: function() {
            return Directions.WEST
        }
    }
}

var Tile = function(dungeon, room, tile) {
    this.room = room
    this.dungeon = dungeon
    
    this.value = tile.value
    
    this.r_x = tile.r_x
    this.r_y = tile.r_y
    
    this.rx = this.room.rx
    this.ry = this.room.ry
    this.x = this.room.x + this.r_x
    this.y = this.room.y + this.r_y
    
    this.room.tiles[this.r_x + "x" + this.r_y] = this
    this.dungeon.tiles[this.x + "x" + this.y] = this
}

var Room = function(dungeon, room) {
    this.rx = room.rx || 0
    this.ry = room.ry || 0
    
    this.width = RWIDTH
    this.height = RHEIGHT
    
    this.x = this.rx * this.width,
    this.y = this.ry * this.height
    
    this.tiles = {}
    this.directions = room.directions || []
    
    this.dungeon = dungeon
    this.dungeon.rooms[this.rx + "x" + this.ry] = this
    
    this.getAdjacentDirections = function() {
        var directions = []
        for(var key in Directions) {
            var direction = Directions[key]
            var rx = this.rx + direction.rx
            var ry = this.ry + direction.ry
            if(!this.dungeon.hasRoom(rx, ry)) {
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
        
        protoroom.rx = this.rx + direction.rx
        protoroom.ry = this.ry + direction.ry
        var room = new Room(this.dungeon, protoroom)
        
        this.directions.push(direction)
        room.directions.push(direction.getOpposite())
        
        return room
    }
    
    this.makeTiles = function() {
        for(var r_x = 0; r_x < this.width; r_x++) {
            for(var r_y = 0; r_y < this.height; r_y++) {
                var value = tilemap.layers[0].data[r_y * tilemap.width + r_x] - 1
                var tile = new Tile(this.dungeon, this, {
                    "value": value,
                    "r_x": r_x,
                    "r_y": r_y
                })
            }
        }
        for(var index in this.directions) {
            var direction = this.directions[index]
            var x = (this.width - 1) / 2
            var y = (this.height - 1) / 2
            x += x * direction.rx
            y += y * direction.ry
            this.tiles[x + "x" + y].value = 0
        }
    }
}

var DungeonColors = [
    {0: "papayawhip", 1: "sienna"},
    {0: "indianred", 1: "firebrick"},
    {0: "darkolivegreen", 1: "darkgreen"}
]

var Dungeon = function() {
    
    this.tiles = new Object()
    this.rooms = new Object()
    
    this.makeRoom = function(protoroom) {
        var room = new Room(this, protoroom)
        return room
    }
    
    this.addRoom = function(room) {
        this.rooms[room.rx + "x" + room.ry] = room
        return room
    }
    
    this.getRoom = function(rx, ry) {
        return this.rooms[rx + "x" + ry]
    }
    
    this.hasRoom = function(rx, ry) {
        return this.rooms[rx + "x" + ry] != undefined
    }
}


//https://github.com/ehgoodenough/nothingness/blob/master/Adventure/src/computc/worlds/dungeons/RandomDungeon.java
//https://docs.google.com/presentation/d/1IRwMKnjM9VkgwLoavbJ_QBpBY3-LRetdivag1VuPry4/edit#slide=id.g41ff5289a_019

var dungeon = new Dungeon()

var room = dungeon.makeRoom({
    "isInitialRoom": true,
    "rx": 0, "ry": 0
})
for(var iterator = 0; iterator < 3; iterator++) {
    room = room.makeAdjacentRoom({
        //?!
    })
}
var room = room.makeAdjacentRoom({
    "isFinalRoom": true
})

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
