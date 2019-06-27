Component({
  mixins: [],
  data: {},
  props: {
    base_org_name: '',
    list: [],
    onChooseType: () => {}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onChooseType(e) {
      const { onChooseType = () => {} } = this.props
      onChooseType && onChooseType(e)
    }
  }
})
