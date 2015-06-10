window.React = require("react")
window.Hammer = require("hammerjs")
window.Keyb = require("keyb")
window.Tickly = require("tickly")
window.Phlux = require("phlux")
window.Random = require("seedrandom")(1433948752889)
window.IsResizing = require("<scripts>/utilities/IsResizing")

window.WIDTH = 11
window.HEIGHT = 9
window.TILE = 64

var GameFrame = require("<scripts>/components/GameFrame")
var Camera = require("<scripts>/components/Camera")
var Hero = require("<scripts>/components/Hero")

var Dungeon = require("<scripts>/components/Dungeon")

var HeroStore = require("<scripts>/stores/HeroStore")
var DungeonStore = require("<scripts>/stores/DungeonStore")

var CameraStore = Phlux.createStore({
    data: {
        position: {
            x: 0,
            y: 0
        },
        offset: {
            x: 0,
            y: 0
        },
        z: 1
    }
})

var Renothingness = React.createClass({
    mixins: [
        Phlux.connectStore(HeroStore, "hero"),
        Phlux.connectStore(CameraStore, "camera"),
        Phlux.connectStore(DungeonStore, "dungeon")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="11x9">
                <Camera data={this.state["camera"]}>
                    <Dungeon dungeon={this.state["dungeon"]}/>
                    <Hero hero={this.state["hero"]}/>
                </Camera>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            HeroStore.iterate(tick)
        })
        var hammer = new Hammer(document.body)
        hammer.get("pan").set({direction: Hammer.DIRECTION_ALL})
        hammer.on("panup pandown panleft panright panend", function(event) {
            if(event.type == "panup" || event.type == "pandown") {
                if(CameraStore.data.offset.x == 0) {
                    CameraStore.data.offset.y = event.deltaY / getFrameScale()
                }
            } else if(event.type == "panleft" || event.type == "panright") {
                if(CameraStore.data.offset.y == 0) {
                    CameraStore.data.offset.x = event.deltaX / getFrameScale()
                }
            } else if(event.type == "panend") {
                CameraStore.data.position.x += CameraStore.data.offset.x
                CameraStore.data.position.y += CameraStore.data.offset.y
                CameraStore.data.position.x = Math.round(CameraStore.data.position.x / WIDTH) * WIDTH
                CameraStore.data.position.y = Math.round(CameraStore.data.position.y / HEIGHT) * HEIGHT
                CameraStore.data.offset.x = 0
                CameraStore.data.offset.y = 0
            }
            CameraStore.trigger()
        })
    }
})

function getFrameScale() {
    var html = document.getElementById("game-frame")
    var css = window.getComputedStyle(html)
    return Number(css.fontSize.match(/(\d+(\.\d+)?)px$/)[1])
}

React.render(<Renothingness/>, document.body)
