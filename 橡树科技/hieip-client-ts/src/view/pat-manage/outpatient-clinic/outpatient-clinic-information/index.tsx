/**
 *  门诊医生站
 *  韦祎伟
 */
// basic
import React from 'react'
// scss
import classNames from 'classnames'
import styles from './style/index.scss'
// oak Component
import {IconFont} from 'pkg/common/icon'
import {ColorIcon} from 'pkg/common/colorIcon'
// tools
import {extend} from 'jquery'
// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {OutpatientClinicInfoState, outpatientClinicInfoService} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-information'

export default class OutpatientClinicInformation extends FluxComponent<OutpatientClinicInfoState> {

    title: '门诊医生站-患者信息'
    outpatientClinicInfoService = outpatientClinicInfoService

    // 一个病人的主要信息
    summaryData = [
        {
            icon: ['icon-nantouxiang', 'icon-nvtouxiang', 'icon-wumingshi'],
            btn: 'icon-xie',
            class: styles.oneInfo,
            title: '姓名：',
        },
        {
            icon: '',
            btn: '',
            class: styles.oneInfo,
            title: '年龄：',
        },
        {
            icon: '',
            btn: '',
            class: styles.oneInfo,
            title: '就诊号：',
        },
        {
            icon: '',
            btn: '',
            class: styles.oneInfo,
            title: '病人ID：',
        },
        {
            icon: '',
            btn: '',
            class: styles.oneInfo,
            title: '费别：',
        },
        {
            icon: '',
            btn: '',
            class: styles.oneInfo,
            title: '就诊医师：',
        }
    ]

    render() {

        let {
            curAgPatInfo
        } = this.state

        extend(true, this.summaryData, [
            // 姓名
            {
                data: !curAgPatInfo ? '' : curAgPatInfo.name ? curAgPatInfo.name : ''
            },
            // 年龄
            {
                data: !curAgPatInfo ? '' : curAgPatInfo.age ? curAgPatInfo.age : ''
            },
            // 就诊号
            {
                data: !curAgPatInfo ? '' : curAgPatInfo.visitNo ? curAgPatInfo.visitNo : ''
            },
            // 病人ID
            {
                data: !curAgPatInfo ? '' : curAgPatInfo.patientId ? curAgPatInfo.patientId : ''
            },
            // 费别
            {
                data: !curAgPatInfo ? '' : curAgPatInfo.chargeType ? curAgPatInfo.chargeType : ''
            },
            // 就诊医师
            {
                data: !curAgPatInfo ? '' : curAgPatInfo.doctorName ? curAgPatInfo.doctorName : ''
            }
        ])

        return (
            <div className={styles.summary}>
                <ul>
                    {
                        this.summaryData ? this.summaryData.map((item: any, index) => {
                            return (
                                <li className={item.class} key={index} style={{width: '20%'}}>
                                    {item.icon !== '' ?
                                        <ColorIcon iconName={
                                            !curAgPatInfo ? item.icon[2] :
                                                !curAgPatInfo.sex ? item.icon[2] :
                                                    curAgPatInfo.sex === 1 ? item.icon[0] :
                                                        curAgPatInfo.sex === 2 ? item.icon[1] : item.icon[2]
                                        } className={styles.Icon}/>
                                        : null}
                                    <div className={styles.oneSum}>
                                        {item.title}
                                        <span>{item.data}</span>
                                    </div>
                                    {
                                        item.btn !== '' ? (
                                            <span onClick={outpatientClinicInfoService.openModify} className={styles.Btn}>
                                                <IconFont iconName={item.btn}/>
                                            </span>
                                        ) : null
                                    }
                                </li>
                            )
                        }) : null
                    }
                </ul>
            </div>
        )
    }
}