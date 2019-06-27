/**
 *  病历召回头部
 *  create by wx
 */
import React from 'react'
import * as style from './style/index.scss'
import { TimePicker } from 'pkg/common/timePicker'
import { HintInput } from 'pkg/common/input'
import { Btn } from 'pkg/common/button'
import { IconFont } from 'pkg/common/icon'
import { SelectItem } from 'pkg/ui/SelectItem'
import { Select } from 'antd'

const Option = Select.Option

export default class RecallHeader extends React.Component<any, any> {
    // 科室数据
    office = [
        { title: '科室1', key: '11' },
        { title: '科室2', key: '22' },
        { title: '科室3', key: '33' }
    ]
    // 申请类别数据
    applyClassify = [
        { title: '类别1', key: '1' },
        { title: '类别2', key: '2' },
        { title: '类别3', key: '3' }
    ]

    render() {
        return (
            <div className={style.recallHeader}>
                <HintInput placeholder={'住院号/姓名/患者ID'}
                           value={'什么'}
                           onChange={(v) => v}
                           className1={style.numInput}
                           className2={style.innerInput}/>
                <SelectItem
                    showSearch={true}
                    labelVal="经治科室"
                    // value={this.state.selItemVal}
                    onChange={(v) => v}
                    labelClass={`${style.selLabel}`}
                    selectItemClass={`${style.selItem}`}
                    selectClass={`${style.selItemSel}`}
                    dropdownClassName={style.dropdownClassName}
                >
                    {
                        this.office.map((item, i) => {
                            return (
                                <Option key={i} value={item.key}>{item.title}</Option>
                            )
                        })
                    }
                </SelectItem>
                <TimePicker isRange={true}
                            oValue={new Date()}
                            oValue2={new Date()}
                            startPlaceholder={'开始时间'}
                            endPlaceholder={'结束时间'}
                            dateChange={(v) => v}
                            className={style.timePicker}/>
                <SelectItem
                    showSearch={true}
                    labelVal="申请类别"
                    // value={this.state.selItemVal}
                    onChange={(v) => v}
                    labelClass={`${style.selLabel}`}
                    selectItemClass={`${style.selItem}`}
                    selectClass={`${style.selItemSel}`}
                    dropdownClassName={style.dropdownClassName}
                >
                    {
                        this.applyClassify.map((item, i) => {
                            return (
                                <Option key={i} value={item.key}>{item.title}</Option>
                            )
                        })
                    }
                </SelectItem>
                <Btn
                    text={<span><IconFont iconName={'icon-sousuo_sousuo'} hover={true}/><span>查询</span></span>}
                    btnParam={{ className: `${style.btn} ${style.greenBtn}`, onClick: (v) => v }}/>
                <Btn
                    text={<span><IconFont iconName={'icon-jiexi'} hover={true}/><span>申请召回</span></span>}
                    btnParam={{ className: `${style.btn} ${style.greenBtn} ${style.recallBtn}`, onClick: () => ('申请召回') }}/>
            </div>
        )
    }
}