var Hero = React.createClass({
  render: function() {
    return (
      <div style={this.renderStyles()}/>
    )
  },
  renderStyles: function() {
    var hero = this.props.hero
    return {
      top: hero.y - (hero.height / 2) + "em",
      left: hero.x - (hero.width / 2) + "em",
      width: hero.width + "em",
    	height: hero.height + "em",
    	overflow: "hidden",
    	position: "absolute",
    	backgroundColor: "red",
      borderRadius: "0.2em"
    }
  }
})

module.exports = Hero
