/**
 * Created by liulingli on 2017/6/13.
 */
import React, {Component} from "react";
import qs from "qs";
import moment from "moment";
import {DatePicker, Spin, message} from "antd";
import {NullInfo} from "../../common/nullInfo";
import {clone} from "../../common/function";
import {FlexContent} from "../../common/echarts/flexContent";
import {CardContainer} from "../../common/card/cardContainer";
import {CardHeader} from "../../common/card/cardHeader";
import {CardText} from "../../common/card/cardText";
import {MapChart,PieChart,BarChart} from "../../common/echarts";
import {Carousel} from "../../common/carousel/carousel";
const {MonthPicker, RangePicker} = DatePicker;
let keyTo = {
  'HIS_CODE': '医院编码',
  'HIS_NAME': '医院名称',
  'FY': '总费用',
  'YPFY': '药品费用',
  'KSSFY': '抗生素费用',
  'YLKSS': 'Ⅰ类抗生素费用',
  'ELKSS': 'Ⅱ类抗生素费用',
  'WTSJKSS': '无特殊级别抗生素费用',
  'JLYPFY': '甲类药品费用',
  'YLYPFY': '乙类药品费用',
  'ZFYPFY': '自费药品费用',
  'JFY': '检验费用',
  'JCF': '检查费用',
  'ZLF': '治疗费用',
  'SSF': '手术费用',
  'CLF': '材料费用',
  'KDSKM': '科室名称',
};
let keyInverse = {};
for (let i in keyTo) {
  keyInverse[keyTo[i]] = i;
}
let hisKey = {};
//console.log(keyInverse);
let isUnmount = false; //定义一个全局变量，判断组件是否将要卸载
export class HospitalCostsAnalysis extends Component {
  componentWillMount() {
    this.state = {
      loading: true,
      timeFrom: '2016-03-12 11:11:11',
      timeTo: '2017-06-12 11:11:11',
      type: 1,
      hospitalCode: "",
      hospitalCodeTo: {},
      mapOption: {
        title: "沙坪坝社区医院分布",
        data: [],
        tableData: {
          columns: [],
          dataSource: []
        }
      },
      totalOption: {
        title: '沙坪坝区药品费用统计',
        tableData: {
          columns: [],
          dataSource: []
        }
      },
      allOption: {
        legendData: [],
        seriesData: []
      },
      ypOption: {
        legendData: [],
        seriesData: []
      },
      kssOption: {
        legendData: [],
        seriesData: []
      },
      allHospitalOption: {
        title: '沙坪坝区下属所有医院费用统计',
        tableData: {
          columns: [],
          dataSource: []
        }
      },
      hospitalOption: {
        title: 'xxx医院费用统计',
        tableData: {
          columns: [],
          dataSource: []
        }
      },
      DeptOption: {
        title: 'xxx医院所有科室费用统计'
      }
    }
  }

