var Directions = require("<scripts>/utilities/Directions")
var Tilesets = require("<scripts>/data/Tilesets")
var Tilemaps = require("<scripts>/data/Tilemaps")

var Protodungeon = [
    {
        "rx": 0, "ry": 0,
        "isInitialRoom": true,
        "directions": [
            Directions.SOUTH //critpath
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.empty
    },
    {
        "rx": 0, "ry": 1,
        "directions": [
            Directions.NORTH,
            Directions.WEST //critpath
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.blob
        //has save point
    },
    {
        "rx": -1, "ry": 1,
        "directions": [
            Directions.EAST,
            Directions.SOUTH //critpath
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.fourdots
        //has 4 pots
    },
    {
        "rx": -1, "ry": 2,
        "directions": [
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
        "rx": 0, "ry": 2,
        "directions": [
            Directions.WEST
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.sixdots
        //has chest
    },
    {
        "rx": -2, "ry": 2,
        "directions": [
            Directions.EAST
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.twodots
        //has key
    },
    {
        "rx": -1, "ry": 3,
        "directions": [
            Directions.NORTH,
            Directions.SOUTH //critpath //needs key
        ],
        "tileset": Tilesets[0],
        "tilemap": Tilemaps.diamond
        //has save point
    },
    {
        "rx": -1, "ry": 4,
        "directions": [
            Directions.NORTH,
            Directions.WEST,
            Directions.EAST //critpath
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.oval
    },
    {
        "rx": -2, "ry": 4,
        "directions": [
            Directions.NORTH,
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.southeast
        //has sign
    },
    {
        "rx": -3, "ry": 4,
        "directions": [
            Directions.NORTH,
            Directions.SOUTH, //needs bomb
            Directions.EAST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.southwest
        //has person who can talk
    },
    {
        "rx": -3, "ry": 3,
        "directions": [
            Directions.SOUTH,
            Directions.EAST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.northwest
        //has chest
    },
    {
        "rx": -2, "ry": 3,
        "directions": [
            Directions.SOUTH,
            Directions.WEST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.northeast
        //has shop
    },
    {
        "rx": 0, "ry": 4,
        "directions": [
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
        "rx": 0, "ry": 3,
        "directions": [
            Directions.SOUTH,
            Directions.EAST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.horizontals
    },
    {
        "rx": 1, "ry": 3,
        "directions": [
            Directions.NORTH,
            Directions.SOUTH,
            Directions.WEST
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.whirl
    },
    {
        "rx": 1, "ry": 2,
        "directions": [
            Directions.SOUTH
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.spiral
        //has key
    },
    {
        "rx": 1, "ry": 4,
        "directions": [
            Directions.NORTH,
            Directions.SOUTH,
            Directions.EAST,
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.parallels
    },
    {
        "rx": 2, "ry": 4,
        "directions": [
            Directions.WEST,
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.quotes
        //has key
    },
    {
        "rx": 1, "ry": 5,
        "directions": [
            Directions.NORTH,
        ],
        "tileset": Tilesets[1],
        "tilemap": Tilemaps.blob
        //has key
    },
    {
        "rx": 0, "ry": 5,
        "directions": [
            Directions.NORTH,
            Directions.WEST //critpath
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.dot
    },
    {
        "rx": -1, "ry": 5,
        "directions": [
            Directions.SOUTH, //critpath //needs key
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.twist
    },
    {
        "rx": -2, "ry": 5,
        "directions": [
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
        "rx": -3, "ry": 5,
        "directions": [
            Directions.NORTH, //needs bomb
            Directions.SOUTH,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.fivedots
    },
    {
        "rx": -3, "ry": 6,
        "directions": [
            Directions.NORTH
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.yinyang
        //has chest //needs chest key //has key
    },
    {
        "rx": -2, "ry": 6,
        "directions": [
            Directions.NORTH,
            Directions.SOUTH
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.blob
    },
    {
        "rx": -2, "ry": 7,
        "directions": [
            Directions.NORTH,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.parentheses
        //has 2 pots
    },
    {
        "rx": -1, "ry": 7,
        "directions": [
            Directions.SOUTH,
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.cave
    },
    {
        "rx": -1, "ry": 8,
        "directions": [
            Directions.NORTH,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.horizontals
        //has 1 pot
    },
    {
        "rx": 0, "ry": 8,
        "directions": [
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.box
        //has chest
    },
    {
        "rx": 1, "ry": 8,
        "directions": [
            Directions.NORTH,
            Directions.WEST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.verticals
        //has 1 pot
    },
    {
        "rx": 1, "ry": 7,
        "directions": [
            Directions.SOUTH,
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.noise
    },
    {
        "rx": 0, "ry": 7,
        "directions": [
            Directions.NORTH,
            Directions.WEST,
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.sixdots
    },
    {
        "rx": 0, "ry": 6,
        "directions": [
            Directions.SOUTH
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.twelvedots
        //has 12 pots
    },
    {
        "rx": 2, "ry": 7,
        "directions": [
            Directions.NORTH,
            Directions.WEST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.blob
    },
    {
        "rx": 2, "ry": 6,
        "directions": [
            Directions.SOUTH,
            Directions.WEST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.diagonals
        //has 4 pots
    },
    {
        "rx": 1, "ry": 6,
        "directions": [
            Directions.EAST
        ],
        "tileset": Tilesets[2],
        "tilemap": Tilemaps.circle
        //has chest key
    },
    {
        "rx": -1, "ry": 6,
        "isFinalRoom": true,
        "directions": [
            Directions.NORTH
        ],
        "tileset": Tilesets[3],
        "tilemap": Tilemaps.clamp
    }
]

module.exports = Protodungeon
