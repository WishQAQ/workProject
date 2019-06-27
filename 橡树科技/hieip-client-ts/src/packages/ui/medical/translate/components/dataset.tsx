/**
 * Created by mod on 2017/12/25.
 */

'use strict'
import * as React from 'react'
import RenderMenu from 'pkg/ui/menu'
import { Input, Select } from 'antd'
import * as css from '../style/index.scss'
import { TranStae } from './translate'

const Option = Select.Option
const Search = Input.Search

export default class Dataset extends React.Component<TranStae> {

    render() {
        const other = this.props
        return (
            <section className={css.datasetStyle}>
                <Select
                    showSearch={true}
                    style={{ width: 220 }}
                    size={'small'}
                    placeholder="请选择"
                    optionFilterProp="children"
                    onChange={value => this.props.onChange('dataset-select', value)}
                    filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {other.data.bdDsIndexList && other.data.bdDsIndexList.map((row, i) => <Option key={i}
                                                                                                  value={row.id}>{row.dsName}</Option>)}
                </Select>
                <Search
                    placeholder="请输入后按Enter查询"
                    onSearch={value => this.props.onChange('dataset-search', value)}
                    style={{ width: 220, height: 24, padding: '0 15px', margin: '5px 0' }}
                />
                <RenderMenu
                    onClick={(title, e) => this.props.onMenuClick('dataSetMenu', title, e)}
                    fixedata={other.data.bdDeIndexList}
                    fixetype={'deName'}
                />
            </section>
        )
    }
}
