import { BaseService } from '../../../../../tools/flux/BaseService/index'
import {
  MrTemplateClassModelDtoTemplate, DeptDictEntityDict, QcMrPatientMonitorOnlineEntityMonitor, Page,
  MrPatientFileIndexModelDtoPatient, MrTemplateIndexModelDtoTemplate, DoctorTitleDictEntityDict
} from '../../../../../packages/entity/medical'
import { ApiPatientMedical, ApiPatientMrFileIndex } from '../../../../../packages/api/medical'
import { message } from '../../../../../packages/common/message/index'
import debug from 'debug'
import { newfileServiceService } from './new-file/index'
import { printFileService } from './print-file/index'
import { modifyFileService } from './modify-file/index'
import { modifysmFileService } from './modifysm-file/index'
import { maintainFileServiceService } from './maintain-file/index'

const log = debug('trace:病历:medical')

export interface MedicalWrittenState {
  /** 患者id */
  patientId?: string
  /** 住院标识 */
  visitId?: number
  /** 科室 */
  deptCode?: string
  /** 默认科室 */
  defaultDept?: string
  /** 分类 */
  patientFileList?: MrTemplateClassModelDtoTemplate[]
  /** 科室集合 */
  deptList?: DeptDictEntityDict[]
  /** 右键菜单 */
  menu?: any
  /** 超时文书 */
  timeOut?: QcMrPatientMonitorOnlineEntityMonitor[]
  /**  未超时文书 */
  qcMrPatient?: QcMrPatientMonitorOnlineEntityMonitor[]
  /**  病历 */
  fileIndex?: MrPatientFileIndexModelDtoPatient[]
  /** 分类code */
  mrClass?: string
  /**  模板模糊查询的通用、科室、个人的状态 */
  tempaleType?: number
  /** 模板模糊查询模板名称等条件 */
  name?: string
  /** 模板模糊查询模板信息集合 */
  templateIndex?: MrTemplateIndexModelDtoTemplate[]
  /**  医生职称集合 */
  doctorTitle?: DoctorTitleDictEntityDict[]
  /**  申请列表的name */
  finName?: string
  /**  申请列表的申请状态 */
  status?: number
  /**  分类编号 */
  mrClassCode?: string
  /**   分页对象 */
  page?: Page
  /**  总数 */
  mainTotal?: number
  /**  选中一行病历的model */
  mrPatient?: MrPatientFileIndexModelDtoPatient
}

class MedicalWrittenService extends BaseService<MedicalWrittenState> {
  mainagApi: any
  data: any
  defaultState = {
    patientId: '1708183062',
    deptCode: '231001',
    defaultDept: '231001',
    visitId: 1,
    menu: ['打印病历', '病历维护申请列表'],
    qcMrPatient: [],
    timeOut: [],
    page: { pageSize: 1, startIndex: 1 },
    mainTotal: 0,
    mrclass: '',
    tempaleType: 1,
    monitorcode: '',
    name: '',
    printName: '',
    printFlag: false,
    ifPrintFlag: true,
  }

  /**
   * 加载service加载数据
   */
  serviceWillMount() {
    this.reset()
    this.getPatientMedicalInfo()
    this.getMonitorOnlineList()
  }

  /**
   * 患者列表点击时获取病历的属性值
   */
  acquire = (id?: string, visit?: number, dept?: string) => {
    return new Promise((resolve, reject) => {
      this.dispatch({ patientId: id, visitId: visit, deptCode: dept, defaultDept: dept })
      resolve()
    }).then(() => {
      this.getPatientMedicalInfo()
      this.getMonitorOnlineList()
    })
  }

