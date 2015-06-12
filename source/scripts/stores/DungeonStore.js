var tilemaps = [
    require("<assets>/tilemaps/bigdot.json"),
    require("<assets>/tilemaps/fivedots.json"),
    require("<assets>/tilemaps/fourdots.json"),
    require("<assets>/tilemaps/grid.json"),
    require("<assets>/tilemaps/onedot.json")
]

function DunGen() {
    this.rooms = {}
    this.getRoom = function(rx, ry) {
        return this.rooms[rx + "x" + ry]
    }
    this.addRoom = function(room) {
        this.rooms[room.rx + "x" + room.ry] = room
    }
    this.getPotentialDirections = function(room) {
        var directions = []
        if(this.getRoom(room.rx, room.ry - 1) == undefined) {directions.push("north")}
        if(this.getRoom(room.rx, room.ry + 1) == undefined) {directions.push("south")}
        if(this.getRoom(room.rx - 1, room.ry) == undefined) {directions.push("west")}
        if(this.getRoom(room.rx + 1, room.ry) == undefined) {directions.push("east")}
        return directions
    }
    this.getRandomPotentialDirection = function(room) {
        var directions = this.getPotentialDirections(room)
        return directions[Math.floor(Random() * directions.length)]
    }
    this.getOppositeDirection = function(direction) {
        if(direction == "north") {
            return "south"
        } else if(direction == "south") {
            return "north"
        } else if(direction == "west") {
            return "east"
        } else if(direction == "east") {
            return "west"
        }
    }
    
    //https://github.com/ehgoodenough/nothingness/blob/master/Adventure/src/computc/worlds/dungeons/RandomDungeon.java
    //https://docs.google.com/presentation/d/1IRwMKnjM9VkgwLoavbJ_QBpBY3-LRetdivag1VuPry4/edit#slide=id.g41ff5289a_019
    
    this.generateDungeon = function() {
        var _room = {
            rx: 0, ry: 0,
            doors: [],
        }
        this.addRoom(_room)
        for(var i = 0; i < 5; i++) {
            var direction = this.getRandomPotentialDirection(_room)
            if(direction == undefined) {
                throw "DEAD_END"
            }
            _room.critpath = direction
            _room.doors.push(direction)
            
            var next_room = {doors: [this.getOppositeDirection(direction)]}
            if(direction == "north") {
                next_room.rx = _room.rx
                next_room.ry = _room.ry - 1
            } else if(direction == "south") {
                next_room.rx = _room.rx
                next_room.ry = _room.ry + 1
            } else if(direction == "west") {
                next_room.rx = _room.rx - 1
                next_room.ry = _room.ry
            } else if(direction == "east") {
                next_room.rx = _room.rx + 1
                next_room.ry = _room.ry
            }
            this.addRoom(next_room)
            _room = next_room
        }
    }
    
    this.generateDungeon()
}

var DungeonStore = Phlux.createStore({
    data: {
        rooms: {},
        tiles: {}
    },
    initiateStore: function() {
        var dungeon = new DunGen()
        
        for(var coords in dungeon.rooms) {
            var room = dungeon.rooms[coords]
            this.createRoom(room.rx, room.ry, room.doors)
        }
    },
    createRoom: function(rx, ry, doors) {
        var map = tilemaps[2]
        var room = {
            position: {
                "rx": rx,
                "ry": ry,
                "x": rx * WIDTH,
                "y": ry * HEIGHT
            },
            dimensions: {
                "x": map.width || WIDTH,
                "y": map.height || HEIGHT
            },
            doors: doors || []
        }
        // Add tiles to the room
        room.tiles = {}
        for(var r_x = 0; r_x < map.width; r_x++) {
            for(var r_y = 0; r_y < map.height; r_y++) {
                var value = map.layers[0].data[r_y * map.width + r_x] - 1
                var x = rx * WIDTH + r_x
                var y = ry * HEIGHT + r_y
                var tile = {
                    "value": value,
                    "position": {
                        "r_x": r_x,
                        "r_y": r_y,
                        "x": x,
                        "y": y,
                        "rx": rx,
                        "ry": ry
                    }
                }
                room.tiles[r_x + "x" + r_y] = tile
                this.data.tiles[x + "x" + y] = tile
            }
        }
        
        // Change some tiles into doors
        for(var index in room.doors) {
            var door = room.doors[index]
            if(door == "north") {
                var x = (room.dimensions.x - 1) / 2
                room.tiles[x + "x" + 0].value = 0
            } else if(door == "south") {
                var x = (room.dimensions.x - 1) / 2
                var y = room.dimensions.y - 1
                room.tiles[x + "x" + y].value = 0
            } else if(door == "west") {
                var y = (room.dimensions.y - 1) / 2
                room.tiles[0 + "x" + y].value = 0
            } else if(door == "east") {
                var x = room.dimensions.x - 1
                var y = (room.dimensions.y - 1) / 2
                room.tiles[x + "x" + y].value = 0
            }
        }
        
        // Save to the dungeon
        var rx = room.position.rx
        var ry = room.position.ry
        this.data.rooms[rx + "x" + ry] = room
        return room
    },
    getRoom: function(position) {
        return this.data.rooms[position.rx + "x" + position.ry]
    },
    hasTileAt: function(x, y) {
        var x = Math.floor(x)
        var y = Math.floor(y)
        return this.data.tiles[x + "x" + y].value == 1
    }
})

module.exports = DungeonStore
