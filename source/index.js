window.React = require("react")
window.Hammer = require("hammerjs")
window.Phlux = require("phlux")
window.Keyb = require("keyb")
window.Input = require("keyb")
window.Loop = require("tickly").loop
window.Random = require("seedrandom")(Date.now())

window.RWIDTH = 11
window.RHEIGHT = 9

var Hero = require("<scripts>/views/Hero")
var Camera = require("<scripts>/views/Camera")
var Dungeon = require("<scripts>/views/Dungeon")
var GameFrame = require("<scripts>/views/GameFrame")

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
                    <Dungeon data={this.state["dungeon"]}/>
                    <Hero data={this.state["hero"]}/>
                </Camera>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Loop(function(tick) {
            HeroStore.update(tick)
        })
    }
})

React.render(<Renothingness/>, document.body)
