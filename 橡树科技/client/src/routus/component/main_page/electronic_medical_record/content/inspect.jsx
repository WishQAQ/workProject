/**
 * description:检查
 * author: mou
 * time:2017-12-12
 */
import React from 'react'
import {Button} from 'antd'
import api from '../api'
import moment from 'moment'
import  css from '../eleMedical.scss'
export class Inspect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      param:{},
      loading:false,
    };
  };
componentWillMount(){
  this.setState({
    param:this.props.data
  })
}
componentWillReceiveProps(next){
  this.setState({
    param:next.data
  })
}

  render() {
  const {param}=this.state;
    return (<div className={css.inspect}>
      <div className={css.condition}>
        <span>检查</span>
     {/*   <Button icon="book" type="primary" ghost>图像</Button>
        <Button icon="printer" type="primary" ghost>打印</Button>*/}
      </div>
      <div className={css.info}>
        <div className={css.one}>
          <p>
            <span>检查类型</span>
            <span>{param.examClass}</span>
          </p>
          <p>
            <span>申请医生</span>
            <span>{param.reqDoctName}</span>
          </p>
          <p>
            <span>申请时间</span>
            <span>{param.reqDateTime?moment(param.reqDateTime).format('YYYY-MM-DD HH:MM:SS'):null}</span>
          </p>
          <p>
            <span>检查项目</span>
            <span className={css.col1} title={param.examItem}>{param.examItem}</span>
          </p>
        </div>
        <div className={css.one}>
          <p>
            <span>检查医生</span>
            <span>{param.reporter}</span>
          </p>
          <p>
            <span>检查时间</span>
            <span>{param.examDateTime?moment(param.examDateTime).format('YYYY-MM-DD HH:MM:SS'):null}</span>
          </p>
          <p>
            <span>报告时间</span>
            <span>{param.reportDateTime?moment(param.reportDateTime).format('YYYY-MM-DD HH:MM:SS'):null}</span>
          </p>
          <p>
            {/* <span>检查状态</span>
             <span>{}</span>*/}
          </p>
        </div>
      </div>
      <div className={css.detail}>
        <div className={css.one}>
          <p className={css.oneTitle}>检查参数</p>
          <p className={css.illustrate}>{param.examPara}</p>
        </div>
        <div className={css.one}>
          <p className={css.oneTitle}>检查所见</p>
          <p className={css.illustrate}>{param.description}</p>
        </div>
        <div className={css.one}>
          <p className={css.oneTitle}>印象</p>
          <p className={css.illustrate}>{param.impression}</p>
        </div>
        <div className={css.one}>
          <p className={css.oneTitle}>建议</p>
          <p className={css.illustrate}>{param.recommendation}</p>
        </div>
      </div>
    </div>)
  }
}
 
 
 