var DungeonRoomStore = Reflux.createStore({
  data: {
    rooms: [
      require("<assets>/rooms/bigdot.json"),
      require("<assets>/rooms/fivedots.json"),
      require("<assets>/rooms/fourdots.json"),
      require("<assets>/rooms/grid.json"),
      require("<assets>/rooms/onedot.json")
    ]
  },
  getRandomRoom: function() {
    return this.data.rooms[Math.floor(Math.random() * this.data.rooms.length)]
  }
})

module.exports = DungeonRoomStore
