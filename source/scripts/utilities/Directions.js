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

module.exports = Directions
