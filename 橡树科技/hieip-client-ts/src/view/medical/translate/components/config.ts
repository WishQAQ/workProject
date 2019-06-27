import * as moment from 'moment'

export default [
  {
    type: 'Group', // 类型 首字母必须大写
    name: '基本信息',
    icon: 'medical icon-tablet', // 图标
    items: [
      {
        type: 'Select',
        name: '职业',
        defaultValue: '技术工人',
        selectType: 'Radio', // 选择类型 Multiple 多选 Radio 单选
        cannotDelete: false,
        required: true,
        readonly: false,
        options: [
          {
            text: '军人',
            data: {},
          }, {
            text: '技术工人',
            data: {},
          }, {
            text: '程序员',
            data: {},
          }, {
            text: '测试',
            data: {},
          }, {
            text: '前端',
            data: {},
          }, {
            text: 'java工程师',
            data: {},
          },],
        props: {},
      }, {
        type: 'Select',
        name: '费别',
        cannotDelete: true,
        required: true,
        readonly: true,
        defaultValue: 1,
        selectType: 'Multiple', // 选择类型 Multiple 多选 Radio 单选
        options: [{
          text: '自费',
          data: {},
        }, {
          text: '医保',
          data: {},
        },],
        props: {},
      }, {
        type: 'Select',
        name: '婚育状况',
        readonly: true,
        required: true,
        cannotDelete: true,
        defaultValue: '已婚,无子女',
        selectType: 'Multiple', // 选择类型 Multiple 多选 Radio 单选
        options: [{
          type: 'Group',
          name: '婚姻状况',
          items: [{
            text: '已婚',
            data: {},
          }, {
            text: '未婚',
            data: {},
          }],
        }, {
          type: 'Group',
          name: '生育状况',
          enableCondition: [[0], [0]], // 启用条件 [[0],[0]] 表示第一组的第一个值选中后启用，可以简写为 [[0],0]、[0,[0]]、[0,0]
          items: [{
            text: '无子女',
            data: {},
          }, {
            text: '一子',
            data: {},
          }, {
            text: '一女',
            data: {},
          }, {
            text: '两子',
            data: {},
          }, {
            text: '两女',
            data: {},
          }, {
            text: '一子一女',
            data: {},
          }, {
            text: '其他',
            data: {},
          }],
        }],
      }, {
        type: 'Input',
        name: '患者姓名',
        defaultValue: '患者姓名',
        autoSelectAll: true,
        inputType: 'Text', // 类型  Text | Number | Email | dEntity
        required: true,
        cannotDelete: false,
        readonly: false,
      }, {
        type: 'OptionsInput',
        name: '选项框',
        defaultValue: ['b'], // Radio 为 字符串 | Checkbox 为 数组
        optionsType: 'Checkbox', // Radio | Checkbox
        required: true,
        cannotDelete: true,
        readonly: true,
        options: [
          {
            text: 'a',
            data: {}
          },
          {
            text: 'b',
            data: {}
          },
          {
            text: 'c',
            data: {}
          }
        ]
      },
      {
        type: 'TimePicker',
        name: '日期输入框',
        defaultValue: '2017-10-10',
        dateType: 'YYYY-MM-DD HH:mm:ss',
        required: true,
        readonly: false,
        cannotDelete: false,
        dateTypeOptions: [
          'HH:mm:ss',
          'YYYY-MM-DD HH:mm',
          'YYYY-MM-DD HH:mm:ss',
          'YYYY/MM/DD',
          'YYYY/MM/DD HH:mm',
          'YYYY/MM/DD HH:mm:ss',
          'YYYY年MM月DD日 HH:mm:ss'
        ]
      },
      {
        type: 'Equation',
        name: '公式输入框',
        equationType: 'menstrual',
        required: true,
        readonly: false,
        cannotDelete: false,
        equationData: [
          {
            type: 'menstrual',
            data: {
              menstrualAge: 14,
              menstrualPeriod: 20,
              menstrualCycle: 22,
              lastMenstrual: Date.now()
            }
          },
          {
            type: 'toothPosition',
            data: {
              upperTooth: {
                A: [],
                B: [],
                C: [],
                D: []
              },
              underTooth: {
                A: [],
                B: [],
                C: [],
                D: []
              }
            }
          }
        ]
      }
    ],
  }, {
    type: 'Table',
    name: '表格',
    icon: '',
    data: [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ]
  }, {
    type: 'Image',
    name: '图片插入',
    required: true,
    readonly: false,
    cannotDelete: false,
    options: {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      width: 'auto',
      height: 'auto',
      title: 'test'
    }
  }
]
