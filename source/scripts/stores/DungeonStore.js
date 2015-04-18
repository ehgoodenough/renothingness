var DungeonRoomStore = require("<scripts>/stores/DungeonRoomStore")

var DungeonStore = Phlux.createStore("Dungeon", {
    data: {
        tiles: {
          //tiles are put here.
        }
    },
    createRoom: function(rx, ry, data)
    {
        var room = DungeonRoomStore.getRandomRoom()
        var tiles = room.layers[0].data
        for (var tx = 0; tx < room.width; tx++) {
            for(var ty = 0; ty < room.height; ty++) {
                if(data.doors.indexOf("north") != -1
                && tx == (room.width - 1) / 2
                && ty == 0) {
                    continue;
                }
                if(data.doors.indexOf("south") != -1
                && tx == (room.width - 1) / 2
                && ty == room.height - 1) {
                    continue;
                }
                if(data.doors.indexOf("west") != -1
                && tx == 0
                && ty == (room.height - 1) / 2) {
                    continue;
                }
                if(data.doors.indexOf("east") != -1
                && tx == room.width - 1
                && ty == (room.height - 1) / 2) {
                    continue;
                }
                var tile_value = tiles[ty * room.width + tx]
                if(tile_value == 2) {
                    var x = (rx * 11) + tx
                    var y = (ry * 9) + ty
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
