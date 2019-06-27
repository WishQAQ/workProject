Component({
  mixins: [],
  data: {
    text: ''
  },
  props: {
    classes: '',
    size: '40px',
    // circle square
    shape: '',
    color: '',
    bgColor: '',
    src: '',
    icon: '',
    iconSize: '',
    iconColor: '#fff',
    info: {},
    style: '',
    name: '',
    onClick: () => {}
  },
  didMount() {
    this.formatText(this.props.name)
  },
  didUpdate(prev) {
    if (prev.name !== this.props.name) {
      this.formatText(prev.name)
    }
  },
  didUnmount() {},
  methods: {
    formatText(name) {
      if (name && name.length) {
        if (/^[A-Za-z]+$/.test(name)) {
          this.setData({ text: name.toUpperCase().slice(name.length - 2, name.length) })
          return
        }
        if (name.length <= 2) {
          this.setData({ text: name })
        } else {
          this.setData({ text: name.slice(name.length - 2, name.length) })
        }
      }
    },
    click(e) {
      const { onClick = () => {}, info } = this.props
      onClick && onClick(info, e)
    }
  }
})
