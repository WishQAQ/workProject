
Component({
  mixins: [],
  data: {
    value: '',
    showBack: false,
    onFocus: () => {},
    onSubmit: () => {}
  },
  props: {
    toView: '',
    routes: [],
    onChoose: () => {},
    onCrumb: () => {},
    onBack: () => {}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleInput(value) {
      this.setData({ value })
    },
    handleClear() {
      this.setData({ value: '' })
    },
    onSubmit() {
      const { value } = this.data
      const { onSubmit = () => {} } = this.props
      value && onSubmit && onSubmit(value)
    },
    onCrumb(e) {
      const { onCrumb = () => {} } = this.props
      onCrumb && onCrumb(e.target.dataset.item)
    },
    onFocus() {
      const { onFocus = () => {} } = this.props
      onFocus && onFocus()
    },
    onBack() {
      this.handleClear()
      const { onBack = () => {} } = this.props
      onBack && onBack()
    }
  }
})
