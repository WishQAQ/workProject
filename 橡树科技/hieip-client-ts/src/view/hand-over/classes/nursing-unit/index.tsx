/**
 * 护理单元 by hhc
 */
import React from 'react'
import css from './style/index.scss'
// model
import { IconFont } from 'pkg/common/icon'
import { HintInput } from 'pkg/common/input'
import { Table } from 'pkg/common/table'
import { DragMove } from 'pkg/common/dragging'
import { Rounded } from 'pkg/common/rounded'
// other
import { Button, Menu, Transfer } from 'antd'

export interface NursingState {
    modify: boolean // 修改弹框状态
    personnel: boolean // 人员修改状态
    targetKeys: any // 穿梭框key
}

export default class NursingUnit extends React.Component<{}, NursingState> {

    /**
     * 表格列规则
     */
    public dataTitle = [
        {
            headerName: '分组名称',
            field: 'name'
        },
        {
            headerName: '分组编码',
            field: 'code'
        },
        {
            headerName: '分组输入码',
            field: 'inputCode'
        },
        {
            headerName: '分组简称',
            field: 'shortName'
        },
        {
            headerName: '床位范围',
            field: 'range'
        }
    ]

    constructor(props) {
        super(props)
        this.state = {
            modify: false,
            personnel: false,
            targetKeys: []
        }
    }

    /**
     * 右键作废
     */
    menuClick = (menuIndex, dataIndex) => {
        switch (menuIndex) {
            case 0:
                this.setState({ modify: true })
                break
            case 1:
                break
            default:
                this.setState({ personnel: true })
                break
        }
    }

    /**
     * 修改弹框关闭
     */
    closeChange = () => {
        this.setState({ modify: false })
    }

    /**
     * 人员列表关闭
     */
    closePerson = () => {
        this.setState({ personnel: false })
    }

    /**
     * 筛选
     * @param inputValue
     * @param option
     * @return {boolean}
     */
    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1
    }

    handleChange = (targetKeys) => {
        this.setState({ targetKeys })
    }

    render() {
        let arr = []
        for (let i = 0; i < 30; i++) {
            arr.push({
                name: `护理单元${i}`
            })
        }

        // 模拟诊断数据
        let tableData = []
        for (let i = 0; i < 40; i++) {
            tableData.push({
                name: `分组名称${i}`,
                code: `分组编码${i}`,
                inputCode: `分组输入码${i}`,
                shortName: `分组简称${i}`,
                range: `床位范围${i}`
            })
        }

        // 穿梭框数据
        let mockData = []
        let targetKeys = []
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1
            }
            if (data.chosen) {
                targetKeys.push(data.key)
            }
            mockData.push(data)
        }

        // 右键菜单
        let list = ['修改', '删除', '人员']
        return (
            <div className={css.nursingMain}>
                {/*左侧列表*/}
                <div className={css.nursingLeft}>
                    <div>{'护理单元列表'}</div>
                    <Menu className={css.nursingMenu}>
                        <Menu.ItemGroup>
                            {arr.map((e, index) => {
                                return <Menu.Item key={index}>
                                    <IconFont iconName={'icon-yemian'} iconClass={css.iconClass}/><span>{e.name}</span>
                                </Menu.Item>
                            })}
                        </Menu.ItemGroup>
                    </Menu>
                </div>
                {/*右侧表格内容区*/}
                <div className={css.nursingRight}>
                    <div className={css.nursingSearch}>
                        <div>
                            <HintInput addonAfter={<IconFont iconName={'icon-sousuo_sousuo'}/>}/>
                            <Button type={'primary'}>
                                <IconFont iconName={'icon-zengjia-copy-copy'}/>{'新增'}
                            </Button>
                        </div>
                        <span>
              {'注:右键可编辑'}
            </span>
                    </div>
                    <div className={css.rightTable}>
                        <Table
                            columnDefs={this.dataTitle}
                            rowData={tableData}
                            menuclassName={'nursingUnitRightMenu'}
                            ContextMenuList={list}
                            menuClik={this.menuClick}
                        />
                    </div>
                </div>
                {/*单元护理弹框*/}
                <DragMove
                    title={<b className={css.changeTitle}>{'单元护理名称'}<span>{'(带*为必填)'}</span></b>}
                    visible={this.state.modify}
                    okText={'保存'}
                    onCancel={this.closeChange}
                    className={css.changeDrag}
                    mask={false}
                    width={350}
                >
                    <div>
                        <Rounded
                            leftShow={'分组名称'}
                            asterisk={true}
                            className={css.rounded}
                        >
                            <HintInput/>
                        </Rounded>
                        <Rounded
                            leftShow={'分组简称'}
                            asterisk={true}
                            className={css.rounded}
                        >
                            <HintInput/>
                        </Rounded>
                        <Rounded
                            leftShow={'床位管辖范围'}
                            className={css.rounded}
                        >
                            <HintInput/>
                        </Rounded>
                        <Rounded
                            leftShow={'排序号'}
                            className={css.rounded}
                        >
                            <HintInput/>
                        </Rounded>
                    </div>
                </DragMove>
                {/*人员列表弹框*/}
                <DragMove
                    title={<b className={css.changeTitle}>{'人员列表'}</b>}
                    visible={this.state.personnel}
                    okText={'保存'}
                    onCancel={this.closePerson}
                    className={css.changeDrag}
                    mask={false}
                    width={420}
                >
                    <Transfer
                        dataSource={mockData}
                        showSearch={true}
                        filterOption={this.filterOption}
                        targetKeys={targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </DragMove>
            </div>
        )
    }
}