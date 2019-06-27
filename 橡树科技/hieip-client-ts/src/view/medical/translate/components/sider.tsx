/**
 * Created by mod on 2017/12/25.
 */
'use strict'

import * as React from 'react'
import moment from 'moment'
import { Tabs, Layout } from 'antd'
import Dataset from 'pkg/ui/medical/translate/components/dataset'
import Smaltemp from 'pkg/ui/medical/translate/components/smaltemp'
import Flexelement from 'pkg/ui/medical/translate/components/flexelement'
import Btnoper from 'pkg/ui/medical/translate/components/btnoper'
import * as css from '../style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { translateSiderService, TranslateSiderState } from 'service/medical/translate/sider/index'

const TabPane = Tabs.TabPane
const { Sider } = Layout
export default class TranslateSider extends FluxComponent<TranslateSiderState> {
  title = '病历模板编辑左边导航'
  translateSiderService = translateSiderService

  render() {
    const {
      templateIndex,
      activeKey,
      bdDsIndexList,
      bdDeIndexList,
      templateSmallIndex,
      currentTemplateType,
      synchronousElementList,
      bdFixedIndexList,
      bdFixedItemsList,
      smallTempActiveKey,
    } = this.state
    let createDateTime = moment(templateIndex.createDateTime).format('YYYY-MM-DD')
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={true}
        className={css.sider_t}
      >
        <div className={css.sider}>
          <header>
            <h5>{templateIndex.mrName}</h5>
            <div className={css.meditInoftainer}>
              <ul>
                <li><span>编码: </span><span>{templateIndex.mrCode}</span></li>
                <li><span>类别: </span><span>{templateIndex.mrClass}</span></li>
                <li><span>创建人: </span><span>{templateIndex.createId}</span></li>
                <li><span>创建日期: </span><span>{createDateTime}</span></li>
              </ul>
            </div>
          </header>
          <section className={css.section}>
            <Tabs onChange={translateSiderService.changeTab} type="card" activeKey={activeKey}>
              <TabPane tab="数据集" key="1">
                <Dataset
                  data={{ bdDsIndexList: bdDsIndexList, bdDeIndexList: bdDeIndexList }}
                  onMenuClick={translateSiderService.onMenuClick}
                  onChange={translateSiderService.loadBdDeIndexList} />
              </TabPane>
              {
                currentTemplateType === 'smallTemplate' ||
                <TabPane tab="小模板" key="2">
                  <Smaltemp
                    data={{ templateSmallIndex: templateSmallIndex, synchronousElementList: synchronousElementList }}
                    onChange={translateSiderService.changeSmallTempTab}
                    onMenuClick={translateSiderService.onMenuClick}
                    activeKey={smallTempActiveKey}
                  />
                </TabPane>
              }
              <TabPane tab="固定元素" key="3">
                <Flexelement
                  data={{ bdFixedIndexList: bdFixedIndexList, bdFixedItemsList: bdFixedItemsList }}
                  onChange={translateSiderService.loadBdFixedItemsList}
                  onMenuClick={translateSiderService.onMenuClick}
                />
              </TabPane>
              <TabPane tab="按钮操作" key="4">
                <Btnoper
                  onChange={translateSiderService.onMenuClick}
                />
              </TabPane>
            </Tabs>
          </section>
        </div>
      </Sider>
    )
  }
}