/**
 * 搜索框
 * Created by mou.
 */
import React from 'react'
import {Rounded} from 'pkg/common/rounded'
import {Select} from 'pkg/common/select'
import {SelectItem} from 'pkg/ui/SelectItem'
import {TimePicker} from 'pkg/common/timePicker'
import {IconFont} from 'pkg/common/icon'
import style from './style/search.scss'

const Option = Select.Option

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {searchService, SearchState} from 'service/hand-over/shift/change-shifts/search'

export default class Search extends FluxComponent<SearchState> {
    title = '交接班主页面头部搜索框'
    searchService = searchService

    transferData = [
        {name: '早班', key: '1'},
        {name: '中班', key: '2'},
        {name: '全部', key: '3'},
    ]

    render() {
        const {arr} = this.state
        return (
            <div className={style.search}>
                <Select
                    defaultValue="1"
                    showSearch={true}
                    className={style.select}
                    dropdownClassName={style.dropDownMenu}
                >
                    {
                        arr.map((item, i) => {
                           return <Option key={i} value={item.key}>{item.name}</Option>
                        })
                    }
                </Select>
                <SelectItem showSearch={true}
                            labelVal={'交接班'}
                    // onChange={(v)=>console.log(v)}
                            dropdownClassName={style.dropDownMenu}
                            labelClass={style.selLabel}
                            selectItemClass={style.transfer}
                            selectClass={style.sel}>
                    {
                        this.transferData.map((item, i) => {
                            return (
                                <Option key={i} value={item.key}>{item.name}</Option>
                            )
                        })
                    }
                </SelectItem>
                <Rounded leftShow={'日期'} className={style.date}>
                    <TimePicker isRange={false} className={style.timePicker} startPlaceholder=" "/>
                </Rounded>
                <button className={`${style.btn} ${style.defualtBtn} ${style.searchBtn}`}>
                    <IconFont iconName={'icon-sousuo_sousuo'} hover={true}/>
                    <span>查询</span>
                </button>
                <button className={`${style.btn} ${style.blueBtn}`} onClick={searchService.add}>
                    <IconFont iconName={'icon-tianjia'} hover={true}/>
                    <span>新增</span>
                </button>
            </div>
        )
    }
}