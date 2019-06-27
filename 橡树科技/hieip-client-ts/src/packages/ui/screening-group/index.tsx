import React from 'react'
import classnames from 'classnames'
import {Button, Input, Radio} from 'antd'
import {ScreeningGroupProps, ScreeningGroupState} from './ScreeningGroup'

import styles from './style/index.scss'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

/**
 *
 * 筛选按钮组
 *
 */
export class ScreeningGroup extends React.Component<ScreeningGroupProps, ScreeningGroupState> {
    static defaultProps = {
        patientNum: [
            {key: 'myPatient', name: '我的病人', count: 50},
            {key: 'allPatient', name: '全部病人', count: 60}
        ],
        patientLevel: [
            {key: 'firstLevel', name: '一级', count: 12},
            {key: 'secondLevel', name: '二级', count: 22},
            {key: 'thirdLevel', name: '三级', count: 32},
            {key: 'fourthLevel', name: '四级', count: 25}
        ],
        patientPartition: [
            {key: 'redPartition', name: '红区', count: 10},
            {key: 'yellowPartition', name: '黄区', count: 11},
            {key: 'greenPartition', name: '绿区', count: 12}
        ]
    }

    constructor(props) {
        super(props)
        this.state = {
            currentPatient: 'allPatient',
            currentLevel: '',
            currentPartition: '',
            value: ''
        }
    }

    componentWillMount() {
        this.setState({currentPatient: 'allPatient'})
    }

    /**
     *
     * 患者数量按钮组触发的回调函数
     *
     */
    onPatientsChange = (e) => {
        const {value} = e.target
        this.setState({currentPatient: value})
        this.props.methods.patientNum(value)
    }

    /**
     *
     * 患者分级按钮组触发的回调函数
     *
     */

    onPatientLevelChange = (e) => {
        const {value} = e.target
        this.setState({currentLevel: value})
        this.props.methods.patientLevel(value)
    }

    /**
     *
     * 患者分区按钮组的回调函数
     *
     */
    onPatientPartitionChange = (e) => {
        const {value} = e.target
        this.setState({currentPartition: value})
        this.props.methods.patientPartition(value)
    }

    /**
     *
     * 渲染右上角徽标
     *
     */
    renderBadge = (item) => {
        return (
            <div className={classnames(
                [styles.badge],
                [styles[`${item.key}`]]
            )}>
                {item.count}
            </div>
        )
    }

    /**
     *
     * 模糊查询患者信息
     *
     */
    onHandleSearch = () => {
        this.props.onSearch(this.props.value)
    }

    /** 改变input值 */
    onChange = (v) => {
        this.props.onChange(v.target.value)
    }

    render() {
        const {currentPatient, currentLevel, currentPartition} = this.state
        const {patientNum, patientLevel, patientPartition, style, className, value} = this.props
        const patientCountComponent = (
            <RadioGroup
                className={styles.radioGroup}
                name="patientNumers"
                onChange={this.onPatientsChange}
            >
                {
                    patientNum.map(item => {
                        return (
                            <RadioButton
                                key={item.key}
                                value={item.key}
                                checked={currentPatient === item.key}
                                className={classnames({
                                    [styles.selectRadioBtn]: currentPatient === item.key
                                })}
                            >
                                {
                                    item.key === currentPatient ?
                                        <span>
                                          {item.name}{this.renderBadge(item)}
                                        </span> :
                                        <span>
                                          {item.name}({item.count})
                                        </span>
                                }
                            </RadioButton>
                        )
                    })
                }
            </RadioGroup>
        )

        const patientLevelComponent = (
            <RadioGroup
                className={styles.radioGroup}
                name="patientClass"
                onChange={this.onPatientLevelChange}
            >
                {
                    patientLevel.map(item => {
                        return (
                            <RadioButton
                                key={item.key}
                                value={item.key}
                                checked={currentLevel === item.key}
                                className={classnames({
                                        [styles.selectRadioBtn]: currentLevel === item.key,
                                        [styles.firstLevel]: currentLevel === item.key && (item.key === 'firstLevel'),
                                        [styles.secondLevel]: currentLevel === item.key && (item.key === 'secondLevel'),
                                        [styles.thirdLevel]: currentLevel === item.key && (item.key === 'thirdLevel'),
                                        [styles.fourthLevel]: currentLevel === item.key && (item.key === 'fourthLevel')
                                    },
                                    {
                                        [styles.firstRed]: item.key === 'firstLevel',
                                        [styles.secondOrange]: item.key === 'secondLevel',
                                        [styles.thirdYellow]: item.key === 'thirdLevel',
                                        [styles.fourGreen]: item.key === 'fourthLevel',
                                    }
                                )}

                            >
                                {
                                    currentLevel === item.key ?
                                        <span>
                                            {item.name}{this.renderBadge(item)}
                                        </span> :
                                        <span>{item.name}({item.count})</span>
                                }
                            </RadioButton>
                        )
                    })
                }
            </RadioGroup>
        )

        const patientPartitionComponent = (
            <RadioGroup
                className={styles.radioGroup}
                name="patientPartition"
                onChange={this.onPatientPartitionChange}
            >
                {
                    patientPartition.map(item => {
                        return (
                            <RadioButton
                                key={item.key}
                                value={item.key}
                                checked={currentPartition === item.key}
                                className={classnames({
                                        [styles.selectRadioBtn]: currentPartition === item.key,
                                        [styles.redPartition]: currentPartition === item.key && (item.key === 'redPartition'),
                                        [styles.yellowPartition]: currentPartition === item.key && (item.key === 'yellowPartition'),
                                        [styles.greenPartition]: currentPartition === item.key && (item.key === 'greenPartition')
                                    },
                                    {
                                        [styles.redArea]: item.key === 'redPartition',
                                        [styles.yellowArea]: item.key === 'yellowPartition',
                                        [styles.greenArea]: item.key === 'greenPartition',
                                    }
                                )}
                            >
                                {
                                    currentPartition === item.key ?
                                        <span>
                                            {item.name}{this.renderBadge(item)}
                                        </span> :
                                        <span>
                                            {item.name}({item.count})
                                        </span>
                                }
                            </RadioButton>
                        )
                    })
                }
            </RadioGroup>
        )

        return (
            <div className={classnames(className, styles.root)} style={style}>
                {patientCountComponent}
                {patientLevelComponent}
                {patientPartitionComponent}
                <div>
                    <Input
                        placeholder="输入患者编号/姓名/性别"
                        className={styles.searchInput}
                        value={value}
                        onChange={this.onChange}
                        addonAfter={
                            (<Button onClick={this.onHandleSearch} icon="search"/>)}
                    />
                </div>
            </div>
        )
    }
}