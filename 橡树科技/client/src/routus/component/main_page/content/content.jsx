/**
 * description:标签tab+内容区域
 * ComponentPop---右键菜单组件
 */
import React, {Component} from "react";
import {Layout, Tabs} from "antd";
import {ComponentPop} from "./pop";
const {Content} = Layout;
const TabPane = Tabs.TabPane;
export class ComponentContent extends Component {
  render() {
    const {menuStyles, TabsChange, NewActive, TabsEdit, NewPanes, spanKey} = this.props;
    return (
      <Content style={{overflow: 'initial'}}>
        <div className="content" style={{background: '#fff', textAlign: 'center'}}>
          <Tabs
            hideAdd
            onChange={TabsChange}
            activeKey={NewActive}
            type="editable-card"
            onEdit={TabsEdit}
          >
            {NewPanes.map(pane =>
              <TabPane tab={pane.title} key={pane.key}>
                {pane.content}
              </TabPane>)}
          </Tabs>
        </div>
        <ComponentPop
          menuStyles={menuStyles}
          NewPanes={NewPanes} //关闭所有用 数组对象
          spanKey={spanKey}//span的key值关闭其他用
        >
          {/*弹出菜单组件*/}
        </ComponentPop>
      </Content>
    )
  }
}