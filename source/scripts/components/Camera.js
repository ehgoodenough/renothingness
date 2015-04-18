var Camera = React.createClass({
    propTypes: {
        target: React.PropTypes.shape({
            x: React.PropTypes.number.isRequired,
            y: React.PropTypes.number.isRequired
        }).isRequired
    },
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        var x = Math.floor(this.props.target.x / WIDTH) * WIDTH
        var y = Math.floor(this.props.target.y / HEIGHT) * HEIGHT
        return {
            "top": y * -1 + "em",
            "left": x * -1 + "em",
            "position": "absolute",
            "transitionDuration": "0.5s",
            "transitionProperty": "top left"
        }
    }
})

module.exports = Camera
