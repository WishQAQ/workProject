Page({    
    data: {
      longitude: 120.131441,
      latitude: 30.279383,
      polyline: [],
    },
    mapTap(e){
      console.log(e)
    },
    routeHandle(e){
      let polyline = [{
        points: [{
          longitude: 120.131441,
          latitude: 30.279383
        }, {
          longitude: 120.128821,
          latitude: 30.278200
        }, {
          longitude: 120.131618,
          latitude: 30.277600
        }, {
          longitude: 120.132520,
          latitude: 30.279393
        }, {
          longitude: 120.137517,
          latitude: 30.279383
        }],
        color: "#FF0000DD",
        width: 5,
        dottedLine: false
      }]

      this.data.polyline = this.data.polyline.length ? [] : polyline
      this.setData({ polyline : this.data.polyline })
    },
    onControlTap(e){
      console.log(e)
    }
})
