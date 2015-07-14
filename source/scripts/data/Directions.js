var Directions = {
    NORTH: {
        key: "NORTH",
        vector: {
            rx: 0,
            ry: -1,
        },
        getOpposite: function() {
            return Directions.SOUTH
        }
    },
    SOUTH: {
        key: "SOUTH",
        vector: {
            rx: 0,
            ry: +1,
        },
        getOpposite: function() {
            return Directions.NORTH
        }
    },
    WEST: {
        key: "WEST",
        vector: {
            rx: -1,
            ry: 0,
        },
        getOpposite: function() {
            return Directions.EAST
        }
    },
    EAST: {
        key: "EAST",
        vector: {
            rx: +1,
            ry: 0,
        },
        getOpposite: function() {
            return Directions.WEST
        }
    }
}

module.exports = Directions
