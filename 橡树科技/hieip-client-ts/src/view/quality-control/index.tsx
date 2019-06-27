/**
 * 质控统计
 * create by wx 2018.03.03
 */
import React from 'react'
import * as style from './style/index.scss'
import {IconFont} from 'pkg/common/icon'
import {Radio} from 'antd'
import {Rounded} from 'pkg/common/rounded'
import {Select} from 'pkg/common/select'
import {TimePicker} from 'pkg/common/timePicker'
import {DateMonth} from 'pkg/common/date-month'
import {LazyLoader} from 'tools/lazyLoader'
import QualityControlOther from './other-content'
import QualityControlDay from './day-content'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {qualityControlService, QualityControlState} from 'service/quality-control'

export default class QualityControl extends FluxComponent<QualityControlState> {
    title = '质控统计页面'
    qualityControlService = qualityControlService

    selData = [
        {name: '年', value: 'year'},
        {name: '月', value: 'month'},
        {name: '日', value: 'day'}
    ]
    selDataOption = {key: 'value', value: 'name'}
    yearSelData = [
        {name: '近三年', value: '1'},
        {name: '近五年', value: '2'},
        {name: '近七年', value: '3'},
    ]
    yearSelOption = {key: 'value', value: 'name'}

    render() {
        const {selType} = this.state
        return (
            <div className={style.qualityControl}>
                {/*头部*/}
                <div className={style.header}>
                    <div className={style.headerTitle}>分诊数据时间段查询:</div>
                    <RadioGroup defaultValue="a" className={style.radio}>
                        <RadioButton value="a">今天</RadioButton>
                        <RadioButton value="b">昨天</RadioButton>
                        <RadioButton value="c">近7天</RadioButton>
                        <RadioButton value="d">近30天</RadioButton>
                        <RadioButton value="e">本月</RadioButton>
                        <RadioButton value="f">上个月</RadioButton>
                    </RadioGroup>
                    <Rounded className={style.sel} leftShow={'类型'}>
                        <Select data={this.selData}
                                onChange={qualityControlService.selTypeChange}
                                defaultValue={selType}
                                dataOption={this.selDataOption}
                                dropdownClassName={style.dropdownClassName}/>
                    </Rounded>
                    {
                        selType === 'month' ?
                            <DateMonth className={style.dateMonth}
                                // onChange={(a, b) => console.log('value', a, b)}
                                       endPlaceholder={'选择结束时间'}
                                       startPlaceholder={'选择开始时间'}/>
                            :
                            selType === 'year' ?
                                <Select className={style.yearSel} data={this.yearSelData}
                                        defaultValue={'1'}
                                        dataOption={this.yearSelOption}
                                        dropdownClassName={style.dropdownClassName}/>
                                :
                                <TimePicker className={style.time}
                                            oValue={''}
                                            oValue2={''}
                                            isRange={true}
                                            startPlaceholder={'选择开始时间'}
                                            endPlaceholder={'选择结束时间'}/>
                    }

                    <button className={`${style.btn} ${style.blueBtn}`}>
                        <IconFont iconName={'icon-sousuo_sousuo'}/>
                        <span>查询</span>
                    </button>
                </div>
                {/*主要内容*/}
                <div className={style.content}>
                    <div className={style.qualityControlContent}>
                        <div className={style.headcount}>
                            <div className={style.blue}>
                                <IconFont iconName={'icon-renshu-'} iconClass={style.headcountIcon}/>
                                <div className={style.num}>
                                    <div>7866</div>
                                    <div>分诊总人数</div>
                                </div>
                            </div>
                            <div className={style.red}>
                                <IconFont iconName={'icon-hong'} iconClass={style.headcountIcon}/>
                                <div className={style.num}>
                                    <div>866</div>
                                    <div>红区分诊人数</div>
                                </div>
                            </div>
                            <div className={style.yellow}>
                                <IconFont iconName={'icon-huang'} iconClass={style.headcountIcon}/>
                                <div className={style.num}>
                                    <div>3000</div>
                                    <div>黄区分诊人数</div>
                                </div>
                            </div>
                            <div className={style.green}>
                                <IconFont iconName={'icon-lv'} iconClass={style.headcountIcon}/>
                                <div className={style.num}>
                                    <div>4000</div>
                                    <div>绿区分诊人数</div>
                                </div>
                            </div>
                        </div>
                        {
                            (selType === 'year' || selType === 'month') ?
                                <LazyLoader lazyModule={QualityControlOther}/>
                                :
                                <LazyLoader lazyModule={QualityControlDay}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
