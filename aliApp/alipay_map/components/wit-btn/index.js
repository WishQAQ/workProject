Component({
  props: {
    // type: primary, info, success, warning, error
    classes: '',
    type: 'default',
    plain: false,
    disabled: false,
    square: false,
    round: false,
    info: {},
    loadingSize: 'small',
    // large、normal、small、mini四种尺寸,默认为normal
    size: 'normal',
    loadingColor: '#fff',
    onClick: () => {}
  },
  methods: {
    click(e) {
      const { onClick = () => {}, disabled, info } = this.props
      if (!disabled && onClick) {
        onClick(info, e)
      }
    }
  }
})