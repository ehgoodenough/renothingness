window.React = require("react")
window.Hammer = require("hammerjs")
window.Tickly = require("tickly")
window.Phlux = require("phlux")
window.Keyb = require("keyb")
window.vkey = require("vkey")
window.Random = require("seedrandom")(Date.now())
window.IsResizing = require("<scripts>/utilities/IsResizing")

window.WIDTH = 11
window.HEIGHT = 9
window.RWIDTH = 11
window.RHEIGHT = 9
window.TILE = 64

var Hero = require("<scripts>/components/Hero")
var Camera = require("<scripts>/components/Camera")
var Dungeon = require("<scripts>/components/Dungeon")
var GameFrame = require("<scripts>/components/GameFrame")

var HeroStore = require("<scripts>/stores/HeroStore")
var DungeonStore = require("<scripts>/stores/DungeonStore")

window.getFrameScale = function() {
    var html = document.getElementById("game-frame")
    var css = window.getComputedStyle(html)
    return Number(css.fontSize.match(/(\d+(\.\d+)?)px$/)[1])
}

var Renothingness = React.createClass({
    mixins: [
        Phlux.connectStore(HeroStore, "hero"),
        Phlux.connectStore(DungeonStore, "dungeon")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="11x9">
                <Camera data={this.state["hero"]}>
                    <Dungeon dungeon={this.state["dungeon"]}/>
                </Camera>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            HeroStore.update(tick)
        })
    }
})

React.render(<Renothingness/>, document.body)
