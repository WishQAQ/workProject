Component({
  mixins: [],
  data: {},
  props: {
    show: false,
    selected: {
      show: false,
      org: [],
      // 党委
      orgtype1: [],
      // 党总支
      orgtype2: [],
      // 党支部
      orgtype3: [],
      // 党小组
      orgtype4: [],
      person: [],
      total: 0,
      tip: '',
      desc: ''
    },
    onColsePop: () => {},
    onRemove: () => {}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onColsePop() {
      const { onColsePop = () => {} } = this.props
      onColsePop && onColsePop()
    },
    onRemove(e) {
      const { onRemove = () => {} } = this.props
      onRemove && onRemove(e)
    }
  }
})
