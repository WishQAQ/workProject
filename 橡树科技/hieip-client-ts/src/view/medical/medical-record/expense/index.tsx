import React from 'react'
import styles from './style/index.scss'
import {Col, Row} from 'antd'
import classNames from 'classnames'
import {btnDiv} from 'view/pat-manage/patient-opt/exam/apply/style/exam.scss'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {expenseService, ExpenseState} from 'service/medical/medical-record/expense/index'

/**
 * 病案首页费用信息页面
 */
export default class ExpenseRecordView extends FluxComponent<ExpenseState> {
    title = 'ExpenseRecordView'
    expenseService = expenseService

    render() {
        const {patient} = this.state
        // 测试数据
        let data = [
            {
                name: '综合医疗服务类',
                content: [
                    {detailName: '一般医疗服务类', spend: patient ? patient.zhYbyl || 0 : 0},
                    {detailName: '一般治疗操作费', spend: patient ? patient.zhYbzl || 0 : 0},
                    {detailName: '护理费', spend: patient ? patient.zhHlHl || 0 : 0},
                    {detailName: '其他费用', spend: patient ? patient.zhOtherQt || 0 : 0}
                ]
            },
            {
                name: '诊断费',
                content: [
                    {detailName: '病理诊断费', spend: patient ? patient.zdBlBl || 0 : 0},
                    {detailName: '实验室诊断费', spend: patient ? patient.zdSysHy || 0 : 0},
                    {detailName: '影像学诊断费', spend: patient ? patient.zdYxx || 0 : 0},
                    {detailName: '临床诊断项目费', spend: patient ? patient.zdLcxmJc || 0 : 0}
                ]
            },
            {
                name: '治疗类',
                content: [
                    {detailName: '非手术治疗项目费', spend: patient ? patient.zlFsszlxm || 0 : 0},
                    {detailName: '手术治疗费', spend: patient ? patient.zlSszl || 0 : 0},
                    {detailName: '临床物理治疗费', spend: patient ? patient.zlLcwlzl || 0 : 0},
                    {detailName: '麻醉费', spend: patient ? patient.zlMzMz || 0 : 0}
                ]
            },
            {
                name: '手术费',
                content: [
                    {detailName: '手术费', spend: patient ? patient.zlSsSs || 0 : 0}
                ]
            },
            {
                name: '康复类',
                content: [
                    {detailName: '康复费', spend: patient ? patient.kfKfKfzl || 0 : 0}
                ]
            },
            {
                name: '西药类',
                content: [
                    {detailName: '西药费', spend: patient ? patient.xyXyXy || 0 : 0},
                    {detailName: '抗菌药物', spend: patient ? patient.xyKjywKjyw || 0 : 0}
                ]
            },
            {
                name: '中药类',
                content: [
                    {detailName: '中药治疗费', spend: patient ? patient.zyZyzlZyzl || 0 : 0}
                ]
            }
        ]
        return (
            <div className={styles.root}>
                <Row className={styles.top}>
                    <Col span={3} className={classNames(styles.base, styles.title)}>住院费用</Col>
                    <Col span={21}>
                        <Row>
                            <Col span={5} className={classNames(styles.base, styles.title)}>总费用</Col>
                            <Col span={5} className={styles.base}>{patient ? patient.totalCosts || 0 : 0}</Col>
                            <Col span={5} className={classNames(styles.base, styles.title)}>自付金额</Col>
                            <Col span={9}
                                 className={classNames(styles.base, styles.rightBor)}>{patient ? patient.totalPayments || 0 : 0}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {/* 第一层循环 */}
                {
                    data.map((item, index) => {
                        let bigTitle = ''
                        let specialTitle = item.content.length
                        if (specialTitle === 2) {
                            bigTitle = styles.title2
                        } else if (specialTitle === 4) {
                            bigTitle = styles.title4
                        } else if (index === data.length - 1) {
                            bigTitle = styles.bottomTitle
                        } else {
                            bigTitle = styles.title
                        }
                        return (
                            <Row key={index}>
                                <Col span={3} className={classNames(styles.base, bigTitle)}>{item.name}</Col>
                                {/* 第二层循环 */}
                                <Col span={21}>
                                    {
                                        item.content.map((value, key) => {
                                            let isBottom = ''
                                            if (key === item.content.length - 1) {
                                                isBottom = styles.bottomBase
                                            }
                                            if (key === item.content.length - 1 && index === data.length - 1) {
                                                isBottom = styles.bottomTotal
                                            }
                                            return (
                                                <Row key={key}>
                                                    <Col span={5} className={classNames(styles.base, isBottom)}>
                                                        {value.detailName}</Col>
                                                    <Col span={19}
                                                         className={classNames(styles.base, styles.rightBase, isBottom)}>
                                                        {value.spend}</Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        )
                    })
                }
            </div>
        )
    }
}