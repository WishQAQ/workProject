/**
 * Created by mod on 2017/12/25.
 */

import * as React from 'react'
import moment from 'moment'
import * as css from '../../style/index.scss'
import {Col, Icon, List, Menu, Row, Select, Collapse, Pagination} from 'antd'
import {Card} from 'src/packages/ui/card'
import {Table} from 'src/packages/common/table/table'
import Newfile from 'src/packages/ui/medical/written/new-file'
import PrintFile from 'src/packages/ui/medical/written/print-file'
import MaintainFile from 'src/packages/ui/medical/written/maintain-file'
import ModifyFile from 'src/packages/ui/medical/written/modify-file'
import ModifySmFile from 'src/packages/ui/medical/written/modifysm-file'
import debug from 'debug'
import {FluxComponent} from 'src/tools/flux/FluxComponent'
import {MedicalWrittenState, medicalWrittenService} from 'service/medical/medical/components/written'

const Panel = Collapse.Panel
const ListItem: any = List.Item
const Option = Select.Option
const log = debug('trace:病历:medical')

/**
 * 格式化时间
 * @param params
 */
function gshTimes(params) {
    let val = params.value
    val = val && moment(val).format('YYYY-MM-DD HH:mm')
    return val
}

let data = []
for (let i = 0; i < 100; i++) {
    data.push({
        topic: 'dgsdgsdg',
        lastModifyUserName: 'dgdgsdg' + i,
        editDisable: i
    })
}
const columns = [
    {
        headerName: '文档名称',
        field: 'fileName',
    }, {
        headerName: '创建人',
        field: 'creatorName',
    }, {
        headerName: '创建时间',
        field: 'createDateTime',
        valueFormatter: gshTimes,
    }, {
        headerName: '最后修改时间',
        field: 'lastModifyDateTime',
        valueFormatter: gshTimes,
    }, {
        headerName: '状态',
        field: 'statusName',
    }, {
        headerName: '文档属性',
        field: 'fileVisitTypeName',
    }, {
        headerName: '首次签名时间',
        field: 'firstMrSignDateTime',
        valueFormatter: gshTimes,
    }, {
        headerName: '最后修改人',
        field: 'lastModifyUserName',
    }, {
        headerName: '是否打印',
        field: 'printFlag',
        valueFormatter: (params) => {
            return params.name === 0 ? '打印' : '未打印'
        },
    }, {
        headerName: '允许编辑',
        field: 'editDisable',
        valueFormatter: (params) => {
            return params.name === 1 ? '不允许编辑' : '允许编辑'
        },
    }
]
export default class MedicalWritten extends FluxComponent<MedicalWrittenState> {
    title = '患者病历信息'
    medicalWrittenService = medicalWrittenService

