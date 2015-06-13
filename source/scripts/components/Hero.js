var Hero = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        var x = this.props.data.entity.position.x - (1 / 2)
        var y = this.props.data.entity.position.y - (1 / 2)
        return {
            position: "absolute",
            width: 1 + "em",
            height: 1 + "em",
            top: y + "em",
            left: x + "em",
            backgroundColor: "red"
        }
    }
})

module.exports = Hero
