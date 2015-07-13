//this function assumes and b are both
//objects that have the following properties:
//    x
//    y
//    width
//    height
// where x and y are anchored at the center
// of the entity, and both position (x and y)
// and dimensions (width and height) are in ems.

function isIntersecting(a, b)
{
    var ax1 = a.x - (a.width / 2)
    var ax2 = a.x + (a.width / 2)
    var ay1 = a.y - (a.height / 2)
    var ay2 = a.y + (a.height / 2)
    var bx1 = b.x - (b.width / 2)
    var bx2 = b.x + (b.width / 2)
    var by1 = b.y - (b.height / 2)
    var by2 = b.y + (b.height / 2)

    if(ax1 > bx2) {return false}
    if(ay1 > by2) {return false}
    if(ax2 < bx1) {return false}
    if(ay2 < by1) {return false}

    return true
}

module.exports = isInteresecting
