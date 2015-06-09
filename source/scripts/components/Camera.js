var Camera = React.createClass({
    propTypes: {
        target: React.PropTypes.shape({
            position: React.PropTypes.shape({
                x: React.PropTypes.number.isRequired,
                y: React.PropTypes.number.isRequired
            })
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
        var x = Math.floor(this.props.target.position.x / WIDTH) * WIDTH * -1
        var y = Math.floor(this.props.target.position.y / HEIGHT) * HEIGHT * -1
        return {
            "top": y + "em",
            "left": x + "em",
            "position": "absolute",
            "transitionDuration": "0.5s",
            "transitionProperty": "top left"
        }
    }
})

module.exports = Camera
