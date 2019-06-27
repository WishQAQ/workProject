/**
 * 患者概览主内容区域
 */
import React from 'react'
import css from '../style/index.scss'
import MainContents from './mainContent'
// mode
import {IconFont} from 'pkg/common/icon'
import {DragMove} from 'pkg/common/dragging'
import {LazyLoader} from 'tools/lazyLoader'
import {Rounded} from 'pkg/common/rounded'
import {HintInput} from 'pkg/common/input'
import {TimePicker} from 'pkg/common/timePicker'
import {Label} from 'pkg/common/label'
import {Radio, Select, Tooltip} from 'antd'
import {overviewService, OverviewServiceState} from 'service/pat-manage/patien-opt/overview/mian'
import {FluxComponent} from 'tools/flux/FluxComponent'
// other
import classNames from 'classnames'
import {JsonUtil} from 'tools/api/JsonUtil'
import moment from 'moment'

// antd
const Option = Select.Option
const RadioGroup = Radio.Group

export interface State {
    open?: boolean // 修改信息框状态
}

export default class MainContent extends FluxComponent<OverviewServiceState> {
    title = '患者概览主内容区域'
    overviewService = overviewService

    /**
     * 顶部基本信息
     */
    titleFirst = [
        {
            headerName: '姓名:',
            field: 'name'
        },
        {
            headerName: '年龄:',
            field: 'age'
        },
        {
            headerName: '身份:',
            field: 'identity.name'
        },
        {
            headerName: '病人ID:',
            field: 'patientId'
        },
        {
            headerName: '就诊号:',
            field: 'visitNo'
        },
        {
            headerName: '费别:',
            field: 'chargeType.name'
        }
    ]

    /**
     * 顶部基本信息
     */
    titleSecond = [
        {
            headerName: '联系电话:',
            field: 'nextOfKinPhone'
        },
        {
            headerName: '健康卡号:',
            field: 'card'
        },
        {
            headerName: '入科时间:',
            field: 'admWardDateTime',
            valueFormatter: (params) => {
                let val = params.value
                val = moment(val).format('YYYY-MM-DD HH:mm:ss')
                return val
            }

        },
        {
            headerName: '医保卡号:',
            field: 'cardNum'
        },
        {
            headerName: '地址:',
            field: 'mailingAddress'
        },
        {
            headerName: '身份证号:',
            field: 'idNo'
        }
    ]

