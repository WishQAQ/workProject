const banks = ['网商银行', '建设银行', '工商银行', '浦发银行']

Page({
	data: {
		src: '/assets/images/ant.png',
		spinning: false,
    uploadValue: [],
		value: 0,
		score: 0,
    datas: [],
		items2: [
			{
				thumb: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
				title: '多行列表',
				arrow: true
			},
			{
				title: '单行列表',
				extra: '详细信息',
				brief: 'wefwef'
			},
			{
				title: '多行列表',
				arrow: 'down',
				extra: '12312'
			},
			{
				title: '多行列表',
				arrow: 'empty'
			},
			{
				title: '多行列表'
			}
		]
	},
	onLoad() {
		setTimeout(() => {
			this.setData({ uploadValue: ['temp://1556263241345.png'] })
		}, 2000)
	},
  onChange(item) {
    console.log(item)
  },
  clickPraise(e) {
    console.log(e)
  },
	onRate(score) {
		this.setData({ score })
	},
	onSelect() {
		my.showActionSheet({
			title: '选择发卡银行',
			items: banks,
			success: (res) => {
				this.setData({
					bank: banks[res.index]
				})
			}
		})
	},
	switchChange(e) {
		this.setData({
			spinning: e.detail.value
		})
	},
	btntap() {
	},
	onReady() {
		// 页面加载完成
	},
	onShow() {
		// 页面显示
	},
	onHide() {
		// 页面隐藏
	},
	onUnload() {
		// 页面被关闭
	},
	onTitleClick() {
		// 标题被点击
	},
	onPullDownRefresh() {
		// 页面被下拉
	},
	onReachBottom() {
		// 页面被拉到底部
	},
	onShareAppMessage() {
		// 返回自定义分享信息
		return {
			title: 'My App',
			desc: 'My App description',
			path: 'pages/index/index'
		}
	}
})
