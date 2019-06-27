Component({
  mixins: [],
  data: {
    items: []
  },
  props: {
    onChange: () => {},
    max: 9,
    value: []
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    previewImage(e) {
      const { index } = e.target.dataset
      my.previewImage({
        current: index,
        urls: this.data.items.concat()
      })
    },
    chooseImage() {
      const { max } = this.props
      const { items } = this.data
      items.length >= max 
        ? my.showToast({ content: `最多能上传${max}张图片`, duration: 2000 })
        : this.upload()
    },
    upload() {
      const { items } = this.data
      const { onChange = () => {} } = this.props
      my.chooseImage({
        success: (res) => {
          this.setData({
            items: [...items, ...res.apFilePaths]
          })
          my.uploadFile({
            url: `https://m.12371.tech/api/v1/media`,
            fileType: 'video',
            fileName: 'file',
            filePath: res.apFilePaths[0],
            header: { authorization: 'Bearer 32ae43af01db9877cdeee6c3587e28ae7be7f5695581e55e26171722fb0f01ac' },
            success: (res) => {
              res.statusCode === 200
                ? onChange && onChange(JSON.parse(res.data))
                : my.showToast({ content: '网络开小差了', duration: 2000 })
            },
            fail: (res) => {
              console.log(res)
            }
          })
        }
      })
    },
    removeImage(e) {
      const { index } = e.target.dataset
      this.setData({ items: this.data.items.filter((item, idx) => index !== idx) })
    }
  }
})
