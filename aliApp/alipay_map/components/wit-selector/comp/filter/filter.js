import { gender, education, ages } from '/config/dic'
import dayjs from 'dayjs'

Component({
  mixins: [],
  data: {
    dic: {
      gender,
      education,
      ages,
    },
    filter: {
      gender: '',
      education: '',
      ages: []
    },
    show: {
      age: false
    }
  },
  props: {},
  didMount() {
    console.log(my)
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    chooseDate() {
      my.datePicker({
        format: 'yyyy-MM',
        currentDate: '2012-12',
        startDate: '2012-12',
        endDate: dayjs().format('YYYY-MM'),
        success: (res) => {
          my.alert({
            content: res.date,
          })
        }
      })
    },
    chooseGender(e) {
      this.setData({
        'filter.gender': this.data.dic.gender.find((item, index) => index === e.detail.value).key || ''
      })
    },
    chooseEducation(e) {
      this.setData({
        'filter.education': this.data.dic.education.find((item, index) => index === e.detail.value).key || ''
      })
    },
    chooseAge(data) {
      this.setData({ 'filter.ages': data.map(item => item.value).join(',') })
      this.toggleAge()
    },
    toggleAge() {
      this.setData({ 'show.age': !this.data.show.age })
    },
    submit() {
      console.log(this.data.filter)
    }
  }
})
