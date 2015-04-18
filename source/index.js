window.React = require("react")
window.Phlux = require("<scripts>/utilities/Phlux")

window.WIDTH = 11
window.HEIGHT = 9

var Loop = require("<scripts>/utilities/Loop")
var Input = require("<scripts>/utilities/Input")
var Resize = require("<scripts>/utilities/Resize")

var Hero = require("<scripts>/components/Hero")
var Dungeon = require("<scripts>/components/Dungeon")
var GameFrame = require("<scripts>/components/GameFrame")
var Camera = require("<scripts>/components/Camera")

var HeroStore = require("<scripts>/stores/HeroStore")
var DungeonStore = require("<scripts>/stores/DungeonStore")

var Renothingness = React.createClass({
    mixins: [
        Phlux.connectStore(HeroStore, "hero"),
        Phlux.connectStore(DungeonStore, "dungeon")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="11x9">
                <Camera target={this.state.hero}>
                    <Dungeon dungeon={this.state.dungeon}/>
                    <Hero hero={this.state.hero}/>
                </Camera>
            </GameFrame>
        )
    }
})

React.render(<Renothingness/>, document.body)
