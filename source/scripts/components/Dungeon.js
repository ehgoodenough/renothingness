var Dungeon = React.createClass({
    render: function() {
        return (
            <div id="tiles">
                {this.renderTiles()}
            </div>
        )
    },
    renderTiles: function() {
        var renderings = []
        for(var coords in this.props.dungeon.tiles) {
            var x = coords.split("-")[0]
            var y = coords.split("-")[1]
            renderings.push(
                <DungeonWallTile key={coords} x={x} y={y}/>
            )
        }
        return renderings
    }
})

var DungeonWallTile = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            width: "1.0005em",
            height: "1.0005em",
            position: "absolute",
            top: this.props.y + "em",
            left: this.props.x + "em",
            backgroundColor: "sienna"
        }
    }
})

module.exports = Dungeon
