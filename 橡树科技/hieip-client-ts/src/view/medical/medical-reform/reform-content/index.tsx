import React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import { Medical, ReadMode } from 'medical-draft'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { LazyLoader } from 'tools/lazyLoader'
import { Icon } from 'antd'
import { Table } from 'pkg/common/table'
import { Images } from 'pkg/common/image/image.tsx'
import { reformContentService, ReformContentState as ContentState } from 'service/medical/medical-reform/reform-content'
import MedicalSidebar from './../reform-sidebar'
import styles from './style/index.scss'

// 首页加载时的患者表格头
const patientRolColumns = [
    {
        headerName: '环节质控',
        field: 'qualityControl',
        width: 80,
        cellClass: styles.qualityControl,
        cellRendererFramework: (params) => {
            if (params.data.counts === 0 || !params.data.counts)
                return null
            else return <span><Icon type="star" /></span>
        }
    },
    {
        headerName: '住院号',
        field: 'inpNo',
        width: 100,
        cellClass: styles.commonColumn
    },
    {
        headerName: '姓名',
        field: 'name',
        width: 100,
        cellClass: styles.commonColumn
    },
    {
        headerName: '性别/年龄',
        field: 'sex',
        width: 120,
        cellClass: styles.commonColumn,
        cellRendererFramework: (params) => {
            return <span>{params.data.sex} / {params.data.age}</span>
        }
    },
    {
        headerName: '次',
        field: 'counts',
        width: 50,
        cellClass: styles.commonColumn
    },
    {
        headerName: '住院标识',
        field: 'visitId',
        width: 100,
        cellClass: styles.commonColumn
    },
    {
        headerName: '诊断',
        field: 'diagnosis',
        width: 170,
        cellClass: styles.commonColumn
    },
    {
        headerName: '入院日期',
        field: 'admissionDateTime',
        width: 150,
        cellClass: styles.commonColumn,
        cellRendererFramework: (params) => {
            return <span>
                {moment(params.data.addmissionDateTime).format('YYYY-MM-DD HH:mm')}
            </span>
        }
    },
    {
        headerName: '费用类别',
        field: 'chargeType',
        width: 120,
        cellClass: styles.commonColumn
    },
    {
        headerName: '质控医师',
        field: 'doctorOfControlQuality',
        width: 100,
        cellClass: styles.commonColumn
    },
    {
        headerName: '质控护士',
        field: 'nurseOfControlQuality',
        width: 100,
        cellClass: styles.commonColumn
    },
    {
        headerName: '操作',
        field: 'operation',
        width: 120,
        cellClass: styles.commonColumn
    }
]

// 患者详情页的表格头
const patientDetailColumns = [
    {
        headerName: '姓名',
        field: 'name',
        width: 60,
        cellClass: styles.commonColumn
    },
    {
        headerName: '诊断',
        field: 'diagnosis',
        width: 90,
        cellClass: styles.commonColumn
    }
]

/**
 * 病历整改主页面 View
 * create by 李强
 * modify by  李潇潇
 * modify time 2018-2-3
 */
export default class ReformContentView extends FluxComponent<ContentState> {
    title: string = 'ReformContentView'
    medicalReformContentService = reformContentService

    render() {
        const {
            isExpand,                    // content页面是否折叠
            currentPatient,              // 当前选中患者
        } = this.state

        let sex = '3'
        if (currentPatient && currentPatient.sex === '男') {
            sex = '1'
        } else if (currentPatient && currentPatient.sex === '女') {
            sex = '2'
        }

        // 患者详情头部栏
        const patientInfo = currentPatient ? (
            <div className={styles.patientInfo}>
                <span className={classnames(styles.infoCell, styles.infoFirst)}>
                    <Images className={styles.infoSex} name={sex} />
                    <span>{currentPatient.name}</span>: {currentPatient.age}岁
                </span>
                <span style={{ flexGrow: 2 }} className={styles.infoCell}>
                    <span>住院号</span>: {currentPatient.inpNo}
                </span>
                <span className={styles.infoCell}>
                    <span>次数</span>: {currentPatient.visitId}
                </span>
                <span style={{ flexGrow: 2 }} className={styles.infoCell}>
                    <span>诊断</span>: {currentPatient.diagnosis}
                </span>
                <span style={{ flexGrow: 2 }} className={styles.infoCell}>
                    <span>入院日期</span>: {moment(currentPatient.admissionDateTime).format('YYYY-MM-DD')}
                </span>
                <span style={{ flexGrow: 2 }} className={classnames(styles.infoCell, styles.infoLast)}>
                    <span>费别</span>：{currentPatient.chargeType}
                </span>
            </div>
        ) : ''

        return (
            <div className={styles.root}>
                <div style={{ width: (!isExpand ? 150 : '100%') }} className={styles.patientList}>
                    {
                        !isExpand &&
                        <span className={styles.tableHeader}>
                            <span className={styles.tableTitle}>病患列表</span>
                            <Icon onClick={reformContentService.onHandleExpandClick} // 展开表格按钮
                                className={styles.tableIcon} type="menu-unfold" />
                        </span>
                    }
                    <div className={styles.patientTable}>
                        <Table
                            menuShow={true}
                            animateRows={true}
                            columnDefs={!isExpand ? patientDetailColumns : patientRolColumns}
                            ContextMenuList={['查看病案跟踪', '病案整改']}
                            menuClik={(menuIndex, dataIndex) => reformContentService.onContentMenuClick(menuIndex, dataIndex)} // 表格右击事件
                            menuclassName={'menuClass'}
                            onGridReady={(params) => reformContentService.onGridReady(params)}       // content 表格滚动加载
                            onCellClicked={(event) => reformContentService.onHandleCellClick(event)} // 患者病历详情页面中单击表格获取病历类型数据
                            onCellDoubleClicked={reformContentService.onHandleCellDoubleClick}       // 双击后跳转到患者详情页面
                            rowModelType={'infinite'}
                        />
                    </div>
                </div>
                {
                    !isExpand && (currentPatient !== null) &&
                    <div className={styles.patientDetail}>
                        {patientInfo}
                        <div className={styles.patientContent}>
                            <div className={styles.patientSidebar}>
                                <LazyLoader lazyModule={MedicalSidebar} />
                            </div>
                            <div className={styles.patientMedical}>
                                {
                                    !isExpand && (currentPatient !== null) &&
                                    <Medical
                                        editorState={null}
                                        pageHeader={null}
                                        pageFooter={null}
                                        readMode={ReadMode.readOnly}
                                        isShowTabbar={false}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
