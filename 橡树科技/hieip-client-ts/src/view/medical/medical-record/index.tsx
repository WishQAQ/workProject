import React from 'react'
import styles from './index.scss'
import {Tabs} from 'antd'
import {IconFont} from 'pkg/common/icon'
import {Btn} from 'pkg/common/button'
import classNames from 'classnames'
import {LazyLoader} from 'tools/lazyLoader'
import BasicRecord from 'view/medical/medical-record/basic'
import DiagnosisRecord from 'view/medical/medical-record/diagnosis'
import ExpenseRecord from 'view/medical/medical-record/expense'
import SurgeryRecord from 'view/medical/medical-record/surgery'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {basicService, BasicState} from 'service/medical/medical-record/basic/index'

// 卡片式页签
const TabPane = Tabs.TabPane

/**
 *  病案首页
 *  韦祎伟
 */
export default class MedicalRecordView extends FluxComponent<BasicState> {
    title = 'MedicalRecordView'
    basicService = basicService

    // 关闭弹窗
    handlePaySortAlterClose = (e) => {
        // 阻止符合条件的事件冒泡
        if (e.target && e.target.matches('.' + styles.oneOpe)) {
            return
        }
        this.setState({
            paySortAlter: false
        })
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handlePaySortAlterClose)
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handlePaySortAlterClose)
    }

    render() {
        const {patient, paySorts} = this.state
        // 分类付费 按钮颜色
        let greenBtn = '#16C2C2'
        // 一个病人的主要信息
        let summaryData = [
            {
                isIcon: true,
                icon: patient ? (patient.sex === '男' ? 'icon-nantouxiang' : 'icon-nvtouxiang') : 'icon-wenhaotouxiang',
                isBtn: false,
                btn: '',
                class: styles.oneInfo,
                title: '名字：',
                data: patient ? patient.name : '',
            },
            {
                isIcon: false,
                icon: '',
                isBtn: false,
                btn: '',
                class: styles.oneInfo,
                title: '年龄：',
                data: patient ? patient.age : ''
            },
            {
                isIcon: false,
                icon: '',
                isBtn: false,
                btn: '',
                class: styles.oneInfo,
                title: 'ID号：',
                data: patient ? patient.patientId : ''
            },
            {
                isIcon: false,
                icon: '',
                isBtn: false,
                btn: '',
                class: styles.oneInfo,
                title: '住院号：',
                data: patient ? patient.visitId : ''
            },
            {
                isIcon: false,
                icon: '',
                isBtn: true,
                btn: 'edit',
                class: classNames(styles.oneInfo, styles.oneInfoPay),
                title: '付费方式：',
                // data: currentPaySort,
                data: patient ? patient.chargeTypeEmr : ''
            },
            {
                isIcon: false,
                icon: '',
                isBtn: false,
                btn: '',
                class: styles.oneInfo,
                title: '病案号：',
                data: patient ? patient.medicalHao : ''
            },
            {
                isIcon: false,
                icon: '',
                isBtn: false,
                btn: '',
                class: styles.oneInfo,
                title: '医保号：',
                data: patient ? patient.insuranceNo : ''
            },
            {
                isIcon: false,
                icon: '',
                isBtn: false,
                btn: '',
                class: styles.oneInfo,
                title: '',
                data: ''
            }
        ]

        return (
            <div className={styles.root}>
                <div className={styles.header}>
                    病案首页
                </div>
                <div className={styles.summary}>
                    <ul>
                        {
                            summaryData ? summaryData.map((item, index) => {
                                return (
                                    <li className={item.class} key={index}>
                                        {item.isIcon ? <IconFont iconName={item.icon}/> : null}
                                        <div className={styles.oneSum}>
                                            {item.title}
                                            <span>{item.data}</span>
                                            {
                                                !this.state.paySortAlter ? null :
                                                    item.isBtn ? (
                                                        <div className={styles.operate}>
                                                            {
                                                                paySorts !== [] ? paySorts.map((item, index) => {
                                                                    return (
                                                                        <div className={styles.oneOpe}
                                                                             key={index}
                                                                             onClick={() => {
                                                                                 basicService.handleChangePaySort(item)
                                                                             }}>{item}
                                                                        </div>
                                                                    )
                                                                }) : null
                                                            }
                                                        </div>
                                                    ) : null
                                            }
                                        </div>
                                        {
                                            item.isBtn ? (
                                                <Btn btnParam={{
                                                    icon: item.btn,
                                                    style: {color: greenBtn},
                                                    onClick: basicService.handlePaySortAlterShow
                                                }}/>
                                            ) : null
                                        }
                                    </li>
                                )
                            }) : null
                        }
                    </ul>
                </div>
                <div className={styles.main}>
                    <Tabs type="card">
                        <TabPane tab="常用信息" key="1" className={styles.tabPane}>
                            <LazyLoader lazyModule={BasicRecord}/>
                        </TabPane>
                        <TabPane tab="诊断信息" key="2">
                            <LazyLoader lazyModule={DiagnosisRecord}/>
                        </TabPane>
                        <TabPane tab="手术信息" key="3">
                            <LazyLoader lazyModule={SurgeryRecord}/>
                        </TabPane>
                        <TabPane tab="费用信息" key="4">
                            <LazyLoader lazyModule={ExpenseRecord}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}