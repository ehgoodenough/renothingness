var Directions = require("<scripts>/data/Directions")
var Tilesets = require("<scripts>/data/Tilesets")
var Tilemaps = require("<scripts>/data/Tilemaps")

var Protodungeon = [
    {
        "position": {"rx": 0, "ry": 0},
        "doorways": [
            Directions.SOUTH //critpath
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.empty,
        "isInitialRoom": true,
    },
    {
        "position": {"rx": 0, "ry": 1},
        "doorways": [
            Directions.NORTH,
            Directions.WEST //critpath
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.blob
        //has save point
    },
    {
        "position": {
            "rx": -1,
            "ry": 1,
        },
        "doorways": [
            Directions.EAST,
            Directions.SOUTH //critpath
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.fourdots
        //has 4 pots
    },
    {
        "position": {
            "rx": -1,
            "ry": 2,
        },
        "doorways": [
            Directions.NORTH,
            Directions.SOUTH, //critpath
            Directions.EAST,
            Directions.WEST
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.circle
        //has 4 pots
    },
    {
        "position": {
            "rx": 0,
            "ry": 2,
        },
        "doorways": [
            Directions.WEST
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.sixdots
        //has chest
    },
    {
        "position": {
            "rx": -2,
            "ry": 2,
        },
        "doorways": [
            Directions.EAST
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.twodots
        //has key
    },
    {
        "position": {
            "rx": -1,
            "ry": 3,
        },
        "doorways": [
            Directions.NORTH,
            Directions.SOUTH //critpath //needs key
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.diamond
        //has save point
    },
    {
        "position": {
            "rx": -1,
            "ry": 4,
        },
        "doorways": [
            Directions.NORTH,
            Directions.WEST,
            Directions.EAST //critpath
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.oval
    },
    {
        "position": {
            "rx": -2,
            "ry": 4,
        },
        "doorways": [
            Directions.NORTH,
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.southeast
        //has sign
    },
    {
        "position": {
            "rx": -3,
            "ry": 4,
        },
        "doorways": [
            Directions.NORTH,
            Directions.SOUTH, //needs bomb
            Directions.EAST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.southwest
        //has person who can talk
    },
    {
        "position": {
            "rx": -3,
            "ry": 3,
        },
        "doorways": [
            Directions.SOUTH,
            Directions.EAST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.northwest
        //has chest
    },
    {
        "position": {
            "rx": -2,
            "ry": 3,
        },
        "doorways": [
            Directions.SOUTH,
            Directions.WEST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.northeast
        //has shop
    },
    {
        "position": {
            "rx": 0,
            "ry": 4,
        },
        "doorways": [
            Directions.NORTH,
            Directions.SOUTH, //critpath //needs 3 keys
            Directions.WEST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.corners
        //has save point
        //has 4 pots
    },
    {
        "position": {
            "rx": 0,
            "ry": 3,
        },
        "doorways": [
            Directions.SOUTH,
            Directions.EAST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.horizontals
    },
    {
        "position": {
            "rx": 1,
            "ry": 3,
        },
        "doorways": [
            Directions.NORTH,
            Directions.SOUTH,
            Directions.WEST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.whirl
    },
    {
        "position": {
            "rx": 1,
            "ry": 2,
        },
        "doorways": [
            Directions.SOUTH
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.spiral
        //has key
    },
    {
        "position": {
            "rx": 1,
            "ry": 4,
        },
        "doorways": [
            Directions.NORTH,
            Directions.SOUTH,
            Directions.EAST,
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.parallels
    },
    {
        "position": {
            "rx": 2,
            "ry": 4,
        },
        "doorways": [
            Directions.WEST,
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.quotes
        //has key
    },
    {
        "position": {
            "rx": 1,
            "ry": 5,
        },
        "doorways": [
            Directions.NORTH,
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.blob
        //has key
    },
    {
        "position": {
            "rx": 0,
            "ry": 5,
        },
        "doorways": [
            Directions.NORTH,
            Directions.WEST //critpath
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.dot
    },
    {
        "position": {
            "rx": -1,
            "ry": 5,
        },
        "doorways": [
            Directions.SOUTH, //critpath //needs key
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.twist
    },
    {
        "position": {
            "rx": -2,
            "ry": 5,
        },
        "doorways": [
            Directions.SOUTH,
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.brackets
        //has save point
        //has 4 pots
    },
    {
        "position": {
            "rx": -3,
            "ry": 5,
        },
        "doorways": [
            Directions.NORTH, //needs bomb
            Directions.SOUTH,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.fivedots
    },
    {
        "position": {
            "rx": -3,
            "ry": 6,
        },
        "doorways": [
            Directions.NORTH
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.yinyang
        //has chest //needs chest key //has key
    },
    {
        "position": {
            "rx": -2,
            "ry": 6,
        },
        "doorways": [
            Directions.NORTH,
            Directions.SOUTH
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.blob
    },
    {
        "position": {
            "rx": -2,
            "ry": 7,
        },
        "doorways": [
            Directions.NORTH,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.parentheses
        //has 2 pots
    },
    {
        "position": {
            "rx": -1,
            "ry": 7,
        },
        "doorways": [
            Directions.SOUTH,
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.cave
    },
    {
        "position": {
            "rx": -1,
            "ry": 8,
        },
        "doorways": [
            Directions.NORTH,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.horizontals
        //has 1 pot
    },
    {
        "position": {
            "rx": 0,
            "ry": 8,
        },
        "doorways": [
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.box
        //has chest
    },
    {
        "position": {
            "rx": 1,
            "ry": 8,
        },
        "doorways": [
            Directions.NORTH,
            Directions.WEST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.verticals
        //has 1 pot
    },
    {
        "position": {
            "rx": 1,
            "ry": 7,
        },
        "doorways": [
            Directions.SOUTH,
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.noise
    },
    {
        "position": {
            "rx": 0,
            "ry": 7,
        },
        "doorways": [
            Directions.NORTH,
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.sixdots
    },
    {
        "position": {
            "rx": 0,
            "ry": 6,
        },
        "doorways": [
            Directions.SOUTH
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.twelvedots
        //has 12 pots
    },
    {
        "position": {
            "rx": 2,
            "ry": 7,
        },
        "doorways": [
            Directions.NORTH,
            Directions.WEST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.blob
    },
    {
        "position": {
            "rx": 2,
            "ry": 6,
        },
        "doorways": [
            Directions.SOUTH,
            Directions.WEST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.diagonals
        //has 4 pots
    },
    {
        "position": {
            "rx": 1,
            "ry": 6,
        },
        "doorways": [
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.circle
        //has chest key
    },
    {
        "position": {
            "rx": -1,
            "ry": 6,
        },
        "isFinalRoom": true,
        "doorways": [
            Directions.NORTH
        ],
        "tileset": Tilesets[3],
        "tilemap": Tilemaps.clamp
    }
]

module.exports = Protodungeon
