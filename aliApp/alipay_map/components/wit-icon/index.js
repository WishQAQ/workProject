Component({
  props: {
    type: '',
    icon: '',
    color: '#333',
    size: '16px',
    info: {},
    onClick: () => {}
  },
  methods: {
    click(e) {
      const { onClick = () => {}, info } = this.props
      onClick && onClick(info, e)
    }
  }
})