var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        var x = this.props.data.position.x + this.props.data.offset.x
        var y = this.props.data.position.y + this.props.data.offset.y
        var z = 1 / this.props.data.z
        return {
            "top": y + "em",
            "left": x + "em",
            "fontSize": z + "em",
            "position": "absolute"
        }
    }
})

module.exports = Camera