    render() {
        let {
            patientFileList, menu, deptList, defaultDept, qcMrPatient, timeOut, page, mainTotal
        } = this.state
        return (
            <div className={css.medicalMain}>
                <Row>
                    <Col span={3}>
                        <Card
                            className={`${css.leftCard} ${css.card_left}`}
                            extra={
                                <Select value={defaultDept ? defaultDept : (deptList ? deptList[0].deptName : '')}
                                        onSelect={medicalWrittenService.mainOnchange}
                                        style={{width: '100%'}}
                                        onChange={medicalWrittenService.handSelectChange.bind(this, 'deptCode')}>
                                    {deptList ? deptList.map(data => <Option key={data.deptCode}
                                                                             value={data.deptCode}>{data.deptName}</Option>) : null}
                                </Select>}
                        >
                            <Menu
                                onSelect={medicalWrittenService.showCurRow}
                                style={{width: '100%'}}
                                mode="inline"
                            >{patientFileList ? patientFileList.map((e, i) => {
                                    return <Menu.Item key={e.mrClassCode}><Icon type="file"/>{`${e.mrClassName}
                                        (${e.templateIndexCount || '0'})`}
                                    </Menu.Item>
                                }
                            ) : ''}
                            </Menu>
                        </Card>
                    </Col>
                    <Col span={17} style={{padding: '0 10px'}}>
                        <Card
                            className={`${css.leftCard} ${css.center}`}
                            style={{height: 'calc(100% - 60px)'}}
                            text={'已书写文书'}
                            extra={<span style={{color: '#ff375b'}}>&nbsp;&nbsp;注：右键可编辑</span>}
                        >
                            <div className={css.writtenTable}>
                                <Table
                                    columnDefs={columns}
                                    ContextMenuList={menu}
                                    menuShow={true}
                                    pagination={true}
                                    paginationAutoPageSize={true}
                                    menuClik={medicalWrittenService.handTableMenuclick}
                                    onGridReady={medicalWrittenService.onGridReady}
                                    menuclassName={'medical-written-table-menu'}
                                    onCellClicked={medicalWrittenService.onchange}
                                    tableContextClick={medicalWrittenService.tableContextClick}
                                />
                            </div>
                        </Card>
                        <Pagination
                            className={css.pagintion}
                            style={{padding: '5px 10px', textAlign: 'right'}}
                            onChange={medicalWrittenService.onShowSizeChange}
                            size={'small'}
                            defaultCurrent={1}
                            total={mainTotal || 1}
                            pageSize={page.pageSize || 0}/>
                    </Col>
                    <Col span={4}>
                        <Card
                            className={`${css.leftCard} ${css.right}`}
                            text={`超时文书 (${timeOut ? timeOut.length : 0})`}
                        >
                            <div style={{height: '55%'}} className={css.noanymoicalTop}>
                                {timeOut && this.rightRender(timeOut)}
                            </div>
                            <div style={{height: '42.4%'}} className={css.noanymedicla}>
                                <Card
                                    className={`${css.leftCard} ${css.right}`}
                                    text={`未完成文书 (${qcMrPatient ? qcMrPatient.length : 0})`}
                                >
                                    <div className={css.noanymoicalTop} style={{height: 'calc(100% - 1.5rem)'}}>
                                        {qcMrPatient && this.rightRender(qcMrPatient)}
                                    </div>
                                </Card>
                            </div>
                        </Card>
                    </Col>
                </Row>
                {/*新增病历*/}
                <Newfile/>
                {/*打印病历*/}
                <PrintFile/>
                {/*病历维护申请列表*/}
                <MaintainFile/>
                {/*修改起草文书信息*/}
                <ModifyFile/>
                {/*病历维护申请 */}
                <ModifySmFile/>
            </div>
        )
    }

    /**
     * 超时文书列表
     * @param data
     * @returns {any}
     */
    private rightRender = (data) => {
        return data.length <= 5 ?
            <List
                itemLayout="horizontal"
                dataSource={data ? data : ''}
                renderItem={(item, index) => {
                    return <ListItem>
                        <ListItem.Meta
                            title={`${index + 1} 、${item.itemName}`}
                            description={this.renderMenuList(item)}
                            onDoubleClick={medicalWrittenService.dblclicks}
                        />
                    </ListItem>
                }}
            />
            :
            <Collapse bordered={false}>
                {data.map((item, i) => {
                    return <Panel
                        header={`${i + 1} 、${item.itemName}`}
                        key={item.itemName + i}
                        className={css.panel}>
                        {this.renderMenuList(item)}
                    </Panel>
                })}
            </Collapse>
    }

    private renderMenuList = (item) => {
        return (
            <div onClick={() => medicalWrittenService.handTableMenuclick(0, null)}>
                <p>截至时间：{item.enterDate ? moment(item.enterDate).format('YYYY-MM-DD HH:mm:ss') : ''}</p>
                <p style={{color: '#ff375b'}}>超时时间：{item.leaveTimeText}</p>
            </div>
        )
    }
}
