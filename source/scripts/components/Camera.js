var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        var x = this.props.data.camera.position.rx * RWIDTH * -1
        var y = this.props.data.camera.position.ry * RHEIGHT * -1
        x += ((this.props.data.camera.zoom - 1) * RWIDTH) / 2
        y += ((this.props.data.camera.zoom - 1) * RHEIGHT) / 2
        var z = 1 / (this.props.data.camera.zoom || 1)
        return {
            "top": y + "em",
            "left": x + "em",
            "fontSize": z + "em",
            "position": "absolute",
            "transitionDuration": "0.5s",
            "transitionProperty": "top left"
        }
    }
})

module.exports = Camera
