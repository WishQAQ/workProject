/**
 * description:院长查询公共方法，常量
 * author: mou
 * time:2017-11-15
 */
import {message} from "antd"
import MyHeaderComponent from './../component/myHeaderComponent' //ag 筛选排序
const com = {
  path: 'path://M1181.73193 1024H512A512 512 0 0 1 0 512 512 512 0 0 1 512 0h669.73193a512 512 0 0 1 512 512A512 512 0 0 1 1181.73193 1024z',      //椭圆路径
  cheNum: 0,//选中的数量
  itemWidth: 14,
  itemHeight: 9,
  tooltip: {
    trigger: 'item', backgroundColor: 'rgba(255,255,255,1)', textStyle: {color: '#888'},
    formatter(params){
      let value = params.value;
      let seriesName = params.seriesName;
      let begin = seriesName.indexOf('（');
      let name = seriesName.substr(0, begin);
      let showName = begin > 0 ? name : seriesName;
      return '<div style="padding:8px 16px;background:rgba(255,255,255,1);border-radius: 4px;">'
        + showName + '<br/> ' + '<span style="font-size:12px;color:rgba(60,154,228,1);font-weight: 700">' + value + '</span>'
        + '</div>'
    }
  },
  axisTooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        width: 0,
      },
    },
    backgroundColor: 'rgba(255,255,255,1)',
    textStyle: {
      color: "#353535"
    },
    formatter(params){
      let back = '';
      for (let i = 0; i < params.length; i++) {
        let seriesName = params[i].seriesName;
        let value = params[i].value;
        let begin = seriesName.indexOf('（');
        let name = seriesName.substr(0, begin);
        let showName = begin > 0 ? name : seriesName;
        back += showName + ":" + value + '<br/>'
      }
      return back
    }
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: '#eee'
    }
  },
  /**
   * 获取数据的时间
   * @param data
   */
  getTimes: (data) => {
    let times = [], c = 0;
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (times.length === 0) {
          times.push(data[i].time)
        } else {
          if (times[c] !== data[i].time) {
            times.push(data[i].time)
          }
        }
      }
    } else {
      for (let time in data) {
        times.push(time)
      }
    }
    return times
  },
  /**
   * 合并数组
   * @param arrText
   * @param arrName
   */
  mergeArray: (arrText, arrName) => {
    let arr = [];
    for (let i = 0; i < arrText.length; i++) {
      for (let j = 0; j < arrName.length; j++) {
        if (i === j) {
          arr.push({
            name: arrName[j],
            text: arrText[i]
          })
        }
      }
    }
    return arr;
  },
  /**
   *
   * @param legend
   * @param xAxis
   * @param data
   * @param defType
   * @param speLegs
   * @param z
   * @param isHow
   * @returns {Array}
   */
  getSeries: (legend, xAxis, data, defType, speLegs, z, isHow) => {
    let series = [];
    //legend->x轴->医院数据
    for (let i = 0; i < legend.length; i++) {
      let name = legend[i].name;
      let text = legend[i].text;
      let arr = [];
      for (let j = 0; j < xAxis.length; j++) {
        let time = xAxis[j];
        for (let j = 0; j < data[time].length; j++) {
          arr.push(data[time][j][name])
        }
      }
      //判断是否有特殊的type
      if (speLegs) {
        for (let i = 0; i < speLegs.length; i++) {
          if (speLegs[i].text === text) {
            series.push({
              name: text,
              type: speLegs[i].type,
              data: arr,
              [z]: 1,
              barWidth: 10,
              symbolSize: 8,
              itemStyle: {
                emphasis: {
                  barBorderRadius: [100, 100, 100, 100],
                },
                normal: {
                  barBorderRadius: [100, 100, 100, 100],
                }
              },
              lineStyle: {
                normal: {
                  opacity: 0.45,
                  width: 1,
                }
              }
            });
          } else {
            series.push({
              name: text,
              type: defType,
              data: arr,
              barWidth: 10,
              symbolSize: 8,
              itemStyle: {
                emphasis: {
                  barBorderRadius: [100, 100, 100, 100],
                },
                normal: {
                  barBorderRadius: [100, 100, 100, 100],
                }
              },
              lineStyle: {
                normal: {
                  opacity: 0.45,
                  width: 1,
                }
              }
            });
          }
        }
      } else {
        series.push({
          name: text,
          type: defType,
          data: arr,
          barWidth: 10,
          symbolSize: 8,
          itemStyle: {
            emphasis: {
              barBorderRadius: [100, 100, 100, 100],
            },
            normal: {
              barBorderRadius: [100, 100, 100, 100],
            }
          },
          lineStyle: {
            normal: {
              opacity: 0.45,
              width: 1,
            }
          }
        });
        if (isHow && isHow === 'show') {
          series[series.length - 1].label = {
            normal: {
              show: true,
              position: 'top'
            }
          }
        }
      }
    }
    return series;
  },
  /**
   * 获取需要求和的数据并求和
   * @param legend
   * @param sumLeg
   * @param xAis
   * @param data
   * @returns {Array}
   */
  getKindSum: (legend, sumLeg, xAis, data) => {
    let mArr = [];
    let c = 0;
    for (let j = 0; j < legend.length; j++) {
      let text = legend[j].text;
      let name = legend[j].name;
      let val = 0;
      if (sumLeg[c] && sumLeg[c].text === text) {
        let arr = [];
        for (let j = 0; j < xAis.length; j++) {
          let time = xAis[j];
          for (let j = 0; j < data[time].length; j++) {
            arr.push(data[time][j][name])
          }
        }
        for (let k = 0; k < arr.length; k++) {
          val += arr[k];
        }
        mArr.push(sumLeg[c].text + '（' + sumLeg[c].sum + ':' + val + '）');
        c++;
      } else {
        mArr.push(text)
      }
    }
    return mArr
  },
  /**
   * 获取有堆叠的series
   * @param legend
   * @param xAxis
   * @param data
   * @param defType
   * @param speLegs
   * @param z
   * @returns {Array}
   */
  getDSeries: (legend, xAxis, data, defType, speLegs, z) => {
    let series = [], c = 0;
    //legend->x轴->医院数据
    for (let i = 0; i < legend.length; i++) {
      let name = legend[i].name;
      let text = legend[i].text;
      let arr = [];
      for (let j = 0; j < xAxis.length; j++) {
        let time = xAxis[j];
        for (let k = 0; k < data[time].length; k++) {
          arr.push(data[time][k][name])
        }
      }
      //判断是否有特殊的type
      if (speLegs) {
        if (speLegs[c] && speLegs[c].text === text) {
          if (text === speLegs[speLegs.length - 1].text) {
            for (let i = 0; i < arr.length; i++) {
              if (z === 'xAxisIndex') {
                arr[i] = {
                  value: arr[i], itemStyle: {
                    emphasis: {
                      barBorderRadius: [0, 100, 100, 0],
                    },
                    normal: {
                      barBorderRadius: [0, 100, 100, 0],
                    }
                  }
                }
              } else {
                arr[i] = {
                  value: arr[i], itemStyle: {
                    emphasis: {
                      barBorderRadius: [100, 100, 0, 0],
                    },
                    normal: {
                      barBorderRadius: [100, 100, 0, 0],
                    }
                  }
                }
              }
            }
          }
          series.push({
            name: text,
            type: speLegs[c].type,
            data: arr,
            [z]: 1,
            stack: defType,
            barWidth: 10,
          });
          c++
        } else {
          series.push({
            name: text,
            type: defType,
            data: arr,
            stack: legend[0].text,
            barWidth: 10,
          });
        }
      } else {
        if (text === legend[0].text) {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = {
              value: arr[i], itemStyle: {
                emphasis: {
                  barBorderRadius: [0, 0, 100, 100],
                },
                normal: {
                  barBorderRadius: [0, 0, 100, 100],
                }
              }
            }
          }
          series.push({
            name: text,
            type: defType,
            data: arr,
            stack: defType,
            barWidth: 10,
          });
        } else if (text === legend[legend.length - 1].text) {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = {
              value: arr[i], itemStyle: {
                emphasis: {
                  barBorderRadius: [100, 100, 0, 0],
                },
                normal: {
                  barBorderRadius: [100, 100, 0, 0],
                }
              }
            }
          }
          series.push({
            name: text,
            type: defType,
            data: arr,
            stack: defType,
            barWidth: 10,
          });
        } else {
          series.push({
            name: text,
            type: defType,
            data: arr,
            stack: defType,
            barWidth: 10,
          });
        }
      }
    }
    return series;
  },
  /**
   * ag表格筛选器设置不同的id
   * @param arr
   * @param id
   * @returns {*}
   */
  setDifId: (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].headerComponentParams.id = id;
    }
    return arr
  },
  /**
   * 判断是单家医院还是多家医院，是详细还是汇总
   * @param str
   * @param detailOne
   * @param detailMore
   * @param textTotal
   * @param type
   * @returns {*}
   */
  judgeOneOrMore: (str, detailOne, detailMore, textTotal, type) => {
    let arr = str.split(",");
    //判断是单家医院还是多家医院
    if (arr.length > 1) {
      //判断是详细，还是汇总
      if (type === 'detail') {
        return detailMore
      } else {
        return textTotal
      }
    } else {
      //判断是详细，还是汇总
      if (type === 'detail') {
        return detailOne
      } else {
        return textTotal
      }
    }
  },
  /**
   * 获取饼图的series
   * @param legend
   * @param times
   * @param data
   * @returns {Array}
   */
  getPieSeries: (legend, times, data) => {
    let series = [];
    //分类—》时间—》数据
    for (let i = 0; i < legend.length; i++) {
      let leg = legend[i].name;
      for (let j = 0; j < times.length; j++) {
        let time = times[j];
        for (let k = 0; k < data[time].length; k++) {
          let info = data[time][k][leg];
          let obj = {
            name: time,
            value: info
          };
          series.push(obj);
        }
      }
    }
    return series;
  },
  /**
   * 请求之前检测是否输入
   * @param hospital
   * @param type
   * @param timeFrom
   * @param timeTo
   * @returns {*}
   */
  selBeforeCheck: (hospital, type, timeFrom, timeTo) => {
    if (hospital === null) {
      message.warning('请选择要查询的医院');
      return false;

    }
    if (type === null) {
      message.warning('请选择类型');
      return false;

    }
    switch (type) {
      case 'year':
        if (timeFrom === null) {
          message.warning('请选择时间');
          return false;

        }
        break;
      default:
        if (timeFrom === null) {
          message.warning('请选择开始时间');
          return false;

        }
        if (timeTo === null) {
          message.warning('请选择结束时间');
          return false;

        }
        if (timeFrom >= timeTo) {
          message.warning('开始时间必须小于结束时间');
          return false;

        }
        break;
    }
    return true
  },
  /**
   *
   * @param selHospital
   * @param hospitalList
   * @param deptName
   * @param times
   * @param timeType
   * @param rowData
   * @param cheNum
   * @returns {[*,*]}
   */
  setColumnsCom: (selHospital, hospitalList, deptName, times, timeType, rowData, cheNum) => {
    let arr = selHospital.split(",");
    let time;
    switch (timeType) {
      case "year":
        time = "年份";
        break;
      case "month":
        time = "月份";
        break;
      case "day":
        time = "日期";
        break;

    }
    let arrayColumns = [
      {
        headerName: time,
        field: "time",
        headerComponent: MyHeaderComponent,
        width: 100,
        headerClass: 'cellTd whiteBg',
        pinned: "left",
        headerComponentParams: {
          enableFilter: true,
          enableSorting: true,
          suppressMenuHide: true,
          enableMenu: true,
          menuIcon: 'fa-bars',
          rowData: rowData,
          cheNum: cheNum,//选中
          myType: 'time',
          id: '',
          type: ['time', 'deptName'],
          data: times,
        },
      },
      {
        headerName: "科室",
        field: "deptName",
        headerComponent: MyHeaderComponent,
        width: 100,
        headerClass: 'cellTd whiteBg',
        pinned: "left",
        headerComponentParams: {
          enableFilter: true,
          enableSorting: true,
          suppressMenuHide: true,
          enableMenu: true,
          myType: 'deptName',
          id: '',
          type: ['time', 'deptName'],
          rowData: rowData,
          cheNum: cheNum,//选中
          data: ['外科', '内科'],
          menuIcon: 'fa-bars',

        }
      },
    ];
    if (arr.length > 1) {
      arrayColumns[0]["headerComponentParams"]["type"][1] = "hospitalCode";
      arrayColumns[1]["headerName"] = "医院";
      arrayColumns[1]["field"] = "hospitalCode";
      arrayColumns[1]["headerComponentParams"]["myType"] = "hospitalCode";
      arrayColumns[1]["headerComponentParams"]["type"][1] = "hospitalCode";
      arrayColumns[1]["headerComponentParams"]["data"] = hospitalList;
    } else {
      arrayColumns[0]["headerComponentParams"]["type"][1] = "deptName";
      arrayColumns[1]["headerName"] = "科室";
      arrayColumns[1]["field"] = "deptName";
      arrayColumns[1]["headerComponentParams"]["myType"] = "deptName";
      arrayColumns[1]["headerComponentParams"]["type"][1] = "deptName";
      arrayColumns[1]["headerComponentParams"]["data"] = deptName;
    }
    return arrayColumns;
  },
  /**
   * 返回数组
   * @param arr
   * @param legend
   * @param legendText
   * @returns {*}
   */
  backArr: (arr, legend, legendText) => {
    for (let i = 0; i < legend.length; i++) {
      if (legendText && legendText.length > 0) {
        for (let j = 0; j < legendText.length; j++) {
          if (legend[i]["text"] === legendText[j]) {
            arr.push({
              headerName: legend[i].text,
              field: legend[i].name,
              headerComponent: MyHeaderComponent,
              headerClass: 'cellTd',
              headerComponentParams: {
                enableFilter: true,
                enableSorting: true,
                suppressMenuHide: true,
                enableMenu: false,
                menuIcon: 'fa-bars'
              }
            });
          }
          else {
            arr.push({
              headerName: legend[i].text,
              field: legend[i].name,
              headerClass: 'cellTd',
            })
          }
        }
      } else {
        arr.push({
          headerName: legend[i].text,
          field: legend[i].name,
          headerClass: 'cellTd',
        })
      }
    }
    return arr;
  }
};

export default com
 
 
 