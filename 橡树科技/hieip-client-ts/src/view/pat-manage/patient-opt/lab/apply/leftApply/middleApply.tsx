/**
 * 检验申请页面-中部红字信息框
 */
import React from 'react'
import css from '../style/lab.scss'
// model
import {Card} from 'pkg/ui/card'
import {Rounded} from 'pkg/common/rounded'
import {InputTable} from 'pkg/common/inputTable'
// other
import {Popover} from 'antd'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {inspectionService, InspectionState} from 'service/pat-manage/patien-opt/lab/apply/index'

// export interface MiddleState extends OrdersState {
//     show: boolean // 菜单说明弹框打开状态
// }
export default class MiddleApply extends FluxComponent<InspectionState> {
    title = '检验页面'
    inspectionService = inspectionService

    render() {
        const {clinicItemNameDict, spection} = this.state
        return (
            <div className={css.applyMiddle}>
                <Card extra={
                    <div className={css.selectGroup}>
                        <Rounded leftShow={'科室'} className={css.rounded}>
                            <InputTable
                                data={this.state.dept || []}
                                option={{
                                    total: this.state.dept ? this.state.dept.total : 0,
                                    columns: [{title: '科室', field: 'value'}],
                                    pageSize: 7,
                                    showValue: 'value'
                                }}
                                callBackMethods={(v: any) =>
                                    inspectionService.inputTableDept(v)
                                }
                                className={css.roundedSelect}
                            />
                        </Rounded>
                        <Rounded leftShow={'检验类型'} className={css.rounded}>
                            <InputTable
                                data={this.state.checkcate || []}
                                option={{
                                    total: this.state.checkcate ? this.state.checkcate.length : 0,
                                    columns: [{title: '类型', field: 'value'}],
                                    pageSize: 7,
                                    showValue: 'value'
                                }}
                                callBackMethods={(v: any) => inspectionService.inputTableLabItemClassDict(v)}
                                className={css.roundedSelect}
                            />
                        </Rounded>

                        <Rounded leftShow={'标本'} className={css.rounded}>
                            <InputTable
                                data={this.state.specimens || []}
                                option={{
                                    total: this.state.specimens ? this.state.specimens.total : 0,
                                    columns: [{title: '标本', field: 'value'}],
                                    pageSize: 7,
                                    showValue: 'value'
                                }}
                                callBackMethods={(v: any) => inspectionService.inputTableSpecimanDict(v)}
                                className={css.roundedSelect}
                            />
                        </Rounded>
                    </div>}
                      className={css.middleContent}
                >
                    <ul className={css.labUl}>
                        {clinicItemNameDict.map((e, index) => {
                            return <Popover
                                key={index}
                                placement="top"
                                trigger={'click'}
                                overlayClassName={css.popover}
                                content={
                                    spection.map((e,i) => {
                                        if (spection.length === 0) {
                                            return <p key={i}>{''}</p>
                                        }
                                        else {
                                            return <p key={i}>{e}</p>
                                        }
                                    })
                                }
                            >
                                <li
                                    onClick={inspectionService.loadLabPriceItems.bind(this, e.itemCode)}
                                    onDoubleClick={inspectionService.index.bind(this, e)}
                                >
                                    <span>【{e.expand1}】</span>
                                    <span>{e.itemName}</span>
                                </li>
                            </Popover>
                        })}
                    </ul>
                </Card>
            </div>
        )
    }
}