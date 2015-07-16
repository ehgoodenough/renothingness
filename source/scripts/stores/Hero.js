var Hero = function(protohero) {
    var hero = this
    for(var key in protohero) {
        hero[key] = protohero[key]
    }
    
    this.target = {
        position: {
            rx: 0,
            ry: 4
        }
    }
    this.entity = {
        position: {
            x: 0,
            y: 0
        }
    }
    this.camera = {
        zoom: 10,
        position: {
            rx: 0,
            ry: 0
        }
    }
}

Hero.prototype.update = function(tick) {
    var key = this.target.position.rx + "x" + this.target.position.ry
    var room = Game.dungeon.rooms[key]
    
    if(Keyb.isJustDown("W")
    || Keyb.isJustDown("<up>")) {
        if(!!room.doorways["NORTH"]) {
            this.target.position.ry -= 1
        }
    } if(Keyb.isJustDown("S")
    || Keyb.isJustDown("<down>")) {
        if(!!room.doorways["SOUTH"]) {
            this.target.position.ry += 1
        }
    } if(Keyb.isJustDown("A")
    || Keyb.isJustDown("<left>")) {
        if(!!room.doorways["WEST"]) {
            this.target.position.rx -= 1
        }
    } if(Keyb.isJustDown("D")
    || Keyb.isJustDown("<right>")) {
        if(!!room.doorways["EAST"]) {
            this.target.position.rx += 1
        }
    }
    
    this.camera.position.rx = this.target.position.rx
    this.camera.position.ry = this.target.position.ry
    this.entity.position.x = (this.target.position.rx * RWIDTH) + (RWIDTH / 2)
    this.entity.position.y = (this.target.position.ry * RHEIGHT) + (RHEIGHT / 2)
}

module.exports = Hero
