import React from 'react'
import css from './style/index.scss'
// model
import {IconFont} from 'pkg/common/icon'
import {Button, Checkbox} from 'antd'
import {
    NurseGroupVsClassesModelDtoClasses, NurseSchedulingClassesDictModelDtoClasses,
    NurseSchedulingIndexModelDtoClasses
} from 'pkg/entity/nurse'
import {extend} from 'jquery'
// 文档宽
const screenWidth = document.body.clientWidth
// 文档高
const screenHeight = document.body.clientHeight

export interface AboutProps {
    needArray: Array<NurseSchedulingClassesDictModelDtoClasses> // 左侧数据
    checkArray: Array<NurseSchedulingIndexModelDtoClasses> // 右侧check选取数据
    open: boolean // 显示状态
    handleClose: (e: React.MouseEvent<any>) => void // 关闭方法
    onClick?: (checkArray: Array<NurseSchedulingIndexModelDtoClasses>) => void // 点击保存
    width?: number // 框宽
    height?: number // 框高
    x?: number // 弹框定位x
    y?: number // 弹框定位y
    currentTime: Date   // 当前选中的时间点
}

export interface AboutScreenState {
    // props 传过来当前选中的全部班段
    checkArray: Array<NurseSchedulingIndexModelDtoClasses>
    // 特殊处理数据
    _checkArray: any,
    // 左边选中的下标
    clickOrNot?: number
    leftChecked?: NurseSchedulingClassesDictModelDtoClasses
}

export class AboutScreen extends React.Component<AboutProps, AboutScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            _checkArray: [], // 修改后的
            checkArray: [] //  props传过来的
        }
    }

    componentWillMount() {
        this.setState({checkArray: this.props.checkArray})
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({checkArray: nextProps.checkArray,_checkArray:[],clickOrNot:null,leftChecked:null})
    }

    /**
     * 点击左侧选择
     */
    chooseLeft = (index, v) => {
        let {checkArray} = this.state
        // 获取value 中允许的人员list 与当前选中的进行匹配
        let person = v.person // 当前班段下允许的用户
        let _checkArray = []
        if (person) {
            for (let value of person) {
                let checkedValue = null
                let checkedIndex = null
                let bool = checkArray.some((data, index) => {
                    let _boolean = (data.userId === value.userId)
                    if (_boolean) {
                        checkedValue = data
                        checkedIndex = index
                    }
                    return _boolean
                })
                _checkArray.push({
                    ...value,
                    checked: bool ? !!checkedValue.schedulingClassesId : false,
                    disabled: bool ?
                        (!!checkedValue.schedulingClassesId && checkedValue.schedulingClassesId !== v.id) : false,
                    checkedValue: checkedValue,
                    checkedIndex: checkedIndex
                })
            }
        }
        this.setState({_checkArray: _checkArray, clickOrNot: index, leftChecked: v})
    }

    /**
     * 右侧check改变事件
     */
    rightChange = (value, e) => {
        let {checkArray, clickOrNot, leftChecked} = this.state
        let {currentTime} = this.props
        let object = null
        if (e.target.checked) {// 选中数据，设置选中的值
            object = extend(true, checkArray[value.checkedIndex], {
                schedulingClassesId: leftChecked.id,
                classesName: leftChecked.classesName,
                isTwoTime: leftChecked.isTwoTime,
                time: currentTime,
                timeFrom1: leftChecked.timeFrom1,
                timeTo1: leftChecked.timeTo1,
                timeFrom2: leftChecked.timeFrom2,
                timeTo2: leftChecked.timeTo2
            })
        } else { // 取消选中数据
            let _object = checkArray[value.checkedIndex]
            object = {
                userId: _object.userId,
                time: _object.time,
                id: _object.id,
                nurseGroupId: _object.nurseGroupId
            }
        }
        checkArray[value.checkedIndex] = object
        this.setState({
            checkArray: checkArray
        }, () => {
            this.chooseLeft(clickOrNot, leftChecked)
        })
    }

    /**
     * 确定按钮保存
     */
    save = () => {
        if (this.props.onClick) {
            let {checkArray} = this.state
            this.props.onClick(checkArray)
        }
    }
    render() {
        let {width, height, needArray, open, x, y} = this.props
        let {_checkArray, clickOrNot} = this.state
        return (
            <div className={`${open ? css.show : css.hidden}`}>
                <div
                    style={{
                        width: width || 370,
                        height: height || 390,
                        top: (screenHeight - y) < (height || 390) ? screenHeight - (height || 390) : y || '40%',
                        left: (screenWidth - x) < (width || 370) ? screenWidth - (width || 370) : x || '50%'
                    }}
                    className={css.aboutMain}>
                    <div className={css.aboutLeft}>
                        {needArray && needArray.map((e, i) => {
                            return <div className={`${css.leftChoose} ${clickOrNot === i ? css.leftSelect : ''}`}
                                        key={i}
                                        onClick={() => this.chooseLeft(i, e)}>
                                {e.classesName}
                                <IconFont iconName={'icon-xiayiyeqianjinchakangengduo'}
                                          iconClass={css.iconClass}
                                />
                            </div>
                        })}
                    </div>
                    <div className={css.aboutRight}>
                        {_checkArray && _checkArray.map((e) => {
                            return <Checkbox key={e.id}
                                             onChange={(event) => this.rightChange(e, event)}
                                             checked={e.checked}
                                             disabled={e.disabled}>
                                {`${e.userName} ${e.disabled && e.checkedValue.classesName ? e.checkedValue.classesName : ''}`}
                            </Checkbox>
                        })}
                    </div>
                    <div className={css.saveBtn}>
                        <Button type={'primary'} onClick={this.save}>{'确定'}</Button>
                    </div>
                </div>
                <div className={`${css.have} ${open ? css.show : css.hidden}`} onClick={(e) => this.props.handleClose(e)}>
                    {}
                </div>
            </div>
        )
    }
}