  /**
   * 病案分类
   */
  getPatientMedicalInfo = () => {
    let { patientId, visitId, deptCode } = this.getState()
    return ApiPatientMedical.getPatientMedicalInfo(patientId, visitId, deptCode).then(data => {
      if (data) {
        for (let key in data) {
          if (data[key]) {
            this.state[key] = data[key]
          }
        }
      }
      this.dispatch2(this.state)
    }).catch(err => {
      message.error(err.msg || '获取信息失败!')
    })
  }
  /**
   * 根据科室编号出现文书过时和未过时
   */
  getMonitorOnlineList = () => {
    let { patientId, visitId, deptCode, qcMrPatient, timeOut } = this.getState()
    return ApiPatientMedical.getMonitorOnlineList(patientId, visitId, deptCode).then(data => {
      qcMrPatient = []
      timeOut = []
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].timeoutIndicator === 0) {
            qcMrPatient.push(data[i])
          } else {
            timeOut.push(data[i])
          }
        }
      }
      this.dispatch2({ qcMrPatient: qcMrPatient, timeOut: timeOut })
    }).catch(err => {
      message.error(err.msg || '获取信息失败!')
    })
  }

  /**
   * 文书超时双击方法
   */
  dblclicks = () => {
    let { patientId, visitId, deptCode, mrClassCode } = this.state
    newfileServiceService.patient(patientId, visitId, deptCode, mrClassCode, true)
  }
  /**
   * 根据分类查询病历信息
   */
  findPatinetFileListByPage = (page) => {
    let { mrClassCode, patientId, visitId, deptCode, defaultDept } = this.getState()
    return ApiPatientMedical.findPatinetFileListByPage(mrClassCode, page, patientId, visitId,
      deptCode, defaultDept).then((data: any) => {
        this.data = data
        this.dispatch2({ mainTotal: data.total })
        this.mainagApi.api.setRowData(data)
      }).catch(err => {
        message.error(err.msg || '获取信息失败!')
      })
  }
  /**
   * 根据分类查询病历信息和过时文书等信息
   */
  mainOnchange = () => {
    this.getPatientMedicalInfo()
    this.getMonitorOnlineList()
  }
  /**
   * 表格右键
   */
  tableContextClick = (dataIndex) => {
    return new Promise((resolve, reject) => {
      let { mrPatient, defaultDept, menu } = this.state
      menu = ['打印病历', '病历维护申请列表']
      mrPatient = mrPatient || this.data[dataIndex] || this.data.data[dataIndex]
      if (mrPatient) {
        if (defaultDept === mrPatient.deptCode) {
          menu.push('新建病历')
        }
        if (mrPatient.ifSign === 1) {
          menu.push('签字')
        }
        if (mrPatient.ifDelete === 1) {
          menu.push('删除病历')
        }
        if (mrPatient.ifChangeCreator === 1) {
          menu.push('修改创建人')
        }
        if (mrPatient.ifChangeText === 1) {
          menu.push('更改起草文书')
        }
        if (mrPatient.ifChangeApply === 1) {
          menu.push('病历维护申请')
        }
      }
      this.dispatch2({menu: menu})
      resolve()
    })
  }
  /**
   * 下拉框值改变
   */
  handSelectChange = (name, value) => {
    let { page } = this.getState()
    page.startIndex = 1
    this.dispatch2({ [name]: value })
    this.findPatinetFileListByPage(page)
  }
  /**
   * 表格右键菜单点击
   */
  handTableMenuclick = (menuIndex: number, dataIndex: number) => {
    let { patientId, visitId, deptCode, mrClassCode, menu, mrPatient, page } = this.state
    switch (menu[menuIndex]) {
      case '新建病历':
        newfileServiceService.patient(patientId, visitId, deptCode, mrClassCode, true)
        break
      case '打印病历':
        printFileService.patient(patientId, visitId, deptCode, mrClassCode, true)
        break
      case '病历维护申请列表':
        maintainFileServiceService.patient(patientId, visitId, deptCode, mrClassCode, true)
        break
      case '更改起草文书':
        modifyFileService.patient(mrPatient, true)
        break
      case '删除病历':
        return ApiPatientMrFileIndex.DeleteMrPatientFileIndex(mrPatient.id, 1).then((data: any) => {
          page.startIndex = 1
          this.findPatinetFileListByPage(page)
          message.success('删除成功')
        }).catch(err => {
          message.error(err.msg || '删除失败!')
        })
      case '病历维护申请':
        modifysmFileService.patient(mrPatient, true)
        break
      case '修改创建人':
        return ApiPatientMrFileIndex.ChangeCreator(mrPatient.id, 1).then((data: any) => {
          message.accessary('修改创建人成功')
          page.startIndex = 1
          this.findPatinetFileListByPage(page)
        }).catch(err => {
          message.error(err.msg || '修改创建人失败!')
        })
      default:
        break
    }
  }
  /**
   *  分页
   */
  onGridReady = (parms) => {
    let { page } = this.getState()
    // 将table赋值给agApi，通过agApi动态为table赋值
    this.mainagApi = parms
    /** 获取当前表格能显示多少行 */
    page.pageSize = parms.api.paginationGetPageSize()
    this.dispatch2({ page })
  }

  /**
   * 点击分页执行
   * @param clickPage
   */
  onShowSizeChange = (clickPage) => {
    let { page } = this.getState()
    page.startIndex = (page.pageSize * (clickPage - 1)) + 1
    if (clickPage === 1) {
      page.startIndex = 1
    }
    this.findPatinetFileListByPage(page)
    this.dispatch({ page })
  }
  /**
   * 获取分类中的选中行数据
   */
  showCurRow = (record) => {
    this.dispatch({ mrClassCode: record.key, mrClass: record.key })
    const { page } = this.getState()
    /**
     * 切换菜单 重置starIndex
     * @type {number}
     */
    page.startIndex = 1
    this.dispatch2({ page })
    this.findPatinetFileListByPage(page)
  }
  /**
   * 选中一行的方法
   */
  onchange = (e) => {
    this.dispatch({ mrPatient: e.data })
  }
}

export const medicalWrittenService = new MedicalWrittenService('medicalWritten')