    render() {
        let {open, patientVisit, chargeTypeList, identityList} = this.state
        return (
            <div className={css.main}>
                <div className={css.mainTitleInfo}>
                    <div className={css.titleContent1}>
                        {this.titleFirst.map((e, index) => {
                            return <span key={index}
                                         className={`${this.titleFirst.length - 1 === index ? css.special : ''}`}>
                                        {e.headerName}
                                <Tooltip title={patientVisit ? patientVisit[e.field] : ''}>
                                            <b>{patientVisit ? (JsonUtil.getJsonByKey('patientVisit.' + e.field, this.state, '')) : ''}</b>
                                        </Tooltip>
                                {index === 0 ? <span className={css.infoEdit} onClick={overviewService.editInfo}>
                                             <IconFont iconName={'icon-xiugai'}/>
                                        </span> : null}
                                    </span>
                        })}
                    </div>
                    <div className={css.titleContent2}>
                        {this.titleSecond.map((e, index) => {
                            return <span key={index}
                                         className={`${this.titleSecond.length - 1 === index ? css.special : ''}`}>
              {e.headerName}
                                <Tooltip title={patientVisit ? patientVisit[e.field] : ''}>
                    <b>{patientVisit ? (JsonUtil.getJsonByKey('patientVisit.' + e.field, this.state, '')) : ''}</b>
                </Tooltip>
            </span>
                        })}
                    </div>
                </div>
                <LazyLoader lazyModule={MainContents}/>

                <DragMove
                    title={'修改个人信息'}
                    visible={open}
                    onOk={overviewService.handleClose}
                    onCancel={overviewService.handleClose}
                    okText={'修改'}
                    cancelText={'取消'}
                    className={css.infoModel}
                    zIndex={100}
                    width={430}
                >
                    <Rounded leftShow={'患者ID'} className={css.infoItems}>
                        <HintInput
                            className={css.infoInput}
                            value={patientVisit ? (patientVisit.id ? patientVisit.id : '') : ''}
                        />
                    </Rounded>
                    <Rounded leftShow={'就诊号'} className={css.infoItems}>
                        <HintInput
                            className={css.infoInput}
                            value={patientVisit ? (patientVisit.visitNo ? patientVisit.visitNo : '') : ''}
                        />
                    </Rounded>
                    <div className={classNames(css.doubleInfoItem)}>
                        <Rounded leftShow={'姓名'} className={css.infoItems}>
                            <HintInput
                                className={css.infoInput}
                                value={patientVisit ? (patientVisit.name ? patientVisit.name : '') : ''}
                            />
                        </Rounded>
                        <div className={css.sexStyle}>
                            <Label className={css.sexLabel} asterisk={true}>性别:</Label>
                            <RadioGroup
                                defaultValue={patientVisit ? (patientVisit.sex.id ? patientVisit.sex.id : '') : ''}>
                                <Radio value={1}>{'男'}</Radio>
                                <Radio value={0}>{'女'}</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    <Rounded leftShow={'出生日期'} className={classNames(css.infoItems, css.specialTime)}>
                        <TimePicker
                            className={css.infoTime}
                            onChange={overviewService.setStateJson.bind(this, 'patientVisit.dateOfBirth')}
                            // value={patientVisit.dateOfBirth}
                        />
                    </Rounded>
                    <div className={css.doubleInfoItem}>
                        <Rounded leftShow={'费别'}>
                            <Select
                                className={css.infoSelect}
                                showSearch={true}
                                value={patientVisit ? (patientVisit.chargeType.name ? patientVisit.chargeType.name : '') : ''}
                                onChange={overviewService.setStateJson.bind(this, 'patientVisit.chargeType.id')}
                                allowClear={true}
                            >
                                {
                                    chargeTypeList ? chargeTypeList.map
                                    (data => <Option key={data.key} value={data.key}>{data.value}</Option>) : null}
                            </Select>
                        </Rounded>
                        <Rounded leftShow={'身份'}>
                            <Select
                                className={css.infoSelect}
                                showSearch={true}
                                allowClear={true}
                                value={patientVisit ? (patientVisit.identity.name ? patientVisit.identity.name : '') : ''}
                                onChange={overviewService.setStateJson.bind(this, 'patientVisit.identity.id')}
                            >
                                {
                                    identityList ? identityList.map(data => <Option key={data.key}
                                                                                    value={data.key}>{data.value}</Option>) : null}
                            </Select>
                        </Rounded>
                    </div>
                    <Rounded leftShow={'身份证号'} className={css.infoItems}>
                        <HintInput
                            className={css.infoInput}
                            value={patientVisit ? (patientVisit.visitNo ? patientVisit.visitNo : '') : ''}
                            onChange={overviewService.setStateJson.bind(this, 'patientVisit.visitNo')}
                        />
                    </Rounded>
                    <Rounded leftShow={'分诊时间'} className={classNames(css.infoItems, css.specialTime)}>
                        <TimePicker
                            className={css.infoTime}
                            // value={patientVisi}
                        />
                    </Rounded>
                    <div className={css.doubleInfoItem}>
                        <Rounded leftShow={'联系人'}>
                            <HintInput
                                className={css.infoInput}
                                onChange={overviewService.setStateJson.bind(this, 'patientVisit.nextOfKin')}
                                value={patientVisit ? (patientVisit.nextOfKin ? patientVisit.nextOfKin : '') : ''}
                            />
                        </Rounded>
                        <Rounded leftShow={'联系电话'}>
                            <HintInput
                                className={css.infoInput}
                                onChange={overviewService.setStateJson.bind(this, 'patientVisit.nextOfKinPhone')}
                                value={patientVisit ? (patientVisit.nextOfKinPhone ? patientVisit.nextOfKinPhone : '') : ''}
                            />
                        </Rounded>
                    </div>
                    <Rounded leftShow={'地址'} className={css.infoItems}>
                        <HintInput
                            onChange={overviewService.setStateJson.bind(this, 'patientVisit.mailingAddress')}
                            className={css.infoInput}
                            value={patientVisit ? (patientVisit.mailingAddress ? patientVisit.mailingAddress : '') : ''}
                        />
                    </Rounded>
                    <Rounded leftShow={'入科时间'} className={classNames(css.infoItems, css.specialTime)}>
                        <TimePicker
                            className={css.infoTime}
                            onChange={overviewService.setStateJson.bind(this, 'patientVisit.admWardDateTime')}
                            // value={patientVisit.admWardDateTime?patientVisit.admWardDateTime:''}
                        />
                    </Rounded>
                </DragMove>
            </div>
        )
    }
}