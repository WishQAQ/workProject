/**
 * 创建人:谢小慧
 * 创建时间:2018-01-04
 * 说明:电子病历模板制作界面service
 */
import { BaseService } from 'tools/flux/BaseService'
import {
  BdDeIndexEntityDataSet,
  BdDsIndexEntityDataSet,
  BdFixedIndexEntityDataSet,
  BdFixedItemsEntityDataSet,
  MrTemplateIndexEntityTemplate, MrTempletSmallIndexEntityTemplate, SynchronousElementDictEntityDataSet
} from 'pkg/entity/medical'
import {
  ApiDataSetBdCvItems,
  ApiDataSetBdDeIndex,
  ApiDataSetBdDsIndex,
  ApiDataSetBdFixedIndex, ApiTemplateMrIndex,
  ApiTemplateMrTempletSmallIndex
} from 'pkg/api/medical'
import { message } from 'pkg/common/message'
import { JsonUtil } from 'tools/api/JsonUtil'
import { translateContentService } from 'service/medical/translate/content'
import debug from 'debug'

const log = debug('log:translateSider')

export interface TranslateSiderState {
  /** 病历模板信息 */
  templateIndex?: MrTemplateIndexEntityTemplate
  /** 查询tab页中当前选中的值 */
  activeKey?: string
  /** 数据集集合 */
  bdDsIndexList?: Array<BdDsIndexEntityDataSet>
  /** 数据元数据 */
  bdDeIndexList?: Array<BdDeIndexEntityDataSet>
  /** 小模板list */
  templateSmallIndex?: Array<MrTempletSmallIndexEntityTemplate>
  /** 小模板动态元素 */
  synchronousElementList?: Array<SynchronousElementDictEntityDataSet>
  /** 固定值列表 */
  bdFixedIndexList?: Array<BdFixedIndexEntityDataSet>
  /** 固定值详情列表 */
  bdFixedItemsList?: Array<BdFixedItemsEntityDataSet>
  /** 选中的数据集id */
  selectBdDsId?: string
  /** 小模板中tab 当前选中值 */
  smallTempActiveKey?: string
  /** 当前编辑的模板类型 */
  currentTemplateType?: string
}

export class TranslateSideService extends BaseService<TranslateSiderState> {
  defaultState = {
    activeKey: '1',
    smallTempActiveKey: '1'
  }

  serviceWillMount() {
    // 加载数据集
    this.loadBdDsIndexList()
  }

  /**
   * 设置当前选中病历模板
   * @param index 选中病历模板实体类
   */
  setTemplateIndex = (index: MrTemplateIndexEntityTemplate) => {
    this.dispatch2({ templateIndex: index })
  }

  /**
   * 设置当前编辑的模板类型
   * 
   */
  setTemplateType = (type: string) => {
    this.dispatch2({ currentTemplateType: type })
  }

  /**
   * 加载数据集列表
   */
  loadBdDsIndexList = () => {
    ApiDataSetBdDsIndex.findAll().then(data => {
      this.dispatch2({ bdDsIndexList: data })
    }).catch(msg => message.error(msg || '数据集加载失败'))
  }

  /**
   * 加载数据元列表
   */
  loadBdDeIndexList = (type: string, id: string) => {
    if (type === 'dataset-select') { // 根据id数据
      ApiDataSetBdDsIndex.findById(id).then(data => {
        this.dispatch2({ bdDeIndexList: data })
      }).catch(msg => message.error(msg || '查询数据元失败'))
    } else { // 菜单点击
      ApiDataSetBdDeIndex.getBdIndexData1({}, id, this.state.selectBdDsId).then(data => {
        this.dispatch2({ bdDeIndexList: data })
      }).catch(msg => message.error(msg || '模糊查询失败'))
    }
  }

  /**
   * 查询小模板集合
   */
  loadTemplateSmallIndex = () => {
    ApiTemplateMrTempletSmallIndex.FindAll().then(data => {
      this.dispatch2({ templateSmallIndex: data })
    }).catch(msg => message.error(msg || '小模板查询失败'))
  }
  /**
   * 数据元,固定值,动态值等点击时执行此方法
   * @param {string} type
   * @param {string} value
   * @param {string} event
   */
  onMenuClick = (type: string, value: any, event: any) => {
    let data: any = {}
    const key = Number(event.node.props.eventKey)
    let component: any = {}
    switch (type) {
      case 'dataSetMenu':  // 数据集
        data = this.state.bdDeIndexList[key]
        this.initControl(data)
        break
      case 'smallTemplateMenu':  // 小模板
        data = this.state.templateSmallIndex[key]
        // 查询小模板的内容,并进行插入
        ApiTemplateMrIndex.findHistoryContent(data.id).then((data: any) => {
          translateContentService.insertTemplate(JSON.parse(data[0].mrConten).pageState)
        }).catch(msg => message.error(msg || '小模板内容加载失败'))
        break
      case 'synchronousElementMenu': // 动态值,不弹出框修改默认加载
        data = this.state.synchronousElementList[key]
        // 查询按照文本输入框去查询,并不能输入,添加动态值的信息
        component.type = 'Input'
        component.name = data.synchronousElementName
        component.description = '动态值:' + data.synchronousElementName
        component.required = false
        component.defaultValue = data.synchronousElementName
        component.cannotDelete = true
        component.readonly = true
        component.isDynamic = true
        component.dynamic = data
        component.value = data.synchronousElementName
        component._flexValue = data.synchronousElementName
        component._code = data.id
        translateContentService.insertControl(component, true)
        break
      case 'btnoper-menu':  // 按钮操作
        if (value[0] === '0') {
          // 刷新诊断信息
          // ApiTemplateMrIndex.findDiagnosisByPatientId()
          translateContentService.diagnosis(component)
        } else {
          // 添加常用检查
          translateContentService.insertTemplate(component, false, false)
        }
        break
      case 'bdFixedItemMenu': // 固定值
        // this.state.bdFixedIndexList[key] // 需要獲取固定值 Code
        // if (data.dsId) { // 不为空,那么需要像控件一样处理
        // 查询数据元信息 BdDsIndexEntityDataSet
        // ApiDataSetBdDsIndex.selectBdDeIndex(data.dsId).then(json=>{
        //   let _data=this.initControl(json)
        //   _data.isFixedValue=true
        //   _data.fixedValue=data
        //   this.dispatch2({component: this.initControl(_data), isVisible: true})
        // }).catch(msg=>message.error(msg||'数据加载失败'))
        // } else { // 一个不能编辑的input
        component.type = 'Input'
        component.name = data.name
        component.description = '固定值:' + data.name
        component.required = false
        component.defaultValue = data.name
        component.cannotDelete = true
        component.readonly = true
        component.isFixedValue = true
        component.fixedValue = data
        component.value = data.name
        component._flexValue = data.name
        component._code = data.id
        translateContentService.insertControl(component)
        // }
        break
      default:
        break
    }
  }
  /**
   * 加载动态值
   */
  loadSynchronousElementList = () => {
    ApiTemplateMrIndex.getSynchronousElementDict().then(data => {
      this.dispatch2({ synchronousElementList: data })
    }).catch(msg => message.error(msg || '动态值加载失败'))
  }
  /**
   * 加载固定值列表
   */
  loadBdFixedIndexList = () => {
    ApiDataSetBdFixedIndex.loadBdFixedData().then(data => {
      this.dispatch2({ bdFixedIndexList: data })
    }).catch(msg => message.error(msg || '固定值列表查询失败'))
  }

