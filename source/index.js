
window.React = require("react")
window.Reflux = require("reflux")
window.Reflux.StoreMethods.getInitialState = function() {if(this.getData) {return this.getData()}}
window.Reflux.StoreMethods.retrigger = function() {if(this.getData) {this.trigger(this.getData())}}

window.WIDTH = 11
window.HEIGHT = 9

var Loop = require("<scripts>/utilities/Loop")
var HeroStore = require("<scripts>/stores/HeroStore.js")
var DungeonStore = require("<scripts>/stores/DungeonStore")

Loop(function(tick) {
	HeroStore.update(tick)
})

var Hero = require("<scripts>/components/Hero")
var Dungeon = require("<scripts>/components/Dungeon")
var GameFrame = require("<scripts>/components/GameFrame")
var Camera = require("<scripts>/components/Camera")

var Renothingness = React.createClass({
	mixins: [
		Reflux.connect(HeroStore, "hero"),
		Reflux.connect(DungeonStore, "dungeon")
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
