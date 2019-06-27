/**
 * 创建人:谢小慧
 * 创建时间:2018-01-04
 * 说明:病历模板制作内容
 */
import { BaseService } from 'tools/flux/BaseService/index'
import { MrTemplateContentEntityTemplate, MrTemplateIndexEntityTemplate } from 'pkg/entity/medical'
import { ApiTemplateMrIndex } from 'pkg/api/medical'
import { message } from 'pkg/common/message'
import { routeService } from 'service/RouteService'

export interface TranslateContentState {
  /** 病历内容 */
  content?: any
  /** 病历模板信息 */
  templateIndex?: MrTemplateIndexEntityTemplate,
  /** 病历模板内容 */
  templateContent?: MrTemplateContentEntityTemplate,
  /** 页眉是否编辑模式 */
  header?: boolean
  name?: string
}

export class TranslateContentService extends BaseService<TranslateContentState> {
  /** 电子病历状态对象 */
  medical?: any
  defaultState = {
    name: '不写不行啊',
    header: false,
  }
  // templateIndex: {
  //   mrName: '入院记录',
  //   createDateTime: new Date('2017/8/18 17:27:17'),
  //   mrClass: '入院记录',
  //   mrCode: 'EMR01.00_00',
  //   id: 'JW-EMR01.00_00',
  //   createId: '平行君'  // 存在问题
  // }

  serviceWillMount() {
    // this.setTemplateIndex(this.state.templateIndex)
  }
  /**
   * 设置模板id
   * @param {string} index
   */
  setTemplateIndex = (index: MrTemplateIndexEntityTemplate, type: number) => {
    let id = index.masterTemplateId || index.id
    if (id) { // id,或母模板id不为空时标识在后台已经存储过了,加载内容
      ApiTemplateMrIndex.getMrTemplateContent(id).then(data => {
        if (!data) {
          let data = this.defaultData(index, type)
          this.dispatch2({ templateContent: { mrConten: JSON.parse(data) } })
        } else {
          this.dispatch2({ templateContent: { mrConten: JSON.parse(data.mrConten) } })
        }
      }).catch(msg => message.error(msg || '模板内容加载失败'))
    } else {// 标识为新增的需要生成一个表头
      this.defaultData(index, type)
    }
    this.dispatch2({ templateIndex: index })
  }
  defaultData(code, type) {
    // 大病历模板维护
    if (type === 1) {
      return `{"pageHeader":{"blocks":[{"key":"7alqs","text":"","type":"unstyled","depth":0,
      "inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},"pageFooter":{"blocks":
      [{"key":"fcvpj","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],
      "data":{}}],"entityMap":{}},"pageState":{"blocks":[{"key":"3ai48","text":"","type":"unstyled",
      "depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}}`
    } else { // 小病历模板维护
      return `{"pageHeader":{"blocks":[{"key":"7alqs","text":"","type":"unstyled","depth":0,
      "inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},"pageFooter":{"blocks":
      [{"key":"fcvpj","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],
      "data":{}}],"entityMap":{}},"pageState":{"blocks":[{"key":"3ai48","text":"","type":"unstyled",
      "depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"templateCode":"${code.mrCode}"}}],"entityMap":{}}}`
    }
  }

  /**
   * 插入或刷新诊断
   */
  diagnosis = (json) => {
    this.medical.api.control.diagnosis(json)
  }

  /**
   * 新增一个组件
   * @param json
   * @param {boolean} flag
   */
  insertControl = (json, flag?: boolean) => {
    if (flag) {
      this.medical.api.control.insertControl(json)
    } else {
      this.medical.openSetControlAttr(json)
    }
  }
  /** 插入一个模板 */
  insertTemplate(json, last = false, jump = true, direction?) {
    this.medical.api.template.insertTemplate(json, last, jump, direction)
  }

  /*** 页眉编辑模式
   */
  eadith = () => {
    const { header } = this.state
    if (header) {
      this.medical.api.page.endEditorPageHeader()
    } else this.medical.api.page.editorPageHeader()
    this.dispatch2({ header: !header })
  }
  /**
   * 打印
   */
  print = () => {
    // 打印
  }
  /**
   * 保存病历
   */
  save = () => {
    let pageState = this.medical.getJson()
    let conten = <MrTemplateContentEntityTemplate>{}
    conten.id = this.state.templateIndex.id
    conten.mrConten = JSON.stringify(pageState)
    ApiTemplateMrIndex.saveMrTemplateIndexContent(conten).then(data => {
      message.success('保存成功')
    }).catch(msg => message.error(msg || '保存失败'))
  }
  /**
   * 返回到病历模板主信息修改界面
   */
  back = () => {
    this.dispatch({ templateContent: null })
    routeService.push('route_tpl_maintenance')
  }
  /**
   * 设置电子病历api对象
   * @param medical
   */
  setMedical = (medical) => {
    this.medical = medical
  }
}

export const translateContentService = new TranslateContentService('translateContent')