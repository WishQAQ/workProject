Page({
  data: {
    // 筛选器
    items: [
      {name: '0', value: '党组织', image: '/assets/images/organization.png', checkedImage: '../../assets/images/organizationChecked.png', checked: true},
      {name: '1', value: '单位', image: '/assets/images/unit.png', checkedImage: '../../assets/images/unitChecked.png'},
      {name: '2', value: '其他', image: '/assets/images/other.png', checkedImage: '../../assets/images/otherChecked.png'},
    ],

    animationInfo: {},

    // 地图
    // 坐标轴
    longitude: 118.774928,
    latitude: 32.0653,
    // 设置
    setting: {
      showScale: 0,
      showCompass: 0,
    },
    // 点
    markers: [{
      id: 1,
      title: '江苏省台办机关党委',
      iconPath: "/assets/images/points.png",
      latitude: 32.0653,
      longitude: 118.774928,
      width: 20,
      height: 20
    },{
      id: 2,
      title: '鼓楼四条巷3号院',
      iconPath: "/assets/images/points.png",
      latitude: 32.062662,
      longitude: 118.775688,
      width: 20,
      height: 20
    },{
      id: 3,
      title: '江苏省省级机关第一幼儿园',
      iconPath: "/assets/images/points.png",
      latitude: 32.065803,
      longitude: 118.777323,
      width: 20,
      height: 20
    },{
      id: 4,
      title: '琅琊路小学',
      iconPath: "/assets/images/points.png",
      latitude: 32.065603,
      longitude: 118.773,
      width: 20,
      height: 20
    }],

  },
  onLoad() {},

  // 筛选
  onChange(e) {
    console.log(e.detail.value)
  },

  // 地图
  onReady(e) {
    // 使用 my.createMapContext 获取 map 上下文
    this.mapCtx = my.createMapContext('map');
  },
  
  regionchange(e) {
  console.log('regionchange', e);
  // if (e.type === 'begin') {
  //   this.tap();
  // }
	if (e.type === 'end') {
      this.setData({
        scale: e.scale
      });
    }
  },
  
  markertap(e) {
    console.log('显示详情栏');
    this.animation.translateY(0).step();
    this.setData({
      animationInfo: this.animation.export(),
    });
  },
  
  tap() {
    console.log('隐藏详情栏');
    var animation = my.createAnimation({
      duration: 300,
    });

    this.animation = animation;
    animation.translateY(200).step();
    this.setData({
      animationInfo:animation.export()
    });
  },


});
