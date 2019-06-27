/**
 *  radio组  组合组件
 * Created by mod on 2017/12/5
 */

'use strict'

import * as React from 'react'
import { Radio } from 'antd'
import * as css from '../style/soceitem.scss'
import { RadioArr, ScoeItmeType } from './socreitemtype'

const RadioGroup = Radio.Group

/**
 * 复合radio 组件
 */
export class ScoreItem extends React.Component<ScoeItmeType, any> {
    /**
     * render
     * @returns {any}
     */
    render(): JSX.Element {
        const { data, defaultvalue, ...others } = this.props
        return (
            <div className={css.radio_contain}>
                <h4>{data.name}
                    {defaultvalue[data.type] ?
                        <span className={css.sore_zfx}>
              {defaultvalue[data.type].split('__')[0]} 分</span>
                        :
                        <span style={{ color: '#ff0000', fontWeight: 400 }}>   未选择</span>}</h4>
                <RadioGroup name={data.name}
                            defaultValue={defaultvalue[data.type]}
                            onChange={this.props.onChange}
                            value={defaultvalue[data.type]}
                            {...others}>
                    {this.renderRadio(data.data)}
                </RadioGroup>
            </div>
        )
    }

    /** 生成 radio 节点 */
    private renderRadio = (radioList: any) => {
        return radioList.map((row: RadioArr, index) => {
            return <Radio value={row.value + '__' + row.name}
                          key={index}>
                {`${row.name} (${row.value}分)`}
            </Radio>
        })
    }
}