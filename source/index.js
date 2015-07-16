window.React = require("react")
window.Hammer = require("hammerjs")
window.Phlux = require("phlux")
window.Keyb = require("keyb")
window.Input = require("keyb")
window.Loop = require("tickly").loop
window.Random = require("seedrandom")(Date.now())

window.RWIDTH = 11
window.RHEIGHT = 9

var Camera = require("<scripts>/views/Camera")
var GameFrame = require("<scripts>/views/GameFrame")

var Hero = require("<scripts>/stores/Hero")
var HeroView = require("<scripts>/views/HeroView")
var Dungeon = require("<scripts>/stores/Dungeon")
var DungeonView = require("<scripts>/views/DungeonView")

var protohero = require("<scripts>/data/Protohero")
var protodungeon = require("<scripts>/data/Protodungeon")

window.Game = {
    "hero": new Hero(protohero),
    "dungeon": new Dungeon(protodungeon),
}

var Renothingness = React.createClass({
    getInitialState: function() {
        return Game
    },
    render: function() {
        return (
            <GameFrame aspect-ratio="11x9">
                <Camera data={this.state["hero"]}>
                    <DungeonView data={this.state["dungeon"]}/>
                    <HeroView data={this.state["hero"]}/>
                </Camera>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Loop(function(tick) {
            Game.hero.update(tick)
            this.setState(Game)
        }.bind(this))
    }
})

React.render(<Renothingness/>, document.body)
