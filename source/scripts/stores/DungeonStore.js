var DungeonRoomStore = require("<scripts>/stores/DungeonRoomStore")

var DungeonStore = Reflux.createStore({
	data: {
		tiles: {
      //tiles are put here.
    }
	},
	getData: function() {
		return this.data
	},
	createRoom: function(rx, ry, data)
	{
		var room = DungeonRoomStore.getRandomRoom()
		var roomData = room.layers[0].data
		for (var tx = 0; tx < room.width; tx++) {
			for(var ty = 0; ty < room.height; ty++) {
				if(data.doors.indexOf("north") != -1
				&& tx == 5 && ty == 0) {
					continue;
				}
				if(data.doors.indexOf("south") != -1
				&& tx == 5 && ty == 9-1) {
					continue;
				}
				if(data.doors.indexOf("west") != -1
				&& tx == 0 && ty == 4) {
					continue;
				}
				if(data.doors.indexOf("east") != -1
				&& tx == 11-1 && ty == 4) {
					continue;
				}
				var tile = roomData[ty * room.width + tx]
				if(tile == 2) {
					var x = (rx * 11) + tx
					var y = (ry * 9) + ty
					this.data.tiles[x + "-" + y] = true
				}
			}
		}
	},
  init: function() {
    this.createRoom(0, 0, {doors: ["south"]})
		this.createRoom(0, 1, {doors: ["north", "east"]})
		this.createRoom(1, 1, {doors: ["west"]})
  },
  hasTileAt: function(x, y) {
    var x = Math.floor(x)
    var y = Math.floor(y)
    return this.data.tiles[x + "-" + y] == true
  }
})

module.exports = DungeonStore
