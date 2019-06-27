/**
 * 班段字典维护
 * Created by wx
 */
import { BaseService } from 'tools/flux/BaseService'
import { ApiClassesDict, ApiDictData, ArrayData } from 'pkg/api'
import { DataDictEntityDict, Page, SchedulingClassesDictEntityClasses, SchedulingClassesDictModelDtoClasses } from 'pkg/entity'
import { message } from 'pkg/common/message'
import moment from 'moment'
export interface ParagraphsState {
    modalOpen?: boolean,// 弹框是否打开
    parAgtableData?: ArrayData<SchedulingClassesDictEntityClasses>,// 班段字典维护表格
    rowData?: SchedulingClassesDictModelDtoClasses,// 要修改保存的数据
    areaDict?: ArrayData<DataDictEntityDict>, // 护理单元集合数据
    areaDictValue?: number, // 护理单元集合选中值
    typeValue?: number, // 类型值
    isTwoTimeValue?: number,// 是否两头班
    searchClassesName?: string,// 班断名称搜索值
}
class ParagraphsService extends BaseService<ParagraphsState> {
    /**
     * table api
     * @type {null}
     */
    tableApi ?:any
    defaultState = {
        modalOpen: false,
        areaDictValue: null,
        typeValue: 0,// 默认类型值
        isTwoTimeValue: 0,
        searchClassesName: '',
        rowData: {
            classesName: '',// 班段名称
            type: 0,// 类型默认全院
            areaId: null,// 护理单元ID
            areaName: '',// 护理单元名称
            timeFrom2: '',
            timeTo2: '',
            isTwoTime: 0,// 两头班
            timeFrom1: '',
            timeTo1: '',
            classesExplain: null,// 班段说明
            isVacation: 0,// 假期班段
            occurrenceNumber: null,// 一天允许出现次数
            isTransfer: 0,// 是否交接班
            sumTime: ''
        }
    }

    /**
     * 页面加载执行
     */
    serviceWillMount() {
        const { searchClassesName, typeValue, isTwoTimeValue, areaDictValue } = this.state
        this.loadParAgtableData(searchClassesName, typeValue, isTwoTimeValue, {}, areaDictValue)
        this.loadAreaDict()
    }

    /**
     * 加载班段字典维护表格数据
     */
    loadParAgtableData = (name?: string, type?: number, radio?: number, page?: Page, groupId?: number) => {
        ApiClassesDict.select(name, type, radio, page, groupId).then((data) => {
            this.dispatch({ parAgtableData: data })
            this.tableApi.api.setRowData(data)
        }).catch((msg) => {
            message.error('表格信息获取失败！')
        })
    }
    /**
     * 保存事件
     */
    save = () => {
        const { rowData, searchClassesName, typeValue, isTwoTimeValue, areaDictValue } = this.state
        if (!rowData.classesName) return message.error('班段名称不能为空')

        if (!rowData.areaId) return message.error('护理单元不能为空')
        if (!rowData.isTwoTime) {
            if (!(rowData.timeFrom1 && rowData.timeTo1)) {
                return message.error('所有时间段必需选择')
            }
        } else {
            if (!(rowData.timeFrom1 && rowData.timeFrom2 && rowData.timeTo1 && rowData.timeTo2)) {
                return message.error('所有时间段必需选择')
            }
        }
        if (this.toSumTime(rowData, rowData.isTwoTime).sumTime) {
            this.dispatch({
                rowData: this.toSumTime(rowData, rowData.isTwoTime)
            })
        } else {
            return message.error('所有时间段必需选择,总时段出错')
        }
        if ((!rowData.occurrenceNumber) && rowData.occurrenceNumber > 100 && rowData.occurrenceNumber > 1) {
            return message.error('一天允许出现次数不能为空并且是两位数正整数')
        }
        ApiClassesDict.save(rowData).then(() => {
            this.loadParAgtableData(searchClassesName, typeValue, isTwoTimeValue, {}, areaDictValue)
            this.closeModal()
        })
    }
    /**
     * 时间格式转换事件
     * @param rowData
     * @param isTwoTime
     * @returns {any}
     */
    toSumTime = (rowData, isTwoTime) => {
        let t = [],
            h = 0,
            m = 0
        if (isTwoTime) {
            t = [
                {
                    timeFrom: rowData.timeFrom1,
                    timeTo: rowData.timeTo1
                },
                {
                    timeFrom: rowData.timeFrom2,
                    timeTo: rowData.timeTo2
                }
            ]
        } else {
            t = [
                {
                    timeFrom: rowData.timeFrom1,
                    timeTo: rowData.timeTo1
                }
            ]
        }
        t.forEach((item, i) => {
            if (moment(item.timeFrom, 'HH:mm').isBefore(moment(item.timeTo, 'HH:mm'))) {
                h += moment(item.timeTo, 'HH:mm').hour() - moment(item.timeFrom, 'HH:mm').hour()
                m += moment(item.timeTo, 'HH:mm').minute() - moment(item.timeFrom, 'HH:mm').minute()
            } else {
                h += 24 - moment(item.timeFrom, 'HH:mm').hour() + moment(item.timeTo, 'HH:mm').hour()
                m += moment(item.timeTo, 'HH:mm').minute() - moment(item.timeFrom, 'HH:mm').minute()
            }
        })
        if (m < 0) {
            h--
            m += 60
        }
        rowData.sumTime = (h > 0 ? (h + '小时') : '') + (m > 0 ? (m + '分钟') : '')
        return rowData
    }

