var tilemaps = [
    require("<assets>/tilemaps/bigdot.json"),
    require("<assets>/tilemaps/fivedots.json"),
    require("<assets>/tilemaps/fourdots.json"),
    require("<assets>/tilemaps/grid.json"),
    require("<assets>/tilemaps/onedot.json")
]

var DungeonStore = Phlux.createStore({
    data: {
        tiles: {}
    },
    createRoom: function(rx, ry, data) {
        var room = tilemaps[0]
        room.tiles = room.layers[0].data
        for(var tx = 0; tx < room.width; tx++) {
            for(var ty = 0; ty < room.height; ty++) {
                var tile = room.tiles[ty * room.width + tx] - 1
                if(tile == 1) {
                    var x = (rx * WIDTH) + tx
                    var y = (ry * HEIGHT) + ty
                    this.data.tiles[x + "-" + y] = {
                        "position": {
                            "x": x,
                            "y": y
                        }
                    }
                }
            }
        }
    },
    initiateStore: function() {
        this.createRoom(0, 0, {doors: ["south"]})
        this.createRoom(0, 1, {doors: ["north", "east"]})
        this.createRoom(1, 1, {doors: ["west"]})
    },
    hasTileAt: function(x, y) {
        var x = Math.floor(x)
        var y = Math.floor(y)
        return this.data.tiles[x + "-" + y] != undefined
    }
})

module.exports = DungeonStore
