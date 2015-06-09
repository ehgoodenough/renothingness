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
            var tile = this.props.dungeon.tiles[coords]
            renderings.push(
                <DungeonWallTile key={coords} data={tile}/>
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
            top: this.props.data.position.y + "em",
            left: this.props.data.position.x + "em",
            backgroundColor: "sienna"
        }
    }
})

module.exports = Dungeon
