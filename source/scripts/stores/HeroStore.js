var DungeonStore = require("<scripts>/stores/DungeonStore")

var HeroStore = Phlux.createStore({
    data: {
        position: {
            x: (WIDTH / 2),
            y: (HEIGHT / 2)
        },
        velocity: {
            x: 0, y: 0,
            max: 0.2
        },
        acceleration: 3,
        deacceleration: 1.25,
        direction: "south",
        width: 1,
        height: 1,
        health: 3
    },
    iterate: function(tick) {
        // Input Polling
        if(Keyb.isDown("W") || Keyb.isDown("<up>")) {
            this.data.direction = "north"
            this.data.velocity.y -= this.data.acceleration * tick
            if(this.data.velocity.y < -this.data.velocity.max) {
                this.data.velocity.y = -this.data.velocity.max
            }
        }
        if(Keyb.isDown("S") || Keyb.isDown("<down>")) {
            this.data.direction = "south"
            this.data.velocity.y +=  this.data.acceleration * tick
            if(this.data.velocity.y > this.data.velocity.max) {
                this.data.velocity.y = this.data.velocity.max
            }
        }
        if(Keyb.isDown("A") || Keyb.isDown("<left>")) {
            this.data.direction = "west"
            this.data.velocity.x -= this.data.acceleration * tick
            if(this.data.velocity.x < -this.data.velocity.max) {
                 this.data.velocity.x = -this.data.velocity.max
            }
        }
        if(Keyb.isDown("D") || Keyb.isDown("<right>")) {
            this.data.direction = "east"
            this.data.velocity.x += this.data.acceleration * tick
            if(this.data.velocity.x > this.data.velocity.max) {
                 this.data.velocity.x = this.data.velocity.max
            }
        }
        // Collision and Translation
        if(!DungeonStore.hasTileAt(this.data.position.x + this.data.velocity.x, this.data.position.y)) {
            this.data.position.x += this.data.velocity.x
        }
        if(!DungeonStore.hasTileAt(this.data.position.x, this.data.position.y + this.data.velocity.y)) {
            this.data.position.y += this.data.velocity.y
        }
        // Deacceleration
        if(this.data.velocity.y > 0) {
            this.data.velocity.y -= this.data.deacceleration * tick
            if(this.data.velocity.y < 0) {
                this.data.velocity.y = 0
            }
        } else if(this.data.velocity.y < 0) {
            this.data.velocity.y += this.data.deacceleration * tick
            if(this.data.velocity.y > 0) {
                this.data.velocity.y = 0
            }
        }
        if(this.data.velocity.x > 0) {
            this.data.velocity.x -= this.data.deacceleration * tick
            if(this.data.velocity.x < 0) {
                this.data.velocity.x = 0
            }
        } else if(this.data.velocity.x < 0) {
            this.data.velocity.x += this.data.deacceleration * tick
            if(this.data.velocity.x > 0) {
                this.data.velocity.x = 0
            }
        }
        this.trigger()
    }
})

module.exports = HeroStore
