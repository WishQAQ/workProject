/**
 * 检验申请页面-底部申请表格
 */
import React from 'react'
import css from '../style/lab.scss'
// model
import {Table} from 'pkg/common/table'
import {Card} from 'pkg/ui/card'
import {Rounded} from 'pkg/common/rounded'
import {InputTable} from 'pkg/common/inputTable'
import {Button, Radio, Modal} from 'antd'
import {IconFont} from 'pkg/common/icon'
import {DragMove} from 'pkg/common/dragging'
import {HintInput} from 'pkg/common/input'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {InspectionState, inspectionService} from 'service/pat-manage/patien-opt/lab/apply/index'
import {Information} from 'pkg/ui/information'

const RadioGroup = Radio.Group
export default class BottomApply extends FluxComponent<InspectionState> {
    title = '检验申请页面-底部申请表格'
    inspectionService = inspectionService
    /**
     * 表格列规则
     */
    tableTitle = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 20
        },
        {
            headerName: '检验项目类型',
            field: 'expand2',
        },
        {
            headerName: '检验项目',
            field: 'itemName',
        },
        {
            headerName: '标本',
            field: 'expand1',
        },
        {
            headerName: '金额',
            field: 'costs',
        },
    ]
    /*检验报告弹窗目录1**/
    reportTitle = [
        {headerName: '检验主题', field: 'theme'},
        {headerName: '状态', field: 'status', maxWidth: 70},
        {headerName: '申请时间', field: 'applyTime'}
    ]
    laboratoryTitle = [
        {headerName: '检验科室', field: 'theme'},
        {headerName: '检验状态', field: 'status', maxWidth: 100},
        {headerName: '报告时间', field: 'reportTime'}
    ]
    temTitle = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 20
        },
        {
            headerName: '模板名称',
            field: 'name',
        },
    ]
    informationArray = [
        {text: '检验主题', col: 12, labelWidth: 70, component: <span/>},
        {text: '标本', col: 6, labelWidth: 70, component: <span/>},
        {text: '申请医生', col: 6, labelWidth: 70, component: <span/>},
        {text: '检验目的', col: 12, labelWidth: 70, component: <span/>},
        {text: '申请时间', col: 6, labelWidth: 70, component: <span/>},
        {text: '报告者', col: 6, labelWidth: 70, component: <span/>}
    ]
    /*报告项目title*/
    detailsInfoTitle = [
        {headerName: '报告项目名称', field: 'theme'},
        {headerName: '结果', field: 'result',maxWidth:100},
        {headerName: '异常', field: 'abnormal',maxWidth:100},
        {headerName: '单位', field: 'unit',maxWidth:100},
        {headerName: '参考值', field: 'value',maxWidth:100},
        {headerName: '趋势图', field: 'runChart',maxWidth:100},
    ]

    render() {
        // 菜单
        let menu = this.state.spection.length === 0 ? ['无'] : this.state.spection
        let {reportOpen} = this.state
        let report = []
        for (let i = 0; i < 25; i++) {
            report.push({
                theme: `感染三项检测${i}`,
                status: '正常',
                applyTime: `昨天还是今天${i}`
            })
        }
        let laboratory = []
        for (let i = 0; i < 30; i++) {
            laboratory.push({
                theme: `泌尿外科${i}`,
                status: `确认报告`,
                reportTime: '2018-3-5'
            })
        }
        let detailsInfo = []
        for (let i = 0; i < 20; i++) {
            detailsInfo.push({
                theme: '不加热血清反应素实验试验（TRUST）',
                result: '阴性',
                abnormal: '',
                unit: 'PEIU/ML',
                value: '0-10',
                runChart: ''
            })
        }
        return (
            <div className={css.applyBottom}>
                <Card text={'申请项目'}
                      className={css.applyBottomMask}
                      extra={
                          <div className={css.bottomTitle}>
                              <div className={css.threeBtn}>
                                  <button className={this.state.deleteOpen ? `${css.btn} ${css.disableBtn}` : `${css.btn} ${css.greenBtn}`}
                                          disabled={this.state.deleteOpen}
                                          onClick={inspectionService.save}>
                                      <IconFont iconName={'icon-icontianjia01'}/>
                                      <span>保存</span>
                                  </button>
                                  <button className={`${css.btn} ${css.greenBtn}`}
                                      // onClick={报告事件}
                                          onClick={inspectionService.reportOpen}
                                  >
                                      <IconFont iconName={'icon-baogao-copy'}/>
                                      <span>报告</span>
                                  </button>
                                  <button className={`${css.btn} ${css.greenBtn}`}
                                          onClick={inspectionService.selectLabTemp}>
                                      <IconFont iconName={'icon-leimupinleifenleileibie'}/>
                                      <span>模板</span>
                                  </button>
                                  <button className={`${css.btn} ${css.greenBtn}`}
                                          onClick={inspectionService.clear}
                                  >
                                      <IconFont iconName={'icon-iconfontshequyijujue'}/>
                                      <span>清空</span>
                                  </button>
                              </div>
                              <div className={css.delBtn}>
                                  <Rounded leftShow={'项目名称'} className={css.itemName}>
                                      <InputTable
                                          data={this.state.clinicItemName || []}
                                          option={{
                                              total: this.state.clinicItemName ? this.state.clinicItemName.total : 0,
                                              columns: [{title: '名称', field: 'itemName'}],
                                              pageSize: 7,
                                              showValue: 'itemName'
                                          }}
                                          callBackMethods={(v: any) =>
                                              inspectionService.inputTableLabItem(v)}
                                          className={css.specialName}
                                      />
                                  </Rounded>
                                  <button className={this.state.invalidOpen ? `${css.btn} ${css.disableBtn}` : `${css.btn} ${css.redBtn}`}
                                          disabled={this.state.invalidOpen}
                                          onClick={inspectionService.cancelBtnClick}
                                  >
                                      <IconFont iconName={'icon-iconfontshequyijujue'}/>
                                      <span>作废</span>
                                  </button>
                                  <button className={this.state.deleteOpen ? `${css.btn} ${css.disableBtn}` : `${css.btn} ${css.redBtn}`}
                                          disabled={this.state.deleteOpen}
                                          onClick={inspectionService.deleteline}>
                                      <IconFont iconName={'icon-jianqu'}/>
                                      <span>删除</span>
                                  </button>
                              </div>
                          </div>}
                >
                    <Table
                        columnDefs={this.tableTitle}
                        rowData={this.state.inspecs}
                        menuclassName={'examApplyBottomMenu'}
                        ContextMenuList={menu}
                        menuclickShow={true}
                        onGridReady={inspectionService.onGridReady}
                        onSelectionChanged={inspectionService.onSelectionChanged}
                        // tableContextClick={inspectionService.indexof}
                        // onRowSelected={inspectionService.selectTheLine}
                        rowSelection={'multiple'}
                    />
                </Card>
                <DragMove
                    title={'检验项目'}
                    visible={this.state.open}
                    okText={'确认'}
                    onOk={inspectionService.selectLabTempItems}
                    onCancel={inspectionService.close}
                    className={css.temPop}
                    width={550}
                >
                    <div className={css.temInquires}>
                        <b>模板类型:</b>
                        <RadioGroup
                            defaultValue={'all'}
                            className={css.temRadios}
                        >
                            <Radio value={'all'}>{'全院'}</Radio>
                            <Radio value={'dept'}>{'科室'}</Radio>
                            <Radio value={'person'}>{'个人'}</Radio>
                        </RadioGroup>
                        <HintInput
                            className1={css.temInputs}
                            onChange={inspectionService.selectname}
                            value={name}
                        />
                        <Button type={'primary'} onClick={inspectionService.selectLabTemp}>
                            <IconFont iconName={'icon-sousuo_sousuo'}/>{'查询'}
                        </Button>
                    </div>
                    <div className={css.temTables}>
                        <Table
                            columnDefs={this.temTitle}
                            rowData={this.state.model}
                            onRowSelected={inspectionService.templateTheLine}
                        />
                    </div>
                </DragMove>
                <Modal
                    title={'检验报告'}
                    visible={reportOpen}
                    onCancel={inspectionService.reportClose}
                    maskClosable={false}
                    className={css.reportModal}
                    style={{top: 60}}
                    width={'95%'}
                    bodyStyle={{height: '80%'}}
                    maskStyle={{backgroundColor: 'rgba(0,0,0,.1)'}}
                    wrapClassName={css.specialWrap}
                >
                    <div className={css.reportMain}>
                        <div>
                            <div className={css.reportTable}>
                                <Table columnDefs={this.reportTitle}
                                       rowData={report}
                                       enableColResize={false}
                                />
                            </div>
                            <div className={css.laboratoryTable}>
                                <Table
                                    columnDefs={this.laboratoryTitle}
                                    rowData={laboratory}
                                    enableColResize={false}
                                />

                            </div>
                        </div>
                        {/*右侧详情*/}
                        <div className={css.rightStyle}>
                            <div className={css.btnContent}>
                                <Button type={'primary'}>
                                    <IconFont iconName={'icon-ordinaryprint'}>打印申请单</IconFont>
                                </Button>
                                <Button type={'primary'}>
                                    <IconFont iconName={'icon-ordinaryprint'}>打印报告</IconFont>
                                </Button>
                            </div>
                            <div className={css.infoGroup}>
                                <Information
                                    data={this.informationArray}
                                    layoutClassName={css.layoutStyle}
                                />
                            </div>
                            <div className={css.details}>
                                <Table
                                    columnDefs={this.detailsInfoTitle}
                                    rowData={detailsInfo}
                                    enableColResize={false}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}