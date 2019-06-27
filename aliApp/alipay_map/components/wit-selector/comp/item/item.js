Component({
  mixins: [],
  data: {},
  props: {
    last: false,
    max: 0,
    min: 0,
    onNext: () => {},
    onChoose: () => {},
    onChooseAll: () => {},
    info: {}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onNext() {
      const { onNext = () => {}, info } = this.props
      if (info.person_count === 0) return
      !info.disabled && onNext && onNext(info)
    },
    onChoose() {
      const { onChoose = () => {}, info } = this.props
      if (info.type === 'org' && info.person) return
      if (info.person_count === 0) return
      // if (info.orgType !== 0 && info.orgType !== info.org_type) return
      onChoose && onChoose(info)
    },
    onRemove() {
      const { onRemove = () => {}, info } = this.props
      onRemove && onRemove(info)
    },
    onChooseAll() {
      const { onChooseAll = () => {}, info } = this.props
      onChooseAll && onChooseAll(info)
    }
  }
});
