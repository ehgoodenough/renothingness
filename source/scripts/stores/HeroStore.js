var Input = require("<scripts>/utilities/Input")
var DungeonStore = require("<scripts>/stores/DungeonStore")

var HeroStore = Reflux.createStore({
	data: {
		x: 1.5,
		y: 1.5,
		vy: 0,
		vx: 0,
		speed: 2,
		maxVelocity: 0.1,
		deacceleration: 1.25,
		direction: "south",
		width: 0.5,
		height: 1,
		health: 3
	},
	getData: function() {
		return this.data
	},
	update: function(tick) {
		//////////
		//Input//
		////////
		if(Input.hasKey(83)) {
			this.data.direction = "north"
			this.data.vy +=  this.data.speed * tick
			if(this.data.vy > this.data.maxVelocity) {
				this.data.vy = this.data.maxVelocity
			}
		}
		if(Input.hasKey(87)) {
			this.data.direction = "south"
			this.data.vy -= this.data.speed * tick
			if(this.data.vy < -this.data.maxVelocity) {
				this.data.vy = -this.data.maxVelocity
			}
		}
		if(Input.hasKey(65)) {
			this.data.direction = "west"
			this.data.vx -= this.data.speed * tick
			if(this.data.vx < -this.data.maxVelocity) {
				 this.data.vx = -this.data.maxVelocity
			}
		}
		if(Input.hasKey(68)) {
			this.data.direction = "east"
			this.data.vx += this.data.speed * tick
			if(this.data.vx > this.data.maxVelocity) {
				 this.data.vx = this.data.maxVelocity
			}
		}
		///////////////////
		//Deacceleration//
		/////////////////
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
		//////////////
		//Collision//
		////////////
	  if(!DungeonStore.hasTileAt(this.data.x + this.data.vx, this.data.y)) {
      this.data.x += this.data.vx
	  }
	  if(!DungeonStore.hasTileAt(this.data.x, this.data.y + this.data.vy)) {
      this.data.y += this.data.vy
	  }
	  //if(isIntersecting(Hero, Blue)) {
      //console.log("red takes damage")
	  //}
		this.retrigger()
	}
})

module.exports = HeroStore
