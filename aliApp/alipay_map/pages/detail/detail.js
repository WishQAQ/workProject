Page({
  data: {
    location: {
      longitude: '121.549697',
      latitude: '31.227250',
      name: '支付宝',
      address: '杨高路地铁站',
    }
  },
  onLoad() {
    this.stopPullDown()
    this.setNavTitle()
  },
  openLocation() {
    my.openLocation(this.data.location)
  },
  stopPullDown() {
    my.setCanPullDown({
      canPullDown: false
    })
  },
  setNavTitle() {
     my.setNavigationBar({
      title: '党建地图',
      backgroundColor: '#fff'
    })
  }
})

