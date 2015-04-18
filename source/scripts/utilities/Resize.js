var debounce = require("debounce")

var onStartResizing = function() {
    document.body.className = "resizing"
}

var onStopResizing = debounce(function() {
    document.body.className = ""
    console.log("stop")
}, 200)

window.addEventListener("resize", function() {
    onStartResizing()
    onStopResizing()
})
