var CameraStore = Phlux.createStore({
    data: {
        position: {
            x: 0,
            y: 0
        },
        offset: {
            x: 0,
            y: 0
        },
        z: 1
    }
})

module.exports = CameraStore
