var DungeonStore = require("<scripts>/stores/DungeonStore")

var HeroStore = Phlux.createStore({
    data: {
        target: {
            position: {
                "rx": 0,
                "ry": 0
            }
        },
        entity: {
            position: {
                "x": 0,
                "y": 0
            }
        },
        camera: {
            position: {
                "rx": 0,
                "ry": 0
            },
            zoom: 10
        }
    },
    update: function(tick) {
        var hero = this.data
        var room = DungeonStore.getRoom(hero.target.position.rx, hero.target.position.ry)
        
        if(Keyb.isJustDown("W")
        || Keyb.isJustDown("<up>")) {
            if(room.hasDirection("NORTH")) {
                hero.target.position.ry -= 1
            }
        } if(Keyb.isJustDown("S")
        || Keyb.isJustDown("<down>")) {
            if(room.hasDirection("SOUTH")) {
                hero.target.position.ry += 1
            }
        } if(Keyb.isJustDown("A")
        || Keyb.isJustDown("<left>")) {
            if(room.hasDirection("WEST")) {
                hero.target.position.rx -= 1
            }
        } if(Keyb.isJustDown("D")
        || Keyb.isJustDown("<right>")) {
            if(room.hasDirection("EAST")) {
                hero.target.position.rx += 1
            }
        }
        
        hero.camera.position.rx = hero.target.position.rx
        hero.camera.position.ry = hero.target.position.ry
        hero.entity.position.x = hero.target.position.rx * RWIDTH + (RWIDTH / 2)
        hero.entity.position.y = hero.target.position.ry * RHEIGHT + (RHEIGHT / 2)
        
        if(Keyb.isJustDown("<space>")) {
            hero.camera.zoom += 1
        }
        
        this.trigger()
    }
})

module.exports = HeroStore
