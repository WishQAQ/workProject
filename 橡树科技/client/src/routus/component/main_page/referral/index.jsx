/**
 * description:就诊转院
 * author: mou
 * time:2018-1-5
 */
import React from 'react'
import {BaseInfo} from './component/baseInfo'
import {GradingScore} from './component/gradingScore'
import {DiagnosisInformation} from './component/diagnosisInformation'
import eventProxy from '../eventProxy'
import style from './style/referral.scss'
export class Referral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
      // // 监听 msg 事件
      // eventProxy.on('base', (msg) => {
      //     console.log(msg);
      // });
  }

  render() {
    return (<div className={style.referral}>
      <div className={style.top}>
        <BaseInfo/>
        <GradingScore/>
      </div>
      <DiagnosisInformation/>
    </div>)
  }
}
 
 
 