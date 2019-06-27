/**
 * Created by mod on 2017/12/25.
 */

'use strict'
import * as React from 'react'
import { Tabs } from 'antd'
import RenderMenu from 'pkg/ui/menu'
import * as css from '../style/index.scss'
import { TranStae } from './translate'

const { TabPane } = Tabs
export default class Smaltemp extends React.Component<TranStae> {
    render(): JSX.Element {
        const other = this.props
        return (
            <div className={css.smaitemp}>
                <Tabs activeKey={this.props.activeKey} onChange={this.props.onChange}>
                    <TabPane tab="小模板" key="1">
                        <RenderMenu
                            onClick={(title, e) => this.props.onMenuClick('smallTemplateMenu', title, e)}
                            fixedata={other.data.templateSmallIndex}
                            fixetype={'mrName'}
                        />
                    </TabPane>
                    <TabPane tab="动态值" key="2">
                        <RenderMenu
                            onClick={(title, e) => this.props.onMenuClick('synchronousElementMenu', title, e)}
                            fixedata={other.data.synchronousElementList}
                            fixetype={'synchronousElementName'}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }

}