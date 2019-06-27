/**
 * 班段字典维护 by hhc
 */
import React from 'react'
import css from './style/paragraphs.scss'
import classNames from 'classnames'
// model
import { Table } from 'pkg/common/table'
import { Select } from 'pkg/common/select'
import { HintInput } from 'pkg/common/input'
import { Rounded } from 'pkg/common/rounded'
import { IconFont } from 'pkg/common/icon'
import { DragMove } from 'pkg/common/dragging'
import { Label } from 'pkg/common/label'
import { Button, Checkbox, Input, Radio, TimePicker } from 'antd'
import moment from 'moment'
// service
import { FluxComponent } from 'tools/flux/FluxComponent'
import { paragraphsService, ParagraphsState } from 'service/hand-over/classes/paragraphs'

const RadioGroup = Radio.Group
const { TextArea } = Input

export default class Paragraphs extends FluxComponent<ParagraphsState> {
    title = '班段字典维护'
    paragraphsService = paragraphsService

    // 表格表头信息
    tableTitle = [
        {
            headerName: '班段名称',
            field: 'classesName'
        },
        {
            headerName: '类型',
            field: 'type',
            valueFormatter: (params) => {
                return params.data.type ? '科室' : '全院'
            }
        },
        {
            headerName: '护理单元',
            field: 'areaName'
        },
        {
            headerName: '时间',
            field: 'timeFrom1',
            valueFormatter: (params) => {
                let data = params.data,
                    html = ''
                if (data.timeFrom2) {
                    html = data.timeFrom1 + '-' + data.timeTo1 + '/' + data.timeFrom2 + '-' + data.timeTo2
                } else {
                    html = data.timeFrom1 + '-' + data.timeTo1
                }
                return html
            }
        },
        {
            headerName: '是否两头班',
            field: 'isTwoTime',
            valueFormatter: (params: any) => {
                return params.data.isTwoTime ? '是' : '否'
            }
        },
        {
            headerName: '班段说明',
            field: 'classesExplain'
        },
        {
            headerName: '假期班段',
            field: 'isVacation',
            valueFormatter: (params: any) => {
                return params.data.isVacation ? '是' : '否'
            }
        },
        {
            headerName: '一天允许出现次数',
            field: 'occurrenceNumber'
        },
        {
            headerName: '总时段',
            field: 'sumTime'
        }
    ]
    // 表格右键菜单
    menu = ['修改', '删除']
    format = 'HH:mm'

