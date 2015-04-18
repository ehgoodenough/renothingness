var Input = require("<scripts>/utilities/Input")
var DungeonStore = require("<scripts>/stores/DungeonStore")

var HeroStore = Phlux.createStore("Hero", {
    data: {
        x: 1.5,
        y: 1.5,
        vy: 0,
        vx: 0,
        speed: 3,
        maxVelocity: 0.2,
        deacceleration: 1.25,
        direction: "south",
        width: 1,
        height: 1,
        health: 3
    },
    initiateStore: function() {
        this.on
    },
    moveNorth: function() {
        this.data.direction = "north"
        this.data.vy +=  this.data.speed * tick
        if(this.data.vy > this.data.maxVelocity) {
            this.data.vy = this.data.maxVelocity
        }
    },
    moveSouth: function() {
        this.data.direction = "south"
        this.data.vy -= this.data.speed * tick
        if(this.data.vy < -this.data.maxVelocity) {
            this.data.vy = -this.data.maxVelocity
        }
    },
    moveWest: function() {
        this.data.direction = "west"
        this.data.vx -= this.data.speed * tick
        if(this.data.vx < -this.data.maxVelocity) {
             this.data.vx = -this.data.maxVelocity
        }
    },
    moveEast: function() {
        this.data.direction = "east"
        this.data.vx += this.data.speed * tick
        if(this.data.vx > this.data.maxVelocity) {
             this.data.vx = this.data.maxVelocity
        }
    },
    onTick: function(tick) {
        if(this.data.vy > 0) {
            this.data.vy -= this.data.deacceleration * tick
            if(this.data.vy < 0) {
                this.data.vy = 0
            }
        } else if(this.data.vy < 0) {
            this.data.vy += this.data.deacceleration * tick
            if(this.data.vy > 0) {
                this.data.vy = 0
            }
        }
        if(this.data.vx > 0) {
            this.data.vx -= this.data.deacceleration * tick
            if(this.data.vx < 0) {
                this.data.vx = 0
            }
        } else if(this.data.vx < 0) {
            this.data.vx += this.data.deacceleration * tick
            if(this.data.vx > 0) {
                this.data.vx = 0
            }
        }
        if(!DungeonStore.hasTileAt(this.data.x + this.data.vx, this.data.y)) {
            this.data.x += this.data.vx
        }
        if(!DungeonStore.hasTileAt(this.data.x, this.data.y + this.data.vy)) {
            this.data.y += this.data.vy
        }
        //if(isIntersecting(Hero, Blue)) {
        //    console.log("red takes damage")
        //}
        this.trigger()
    }
})

module.exports = HeroStore