    /**
     * 护理单元合集信息获取
     */
    loadAreaDict = () => {
        ApiDictData.loadAreaDict().then((data) => {
            this.dispatch({ areaDict: data })
        }).catch((msg) => {
            message.error(msg || '护理单元合集信息获取失败！')
        })
    }
    /**
     * 护理单元合集选择事件
     * @param v
     */
    areaDictChange = (v) => {
        const { areaDict } = this.state
        this.dispatch({
            areaDictValue: Number.parseInt(areaDict[v].key)
        })
    }
    /**
     * 类型选择事件
     * @param e
     */
    typeChange = (e) => {
        const { value } = e.target
        let typeValue = value && Number.parseInt(value)
        this.dispatch({
            typeValue: typeValue
        })
    }
    /**
     * 是否两头班checkbox选择事件
     * @param e
     */
    isTwoTimeChange = (e) => {
        this.dispatch({ isTwoTimeValue: Number(e.target.checked) })
    }
    /**
     * 班段名称搜索框事件
     * @param e
     */
    searchClassesNameChange = (e) => {
        this.dispatch({ searchClassesName: e.target.value })
    }
    /**
     * 查询事件
     */
    search = () => {
        const { searchClassesName, typeValue, isTwoTimeValue, areaDictValue } = this.state
        this.loadParAgtableData(
            searchClassesName, typeValue, isTwoTimeValue, {}, areaDictValue
        )
    }
    /**
     * 新增事件
     */
    add = () => {
        let { rowData } = this.state
        for (let i in rowData) {
            if (rowData[i]) rowData[i] = null
        }
        this.dispatch({ rowData: rowData })
        this.openModal()
    }
    /**
     * 表格api
     * @param parms
     */
    onGridReady = (parms) => {
        this.tableApi = parms
    }

