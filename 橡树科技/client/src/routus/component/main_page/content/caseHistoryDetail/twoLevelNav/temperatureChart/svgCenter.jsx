/**
 * Created by liulingli on 2017/6/22.
 * desc : 体温单 svgCenter 绘制折线
 */
import React, {Component} from "react";
import {drawEvent, drawHzhx, parseRePoint} from "./tempChart";

export class SvgCenter extends Component {
  componentWillMount() {
    this.state = {
      curDate: this.props.curDate,
      data: this.props.data
      /* data: {
       "tt":[{"dataTime":"2017-06-29 02:00:00","value":"9"},{"dataTime":"2017-06-29 06:00:00","value":"8"},{"dataTime":"2017-06-29 10:00:00","value":"7"}],
       "xl":[{"dataTime":"2017-06-29 02:00:00","date":"2017-06-29","hour":2,"mbValue":"","phValue":"","type":"","value":"88","xlValue":""},{"dataTime":"2017-06-29 06:00:00","date":"2017-06-29","hour":6,"mbValue":"","phValue":"","type":"","value":"90","xlValue":""},{"dataTime":"2017-06-29 14:00:00","date":"2017-06-29","hour":14,"mbValue":"","phValue":"","type":"","value":"88","xlValue":""},{"dataTime":"2017-06-29 18:00:00","date":"2017-06-29","hour":18,"mbValue":"","phValue":"","type":"","value":"98","xlValue":""},{"dataTime":"2017-06-29 22:00:00","date":"2017-06-29","hour":22,"mbValue":"","phValue":"","type":"","value":"90","xlValue":""}],
       "mb":[{"dataTime":"2017-06-29 02:00:00","date":"2017-06-29","hour":2,"mbValue":"","phValue":"","type":"","value":"98","xlValue":""},{"dataTime":"2017-06-29 06:00:00","date":"2017-06-29","hour":6,"mbValue":"","phValue":"","type":"","value":"80","xlValue":""},{"dataTime":"2017-06-29 14:00:00","date":"2017-06-29","hour":14,"mbValue":"","phValue":"","type":"","value":"100","xlValue":""},{"dataTime":"2017-06-29 18:00:00","date":"2017-06-29","hour":18,"mbValue":"","phValue":"","type":"","value":"98","xlValue":""},{"dataTime":"2017-06-29 22:00:00","date":"2017-06-29","hour":22,"mbValue":"","phValue":"","type":"","value":"100","xlValue":""}],
       "eventDatas":[{"dataTime":"2017-06-29 14:00:00","date":"2017-06-30","hour":2,"mbValue":"","phValue":"","type":"","value":"呼吸心跳停止","xlValue":""},{"dataTime":"2017-06-29 14:00:00","date":"2017-06-30","hour":2,"mbValue":"","phValue":"","type":"","value":"请假","xlValue":""},{"dataTime":"2017-06-30 02:00:00","date":"2017-06-30","hour":2,"mbValue":"","phValue":"","type":"","value":"不升","xlValue":""},{"dataTime":"2017-06-29 02:00:00","date":"2017-06-29","hour":2,"mbValue":"","phValue":"","type":"","value":"入院","xlValue":""},{"dataTime":"2017-06-29 14:00:00","date":"2017-06-29","hour":14,"mbValue":"","phValue":"","type":"","value":"开呼吸机","xlValue":""},{"dataTime":"2017-06-29 22:00:00","date":"2017-06-29","hour":22,"mbValue":"","phValue":"","type":"","value":"关呼吸机","xlValue":""}],
       "wd":[{"dataTime":"2017-06-29 02:00:00","date":"2017-06-29","hour":2,"mbValue":"","phValue":"36.5","type":"gw","value":"37.2","xlValue":""}, {"dataTime":"2017-06-29 06:00:00","date":"2017-06-29","hour":6,"mbValue":"","phValue":"","type":"yw","value":"37","xlValue":""},{"dataTime":"2017-06-29 14:00:00","date":"2017-06-29","hour":14,"mbValue":"","phValue":"","type":"gw","value":"37.5","xlValue":""},{"dataTime":"2017-06-29 18:00:00","date":"2017-06-29","hour":18,"mbValue":"","phValue":"","type":"kw","value":"37.4","xlValue":""},{"dataTime":"2017-06-29 22:00:00","date":"2017-06-29","hour":22,"mbValue":"","phValue":"","type":"kw","value":"36.8","xlValue":""}],
       "hzfx":[{"dataTime":"2017-06-29 14:00:00","date":"2017-06-29","hour":14,"mbValue":"","phValue":"","type":"","value":"66","xlValue":""}, {"dataTime":"2017-06-29 18:00:00","date":"2017-06-29","hour":18,"mbValue":"","phValue":"","type":"","value":"66","xlValue":""}],
       "respiratorDatas":[{"dataTime":"2017-06-29 14:00:00","date":"2017-06-29","hour":14,"mbValue":"","phValue":"","type":"","value":"66","xlValue":""},{"dataTime":"2017-06-29 18:00:00","date":"2017-06-29","hour":18,"mbValue":"","phValue":"","type":"","value":"66","xlValue":""}]}
       }*/
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.curDate !== nextState.curDate || nextProps.data !== nextState.data) {
      this.setState({
        curDate: nextProps.curDate,
        data: nextProps.data
      })
    }
  }

  render() {
    let {curDate, data} = this.state;
    return (
      <svg id="svgCenter" style={{height: 15 * 55}}>
        {
          data.evenDatas && drawEvent(data.evenDatas, curDate).map((v, i) => {
            return v;
          })
        }
        {
          data.hzfx && drawHzhx(data.hzfx, curDate).map((v, i) => {
            return v;
          })
        }
        {
          parseRePoint(data, curDate).map((v, i) => {
            return v;
          })
        }
      </svg>
    )
  }
}