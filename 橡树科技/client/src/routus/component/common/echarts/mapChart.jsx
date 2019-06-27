/**
 * Created by liulingli on 2017/5/24.
 */
import React, { Component } from 'react';
import {EchartContainer} from './echartContainer';
import {getMaxAndMin} from '../function'
let geoCoordMap = {
  '重庆市沙坪坝区沙坪坝社区卫生服务中心':[106.46972,29.571839],
  '重庆市沙坪坝区天星桥社区卫生服务中心':[106.4625,29.551627],
  '重庆市沙坪坝区石井坡社区卫生服务中心':[106.448023,29.595735],
  '重庆市沙坪坝区磁器口社区卫生服务中心':[106.458537,29.587585],
  '重庆市沙坪坝区新桥社区卫生服务中心':[106.448226,29.531518],
  '重庆市沙坪坝区小龙坎社区卫生服务中心':[106.476279,29.559504],
  '重庆市沙坪坝区童家桥社区卫生服务中心':[106.452772,29.580354],
  '重庆市沙坪坝区渝碚路社区卫生服务中心':[106.456039,29.565994],
  '重庆市沙坪坝区歌乐山社区卫生服务中心':[106.426388,29.572353],
  '重庆市沙坪坝区井口社区卫生服务中心':[106.451827,29.64271],
  '重庆市沙坪坝区曾家社区卫生服务中心':[106.309551,29.556083],
  '重庆市沙坪坝区虎溪社区卫生服务中心':[106.315495,29.57746],
  '重庆市沙坪坝区土主社区卫生服务中心':[106.378203,29.637659],
  '重庆市沙坪坝区西永社区卫生服务中心':[106.384263,29.591202],
  '重庆市沙坪坝区中梁社区卫生服务中心':[106.431631,29.723435],
  '重庆市沙坪坝区回龙坝社区卫生服务中心':[106.387045,29.7102],
  '重庆市沙坪坝区凤凰社区卫生服务中心':[106.333589,29.729741],
  '重庆市沙坪坝区陈家桥社区卫生服务中心':[106.350388,29.630235],
  '重庆市沙坪坝区青木关社区卫生服务中心':[106.308745,29.680087],
  '重庆市沙坪坝区联芳社区卫生服务中心':[106.477503,29.54956],
  '重庆市沙坪坝区覃家岗社区卫生服务中心':[106.465188,29.54496],
  '重庆市沙坪坝区土湾社区卫生服务中心':[106.478689,29.56136],
  '重庆市沙坪坝区双碑社区卫生服务中心':[106.449535,29.60807]
};
let hospitalPath = 'path://M11.01231 668.585291 11.01231 359.040283l1006.066559 0 0 309.545008L11.01231 668.585291 11.01231 668.585291zM359.282295 1016.836857 359.282295 10.770298l309.546032 0 0 1006.066559L359.282295 1016.836857 359.282295 1016.836857z'
function convertData(data) {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    let geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].anotherName+"(¥:"+data[i].value+")",
        code: data[i].code,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};
export class MapChart extends Component{
  constructor(props) {
    super(props);
    this.className = this.props.className;
    this.title = this.props.option.title;
    this.data = this.props.option.data;
    this.mapOption =  {
      visualMap: {
        type: 'continuous',
        min: 0,
        max: 1000,
        left: 'left',
        top: 'bottom',
        text: ['高','低'],           // 文本，默认为数值文本
        calculable: true,
        color:['red','yellow']
      },
      geo: {
        map: 'spb',
        roam: true,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: 'rgba(0,0,0,0.4)'
            }
          }
        },
        zoom:1.2,
        scaleLimit:{
          min:1.2,
          max:1.2
        },
        itemStyle: {
          emphasis:{
            areaColor:'rgba(33,150,253,0.6)',//设置为空字符串可使颜色不变
            label:{show:true}
          },
          normal:{
            areaColor:'rgba(33,150,253,0.6)',
            borderColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      },
      series:[
        {
          type: 'scatter',
          legendHoverLink:false,
          coordinateSystem: 'geo',
          data: convertData(this.data),
          symbolSize: 24,
          symbol:hospitalPath,
          symbolRotate: 0,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            emphasis: {
              formatter: '{b}{c}',
              show: true,
              symbolSize: 28,
            }
          },
          itemStyle: {
            normal: {
              color: 'red'
            }
          }
        }
      ]
    };
    this.tableData = this.props.option.tableData;
  }

  componentWillUpdate(nextProps){
    if(this.props !== nextProps){
      this.className = nextProps.className;
      this.title = nextProps.option.title;
      this.data =  nextProps.option.data;
      function getValue(json){
        return parseFloat(json.value)
      }
      let region = getMaxAndMin(this.data,getValue);
      this.mapOption =  {
        visualMap: {
          type: 'continuous',
          min: region.min,
          max: region.max,
          left: 'left',
          top: 'bottom',
          text: ['高','低'],           // 文本，默认为数值文本
          calculable: true,
          color:['red','yellow']
        },
        geo: {
          map: 'spb',
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          zoom:1.2,
          scaleLimit:{
            min:1.2,
            max:1.2
          },
          itemStyle: {
            emphasis:{
              areaColor:'rgba(33,150,253,0.6)',//设置为空字符串可使颜色不变
              label:{show:true}
            },
            normal:{
              areaColor:'rgba(33,150,253,0.6)',
              borderColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
          }
        },
        series:[
          {
            type: 'scatter',
            legendHoverLink:false,
            coordinateSystem: 'geo',
            data: convertData(this.data),
            symbolSize: 24,
            symbol:hospitalPath,
            symbolRotate: 0,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true,
                formatter: '{a}',
                symbolSize: 28,
              }
            },
            itemStyle: {
              normal: {
                color: 'red'
              }
            }
          }
        ]
      };
      this.tableData = nextProps.option.tableData;
    }
  }
  render(){
    let {...other} = this.props;
    return(
      <EchartContainer
        {...other}
        alone={this.props.alone}
        type={this.props.type}
        className={this.className}
        title={this.title}
        option={this.mapOption}
        tableData={this.tableData}
        echartId={this.props.echartId}
        echartClick={this.props.echartClick}
        showBtn={this.props.showBtn}
      />
    )
  }
}