    render() {
        const { areaDict, rowData, modalOpen, areaDictValue, typeValue, searchClassesName } = this.state
        return (
            <div className={css.paragraphsMain}>
                {/*单元护理顶部搜索*/}
                <div className={css.paragraphsTitle}>
                    <Rounded leftShow={'护理单元合集'} className={css.collection}>
                        <Select
                            showSearch={true}
                            data={areaDict}
                            dataOption={{ value: 'value', key: 'key' }}
                            dropdownClassName={css.dropDownMenu}
                            onSelect={(val, option: any) => paragraphsService.areaDictChange(option.props.index)}
                            value={areaDictValue !== null ? areaDictValue.toString() : ''}
                            className={css.collectionSelect}
                        />
                    </Rounded>
                    <div className={css.smallCom}>
                        <b>类型:</b>
                        <RadioGroup className={css.radioGroupStyle}
                                    value={typeValue}
                                    onChange={paragraphsService.typeChange}>
                            <Radio value={0}>
                                {'全院'}
                            </Radio>
                            <Radio value={1}>
                                {'科室'}
                            </Radio>
                        </RadioGroup>
                        <Checkbox onChange={paragraphsService.isTwoTimeChange}>
                            {'是否是两头班'}
                        </Checkbox>
                    </div>
                    <Rounded leftShow={'班段名称'} className={css.collection}>
                        <HintInput value={searchClassesName} onChange={paragraphsService.searchClassesNameChange}/>
                    </Rounded>
                    <Button onClick={paragraphsService.search} className={`${css.btn} ${css.gray}`}>
                        <IconFont iconName={'icon-sousuo_sousuo'}/>{'查询'}
                    </Button>
                    <Button type={'primary'} onClick={paragraphsService.add} className={`${css.btn} ${css.blue}`}>
                        <IconFont iconName={'icon-icontianjia01'}/>{'新增'}
                    </Button>
                    <span className={css.rightTip}>注:右键可编辑</span>
                </div>
                {/*护理单元表格*/}
                <div className={css.mainTable}>
                    <Table
                        columnDefs={this.tableTitle}
                        menuclassName={'paragraphsTable'}
                        ContextMenuList={this.menu}
                        menuClik={paragraphsService.menuClick}
                        onGridReady={paragraphsService.onGridReady}
                    />
                </div>
                {/*护理单元弹框*/}
                <DragMove
                    title={<b className={css.dragTitle}>{'班段信息'}<span>{'(带*为必填)'}</span></b>}
                    visible={modalOpen}
                    onCancel={paragraphsService.closeModal}
                    okText={`保存`}
                    onOk={paragraphsService.save}
                    className={css.drag}
                    width={370}
                >
                    <div>
                        <Rounded leftShow={'班段名称'}
                                 className={classNames(css.collection, css.bottom)}
                        >
                            <HintInput value={rowData.classesName}
                                       onChange={paragraphsService.onClassNameChange}/>
                        </Rounded>
                        <Rounded leftShow={'护理单元'}
                                 className={classNames(css.collection, css.bottom)}
                        >
                            <Select
                                showSearch={true}
                                data={areaDict}
                                dropdownClassName={css.dropDownMenu}
                                dataOption={{ value: 'value', key: 'key' }}
                                onSelect={(val, option: any) => paragraphsService.modalAreaDictChange(option.props.index)}
                                value={rowData.areaId && String(rowData.areaId)}
                                className={css.collectionSelect}
                            />
                        </Rounded>
                        <div>
                            <Label>
                                <span>{'类型:'}</span>
                            </Label>
                            <RadioGroup value={rowData.type} onChange={paragraphsService.modalTypeChange} className={css.radioGroupStyle}>
                                <Radio value={0}>
                                    {'全院'}
                                </Radio>
                                <Radio value={1}>
                                    {'科室'}
                                </Radio>
                            </RadioGroup>
                        </div>
                        <div className={classNames(css.checkBoxGroup, css.bottom)}>
                            <Checkbox onChange={paragraphsService.modalVacation} checked={Boolean(rowData.isVacation)}>{'假期班段'}</Checkbox>
                            <Checkbox onChange={paragraphsService.modalsTransfer}
                                      checked={Boolean(rowData.isTransfer)}>{'是否是交接班'}</Checkbox>
                            <Checkbox onChange={paragraphsService.modalIsTwoTime} checked={Boolean(rowData.isTwoTime)}>{'是否是两头班'}</Checkbox>
                        </div>
                        <div className={css.bottom}>
                            <div className={css.timeGroup}>
                                <TimePicker placeholder={'开始时间1/小时.分钟'}
                                            format={this.format}
                                            className={css.timeP}
                                            value={rowData.timeFrom1 ? moment(rowData.timeFrom1, 'HH:mm') : null}
                                            onChange={paragraphsService.timeFromChange1}/>
                                <span className={css.inter}>~</span>
                                <TimePicker placeholder={'结束时间1/小时.分钟'}
                                            format={this.format}
                                            className={css.timeP}
                                            value={rowData.timeTo1 ? moment(rowData.timeTo1, 'HH:mm') : null}
                                            onChange={paragraphsService.timeToChange1}/>
                            </div>
                        </div>
                        <div className={`${css.bottom} ${!rowData.isTwoTime ? css.timeShow : ''}`}>
                            <div className={css.timeGroup}>
                                <TimePicker placeholder={'开始时间2/小时.分钟'}
                                            format={this.format}
                                            className={css.timeP}
                                            value={rowData.timeFrom2 ? moment(rowData.timeFrom2, 'HH:mm') : null}
                                            onChange={paragraphsService.timeFromChange2}/>
                                <span className={css.inter}>~</span>
                                <TimePicker placeholder={'结束时间2/小时.分钟'}
                                            format={this.format}
                                            className={css.timeP}
                                            value={rowData.timeTo2 ? moment(rowData.timeTo2, 'HH:mm') : null}
                                            onChange={paragraphsService.timeToChange2}/>
                            </div>
                        </div>
                        <Rounded
                            leftShow={'一天允许出现次数'}
                            className={classNames(css.collection, css.bottom)}
                        >
                            <HintInput value={rowData.occurrenceNumber}
                                       onChange={paragraphsService.onOccurrenceNumberChange}/>
                        </Rounded>
                        <Rounded
                            leftShow={'班段说明'}
                            className={classNames(css.bottom, css.textBox, css.collection)}
                        >
                            <TextArea defaultValue={rowData.classesExplain} onChange={paragraphsService.onClassesExplainChange}/>
                        </Rounded>
                    </div>
                </DragMove>
            </div>
        )
    }
}