  /**
   * 加载固定值详情
   */
  loadBdFixedItemsList = (id: string) => {
    ApiDataSetBdFixedIndex.loadBdFixedInfo(Number(id)).then(data => {
      this.dispatch2({ bdFixedItemsList: JsonUtil.getJsonByKey('itemList', data, []) })
    }).catch(msg => message.error(msg || '固定值列表查询失败'))
  }
  /**
   * tab 点击执行
   * @param {string} key
   */
  changeTab = (key: string) => {
    this.dispatch2({
      activeKey: key,
      smallTempActiveKey: '1',
      templateSmallIndex: [],
      selectBdDsId: ''
    })
    switch (key) {
      case '1': // 查询数据集
        this.loadBdDsIndexList()
        break
      case '2': // 查询小模板
        this.loadTemplateSmallIndex()
        break
      case '3': // 查询固定值列表
        this.loadBdFixedIndexList()
        break
      default: // 按钮暂不处理
        break
    }
  }
  /**
   * 小模板tab 切换
   * @param {string} key tab key 值
   */
  changeSmallTempTab = (key: string) => {
    this.dispatch({ smallTempActiveKey: key })
    if (key === '1') {// 查询小模板
      this.loadTemplateSmallIndex()
    } else { // 查询动态值
      this.loadSynchronousElementList()
    }
  }

  /**
   * 根据类型判断返回控件类型
   * @param name
   */
  private getControlType = (name) => {
    const nameMap = {
      D: 'DateInput',
      DT: 'DateInput',
      S: 'Input',
      N: 'Input',
      L: 'Equation'
    }
    // 如果查找不到,默认input
    return nameMap[name] ? nameMap[name] : 'Input'
  }

  private initControl = (data) => {
    let component: any = {
      autoSelectAll: true,
      readonly: false,
      required: false,
      cannotDelete: false,
      type: 'Input',
      name: ''
    }
    if (!data.controlType) {// 如果类型是不为空,就直接显示
      // 根据类型,值域id 进行判断去设置
      if (data.deCvId) data.controlType = 'Select'
      else data.controlType = this.getControlType(data.deType)
    }
    component.type = data.controlType
    component.name = data.deName
    component._code = data.id
    component.description = data.deMemo ? data.deMemo : ''
    if (data.deCvId) { // 查询当前数据元的选项值
      ApiDataSetBdCvItems.findByCvId(data.deCvId).then(d => {
        component.type = data.controlType
        component.selectType = 'Radio' // 默认单选
        let _list = []
        if (d.length) { // 分组的
          let hash = {} // 去掉重复项
          for (let i = 0; i < d.length; i++) {
            if (!hash[d[i].cvValueText]) {
              _list.push({
                text: d[i].cvValueText,
                data: []
              })
              hash[d[i].cvValueText] = true
            }
          }
        }
        component.options = _list
        component.value = _list.length ? [_list[0].text] : []
        component.defaultValue = _list.length ? [_list[0].text] : []
        component._flexValue = _list.length ? [_list[0].text] : []
        translateContentService.insertControl(component)
      }).catch(msg => message.error(msg || '值域项目查询失败'))
    } else { //
      // inputType 控件类型
      if (data.controlType === 'Input') {
        component.inputType = (data.deType === 'N' ? 'Number' : 'Text')
      }
      if (data.controlType === 'Input' && data.deMemo) { // 如果是输入框,默认设置显示内容为提示内容
        component.defaultValue = data.deMemo
        component._flexValue = data.deMemo
      }
      if (data.minValue) {
        component.minValue = data.minValue
      }
      if (component.maxValue) {
        component.maxValue = data.maxValue
      }
      component.descrption = data.deMemo
      component.value = component.name
      if (/时间/.test(data.deName)) {
        component.type = 'TimePicker'
        component.value = new Date()
        component.defaultValue = new Date()
        component._flexValue = new Date()
      }
      translateContentService.insertControl(component)
    }
  }
}

export const translateSiderService = new TranslateSideService('translateSider')