/**
 * Created by mod on 2017/12/25.
 */

'use strict'
import * as React from 'react'
import { Select } from 'antd'
import RenderMenu from 'pkg/ui/menu'
import debug from 'debug'
import { TranStae } from './translate'

const log = debug('trace:病历:translate')
const Option = Select.Option

export default class Flexelement extends React.Component<TranStae> {

    render() {
        const other = this.props
        return (
            <div>
                <Select
                    showSearch={true}
                    style={{ width: 200, marginLeft: 18 }}
                    size={'small'}
                    placeholder="请选择"
                    optionFilterProp="children"
                    onChange={this.props.onChange}
                    filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {other.data.bdFixedIndexList && other.data.bdFixedIndexList.map((row, i) =>
                        <Option key={i} value={row.id}>{row.fixedName}</Option>
                    )}
                </Select>
                <section>
                    <RenderMenu
                        onClick={(title, e) => this.props.onMenuClick('bdFixedItemMenu', title, e)}
                        fixedata={other.data.bdFixedItemsList}
                        fixetype={'name'}
                    />
                </section>
            </div>
        )
    }
}