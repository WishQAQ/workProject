Component({
  props: {
    // type: 'view', 'checkbox', 'radio'
    type: 'view',
    border: true,
    classes: '',
    arrow: false,
    icon: false,
    active: false,
    loading: false,
    onClick: () => {},
    index: 0,
    item: {}
  },
  methods: {
    onClick() {
      const { onClick = () => {}, index, item } = this.props
      onClick && onClick({
        index,
        ...item
      })
    }
  }
})