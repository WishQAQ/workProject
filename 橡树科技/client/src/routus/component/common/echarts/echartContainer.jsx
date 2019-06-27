/**
 * Created by liulingli on 2017/5/20.
 */
import React, {Component} from 'react';
import classNames from 'classnames';
import {Tooltip} from 'antd';
import {Echart} from './chart';
import {EchartHeader} from './echartHeader';
import {EchartText} from './echartText';
import {EchartTable} from './echartTable';
import {NullInfo} from '../../common/nullInfo';
import {OakIcon} from './oakIcon';

export class EchartContainer extends Component{

  componentWillMount(){
    this.state = {
      type:this.props.type  //显示类型，1为chart，2为table,默认为1
    }
  }
  showEchartType(type){
    this.setState({
      type:type
    })
  }

  render(){
    const {alone,title,option,echartId,className,tableData,showBtn,isNull,...other} = this.props;
    return(
      <div className={classNames("card-container",className)}>
        {
          alone?
            <div className={classNames("echart-div",className)}>
              <Echart
                option={option}
                id={echartId}
                echartClick={this.props.echartClick}
              />
            </div>:
            <div className="paper">
              <EchartHeader title={title}>
                {showBtn &&this.state.type?
                  <div>
                    <Tooltip placement="bottom" title={"数据图表"}>
                      <OakIcon
                        className="iconfont icon-tubiaoqiehuan"
                        color={this.state.type===1?"#2196f3":""}
                        hoverColor = "#2196f3"
                      />
                    </Tooltip>
                    <Tooltip placement="bottom" title="数据表格">
                      <OakIcon
                        className="iconfont icon-biaoge1"
                        color={this.state.type===2?"#2196f3":""}
                        hoverColor = "#2196f3"
                      />
                    </Tooltip>
                  </div>:""
                }
              </EchartHeader>
              {
                this.state.type === undefined?
                  !isNull?
                  <EchartText>
                    <EchartTable
                      columns={tableData.columns}
                      dataSource={tableData.dataSource}
                    />
                    <Echart
                      option={option}
                      id={echartId}
                      echartClick={this.props.echartClick}
                    />
                  </EchartText>:
                  <EchartText>
                    <NullInfo/>
                  </EchartText>
                  :
                  <EchartText>
                    {
                      !isNull?
                        this.state.type===1?
                          <Echart
                            option={option}
                            id={echartId}
                            echartClick={this.props.echartClick}
                          />
                          :
                          <EchartTable
                            columns={tableData.columns}
                            dataSource={tableData.dataSource}
                          />
                        : <NullInfo/>

                    }
                  </EchartText>
              }
            </div>
        }
      </div>
    )
  }
}
