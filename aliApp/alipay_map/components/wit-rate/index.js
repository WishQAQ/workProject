Component({
  mixins: [],
  data: {
    classes: ''
  },
  props: {
    icon: 'icondafenxinghuang',
    padding: '0px',
    size: '24px',
    value: 0,
    count: 5,
    color: '#dbdbdb',
    activeColor: '#faa62a',
    readonly: false,
    tip: '',
    onRate: () => {},
    info: {}
  },
  didMount() {
    this.$page.witRate = this
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    rate(e) {
      const { readonly, onRate = () => {}, info } = this.props
      if (readonly) return
      const val = e.target.dataset.value
      onRate && onRate(val, info, e)
    }
  }
});
