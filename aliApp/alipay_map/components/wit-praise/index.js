import { isColors } from '/utils/colorRE.js'

Component({
  mixins: [],
  data: {
    classes: '',
    value: false,
    active: false,
    toggleAnimate: false,
    toggleColor: false,
    animateClass: '',
    colorValue: '',
    info: {}
  },
  props: {
    classes: '',
    disbled: false,
    activeIcon: '',
    size: '24px',
    animate: '',
    color: '',
    defaultColor: '#ccc'
  },
  didMount() {
    if (this.data.color) {
      if (isColors(this.data.color)) {
        return
      } else {
        console.error('this color must be hexcolor or rgbcolor  ---VueStar')
      }
    } else {
      return
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    toggle () {
      if (this.props.disbled) return
      this.setData({
        active: !this.data.active,
        toggleAnimate: !this.data.toggleAnimate,
        toggleColor: !this.data.toggleColor
      }, () => {
        this.setData({
          animateClass: this.data.toggleAnimate ? this.props.animate : '',
          colorValue: this.data.toggleColor ? this.props.color : ''
        })
      })
    },
    click(e) {
      const { onClick = () => {}, info, disbled } = this.props
      if (!disbled) {
        this.setData({ value: !this.data.value })
        onClick && onClick(info, e)
      }
    }
  },
});
