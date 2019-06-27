/**
 * 评估单
 * Created by mou on 2018/3/9.
 */
import React from 'react'
import {Tabs} from 'antd'
import Diagnosis from 'view/nurse/assessment-sheet/diagnosis'
import {LazyLoader} from 'tools/lazyLoader'
import css from './style/index.scss'
const TabPane = Tabs.TabPane

export default class AssessmentSheet extends React.Component {

    callback(key) {
        //   console.log(key)
    }

    render() {
        return (<Tabs onChange={this.callback} type="card" className={css.assessmentSheet}>
            <TabPane tab={'护理诊断'} key={1}>
                <LazyLoader lazyModule={Diagnosis}/>
            </TabPane>
            <TabPane tab={'护理相关因素与症状与特征'} key={2}>护理相关因素与症状与特征</TabPane>
            <TabPane tab={'护理目标'} key={3}>护理目标</TabPane>
            <TabPane tab={'护理措施'} key={4}>护理措施</TabPane>
        </Tabs>)
    }
}