  componentDidMount() {
    isUnmount = false;
    let timeFrom = moment(this.state.timeFrom).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]');
    let timeTo = moment(this.state.timeTo).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]');
    this.fetchAllHospitalQuery(timeFrom, timeTo);
  }

  componentWillUnmount() {
    isUnmount = true;
  }

  /*
   * @desc 根据时间段查询所有医院费用
   * @param {moment} timeFrom 开始时间
   * @param {moment} timeTo 结束时间
   * @return null
   */
  fetchAllHospitalQuery = (timeFrom, timeTo) => {
    let param = {
      timeFrom: timeFrom,
      timeTo: timeTo
    }
    this.setState({
      loading: true,
    });
    fetch('/dataPresentation/DrugProportionController/findHospitalData', {
      method: 'POST',
      body: qs.stringify(param)
    }).then(response => {
      console.log(response);
      console.log("医院费用");
      if (response.success) {
        let data = response.data;
        //沙坪坝区域所有费用图表data
        let areaLegendData = [];
        let areaSeriesData = [];
        //沙坪坝区域药品图表data
        let ypLegendData = [];
        let ypSeriesData = [];
        //沙坪坝区域抗生素图表data
        let kssLegendData = [];
        let kssSeriesData = [];

        //沙坪坝区域下属医院data
        let hosXAxisData = [];
        let hosSeriesData = [];
        //解析
        let totalCostType = {};
        let hospitalArray = [];
        let hospitalKey = [];//存放各医院所有费用信息
        let hospitalCodeTo = {};
        totalCostType['key'] = 0;
        totalCostType['area'] = '沙坪坝'
        console.log(keyTo);
        for (let i in keyTo) {
          console.log(i)
          if (i !== 'HIS_CODE' && i !== 'HIS_NAME' && i !== 'SLKSS' && i !== 'KDSKM') {
            totalCostType[i] = 0; //初始化区域分类费用为0，计算各个医院的总和
          }
        }
        for (let i = 0; i < data.length; i++) {
          hosXAxisData.push(data[i].HIS_ABBREVIATION);
          hosSeriesData.push(data[i].FY);
          hisKey[data[i].HIS_CODE] = data[i].HIS_ABBREVIATION;
          hospitalArray.push({
            name: data[i].HIS_NAME,
            anotherName: data[i].HIS_ABBREVIATION,
            code: data[i].HIS_CODE,
            value: data[i].FY
          });
          hospitalCodeTo[data[i].HIS_CODE] = {
            key: i,
            area: data[i].HIS_NAME,
            FY: data[i].FY,
            YPFY: data[i].YPFY,
            KSSFY: data[i].KSSFY,
            YLKSS: data[i].YLKSS,
            ELKSS: data[i].ELKSS,
            WTSJKSS: data[i].WTSJKSS,
            JLYPFY: data[i].JLYPFY,
            YLYPFY: data[i].YLYPFY,
            ZFYPFY: data[i].ZFYPFY,
            JFY: data[i].JFY,
            JCF: data[i].JCF,
            ZLF: data[i].ZLF,
            SSF: data[i].SSF,
            CLF: data[i].CLF,
          };
          hospitalKey.push({
            key: i,
            area: data[i].HIS_ABBREVIATION,
            FY: data[i].FY,
            YPFY: data[i].YPFY,
            KSSFY: data[i].KSSFY,
            YLKSS: data[i].YLKSS,
            ELKSS: data[i].ELKSS,
            WTSJKSS: data[i].WTSJKSS,
            JLYPFY: data[i].JLYPFY,
            YLYPFY: data[i].YLYPFY,
            ZFYPFY: data[i].ZFYPFY,
            JFY: data[i].JFY,
            JCF: data[i].JCF,
            ZLF: data[i].ZLF,
            SSF: data[i].SSF,
            CLF: data[i].CLF,
          });
          totalCostType['FY'] += data[i].FY,
            totalCostType['YPFY'] += data[i].YPFY;
          totalCostType['KSSFY'] += data[i].KSSFY;
          totalCostType['YLKSS'] += data[i].YLKSS;
          totalCostType['ELKSS'] += data[i].ELKSS;
          totalCostType['WTSJKSS'] += data[i].WTSJKSS;
          totalCostType['JLYPFY'] += data[i].JLYPFY;
          totalCostType['YLYPFY'] += data[i].YLYPFY;
          totalCostType['ZFYPFY'] += data[i].ZFYPFY;
          totalCostType['JFY'] += data[i].JFY;
          totalCostType['JCF'] += data[i].JCF;
          totalCostType['ZLF'] += data[i].ZLF;
          totalCostType['SSF'] += data[i].SSF;
          totalCostType['CLF'] += data[i].CLF;
        }

        //沙坪坝区域总的tableData
        let spbClumn = [];
        let spbData = [];
        spbData[0] = {};
        spbData[0]['key'] = 0;
        spbData[0]['area'] = '沙坪坝';
        spbClumn.push({
          title: '区域',
          dataIndex: 'area',
          width: 80
        });
        for (let i in data[0]) {
          if (i !== 'HIS_CODE' && i !== 'HIS_NAME' && i !== 'SLKSS' && i !== 'HIS_ABBREVIATION') {
            console.log(i);
            let name = keyTo[i].replace(/费用/g, '');
            if (i === 'YLKSS' || i === 'ELKSS' || i === 'WTSJKSS') { //抗生素
              kssLegendData.push(name);
              kssSeriesData.push({
                name: name,
                value: totalCostType[i]
              });
            } else if (i === 'JLYPFY' || i === 'YLYPFY' || i === 'ZFYPFY') { //抗生素
              ypLegendData.push(name);
              ypSeriesData.push({
                name: name,
                value: totalCostType[i]
              });
            } else if (i !== 'FY' && i !== 'KSSFY') {
              areaLegendData.push(name);
              areaSeriesData.push(totalCostType[i]);
              spbClumn.push({
                title: keyTo[i].replace(/费用/g, ''),
                dataIndex: i,
                width: 80
              })
            }
          }
        }
        let hospitalColumn = clone(spbClumn);
        hospitalColumn[0].title = '社区医院';
        let title = '沙坪坝区药品费用统计';
        if (!isUnmount) {
          this.setState({
            loading: false,
            hospitalCodeTo: hospitalCodeTo,
            mapOption: {
              title: "沙坪坝社区医院分布",
              data: hospitalArray,
              tableData: {
                columns: [],
                dataSource: []
              }
            },
            totalOption: {
              title: '沙坪坝区费用统计',
              legendData: areaLegendData,
              seriesData: areaSeriesData,
              tableData: {
                columns: spbClumn,
                dataSource: [totalCostType]
              }
            },
            allOption: {
              title: '总费用',
              xAxisData: areaLegendData,
              seriesData: areaSeriesData
            },
            ypOption: {
              title: '总费用',
              legendData: ypLegendData,
              seriesData: ypSeriesData
            },
            kssOption: {
              title: '总费用',
              legendData: kssLegendData,
              seriesData: kssSeriesData
            },
            allHospitalOption: {
              title: '沙坪坝社区医院费用统计',
              name: '总费用',
              xAxisData: hosXAxisData,
              seriesData: hosSeriesData,
              tableData: {
                columns: hospitalColumn,
                dataSource: hospitalKey
              }
            }
          });
        }
      } else {
        this.setState({
          loading: false,
        });
        message.error(response.message);
      }
    })
  };
  /*
   * @desc 根据时间段查询查询某医院下所有科室费用
   * @param {String} hospitalCode 医院编码,如果医院编码没有传入，则查询整个区域的医院费用
   * @param {moment} timeFrom 开始时间
   * @param {moment} timeTo 结束时间
   * @return null
   */
  fetchHospitalQuery = (hospitalCode, timeFrom, timeTo) => {
    let timeBegin = moment(timeFrom || this.state.timeFrom).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]');
    let timeEnd = moment(timeTo || this.state.timeTo).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]');
    if (!hospitalCode) {
      this.setState({
        type: 1,
      });
      this.fetchAllHospitalQuery(timeBegin, timeEnd);
      return;
    }
    let param = {
      timeFrom: timeBegin,
      timeTo: timeEnd,
      hospitalCode: hospitalCode
    };
    this.setState({
      loading: true,
    });
    fetch('/dataPresentation/DrugProportionController/findEndemicDataByHospital', {
      method: 'POST',
      body: qs.stringify(param)
    }).then(response => {
      if (response.success) {
        let data = response.data;
        //xxx医院图表data
        let hosLegendData = [];
        let hosSeriesData = [];
        //沙坪坝区域药品图表data
        let ypLegendData = [];
        let ypSeriesData = [];
        //沙坪坝区域抗生素图表data
        let kssLegendData = [];
        let kssSeriesData = [];

        //该医院下属科室data
        let deptXAxisData = [];
        let deptSeriesData = [];
        //解析
        let hospitalName = hisKey[data[0].HIS_CODE];
        let deptData = [];
        let spbClumn = [];
        spbClumn.push({
          title: '社区医院',
          dataIndex: 'area',
          width: 80
        });
        for (let i = 0; i < data.length; i++) {
          if (deptData[i] === undefined) deptData[i] = {};
          deptData[i]['key'] = i;
          deptData[i]['area'] = data[i].KDSKM;
          deptXAxisData.push(data[i].KDSKM);
          deptSeriesData.push(data[i].FY);
          for (let j in data[i]) {
            if (j !== 'HIS_CODE' && j !== 'HIS_NAME' && j !== 'SLKSS' && j !== 'KDSKM') {
              deptData[i][j] = data[i][j];
            }
          }
        }
        let hospitalCodeTo = this.state.hospitalCodeTo[data[0].HIS_CODE];
        for (let i in hospitalCodeTo) {
          if (i !== 'key' && i !== 'area' && i !== 'FY') {
            let name = keyTo[i].replace(/费用/g, '');
            if (i === 'YLKSS' || i === 'ELKSS' || i === 'WTSJKSS') { //抗生素
              kssLegendData.push(name);
              kssSeriesData.push({
                name: name,
                value: hospitalCodeTo[i]
              });
            } else if (i === 'JLYPFY' || i === 'YLYPFY' || i === 'ZFYPFY') { //药品
              ypLegendData.push(name);
              ypSeriesData.push({
                name: name,
                value: hospitalCodeTo[i]
              });
            } else if (i !== 'FY' && i !== 'KSSFY') {
              hosLegendData.push(name);
              hosSeriesData.push(hospitalCodeTo[i])
              /*hosLegendData.push(name);
               hosSeriesData.push({
               name: name,
               value: hospitalCodeTo[i]
               });*/
              spbClumn.push({
                title: keyTo[i].replace(/费用/g, ''),
                dataIndex: i,
                width: 80
              })
            }
          }
        }
        let deptColumn = clone(spbClumn);
        deptColumn[0].title = '科室';
        if (!isUnmount) {
          this.setState({
            type: 2,
            loading: false,
            hospitalCode: hospitalCode,
            totalOption: {
              title: hospitalName + '费用统计',
              legendData: hosLegendData,
              seriesData: hosSeriesData,
              tableData: {
                columns: spbClumn,
                dataSource: [hospitalCodeTo]
              }
            },
            allOption: {
              title: '总费用',
              xAxisData: hosLegendData,
              seriesData: hosSeriesData
            },
            ypOption: {
              title: '总费用',
              legendData: ypLegendData,
              seriesData: ypSeriesData
            },
            kssOption: {
              title: '总费用',
              legendData: kssLegendData,
              seriesData: kssSeriesData
            },
            deptOption: {
              title: hospitalName + '所有科室费用统计',
              name: '总费用',
              xAxisData: deptXAxisData,
              seriesData: deptSeriesData,
              tableData: {
                columns: deptColumn,
                dataSource: deptData
              }
            }
          })
        }
      } else {
        this.setState({
          loading: false,
        });
        message.error(response.message);
      }
    })
  };
  /**
   * @method 时间改变
   * @param date
   * @param dateString
   */
  onChange = (date, dateString) => {
    let timeFrom = moment(dateString[0]).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]');
    let timeTo = moment(dateString[1]).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]');
    if (timeFrom !== "Invalid date" && timeTo !== "Invalid date") {
      this.setState({
        timeFrom: dateString[0],
        timeTo: dateString[1]
      })
    }
  };
  /**
   * @method 日期组件点击确定执行查询
   */
  onOk = () => {
    let {type, hospitalCode, timeFrom, timeTo} = this.state;
    timeFrom = moment(timeFrom).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]');
    timeTo = moment(timeTo).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]');
    if (type === 1) { //查询区域下所有医院
      this.fetchAllHospitalQuery(timeFrom, timeTo);
    } else { //查询医院下所有科室
      this.fetchHospitalQuery(hospitalCode, timeFrom, timeTo)
    }
  };

  render() {
    let {loading, allOption, ypOption, kssOption, mapOption, totalOption, allHospitalOption, hospitalOption, deptOption, type} = this.state;
    return (
      <div className="hospital-costs-analysis">
        {loading ?
          <div className="loading">
            <Spin size="large" tip="数据正在加载中..."/>
          </div>
          :
          ""
        }
        <div className="data-content">
          <CardContainer className="flex-grow4">
            <CardHeader title={mapOption.title}>
              <RangePicker
                showTime
                onChange={this.onChange}
                onOk={this.onOk}
                defaultValue={[moment(this.state.timeFrom), moment(this.state.timeTo)]}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </CardHeader>
            <CardText>
              <MapChart
                alone={true}
                type={1}
                option={mapOption}
                echartId="echart0"
                echartClick={this.fetchHospitalQuery}
                showBtn={false}
              />
            </CardText>
          </CardContainer>

          <FlexContent className="column flex-grow5">
            <FlexContent className="flex-grow5">
              <CardContainer>
                <CardHeader title={totalOption.title}/>
                <CardText>
                  {mapOption.data.length > 0 ?
                    <Carousel totalNum={3} curIndex={0}>
                      <BarChart
                        alone={true}
                        type={1}
                        option={allOption}
                        echartId="echart1"
                        showBtn={false}
                      />
                      <PieChart
                        alone={true}
                        type={1}
                        option={ypOption}
                        echartId="echart2"
                        showBtn={false}
                      />
                      <PieChart
                        alone={true}
                        type={1}
                        option={kssOption}
                        echartId="echart3"
                        showBtn={false}
                      />
                    </Carousel> : <NullInfo/>

                  }

                </CardText>
              </CardContainer>
            </FlexContent>
            <FlexContent className="flex-grow4">
              <BarChart
                type={2}
                option={type === 1 ? allHospitalOption : deptOption}
                echartId="echart4"
                showBtn={true}
              />
            </FlexContent>
          </FlexContent>
        </div>
      </div>
    );
  }
}
