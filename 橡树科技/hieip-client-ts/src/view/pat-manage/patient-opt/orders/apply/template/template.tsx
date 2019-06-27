import React from 'react'
import css from './style/index.scss'
// model
import { Rounded } from 'pkg/common/rounded'
import { Select } from 'pkg/common/select'
import { HintInput } from 'pkg/common/input'
import { DragMove } from 'pkg/common/dragging'
import { IconFont } from 'pkg/common/icon'
import { Card } from 'pkg/ui/card'
import { Button, Radio } from 'antd'
// service
import { FluxComponent } from 'tools/flux/FluxComponent'
import { orderService, OrderState } from 'service/pat-manage/patien-opt/orders/apply/orders/index'
import { Table } from 'pkg/common/table'

export default class Template extends FluxComponent<OrderState> {
    title = '快速医嘱'
    orderService = orderService

    tempTitle = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            maxWidth: 30
        },
        {
            headerName: '类型',
            field: ''
        },
        {
            headerName: '模板名称',
            field: ''
        }
    ]

    chooseTitle = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            maxWidth: 30
        },
        {
            headerName: '类型',
            field: ''
        },
        {
            headerName: '药品名称',
            field: ''
        },
        {
            headerName: '剂量',
            field: ''
        },
        {
            headerName: '单位',
            field: ''
        },
        {
            headerName: '途径',
            field: ''
        },
        {
            headerName: '频次',
            field: ''
        },
        {
            headerName: '执行时间',
            field: ''
        }
    ]

    render() {
        let { tempOpen } = this.state
        return (
            <DragMove
                title={'医嘱模板'}
                visible={tempOpen}
                onCancel={orderService.tempClose}
                className={css.tempDragMove}
                width={880}
                cwidth={880}
                cheight={450}
            >
                <div>
                    <div className={css.tempSearchCondition}>
                        <div className={css.tempCondition}>
                            <b>{'模板内容:'}</b>
                            <Radio.Group>
                                <Radio value={'all'}>{'全部'}</Radio>
                                <Radio value={'dept'}>{'科室'}</Radio>
                                <Radio value={'person'}>{'个人'}</Radio>
                            </Radio.Group>
                        </div>
                        <Rounded
                            leftShow={'模板分类'}
                            className={css.tempSelect}
                        >
                            <Select
                                data={[]}
                            />
                        </Rounded>
                        <Rounded leftShow={'模板名称'}
                                 className={css.tempHintInput}
                        >
                            <HintInput/>
                            <span className={css.searchIcon}>
                <IconFont iconName={'icon-sousuo-'}/>
              </span>
                        </Rounded>
                    </div>
                    <div>
                        <div className={css.doubleTemp}>
                            <div>
                                <Card
                                    text={'模板内容'}
                                    className={css.tempContent}
                                >
                                    <Table
                                        columnDefs={this.tempTitle}
                                        rowData={[]}
                                    />
                                </Card>
                            </div>
                            <div>
                                <Card
                                    text={'选择医嘱内容'}
                                    className={css.tempContent}
                                >
                                    <Table
                                        columnDefs={this.chooseTitle}
                                        rowData={[]}
                                    />
                                </Card>
                            </div>
                        </div>
                        <div className={css.tempButton}>
                            <Button type={'danger'} className={css.delButton}>{'删除'}</Button>
                            <Button type={'primary'}>{'确定'}</Button>
                        </div>
                    </div>
                </div>
            </DragMove>
        )
    }
}