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
        for(var coords in this.props.dungeon.rooms) {
            var room = this.props.dungeon.rooms[coords]
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
                width={this.props.data.dimensions.x * TILE}
                height={this.props.data.dimensions.y * TILE}/>
        )
    },
    renderStyles: function() {
        return {
            "position": "absolute",
            "top": this.props.data.position.y + "em",
            "left": this.props.data.position.x + "em",
            "width": this.props.data.dimensions.x + "em",
            "height": this.props.data.dimensions.y + "em"
        }
    },
    renderCanvas: function() {
        var colors = {0: "papayawhip", 1: "sienna"}
        var canvas = this.refs.canvas.getDOMNode().getContext("2d")
        for(var coords in this.props.data.tiles) {
            var tile = this.props.data.tiles[coords]
            canvas.fillStyle = colors[tile.value]
            var r_x = tile.position.r_x * 64
            var r_y = tile.position.r_y * 64
            canvas.fillRect(r_x, r_y, 64, 64)
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
