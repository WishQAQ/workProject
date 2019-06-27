import React from 'react'
import classnames from 'classnames'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import { DragSource, DropTarget } from 'react-dnd'
import { BunkCard } from 'pkg/ui/bunkCard'
import styles from './style/index.scss'

const types = {
    PatientCard: 'patientCard'
}

/**
 * 拖放源描述对象
 */
const patientCardSource = {
    // 拖放开始的回调函数,获取拖放源数据
    beginDrag(props) {
        const item = { id: props.id, ...props.patientInfo }
        return item
    },
    // 拖放结束的回调函数,获取目标源数据
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) return
        const currentItem = monitor.getItem()
        const targetResult = monitor.getDropResult()
        if (currentItem.id !== targetResult.id) {
            props.onTransferPatient(currentItem, targetResult)
            return targetResult
        }
    }
}

/**
 *
 * 返回拖放源收集对象
 *
 */
function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        targetResult: monitor.getDropResult(),
        currentItem: monitor.getItem()
    }
}

/**
 *
 * 目标源描述对象
 *
 */
const patientCardTarget = {
    // 返回目标源数据
    drop(props, monitor, component) {
        const targetResult = { id: props.id, ...props.patientInfo }
        return targetResult
    }
}

/**
 *
 * 返回目标源收集对象
 *
 */
function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

@DropTarget(types.PatientCard, patientCardTarget, dropCollect)
@DragSource(types.PatientCard, patientCardSource, dragCollect)
export class PatientCard extends React.Component<any, any> {
    render() {
        const {
            id,
            patientInfo,
            isDragging,
            connectDragSource,
            connectDropTarget,
            className,
            routeClick
        } = this.props

        const CardContextMenu = (
            <ContextMenu id={`contextMenu-${id}`}>
                {
                    this.props.menuData.map((v, k) => {
                        return <MenuItem key={k} onClick={() => this.props.menuClick(k + 1, id)}>{v}</MenuItem>
                    })
                }
            </ContextMenu>
        )

        const dndPatientCard =
            connectDropTarget(connectDragSource(
                <div className={classnames(styles.patientDetail)}>
                    <div className={classnames({
                        [styles.dragging]: isDragging
                    })}/>
                    <ContextMenuTrigger id={`contextMenu-${id}`}>
                        <BunkCard routeClick={routeClick} bunkInfo={patientInfo}/>
                    </ContextMenuTrigger>
                </div>
            ))

        return (
            <div className={classnames(className)}>
                {dndPatientCard}
                {CardContextMenu}
            </div>
        )
    }
}
