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
            zoom: 1,
            speed: 2
        }
    },
    update: function(tick) {
        var hero = this.data
        var room = DungeonStore.getRoom(hero.target.position)
        
        if(Keyb.isJustDown("W")
        || Keyb.isJustDown("<up>")) {
            if(room.doors.indexOf("north") != -1) {
                hero.target.position.ry -= 1
            }
        } if(Keyb.isJustDown("S")
        || Keyb.isJustDown("<down>")) {
            if(room.doors.indexOf("south") != -1) {
                hero.target.position.ry += 1
            }
        } if(Keyb.isJustDown("A")
        || Keyb.isJustDown("<left>")) {
            if(room.doors.indexOf("west") != -1) {
                hero.target.position.rx -= 1
            }
        } if(Keyb.isJustDown("D")
        || Keyb.isJustDown("<right>")) {
            if(room.doors.indexOf("east") != -1) {
                hero.target.position.rx += 1
            }
        } if(Keyb.isJustDown("<space>")) {
            hero.camera.zoom += 1
        }
        
        hero.target.position.x = hero.target.position.rx * RWIDTH
        hero.target.position.y = hero.target.position.ry * RHEIGHT
        hero.camera.position.x = hero.target.position.x
        hero.camera.position.y = hero.target.position.y
        
        /*if(hero.camera.position.x != hero.target.position.x) {
            if(Math.abs((hero.target.position.x - hero.camera.position.x) / 2) > 0.1) {
                hero.camera.position.x += (hero.target.position.x - hero.camera.position.x) / 2
            } else {
                hero.camera.position.x = hero.target.position.x
            }
        } if(hero.camera.position.y != hero.target.position.y) {
            if(Math.abs((hero.target.position.y - hero.camera.position.y) / 2) > 0.1) {
                hero.camera.position.y += (hero.target.position.y - hero.camera.position.y) / 2
            } else {
                hero.camera.position.y = hero.target.position.y
            }
        }*/
        
        this.trigger()
    }
})

module.exports = HeroStore
