var Dungeon = React.createClass({
    render: function() {
        return (
            <div>
                {this.renderRooms()}
            </div>
        )
    },
    renderRooms: function() {
        var renderings = []
        for(var coords in this.props.data.rooms) {
            var room = this.props.data.rooms[coords]
            renderings.push(
                <DungeonRoom key={coords} data={room}/>
            )
        }
        return renderings
    }
})

var DungeonRoom = React.createClass({
    render: function() {
        return (
            <canvas ref="canvas"
                style={this.renderStyles()}
                width={this.props.data.width * 64}
                height={this.props.data.height * 64}/>
        )
    },
    renderStyles: function() {
        return {
            "position": "absolute",
            "top": this.props.data.y + "em",
            "left": this.props.data.x + "em",
            "width": this.props.data.width + "em",
            "height": this.props.data.height + "em"
        }
    },
    renderCanvas: function() {
        var canvas = this.refs.canvas.getDOMNode().getContext("2d")
        for(var coords in this.props.data.tiles) {
            var tile = this.props.data.tiles[coords]
            canvas.fillStyle = this.props.data.colors[tile.value]
            canvas.fillRect(tile.r_x * 64, tile.r_y * 64, 64, 64)
        }
    },
    componentDidMount: function() {
        this.renderCanvas()
    },
    shouldComponentUpdate: function(props) {
        return false
    },
    componentDidUpdate: function() {
        this.renderCanvas()
    }
})

module.exports = Dungeon
