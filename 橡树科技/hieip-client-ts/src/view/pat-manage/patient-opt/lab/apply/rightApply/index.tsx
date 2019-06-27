/**
 * 检验右边已开申请列表 by hhc
 */
import React from 'react'
import css from '../style/lab.scss'
// component
import {Card} from 'pkg/ui/card'
import {Table} from 'pkg/common/table'
import {InspectionState, inspectionService} from 'service/pat-manage/patien-opt/lab/apply/index'
import {FluxComponent} from 'tools/flux/FluxComponent'
import moment from 'moment'

export default class RightApply extends FluxComponent<InspectionState> {
    title = '检验申请右边申请表格'
    inspectionService = inspectionService
    columns = [
        {
            headerName: '检验主题',
            field: 'itemName',
            valueFormatter: (params) => {
                return params.value ? params.value.itemName : ''
            }
        },
        {
            headerName: '状态',
            field: 'status',
            valueFormatter: (params) => {
                return params.value ? params.value.status : ''
            }
        },
        {
            headerName: '申请时间',
            field: 'applyDateTime',
            valueFormatter: (params) => {
                if (params.value) {
                    return moment(params.value ? params.value.applyDateTime : '').format('YYYY-MM-DD hh:mm:ss')
                }
            }
        },
    ]
    /**
     * 根据是否作废设置样式
     * @param params 默认参数
     * @returns {{background: string}} 返回设置的样式
     */
    getRowStyle=(params)=>{
        if(params.data.status==='作废'){
            return {color: '#ff375b'}
        }
    }
    render() {
        let data = []
        for (let i = 0; i < 30; i++) {
            data.push({
                theme: `主题${i}`,
                status: `状态${i}`,
                applyTime: `2018-01-${i}`,
            })
        }
        let menu = ['作废']
        return (
            <Card text={`已开申请列表`}
                  className={css.applyList}
            >
                <div className={css.table}>
                    <Table
                        columnDefs={this.columns}
                        rowData={this.state.openInspection ? this.state.openInspection : []}
                        getRowStyle={this.getRowStyle}
                        menuclassName={'labApplyRightMenu'}
                        onGridReady={inspectionService.toObtain}
                        onRowSelected={inspectionService.openTestLine}
                        ContextMenuList={menu}
                        menuClik={inspectionService.rightCancel}
                    />
                </div>
            </Card>
        )
    }
}
