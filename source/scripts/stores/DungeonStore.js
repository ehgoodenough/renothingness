var tilemaps = [
    require("<assets>/tilemaps/bigdot.json"),
    require("<assets>/tilemaps/fivedots.json"),
    require("<assets>/tilemaps/fourdots.json"),
    require("<assets>/tilemaps/grid.json"),
    require("<assets>/tilemaps/onedot.json")
]

var DungeonStore = Phlux.createStore({
    data: {
        rooms: {},
        tiles: {}
    },
    createRoom: function(rx, ry, map, config) {
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
            doors: config.doors || []
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
        if(room.doors.indexOf("north") != -1) {
            var x = (room.dimensions.x - 1) / 2
            room.tiles[x + "x" + 0].value = 0
        } if(room.doors.indexOf("south") != -1) {
            var x = (room.dimensions.x - 1) / 2
            var y = room.dimensions.y - 1
            room.tiles[x + "x" + y].value = 0
        } if(room.doors.indexOf("west") != -1) {
            var y = (room.dimensions.y - 1) / 2
            room.tiles[0 + "x" + y].value = 0
        } if(room.doors.indexOf("east") != -1) {
            var x = room.dimensions.x - 1
            var y = (room.dimensions.y - 1) / 2
            room.tiles[x + "x" + y].value = 0
        }
        // Save to the dungeon
        var rx = room.position.rx
        var ry = room.position.ry
        this.data.rooms[rx + "x" + ry] = room
    },
    initiateStore: function() {
        this.createRoom(0, 0, tilemaps[3], {doors: ["south"]})
        this.createRoom(0, 1, tilemaps[0], {doors: ["north", "east"]})
        this.createRoom(1, 1, tilemaps[2], {doors: ["west"]})
    },
    hasTileAt: function(x, y) {
        var x = Math.floor(x)
        var y = Math.floor(y)
        return this.data.tiles[x + "x" + y].value == 1
    }
})

module.exports = DungeonStore
