var Hero = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        var hero = this.props.hero
        return {
            position: "absolute",
            width: hero.width + "em",
            height: hero.height + "em",
            top: hero.y - (hero.height / 2) + "em",
            left: hero.x - (hero.width / 2) + "em",
            backgroundColor: "red",
            overflow: "hidden"
        }
    }
})

module.exports = Hero