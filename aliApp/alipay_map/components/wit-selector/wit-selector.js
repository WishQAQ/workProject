import { isEmptyObj, removeRepeatArrayObject } from '/utils'
import { getPickHome, getPickData, getPartyJob } from '/api'

Component({
  mixins: [],
  data: {
    header: {
      routes: []
    },
    // 启动屏
    bootstrap: {
      orgname: '',
      list: [],
    },
    // 可选提示
    optionTip: '',
     // 已选择的
    selected: {
      show: false,
      org: [],
      orgtype1: [],
      orgtype2: [],
      orgtype3: [],
      orgtype4: [],
      person: [],
      total: 0,
      tip: '',
      desc: ''
    },
    // 搜索
    search: {
      filter: {
        keyword: '',
        identity: '',
        page: 1,
        pages_size: 10,
        org_code: ''
      },
      show: false,
      done: false,
      list: []
    },
    // 过滤条件
    filter: {
      keyword: '',
      identity: 'org',
      org_code: '',
      org_group_key: '',
      page: 1,
      page_size: 10,
      party_job_code: ''
    },
    // 叶子节点
    // leaf: false,
    step: -1,
    // 面包屑导航用的数据
    history: [],
    // 列表数据是否加载完成
    done: false,
    // 列表展示数据
    list: [],
    // 职务列表
    jobs: []
  },
  props: {
    onConfirm: () => {},
    onClose: () => {},
    show: false,
    // 只能选人员
    person: false,
    // 只能选择组织
    org: false,
    // 可选组织类型 1:党委 2:党总支 3:党支部 4:党小组
    orgType: 0,
    max: 0,
    min: 0
  },
  didMount() {
    const { orgType = 0 } = this.props
    let optionTip = (orgType === 1 && '党委') || (orgType === 2 && '党总支') || (orgType === 3 && '党支部') || (orgType === 4 && '党小组') || ''
    this.setData({
      optionTip,
     'filter.org_code': getApp().globalData.org_code || ''
    })
    this.fetchHome()
    // my.setCanPullDown({ canPullDown: false })
  },
  didUpdate() {},
  didUnmount() {},
  onInit() {},
  methods: {
    async fetchHome() {
      const { data } = await getPickHome()
      this.setData({
        'bootstrap.orgname': data.base_org_name,
        'bootstrap.list': data.list
      })
    },
    async fetchJob() {
      const { data } = await getPickData(this.data.filter)
      this.setData({
        jobs: data.list
      }, () => my.hideLoading())
    },
    async fetchData() {
      const { step, filter, selected } = this.data
      const { org = [], person = [] } = this.data.selected
      const { data } = await getPickData({ ...filter, org: this.props.org ? 1 : 0 })
      
      let list = data.list.map(item => {
        let obj = {}
        // 党员级别 叶子节点
        if (item.is_leaf && item.type !== 'org') {
          const active = !isEmptyObj(
            selected.person.find(child => child.mem_key === item.mem_key))
          obj = { ...item, active }
        } else {
          const disabled = !isEmptyObj(
            selected.org.find(child => child.org_code === item.org_code))
          obj = { ...item, disabled, active: disabled }
        }
        // 统计数量
        let orgNumber = org.filter(child => child.org_code.includes(item.org_code))
        if (orgNumber.length) {
          obj.selectedCount = orgNumber.map(child => child.person_count).reduce((cur, prev) => cur + prev, 0)
        } else {
          obj.selectedCount = person.filter(child => child.org_code.includes(item.org_code)).length
        }
        return obj
      })
      this.setData({
        // leaf: list.filter(item => item.is_leaf === 1).length ? true : false,
        done: !list.length,
        list: [...this.data.list, ...list],
        [`history[${step}]`]: {
          ...data,
          active: list.length
            ? list.filter(item => item.active).length === list.filter(item => item.person_count).length
            : false
        }
      }, () => my.hideLoading())
    },
    lower() {
      // 滚动到底部获取分页数据
      const { filter, done } = this.data
      if (done) return
      my.showLoading({ content: '加载中...' })
      this.setData({
        filter: Object.assign({}, filter, {
          ...filter,
          page: filter.page + 1
        })
      }, () => this.fetchData())
    },
    onChooseType(item) {
      my.showLoading({ content: '加载中...' })
      const step = this.data.step + 1
      this.setData({
        list: [],
        step,
        'filter.identity': item.identity,
        'filter.party_job_code': ''
      }, () => {
        if (this.data.filter.identity === 'org') {
          this.fetchData()
        } else {
          this.fetchJob()
        }
      })
    },
    onChooseJob(item) {
      my.showLoading({ content: '加载中...' })
      this.setData({
        step: this.data.step + 1,
        'filter.party_job_code': item.target.dataset.code
      }, () => {
        this.fetchData()
      })
    },
    onNext(info) {
      my.showLoading({ content: '加载中...' })
      const step = this.data.step + 1
      this.setData({
        list: [],
        'filter.org_code': info.org_code || '',
        'filter.org_group_key': info.org_group_key || '',
        step
      }, () => this.fetchData())
    },
    onChoose(info) {
      // 全选操作
      // 判断是不是叶子节点 如果不是就选择改组织下的全部并且隐藏下一级
      // 如果有人数限制 先判断人数
      let { list } = this.data
      let { person, org } = this.data.selected
      const { source = 'list', index, org_code, type } = info
      if (type === 'org' && this.props.person) return
      if (info.type === 'person') {
        // 没有就添加 有就删除
        const findIndex = person.findIndex(item => item.mem_key === info.mem_key)
        if (findIndex === -1) {
          if (this.checkMaxSelected(info)) {
            // 判断是哪里选的 list search
            this.setData({
              [`${source === 'search' ? 'search.list' : 'list'}[${index}].active`]: true,
              'selected.person': [ ...person, info ]
            }, () => this.setSelected())
          }
        } else {
          // 取消了搜索列表上项后把列表项对应的取消高亮
          if (source === 'search') {
            this.setData({
              list: this.data.list.map(item => {
                if (item.mem_key === info.mem_key) {
                  return  {
                    ...item,
                    active: false
                  }
                }
                return item
              }),
              [`search.list[${index}].active`]: false,
              'selected.person': person.filter((item, idx) => idx !== findIndex)
            }, () => this.setSelected())
          } else {
            this.setData({
              [`list[${index}].active`]: false,
              'selected.person': person.filter((item, idx) => idx !== findIndex)
            }, () => this.setSelected())
          }
        }
      } else {
        const findIndex = org.findIndex(item => item.org_code === org_code)
        if (findIndex === -1) {
          if (this.checkMaxSelected(info)) {
            if (source === 'search') {
              let listIndex = list.findIndex(item => item.org_code === info.org_code)
              if (listIndex > -1) {
                this.setData({
                  [`list[${listIndex}].active`]: true,
                  [`list[${listIndex}].disabled`]: true,
                  [`list[${listIndex}].selectedCount`]: 0,
                })
              }
              this.setData({
                [`search.list[${index}].active`]: true,
                'selected.person': person.filter(item => !item.org_code.includes(org_code)),
                'selected.org': [
                  ...org.filter(item => !item.org_code.includes(org_code)).map(item => ({ ...item, all: true })),
                  {
                    ...info,
                    all: true
                  }
                ]
              }, () => this.setSelected())
            } else {
              this.setData({
                [`list[${index}].active`]: true,
                [`list[${index}].disabled`]: true,
                [`list[${index}].selectedCount`]: 0,
                'selected.person': person.filter(item => !item.org_code.includes(org_code)),
                'selected.org': [
                  ...org.filter(item => !item.org_code.includes(org_code)).map(item => ({ ...item, all: true })),
                  {
                    ...info,
                    all: true
                  }
                ]
              }, () => this.setSelected())
            }    
          }
        } else {
          if (source === 'search') {
            let listIndex = list.findIndex(item => item.org_code === info.org_code)
              if (listIndex > -1) {
                this.setData({
                  [`list[${listIndex}].active`]: false,
                  [`list[${listIndex}].disabled`]: false,
                  [`list[${listIndex}].selectedCount`]: 0,
                })
              }
             this.setData({
              [`search.list[${index}].active`]: false,
              'selected.org': org.filter((item, idx) => idx !== findIndex)
            }, () => this.setSelected())
          } else {
            this.setData({
              [`list[${index}].active`]: false,
              [`list[${index}].disabled`]: false,
              [`list[${index}].selectedCount`]: 0,
              'selected.org': org.filter((item, idx) => idx !== findIndex)
            }, () => this.setSelected())
          }
        }
      }
    },
    onChooseAll(info) {
      let { org, person } = this.data.selected
      let { list, history } = this.data
      let { max } = this.props
      let active = history[info.index].active
      // 取消全选
      if (active) {
        info.list.forEach(parent => {
          org.forEach((child, ind) => {
            parent.org_code === child.org_code && org.splice(ind, 1)
          })
        })
      } else {
        // 设置全选 + 人数限制
        if (
          max && info.list.filter(item => item.person_count !== 0).map(item => item.person_count).reduce((cur, prev) => cur + prev, 0) > max
        ) {
          return my.showToast({ duration: 1500, content: `当前最多选择${max}人` })
        } else {
          org = removeRepeatArrayObject(
            info.list.concat(info.list).filter(item => item.person_count !== 0),
            'org_code'
          ).map(item => ({
            ...item,
            active: true,
            disabled: true
          }))
          person = person.map(item => org.filter(child => item.org_code.includes(child.org_code)).length ? false : item).filter(item => item)
        }
      }
      this.setData({
        'selected.org': org,
        'selected.person': person,
        list: list.map(item => ({
          ...item,
          selectedCount: 0,
          active: item.person_count ? !active : false,
          disabled: item.person_count ? !active : false })),
        [`history[${info.index}].active`]: !active
      }, () => this.setSelected())
    },
    onCrumb(info) {
      let { step, history, filter } = this.data
      if (info.index === step) return
      my.showLoading({ content: '加载中...' })
      this.setData({
        list: [],
        filter: Object.assign({}, filter, {
          ...filter,
          org_code: info.org_code || '',
          org_group_key: info.org_group_key || '',
          page: 1,
        }),
        done: false,
        step: info.index,
        history: history.slice(0, step + 1)
      }, () => this.fetchData())
    },
    back() {
      const { search } = this.data
      if (search.show) {
        this.setData({ 'search.show': false })
        return
      }
      if (this.data.step < 0) {
        this.onClose()
      } else {
        // my.showLoading({ content: '加载中...' })
        let step = this.data.step - 1
        const { history, filter } = this.data
        this.setData({
          list: [],
          filter: Object.assign({}, filter, {
            ...filter,
            org_code: step > 0 && history[step].org_code || '',
            org_group_key: step > 0 && history[step].org_group_key || '',
            page: 1,
          }),
          done: false,
          step,
          history: history.slice(0, step + 1)
        }, () => filter.identity === 'org' && this.fetchData())
      }
    },
    checkMaxSelected(info) {
      let { person, org } = this.data.selected
      let { max } = this.props
      let count = info.person_count || 1
      if (
        max && (
          count > max ||
          person.length + count > max ||
          org.map(item => item.person_count).reduce((cur, prev) => cur + prev, 0) + count > max
        )
      ) {
        my.showToast({ duration: 1500, content: `当前最多选择${max}人` })
        return false
      }
      return true
    },
    setSelected() {
      const { list, step, optionTip } = this.data
      const { org = [], person = [] } = this.data.selected
      let [ orgtype1, orgtype2, orgtype3, orgtype4 ] = [[], [], [], []]
      org.forEach(item => {
        if (item.org_type === 1) orgtype1.push(item)
        if (item.org_type === 2) orgtype2.push(item)
        if (item.org_type === 3) orgtype3.push(item)
        if (item.org_type === 4) orgtype4.push(item)
      })
      const total = org
        .map(item => item.person_count)
        .reduce((cur, prev) => cur + prev, 0) + person.length
      this.setData({
        selected: Object.assign({}, this.data.selected, {
          ...this.data.selected,
          orgtype1,
          orgtype2,
          orgtype3,
          orgtype4,
          tip: total ? total + '人' : '',
          desc: `${org.length ? `,包含${org.length}个${optionTip || '组织'}` : ''}`,
          total
        }),
        [`history[${step}].active`]: list.filter(item => item.active && item.person_count).length === list.filter(item => item.person_count).length
      })
    },
    onClose() {
      my.confirm({
        title: '提示',
        content: '确定退出此操作吗',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          result.confirm && this.props.onClose && this.props.onClose()
        }
      })
    },
    onConfirm() {
      const { onConfirm = () => {} } = this.props
      onConfirm && onConfirm(this.data.selected)
    },
    onRemove(info) {
      const { org = [], person = [] } = this.data.selected
      const { list, search } = this.data
      if (info.type === 'person') {
        this.setData({
          // 如果当前项包含了删除的项 减去删除项的人数
          list: list.map(item => {
            if (
              item.type === 'org' &&
              item.org_code &&
              item.org_code.includes(info.org_code)
            ) {
              return {
                ...item,
                selectedCount:
                item.selectedCount - 1
              }
            }
            return item
          }),
          'search.list': search.list.map(item => item.mem_key === info.mem_key ? { ...item, active: false } : item),
          'selected.person': person.filter(item => item.mem_key !== info.mem_key)
        }, () => this.autoColsePopup())
      }
      if (info.type === 'org') {
        let filterOrg = org.filter(item => item.org_code !== info.org_code)
        this.setData({
          // 如果当前项包含了删除的项 减去删除项的人数
          list: list.map(item => {
            if (
              item.type === 'org' &&
              item.org_code &&
              info.org_code.includes(item.org_code)
            ) {
              return {
                ...item,
                selectedCount: item.person_count - info.person_count
              }
            }
            return item
          }),
          'selected.org': filterOrg,
          [`selected.orgtype${info.org_type}`]: filterOrg
        }, () => this.autoColsePopup())
      }
    },
    autoColsePopup() {
      const { org = [], person = [] } = this.data.selected
      const total = org
        .map(item => item.person_count)
        .reduce((cur, prev) => cur + prev, 0) + person.length
      this.setData({ 'selected.total': total })
      !org.length && !person.length && this.onColsePop()
    },
    openPopup() {
      const { org = [], person = [] } = this.data.selected
      if (!org.length && !person.length) return
      this.setData({ 'selected.show': true })
    },
    onColsePop() {
      const { list } = this.data
      const { org = [] , person = [] } = this.data.selected
      this.setData({
        list: list.map(item => {
          if (item.type === 'org') {
            let match = !isEmptyObj(org.find(child => child.org_code === item.org_code))
            return {
              ...item,
              active: match,
              disabled: match
            }
          } else {
            let match = !isEmptyObj(person.find(child => child.mem_key === item.mem_key))
            return {
              ...item,
              active: match
            }
          }
        }),
        'selected.show': false
      }, () => this.setSelected())
    },
    onSearchBack() {
      const { search } = this.data
      if (search.show) {
        this.setData({
          search: Object.assign({}, search, {
            filter: { keyword: '', identity: '', page: 1, pages_size: 10, org_code: '' },
            show: false,
            done: false,
            list: []
          })
        })
      } else {
        this.onClose()
      }
    },
    onSubmit(keyword) {
      my.showLoading({ content: '加载中...' })
      this.setData({
        'search.show': true,
        'search.filter.keyword': keyword
      }, () => this.searchData())
    },
    async searchData() {
      const { search, selected } = this.data
      const { org = false, orgType } = this.props
      const { data } = await getPickData({...search.filter, org: this.props.org ? 1 : 0, orgType})
      // 搜组织
      if (org) {
        let list = data.list.map(item => {
          let obj = {}
          const disabled = !isEmptyObj(
            selected.org.find(child => child.org_code === item.org_code))
          obj = { ...item, disabled, active: disabled }
          return obj
        })
        this.setData({
          'search.done': !list.length,
          'search.list': list ? [ ...search.list, ...list ] : []
        }, () => my.hideLoading())
      } else {
        // 搜人
        let list = data.list.map(item => {
          let obj = {}
          // 党员级别 叶子节点
          const active = !isEmptyObj(selected.person.find(child => child.mem_key === item.mem_key))
          obj = {
            ...item,
            active
          }
          return obj
        })
        this.setData({
          'search.done': !list.length,
          'search.list': list ? [ ...search.list, ...list ] : []
        }, () => my.hideLoading())
      }
    },
    searchLower() {
      // 滚动到底部获取分页数据
      const { filter, done } = this.data.search
      // console.log(filter)
      if (done) return
      my.showLoading({ content: '加载中...' })
      this.setData({
        'search.filter': Object.assign({}, filter, {
          ...filter,
          page: filter.page + 1
        })
      }, () => this.searchData())
    }
  }
})
