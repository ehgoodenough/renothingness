var Input = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}/>
        )
    },
    renderStyles: function() {
        return {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "fixed"
        }
    },
    onMouseDown: function(event) {
        event.preventDefault()
        console.log(event.pageX, event.pageY)
    },
    onMouseMove: function(event) {
        event.preventDefault()
        //console.log(event.pageX, event.pageY)
    },
    onMouseUp: function(event) {
        event.preventDefault()
        //console.log(event.pageX, event.pageY)
    }
})

module.exports = Input
