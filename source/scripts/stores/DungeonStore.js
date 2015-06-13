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

var tilemap = require("<assets>/tilemaps/empty.json")

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
    this.rx = 0
    this.ry = 0
    this.tiles = {}
    this.directions = {}
    this.width = RWIDTH
    this.height = RHEIGHT
    
    for(var key in room) {
        this[key] = room[key]
    }
    
    this.x = this.rx * this.width,
    this.y = this.ry * this.height
    
    this.dungeon = dungeon
    this.dungeon.rooms[this.rx + "x" + this.ry] = this
    
    this.hasDirection = function(key) {
        return this.directions.indexOf(Directions[key]) != -1
    }
    
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

var Colors = [
    {0: "papayawhip", 1: "sienna"},
    {0: "indianred", 1: "firebrick"},
    {0: "darkolivegreen", 1: "darkgreen"},
    {0: "blue", 1: "darkblue"}
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

dungeon.makeRoom({
    "rx": 0, "ry": 0,
    "isInitialRoom": true,
    "directions": [
        Directions.SOUTH //critpath
    ],
    "colors": Colors[0],
})
dungeon.makeRoom({
    "rx": 0, "ry": 1,
    "directions": [
        Directions.NORTH,
        Directions.WEST //critpath
    ],
    "colors": Colors[0],
})
dungeon.makeRoom({
    "rx": -1, "ry": 1,
    "directions": [
        Directions.EAST,
        Directions.SOUTH //critpath
    ],
    "colors": Colors[0],
    //has 4 pots
})
dungeon.makeRoom({
    "rx": -1, "ry": 2,
    "directions": [
        Directions.NORTH,
        Directions.SOUTH, //critpath
        Directions.EAST,
        Directions.WEST
    ],
    "colors": Colors[0],
    //has 4 pots
})
dungeon.makeRoom({
    "rx": 0, "ry": 2,
    "directions": [
        Directions.WEST
    ],
    "colors": Colors[0],
    //has chest
})
dungeon.makeRoom({
    "rx": -2, "ry": 2,
    "directions": [
        Directions.EAST
    ],
    "colors": Colors[0],
    //has key
})
dungeon.makeRoom({
    "rx": -1, "ry": 3,
    "directions": [
        Directions.NORTH,
        Directions.SOUTH //critpath //needs key
    ],
    "colors": Colors[0],
})
dungeon.makeRoom({
    "rx": -1, "ry": 4,
    "directions": [
        Directions.NORTH,
        Directions.WEST,
        Directions.EAST //critpath
    ],
    "colors": Colors[1],
})
dungeon.makeRoom({
    "rx": -2, "ry": 4,
    "directions": [
        Directions.NORTH,
        Directions.WEST,
        Directions.EAST
    ],
    "colors": Colors[1],
    //multiroom southeast corner
    //has sign
})
dungeon.makeRoom({
    "rx": -3, "ry": 4,
    "directions": [
        Directions.NORTH,
        Directions.SOUTH, //needs bomb
        Directions.EAST
    ],
    "colors": Colors[1],
    //multiroom southwest corner
    //has person who can talk
})
dungeon.makeRoom({
    "rx": -3, "ry": 3,
    "directions": [
        Directions.SOUTH,
        Directions.EAST
    ],
    "colors": Colors[1],
    //multiroom northwest corner
    //has chest
})
dungeon.makeRoom({
    "rx": -2, "ry": 3,
    "directions": [
        Directions.SOUTH,
        Directions.WEST
    ],
    "colors": Colors[1],
    //multiroom northeast corner
    //has shop
})
dungeon.makeRoom({
    "rx": 0, "ry": 4,
    "directions": [
        Directions.NORTH,
        Directions.SOUTH, //critpath //needs 3 keys
        Directions.WEST
    ],
    "colors": Colors[1],
    //has 4 pots
})
dungeon.makeRoom({
    "rx": 0, "ry": 3,
    "directions": [
        Directions.SOUTH,
        Directions.EAST
    ],
    "colors": Colors[1],
})
dungeon.makeRoom({
    "rx": 1, "ry": 3,
    "directions": [
        Directions.NORTH,
        Directions.SOUTH,
        Directions.WEST
    ],
    "colors": Colors[1],
})
dungeon.makeRoom({
    "rx": 1, "ry": 2,
    "directions": [
        Directions.SOUTH
    ],
    "colors": Colors[1],
    //has key
})
dungeon.makeRoom({
    "rx": 1, "ry": 4,
    "directions": [
        Directions.NORTH,
        Directions.SOUTH,
        Directions.EAST,
    ],
    "colors": Colors[1],
})
dungeon.makeRoom({
    "rx": 2, "ry": 4,
    "directions": [
        Directions.WEST,
    ],
    "colors": Colors[1],
    //has key
})
dungeon.makeRoom({
    "rx": 1, "ry": 5,
    "directions": [
        Directions.NORTH,
    ],
    "colors": Colors[1],
    //has key
})
dungeon.makeRoom({
    "rx": 0, "ry": 5,
    "directions": [
        Directions.NORTH,
        Directions.WEST //critpath
    ],
    "colors": Colors[2],
})
dungeon.makeRoom({
    "rx": -1, "ry": 5,
    "directions": [
        Directions.SOUTH, //critpath //needs key
        Directions.WEST,
        Directions.EAST
    ],
    "colors": Colors[2],
})
dungeon.makeRoom({
    "rx": -2, "ry": 5,
    "directions": [
        Directions.SOUTH,
        Directions.WEST,
        Directions.EAST
    ],
    "colors": Colors[2],
    //has 4 pots
})
dungeon.makeRoom({
    "rx": -3, "ry": 5,
    "directions": [
        Directions.NORTH, //needs bomb
        Directions.SOUTH,
        Directions.EAST
    ],
    "colors": Colors[2],
})
dungeon.makeRoom({
    "rx": -3, "ry": 6,
    "directions": [
        Directions.NORTH
    ],
    "colors": Colors[2],
    //has chest //needs chest key //has key
})
dungeon.makeRoom({
    "rx": -2, "ry": 6,
    "directions": [
        Directions.NORTH,
        Directions.SOUTH
    ],
    "colors": Colors[2],
})
dungeon.makeRoom({
    "rx": -2, "ry": 7,
    "directions": [
        Directions.NORTH,
        Directions.EAST
    ],
    "colors": Colors[2],
    //has 2 pots
})
dungeon.makeRoom({
    "rx": -1, "ry": 7,
    "directions": [
        Directions.SOUTH,
        Directions.WEST,
        Directions.EAST
    ],
    "colors": Colors[2],
})
dungeon.makeRoom({
    "rx": -1, "ry": 8,
    "directions": [
        Directions.NORTH,
        Directions.EAST
    ],
    "colors": Colors[2],
    //has 1 pot
})
dungeon.makeRoom({
    "rx": 0, "ry": 8,
    "directions": [
        Directions.WEST,
        Directions.EAST
    ],
    "colors": Colors[2],
    //has chest
})
dungeon.makeRoom({
    "rx": 1, "ry": 8,
    "directions": [
        Directions.NORTH,
        Directions.WEST
    ],
    "colors": Colors[2],
    //has 1 pot
})
dungeon.makeRoom({
    "rx": 1, "ry": 7,
    "directions": [
        Directions.SOUTH,
        Directions.WEST,
        Directions.EAST
    ],
    "colors": Colors[2],
})
dungeon.makeRoom({
    "rx": 0, "ry": 7,
    "directions": [
        Directions.NORTH,
        Directions.WEST,
        Directions.EAST
    ],
    "colors": Colors[2],
})
dungeon.makeRoom({
    "rx": 0, "ry": 6,
    "directions": [
        Directions.SOUTH
    ],
    "colors": Colors[2],
    //has 12 pots
})
dungeon.makeRoom({
    "rx": 2, "ry": 7,
    "directions": [
        Directions.NORTH,
        Directions.WEST
    ],
    "colors": Colors[2],
})
dungeon.makeRoom({
    "rx": 2, "ry": 6,
    "directions": [
        Directions.SOUTH,
        Directions.WEST
    ],
    "colors": Colors[2],
    //has 4 pots
})
dungeon.makeRoom({
    "rx": 1, "ry": 6,
    "directions": [
        Directions.EAST
    ],
    "colors": Colors[2],
    //has chest key
})
dungeon.makeRoom({
    "rx": -1, "ry": 6,
    "isFinalRoom": true,
    "directions": [
        Directions.NORTH
    ],
    "colors": Colors[3],
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
