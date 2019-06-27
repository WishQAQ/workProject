Page({
	data: {
		src: '/assets/images/ant.png',
		spinning: false
	},
	onLoad() {
	},
	jump() {
		my.navigateTo({
			url: '/pages/components-demo/index'
		})
	}
})
