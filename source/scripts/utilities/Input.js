var vkey = require("vkey")

var KeyboardInput = {
    data: {/*keys go here*/},
    isHammered: function(key) {
        return this.data[key] === true
    },
    hammer: function(key) {
        this.data[key] = true
    },
    unhammer: function(key) {
        delete this.data[key]
    }
}

document.addEventListener("keydown", function(event) {
    var key = vkey[event.keyCode]
    if(!KeyboardInput.isHammered(key)) {
        KeyboardInput.hammer(key)
    }
})

document.addEventListener("keyup", function(event) {
    var key = vkey[event.keyCode]
    KeyboardInput.unhammer(key)
})

module.exports = null
