import React from 'react'
import css from './style/index.scss'
// model
import { Select } from 'pkg/common/select'
import { DragSource, DropTarget } from 'react-dnd'

const type = {
    schedule: 'schedule'
}

/**
 * 拖动源目标
 */
const dragSource = {
    // 拖放开始的回调函数,获取拖放源数据
    beginDrag(props) {
        return props
    },
    canDrag(props, monitor){ // 判断是否允许拖动
        return props.isDrag
    },
    endDrag(props, monitor, component) {  // 拖放结束的回调函数,获取目标源数据
        // 是否正在执行拖动
        if (!monitor.didDrop()) return false
        let currentItem = monitor.getItem().dataSource // 正在拖动对象
        let targetResult = monitor.getDropResult().props.dataSource // 最后存放的拖动对象
        // 判断 数据的id是否一致,如果不一致就进行修改
        if (currentItem.id !== targetResult.id) { 
            props.isChange(currentItem, targetResult)
            return targetResult
        }
    }
}

/**
 * 目标源描述对象
 */
const dragEnd = {
    // 返回目标源数据
    drop(props, monitor, component) {
        let targetResult = { id: props.id, props: props }
        return targetResult
    }
}

/**
 * 返回拖放源收集对象
 */
function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(), // 返回组件中必须使用的函数
        isDragging: monitor.isDragging(), // 正在执行拖动操作
        targetResult: monitor.getDropResult(), // 最后存放的拖动对象
        currentItem: monitor.getItem() // 正在拖动对象
    }
}

/**
 * 返回目标源收集对象
 */
function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),// 返回组件中必须使用的函数
        isOver: monitor.isOver() // 接收方接受拖动源时为true
    }
}

export interface ChangeState {
    value: string
}

@DropTarget(type.schedule, dragEnd, dropCollect)  // 接受源
@DragSource(type.schedule, dragSource, dragCollect) // 拖动源
export default class ChangeSchedule extends React.Component<any, ChangeState> {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    render() {
        const { dataSource, disabled, value, schedule, connectDragSource, connectDropTarget, isOver, onChange } = this.props
        return (
            disabled ?
                connectDropTarget(connectDragSource(<div className={`${css.shiftStyle} ${isOver ? css.lightHeight : ''}`}>
                    <div>
                        {dataSource.classesName}
                    </div>
                </div>)) :
                <div className={`${css.shiftStyle} ${isOver ? css.lightHeight : ''}`}>
                    <Select
                        data={schedule}
                        allowClear={true}
                        dataOption={{ value: 'classesName', key: 'id' }}
                        value={value}
                        onChange={onChange}
                    />
                </div>
        )

    }
}