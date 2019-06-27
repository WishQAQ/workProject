/**
 * Created by oakm on 2017/12/26.
 */

'use strict'
import * as React from 'react'
import { Col, Input, Menu, Radio, Row, Select } from 'antd'
import * as css from './style/content.scss'
import { Card } from '../../card'
import { Medical, ReadMode } from 'medical-draft'
import { FluxComponent } from 'src/tools/flux/FluxComponent'
import { keywordService, KeywordState } from 'src/service/medical/medical/components/write/keyword'

const RadioGroup = Radio.Group
const Option = Select.Option
const Search = Input.Search

export default class Keyword extends FluxComponent<KeywordState> {
    title = '关键词'
    keywordService = keywordService

    render() {
        const { medicalInfo, rectClck } = this.props
        let { crux, mrCruxModel, type } = this.state
        return (
            <div>
                <Row>
                    <Col span={9}>
                        <div style={{ padding: '6px 10px', overflow: 'hidden' }}>
                            <RadioGroup
                                className={css.radio}
                                value={type ? type : 0}
                                onChange={keywordService.onChange.bind(this, 'type')}>
                                <Radio value={0}>全部</Radio>
                                <Radio value={1}>本科</Radio>
                                <Radio value={2}>本人</Radio>
                            </RadioGroup>
                        </div>
                        <div style={{ height: 250 }}>
                            <Row>
                                <Col span={10}>
                                    <Card
                                        extra={'分类名称'}
                                        className={css.flmcgjz}
                                    >
                                        <Menu
                                            style={{ width: '100%' }}
                                            mode="inline"
                                            onClick={keywordService.rectClck}
                                        >
                                            {crux && crux.map((row: any) =>
                                                <Menu.Item key={row.cruxCode}>{row.cruxName}</Menu.Item>
                                            )}
                                        </Menu>
                                    </Card>
                                </Col>
                                <Col span={14}>
                                    <Card
                                        extra={'关键词名称'}
                                        className={css.flmcgjz}
                                    ><Search
                                        placeholder="请输入"
                                        enterButton={true}
                                        onSearch={keywordService.onChange.bind(this, 'name')}
                                        style={{ width: 200, height: 24, padding: '0 0 0 10px', margin: '5px auto' }}
                                    />
                                        <Menu
                                            style={{ width: '100%' }}
                                            mode="inline"
                                            onClick={event => rectClck('gjz-menu2', event)}
                                        >
                                            {mrCruxModel && mrCruxModel.map((row: any) =>
                                                <Menu.Item key={row.id}>{row.name}</Menu.Item>
                                            )}
                                        </Menu>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={15}>
                        <div className={css.bl}>
                            <Medical editorState={medicalInfo.editorState}
                                     pageHeader={medicalInfo.pageHeader}
                                     pageFooter={medicalInfo.pageFooter}
                                     readMode={ReadMode.readOnly}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}