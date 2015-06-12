var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        var x = this.props.data.camera.position.x * -1
        var y = this.props.data.camera.position.y * -1
        var z = 1 / (this.props.data.camera.zoom || 1)
        return {
            "top": y + "em",
            "left": x + "em",
            "fontSize": z + "em",
            "position": "absolute",
            "transitionDuration": "0.5s",
            "transitionProperty": "fontSize"
        }
    }
})

module.exports = Camera