  /**
   *  表格右键
   * @param menuIndex
   * @param dataIndex
   */
  menuClick = (menuIndex, dataIndex) => {
    const {parAgtableData} = this.state
    let newRowData = parAgtableData[dataIndex]
    if(!newRowData.isTwoTime){
      newRowData.timeFrom2 = ''
      newRowData.timeTo2 = ''
    }
    this.dispatch2({rowData: newRowData})
    if (menuIndex === 0) {// 修改
      this.openModal()
    } else {// 删除
      message.linkAge('确定要删除?', null, '确认', '取消', this.delete)
    }
  }
  /**
   * 删除事件
   */
  delete = ()=>{
    let {rowData ,searchClassesName, typeValue, isTwoTimeValue, areaDictValue} = this.state
    ApiClassesDict.delete(rowData.id).then((data)=>{
      this.loadParAgtableData(searchClassesName, typeValue, isTwoTimeValue, {}, areaDictValue)
    })
  }
  /**
   * 打开弹框
   */
  openModal = () => {
    this.dispatch({modalOpen: true})
  }
  /**
   * 关闭弹框
   */
  closeModal = () => {
    this.dispatch({modalOpen: false})
  }
  /**
   * 弹框班段名称改变事件
   * @param e {} Event
   */
  onClassNameChange = (e) => {
    let {rowData} = this.state
    rowData.classesName = e.target.value
    this.dispatch({rowData: rowData})
  }
  /**
   * 弹框中的护理单元选择事件
   * @param v
   */
  modalAreaDictChange = (v) => {
    const {areaDict} = this.state
    let rowData = this.state.rowData
    rowData.areaId.id = Number.parseInt(areaDict[v].key)
    rowData.areaName = areaDict[v].value
    this.dispatch({rowData: rowData})
  }
  /**
   * 弹框中的类型选择事件
   * @param e {} Event
   */
  modalTypeChange = (e) => {
    let {rowData} = this.state
    rowData.type = e.target.value
    this.dispatch({rowData: rowData})
  }
  /**
   * 弹框中的假期班段选择事件
   * @param e
   */
  modalVacation = (e) => {
    let {rowData} = this.state
    rowData.isVacation = Number(e.target.checked)
    this.dispatch({rowData: rowData})
  }
  /**
   * 弹框中的交接班选择事件
   * @param e {} Event
   */
  modalsTransfer = (e)=>{
    let {rowData} = this.state
    rowData.isTransfer = Number(e.target.checked)
    this.dispatch({rowData: rowData})
  }
  /**
   * 弹框中的两头班选择事件
   * @param e {} Event
   */
  modalIsTwoTime = (e) => {
    let {rowData} = this.state
    rowData.isTwoTime = Number(e.target.checked)
    if(! e.target.checked){
      rowData.timeFrom2=''
      rowData.timeTo2=''
    }
    this.dispatch({
      rowData: rowData
    })
  }
  /**
   * 时间1选择框1
   * @param time
   */
  timeFromChange1 = (time) =>{
    let {rowData} =this.state
    this.dispatch({
      rowData:this.timeTrans(rowData,time,'timeFrom1')
    })
    // if(this.state.rowData.timeTo1 && (!time.isBefore(moment(this.state.rowData.timeTo1,'HH:mm')))){
    //   rowData.timeFrom1 = null
    //   this.dispatch({
    //     rowData:rowData
    //   })
    // }else {
    //   rowData.timeFrom1 = time ? time.hour()+':'+time.minute():null
    //   this.dispatch({
    //     rowData:rowData
    //   })
    // }
  }
  /**
   * 时间格式转换
   * @param rowData
   * @param time
   * @returns {any}
   */
  timeTrans = (rowData,time,name)=>{
    let m = time.minute()
    if(m<10){
      m = '0'+m
    }
    switch (name){
      case 'timeFrom1':
        rowData.timeFrom1 = time ? time.hour()+':'+ m:''
        break
      case 'timeTo1':
        rowData.timeTo1 = time ? time.hour()+':'+ m:''
        break
      case 'timeFrom2':
        rowData.timeFrom2 = time ? time.hour()+':'+ m:''
        break
      case 'timeTo2':
        rowData.timeTo2 = time ? time.hour()+':'+ m:''
        break
      default :break
    }
    return rowData
  }
  /**
   * 时间1选择框2
   * @param time
   */
  timeToChange1 = (time)=>{
    let {rowData} =this.state
    this.dispatch({
      rowData:this.timeTrans(rowData,time,'timeTo1')
    })
    // if(this.state.rowData.timeFrom1 && (! time.isAfter(moment(this.state.rowData.timeFrom1,'HH:mm')))){
    //   rowData.timeTo1 = null
    //   this.dispatch({
    //     rowData:rowData
    //   })
    // }else {
    //   rowData.timeTo1 = time ? time.hour()+':'+time.minute():null
    //   this.dispatch({
    //     rowData:rowData
    //   })
    // }
  }
  /**
   * 时间2选择框1
   * @param time
   */
  timeFromChange2 = (time)=>{
    let {rowData} =this.state
    this.dispatch({
      rowData:this.timeTrans(rowData,time,'timeFrom2')
    })
  }
  /**
   * 时间2选择框2
   * @param time
   */
  timeToChange2 = (time)=>{
    let {rowData} = this.state
    this.dispatch({
      rowData:this.timeTrans(rowData,time,'timeTo2')
    })
  }
  /**
   * 弹框中出现次数输入事件
   * @param e {} Event
   */
  onOccurrenceNumberChange = (e)=>{
    let {rowData} = this.state
    rowData.occurrenceNumber = e.target.value
    this.dispatch({rowData: rowData})
  }
  /**
   * 弹框班段说明事件
   * @param e {} Event
   */
  onClassesExplainChange = (e)=>{
    let {rowData} = this.state
    rowData.classesExplain = e.target.value
    this.dispatch({rowData: rowData})
  }
}

export const paragraphsService = new ParagraphsService('paragraphs')