var startResizing = function() {
    document.body.className = "is-resizing"
}

var stopResizing = require("debounce")(function() {
    document.body.className = ""
}, 200)

window.addEventListener("resize", function() {
    startResizing()
    stopResizing()
})
