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
            "width": this.props.data.width + "em",
            "height": this.props.data.height + "em",
            "top": this.props.data.position.y + "em",
            "left": this.props.data.position.x + "em",
        }
    },
    renderCanvas: function() {
        var canvas = this.refs.canvas.getDOMNode().getContext("2d")
        for(var coords in this.props.data.tiles) {
            var tile = this.props.data.tiles[coords]
            if(tile.value == 0) {
                canvas.fillStyle = this.props.data.tileset.floor
            } else if(tile.value == 1) {
                canvas.fillStyle = this.props.data.tileset.wall
            }
            canvas.fillRect(tile.position.tx * 64, tile.position.ty * 64, 64, 64)
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
