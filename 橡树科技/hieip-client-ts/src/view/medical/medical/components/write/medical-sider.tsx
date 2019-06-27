/**
 * Created by oakm on 2017/12/26.
 */

'use strict'
import * as React from 'react'
import * as css from '../../style/index.scss'
import {Button, Icon, Tabs} from 'antd'
import debug from 'debug'
import {Drawer} from 'pkg/common/Drawer'
import ContentWrite from 'pkg/ui/medical/write/content'
import Doctor from 'pkg/ui/medical/write/doctor'
import Keyword from 'pkg/ui/medical/write/keyword'
import {FluxComponent} from 'src/tools/flux/FluxComponent'
import {MedicalSiderState,medicalSiderService} from '../../../../../service/medical/medical/components/write/medical-sider'

const TabPane = Tabs.TabPane
const log = debug('trace:病历:medical')
export default class MedicalSider extends FluxComponent<MedicalSiderState> {
    title='病案编辑'
    medicalSiderService=medicalSiderService
    public render(): JSX.Element {
      let{menu}=this.state
        const operations = (
            <div className={css.title_close}>
                {true ? <Button className={css.hxmedical}>回写病历</Button> : null}
                <Icon type="close" onClick={() => this.setState({open: false, activeKey: 0})}/>
            </div>
        )
        return (
            <div className={css.medical_file}>
                <div style={{
                    textAlign: 'right',
                    fontSize: 10,
                    padding: '0 5px',
                }}><Icon type="backward"/></div>
                <div className={css.left_btn}>
                    {menu?menu.map((row, index) => <div key={row}
                     style={{color: this.state.activeKey === index + 1 ? '#3db5e7' : '#353535'}}
                     onClick={() => medicalSiderService.btnClick(index + 1)}>{row}</div>):''}
                </div>
                <Drawer
                    open={this.state.open}
                    isOverlay={false}
                    position="bottom">
                    <div className={css.medical_bottom}>
                        <Tabs type="card"
                              onChange={medicalSiderService.callback}
                              tabBarExtraContent={operations}
                              activeKey={this.state.activeKey ? this.state.activeKey.toString() : null}
                        >
                            <TabPane tab={menu[0]} key={1}>
                                {/*病历类容*/}
                                <ContentWrite
                                    /*下拉框数据*/
                                    /*病历类容*/
                                    medicalInfo={{
                                        editorState: {
                                            entityMap: {},
                                            blocks: [{
                                                key: 'e23a8',
                                                text: 'sdgdgse发的发火点发货烦得很烦得很dgedeg',
                                                type: 'unstyled',
                                                depth: 0,
                                                inlineStyleRanges: [],
                                                entityRanges: [],
                                                data: {}
                                            }]
                                        },
                                    }}
                                    /*事件处理*/
                                    rectClck={this.rectClick}
                                />
                            </TabPane>
                            <TabPane tab={menu[1]} key={2}>
                                <Doctor
                                    /*表格数据*/
                                    tableData={[]}
                                    /*事件处理*/
                                    rectClck={this.rectClick}
                                />
                            </TabPane>
                            <TabPane tab={menu[2]} key={3}>
                                <Keyword
                                    /*事件处理*/
                                    rectClck={this.rectClick}
                                    /*病历类容*/
                                    medicalInfo={{
                                        editorState: {
                                            entityMap: {},
                                            blocks: [{
                                                key: 'e23a8',
                                                text: 'sdgdgse发的发火点发货烦得很烦得很dgedeg',
                                                type: 'unstyled',
                                                depth: 0,
                                                inlineStyleRanges: [],
                                                entityRanges: [],
                                                data: {}
                                            }]
                                        },
                                    }}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </Drawer>
            </div>
        )
    }
    /** 弹出窗事件 */
    private rectClick = (type, value) => {
        log('弹出窗事件 %s', type, value)
    }
}