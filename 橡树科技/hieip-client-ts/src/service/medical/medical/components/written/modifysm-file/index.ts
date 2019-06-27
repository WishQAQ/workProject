import {BaseService} from '../../../../../../tools/flux/BaseService/index'
import {
  MrTemplateClassModelDtoTemplate,
  MrPatientFileIndexModelDtoPatient
} from '../../../../../../packages/entity/medical'
import {message} from '../../../../../../packages/common/message/index'
import {ApiTemplateMrClass, ApiPatientMrFileEditApply} from '../../../../../../packages/api/medical'
import {MrPatientFileEditApplyEntityPatient} from '../../../../../../packages/entity/medical'
export interface ModifysmFileState {
  /**  患者id */
  patientId?: string
  /**   住院标识 */
  visitId?: number
  /**  分类集合 */
  mrModle?: MrTemplateClassModelDtoTemplate[]
  /**  分类code */
  mrClass?: string
  /**  文件名称 */
  fileName?: string
  /**  文件id */
  fileId?: string
  /**  病历申请维护的 */
  mrPatientFileEditApply?: MrPatientFileEditApplyEntityPatient
  /* 关闭弹框的状态 */
  visible?: boolean
}

class ModifysmFileService extends BaseService<ModifysmFileState> {
  defaultState = {
    visible: false
  }

  serviceWillMount() {
    this.reset()
  }

  /**
   * 获取患者信息
   */
  patient = (mrPatient?: MrPatientFileIndexModelDtoPatient, cancel?: boolean) => {
    this.dispatch2({
      mrPatientFileEditApply: {
        patientId: mrPatient.patientId, visitId: mrPatient.visitId,
        fileUniqueId: mrPatient.id
      },
      fileName: mrPatient.fileName, visible: cancel
    })
    this.findMrTemplate()
  }

  /**
   * 获取分类
   */
  findMrTemplate = () => {
    return ApiTemplateMrClass.findMrTemplate().then((data: any) => {
      let me = data
      me.splice(0, 0, {mrClassName: '全部', mrClassCode: ''})
      this.dispatch({mrModle: data})
    }).catch(err => {
      message.tip(err || '获取信息失败', 'error', 'center')
    })
  }
  /**
   * 申请病历维护
   */
  newMrPatientFileEditApply = () => {
    let {mrPatientFileEditApply} = this.state
    return ApiPatientMrFileEditApply.NewMrPatientFileEditApply(mrPatientFileEditApply).then((data: any) => {
      message.tip('申请成功', 'success', 'center')
      this.dispatch({visible: false, mrPatientFileEditApply: {}})
    }).catch(err => {
      message.tip(err || '申请失败', 'error', 'center')
    })
  }
  /**
   * 取消的方法
   */
  cancel = () => {
    this.dispatch({visible: false})
  }
  /**
   * 值改变设置值的方法
   */
  onChange = (url?: string, e?: any) => {
    const {mrPatientFileEditApply} = this.state
    url !== 'applyType' ? mrPatientFileEditApply[url] = e.target.value : mrPatientFileEditApply[url] = e
    this.dispatch2({mrPatientFileEditApply})
  }
}

export const modifysmFileService = new ModifysmFileService('modifysmFile')