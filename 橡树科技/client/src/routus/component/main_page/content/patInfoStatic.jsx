/**
 * description:患者信息
 * author: mou
 * time:2017-11-13
 */
import React from 'react'
import {Row, Col, Spin} from 'antd';
import {Card} from './../component/card';                //引入卡片
import MyHeaderComponent from './../component/myHeaderComponent'//ag 筛选排序
import {AgGridReact} from "ag-grid-react"; //引入AG表格
import {Search} from './../component/header'
import {BigCard} from './../component/bigCard'
import css from '../../../less/main/content/outPrescriptions.scss'
import api from './../api';
import com from './../content/deanQueryCom'
export class PatInfoStatic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalColumnDefs: [],//总表列规则
      toRowData: [],//总表行数据
      patNumOption: {series: []},//病情人数统计
      patNum: true,
      patNumLoading: false,
      patNumColumnDefs: [],
      bedUseOption: {series: []},//床位使用情况
      bedUse: true,
      bedUseLoading: false,
      bedUseColumnDefs: [],
      big: true,
      bigLoading: false,
      zdrsurOption: {series: []},//重点手术人数、人次
      zdjbOption: {series: []},//重点疾病
      diseaseOption: {series: []},//患者病种详情
      disease: true,
      diseaseLoading: false,
      diseaseColumnDefs: [],
      obstetricsOption: {series: []},//产科生产、剖宫产人次
      obstetrics: true,
      obstetricsLoading: false,
      obstetricsColumnDefs: [],
      shzqOption: {series: []},//手术患者择期/平均住院日
      shzq: true,
      shzqLoading: false,
      shzqColumnDefs: [],
      kswswOption: {series: []},//抗生素微生物人数
      kswsw: true,
      kswswLoading: false,
      kswswColumnDefs: [],
      limitOption: {series: []},//限制抗菌药物
      limit: true,
      limitLoading: false,
      limitColumnDefs: [],
      specialOption: {series: []},//特殊抗菌药物
      special: true,
      specialLoading: false,
      specialColumnDefs: [],
      materialOption: {series: []},//抗菌药物资料
      material: true,
      materialLoading: false,
      materialColumnDefs: [],
      rowData: [],//行
      show: false,
      cheNum: 0,
      hosName: [],  //医院
      deptName: [],    //科室
      selHos: null,    //选中的医院
      timeFrom: null,
      timeTo: null,
      timeType: null,
      times: [],
      loading: false,
      isDetail: false,//是否查询了详细
      overlayNoRowsTemplate: "<span>暂无相关数据</span>"
    };
    this.onGridReady = this.onGridReady.bind(this);
  };

  //获取表格基础api
  onGridReady(params) {
    this.gridApi = params.api;
    this.state.api = params;
    this.gridApi.hideOverlay();
  }

  /**
   * 小的表格查询详细数据
   * @param one
   */
  selSmallDetail = (one) => {
    const {selHos, timeType, timeFrom, timeTo} = this.state;
    const {judgeOneOrMore, getTimes} = com;
    const param = {
      message: {
        hospitalCode: selHos,
        timeFrom: timeFrom,
        timeTo: timeTo,
        timeType: timeType,
      }
    };
    param.action = judgeOneOrMore(selHos, 'patientInfo.singleDetail', 'patientInfo.moreDetail', 'patientInfo.all', 'detail');
    const {selRest} = api;
    this.setState({
      [one + 'Loading']: true
    });
    selRest(param, res => {
      if (res.success) {
        const data = res.data;
        this.setState({
          times: getTimes(data),
          [one]: !this.state[one],
          rowData: data,
          toRowData: data,
          isDetail: true,
          [one + 'Loading']: false
        }, () => {
          this.setState({
            [one + 'ColumnDefs']: this.createColDefs(one),
          })
        });
      } else {
        this.setState({
          [one + 'Loading']: false
        });
        console.error("response error", res);
      }
    });
  };
  //查询数据
  selData = (selHospitalsNo, type, timeFrom, timeTo, dataType, bigOrSmall) => {
    const {selRest} = api;
    const {judgeOneOrMore, getTimes} = com;
    this.setState({
      selHos: selHospitalsNo,
      timeFrom: timeFrom,
      timeTo: timeTo,
      timeType: type,
      [bigOrSmall]: true,
    });
    let dataPack = {
      message: {
        hospitalCode: selHospitalsNo,
        timeFrom: timeFrom,
        timeTo: timeTo,
        timeType: type,
      }
    };
    dataPack.action = judgeOneOrMore(selHospitalsNo, 'patientInfo.singleDetail', 'patientInfo.moreDetail', 'patientInfo.all', dataType);
    selRest(dataPack, rest => {
      if (rest.success) {
        const data = rest.data;
        if (dataType === "detail") {
          this.setState({
            times: getTimes(data)
          }, () => {
            this.setState({
              times: getTimes(data),
              toRowData: data,
              toColumnDefs: this.createToColDefs(),//创建
            }, () => {
              this.setState({
                agTable: !this.state.agTable,
              })
            })
          })
        } else {
          this.setState({
            agTable: false,
            patNum: true,
            bedUse: true,
            big: true,
            disease: true,
            obstetrics: true,
            shzq: true,
            kswsw: true,
            limit: true,
            special: true,
            material: true,
          });
          this.renderCanvas(data);
        }
      } else {
        console.error("response error", rest);
      }
      this.setState({
        [bigOrSmall]: false
      })
    });
  };
  //大表创建列规则
  createToColDefs = () => {
    let {toRowData, cheNum, times, hosName, selHos, deptName, timeType} = this.state;
    const {setColumnsCom, setDifId} = com;
    let bigColumns = setColumnsCom(selHos, hosName, deptName, times, timeType, toRowData, cheNum);
    bigColumns = setDifId(bigColumns, 'bigTable');
    bigColumns.push(
      {
        headerName: "病情人数统计",
        field: "reTotal",
        marryChildren: true,
        children: [
          {
            headerName: "一级",
            field: "bqyjrs",
            headerComponent: MyHeaderComponent,
            width: 100,
            headerClass: 'cellTd',
            headerComponentParams: {
              enableFilter: true,
              enableSorting: true,
              suppressMenuHide: true,
              enableMenu: false,
              menuIcon: 'fa-bars',
            }
          },
          {
            headerName: "二级",
            field: "bqejrs",
            headerComponent: MyHeaderComponent,
            width: 100,
            headerClass: 'cellTd',
            headerComponentParams: {
              enableFilter: true,
              enableSorting: true,
              suppressMenuHide: true,
              enableMenu: false,
              menuIcon: 'fa-bars',
            }
          },
          {
            headerName: "三级",
            field: "bqsjrs",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "特级",
            field: "bqtjrs",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "重病",
            field: "bqbzrs",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "病危",
            field: "bqbwrs",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "一般",
            field: "bqybrs",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      {
        headerName: "床位使用情况",
        field: "firDoor",
        marryChildren: true,
        children: [
          {
            headerName: "总床位",
            field: "zcws",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "总使用床位",
            field: "zsycw",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "空床",
            field: "zks",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "在编床位",
            field: "zbcw",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "非在编床位",
            field: "fzbcw",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "加床使用",
            field: "jcsy",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "包床",
            field: "bc",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "床位使用率",
            field: "cwsyl",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      {
        headerName: "重点手术",
        field: "age",
        marryChildren: true,
        children: [
          {
            headerName: "重点手术人数",
            field: "zdssrs",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "重点手术人次",
            field: "zdssrc",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      {
        headerName: "重点疾病",
        field: "zdjbrs",
        width: 100,
        headerClass: 'cellTd',
      },
      {
        headerName: "患者病种详情",
        field: "chiMedical",
        marryChildren: true,
        children: [
          {
            headerName: "传染病患者人数",
            field: "crbhzrs",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "单病种人数",
            field: "dbzrs",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "传染病上报人数",
            field: "crbsb",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "传染病未上报人数",
            field: "crbwsbrs",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "传染病上报率",
            field: "crbsbl",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      {
        headerName: "产科生产、剖宫产人次",
        field: "sex",
        marryChildren: true,
        children: [
          {
            headerName: "生产人次",
            field: "ckscrs",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "剖宫产人次",
            field: "pgcrs",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      {
        headerName: "手术患者择期/平均住院日",
        field: "opeAvg",
        marryChildren: true,
        children: [
          {
            headerName: "择期",
            field: "sszqpjzyr",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "急诊",
            field: "ssjzpjzyr",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "急救",
            field: "ssjjpjzyr",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "科内",
            field: "ssknpjzyr",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      {
        headerName: "抗生素微生物人数",
        field: "ksswswrs",
        width: 110,
        headerClass: 'cellTd',
      },
      {
        headerName: "限制抗菌药物",
        field: "limitNum",
        marryChildren: true,
        children: [
          {
            headerName: "使用限制抗菌药物住院患者人数",
            field: "xzkjywzlrs",
            width: 180,
            headerClass: 'cellTd',
          },
          {
            headerName: "签微生物检验样本送检率",
            field: "qwswjybbssjl",
            width: 140,
            headerClass: 'cellTd',
          }
        ]
      },
      {
        headerName: "特殊抗菌药物",
        field: "specMedical",
        marryChildren: true,
        children: [
          {
            headerName: "特殊抗菌药物住院患者人数",
            field: "sytskjywzlrs",
            width: 160,
            headerClass: 'cellTd',
          },
          {
            headerName: "前微生物检验样本送检率",
            field: "qwswjybbssjl",
            width: 150,
            headerClass: 'cellTd',
          }
        ]
      },
      {
        headerName: "抗菌药物",
        field: "kjMedical",
        marryChildren: true,
        children: [
          {
            headerName: "抗菌药物资料住院患者人数",
            field: "kjywzryr",
            width: 160,
            headerClass: 'cellTd',
          },
          {
            headerName: "使用前微生物检验样本送检率",
            field: "syqwswjyybsjl",
            width: 170,
            headerClass: 'cellTd',
          }
        ]
      },
    );
    return bigColumns;
  };
  createColDefs = (type) => {
    const {setDifId, mergeArray, setColumnsCom, backArr} = com;
    let {rowData, cheNum, selHos, hosName, times, deptName, timeType} = this.state;
    let arr = setColumnsCom(selHos, hosName, deptName, times, timeType, rowData, cheNum);
    switch (type) {
      case 'patNum':
        let patInStaText = ['一级', '二级', '三级', '特级', '重病', '病危', '一般'];
        let patInStaLegName = ['bqyjrs', 'bqejrs', 'bqsjrs', 'bqtjrs', 'bqbzrs', 'bqbwrs', 'bqybrs'];
        let patInStaLeg = mergeArray(patInStaText, patInStaLegName);
        return backArr(setDifId(arr, 'patNum'), patInStaLeg);
        break;
      case 'bedUse':
        let bedUseText = ['总床位', '总使用床位', '空床', '在编床位', '非在编床位', '加床使用', '包床', '床位使用率'];
        let bedUseLegName = ['zcws', 'zsycw', 'zks', 'zbcw', 'fzbcw', 'jcsy', 'bc', 'cwsyl'];
        let bedUseLeg = mergeArray(bedUseText, bedUseLegName);
        return backArr(setDifId(arr, 'bedUse'), bedUseLeg);
        break;
      case 'big':
        let totalText = ['重点手术人数', '手术人次', '重点疾病'];
        let totalLegName = ['zdssrs', 'zdssrc', 'zdjbrs'];
        let totalLeg = mergeArray(totalText, totalLegName);
        return backArr(setDifId(arr, 'big'), totalLeg);
        break;
      case 'disease':
        let diseaseText = ['传染病患者人数', '单病种人数', '传染病上报人数', '传染病未上报人数', '传染病上报率'];
        let diseaseLegName = ['crbhzrs', 'dbzrs', 'crbsb', 'crbwsbrs', 'crbsbl'];
        let diseaseLeg = mergeArray(diseaseText, diseaseLegName);
        return backArr(setDifId(arr, 'disease'), diseaseLeg);
        break;
      case 'obstetrics':
        let obstetricsText = ['生产人次', '剖宫产人次'];
        let obstetricsLegName = ['ckscrs', 'pgcrs'];
        let obstetricsLeg = mergeArray(obstetricsText, obstetricsLegName);
        return backArr(setDifId(arr, 'obstetrics'), obstetricsLeg);
        break;
      case 'shzq':
        let shzqText = ['择期', '急诊', '急救', '科内'];
        let shzqLegName = ['sszqpjzyr', 'ssjzpjzyr', 'ssjjpjzyr', 'ssknpjzyr'];
        let shzqLeg = mergeArray(shzqText, shzqLegName);
        return backArr(setDifId(arr, 'shzq'), shzqLeg);
        break;
      case 'kswsw':
        let kswswText = ['人数'];
        let kswswLegName = ['ksswswrs'];
        let kswswLeg = mergeArray(kswswText, kswswLegName);
        return backArr(setDifId(arr, 'kswsw'), kswswLeg);
        break;
      case 'limit':
        let limitText = ['使用限制抗菌药物住院患者人数', '签微生物检验样本送检率'];
        let limitLegName = ['xzkjywzlrs', 'qwswjybbssjl'];
        let limitLeg = mergeArray(limitText, limitLegName);
        return backArr(setDifId(arr, 'limit'), limitLeg);
        break;
      case 'special':
        let specialText = ['特殊抗菌药物住院患者人数', '签微生物检验样本送检率'];
        let specialLegName = ['sytskjywzlrs', 'qwswjybbssjl'];
        let specialLeg = mergeArray(specialText, specialLegName);
        return backArr(setDifId(arr, 'special'), specialLeg);
        break;
      case 'material':
        let materialText = ['抗菌药物资料住院患者人数', '使用前微生物检验样本送检率'];
        let materialLegName = ['kjywzryr', 'syqwswjyybsjl'];
        let materialLeg = mergeArray(materialText, materialLegName);
        return backArr(setDifId(arr, 'material'), materialLeg);
        break;
    }
  };
  //点击切换图表(小）
  toggleChart = (type) => {
    let {isDetail, selHos, timeType, timeFrom, timeTo} = this.state;
    const {selBeforeCheck} = com;
    if (!selBeforeCheck(selHos, timeType, timeFrom, timeTo)) return false;
    switch (type) {
      case 'patNum':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            patNum: !this.state.patNum,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              patNumColumnDefs: this.createColDefs('patNum'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'bedUse':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            bedUse: !this.state.bedUse,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              bedUseColumnDefs: this.createColDefs('bedUse'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'big':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            big: !this.state.big,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              bigColumnDefs: this.createColDefs('big'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'disease':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            disease: !this.state.disease,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              diseaseColumnDefs: this.createColDefs('disease'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'obstetrics':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            obstetrics: !this.state.obstetrics,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              obstetricsColumnDefs: this.createColDefs('obstetrics'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'shzq':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            shzq: !this.state.shzq,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              shzqColumnDefs: this.createColDefs('shzq'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'kswsw':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            kswsw: !this.state.kswsw,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              kswswColumnDefs: this.createColDefs('kswsw'),
              [type + 'Loading']: false
            })
          });
        }

        break;
      case 'limit':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            limit: !this.state.limit,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              limitColumnDefs: this.createColDefs('limit'),
              [type + 'Loading']: false
            })
          });
        }

        break;
      case 'special':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            special: !this.state.special,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              specialColumnDefs: this.createColDefs('special'),
              [type + 'Loading']: false
            })
          });
        }

        break;
      case 'material':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            material: !this.state.material,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              materialColumnDefs: this.createColDefs('material'),
              [type + 'Loading']: false
            })
          });
        }
        break;
    }
  };
  //渲染canvas
  renderCanvas = (data) => {
    const {getTimes, mergeArray, getDSeries, getSeries, getKindSum} = com;
    const {axisTooltip, tooltip, itemWidth, itemHeight, getPieSeries} = com;
    let times = getTimes(data);
//病情人数统计
    let patInStaText = ['一级', '二级', '三级', '特级', '重病', '病危', '一般'];
    let patInStaLegName = ['bqyjrs', 'bqejrs', 'bqsjrs', 'bqtjrs', 'bqbzrs', 'bqbwrs', 'bqybrs'];
    let patInStaLeg = mergeArray(patInStaText, patInStaLegName);
    let sumPatInStaText = [{text: '一级', sum: '总'}, {text: '二级', sum: '总'}, {text: '三级', sum: '总'}, {
      text: '特级',
      sum: '总'
    }, {text: '重病', sum: '总'}, {text: '病危', sum: '总'}, {text: '一般', sum: '总'}];
    let patInStaSum = getKindSum(patInStaLeg, sumPatInStaText, times, data);
    patInStaLeg = mergeArray(patInStaSum, patInStaLegName);
    let patInStaSeries = getDSeries(patInStaLeg, times, data, 'bar');
    let patNumOption = {
      tooltip: axisTooltip,
      color: ['#FF375B', '#FA8630', '#FFCC19', '#7B6881', '#A86565', '#782F2F', '#2E8D87'],//图例颜色
      legend: {
        data: patInStaSum,
        itemWidth, itemHeight
      },
      grid: {
        bottom: '3%',
        top: '25%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '人数/万',
          min: 0,
          minInterval: 1,
        },
      ],
      series: patInStaSeries
    };
//床位使用情况
    let bedUseText = ['总床位', '总使用床位', '空床', '在编床位', '非在编床位', '加床使用', '包床', '床位使用率'];
    let bedUseLegName = ['zcws', 'zsycw', 'zks', 'zbcw', 'fzbcw', 'jcsy', 'bc', 'cwsyl'];
    let bedUseLeg = mergeArray(bedUseText, bedUseLegName);
    let bedUseSpec = [
      {text: '床位使用率', type: 'bar'},
    ];
    let bedUseSeries = getDSeries(bedUseLeg, times, data, 'bar', bedUseSpec, 'yAxisIndex');
    let bedUseOption = {
      tooltip: axisTooltip,
      color: ['#3C9AE4', '#FF8787', '#59829E', '#7DAAAF', '#9DC4C9', '#2E8D87', '#A86565', '#9DC4C9'],
      legend: [{
        x: 'center',
        itemWidth, itemHeight,
        data: bedUseText,
      }/*,
       {
       x: 'center',
       top: '9%',
       itemWidth, itemHeight,
       data: [bedUseText[4], bedUseText[5], bedUseText[6], bedUseText[7]],
       }*/],
      grid: {
        top: '25%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times,
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '床位',
          scale: true,
          min: 0,
          minInterval: 1,
        },
        {
          type: 'value',
          name: '使用率',
          scale: true,
          min: 0,
        },
      ],
      series: bedUseSeries
    };

//重点手术人数、手术人次
    let totalText = ['重点手术人数', '手术人次'];
    let totalLegName = ['zdssrs', 'zdssrc'];
    let totalLeg = mergeArray(totalText, totalLegName);
    let sumTotalText = [{text: '重点手术人数', sum: '总数量'}, {text: '手术人次', sum: '总'}];
    let totalSum = getKindSum(totalLeg, sumTotalText, times, data);
    totalLeg = mergeArray(totalSum, totalLegName);
    let totalSpec = [
      {type: 'line', text: totalSum[1]},
    ];
    let totalSeries = getSeries(totalLeg, times, data, 'bar', totalSpec, 'yAxisIndex');
    let totalOption = {
      tooltip: tooltip,
      color: ['#59829E', '#FF8787', '#9DC4C9', '#F3C0AE', '#59829E', '#FF8787', '#9DC4C9', '#F3C0AE'],//图例颜色
      legend: [
        {
          x: 'center',
          itemHeight,
          itemWidth,
          data: totalSum,
        }],
      grid: {
        bottom: '3%',
        top: '22%',
        right: 10,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '总数量',
          min: 0,
          minInterval: 1,
        },
        {
          type: 'value',
          scale: true,
          name: '数量占比',
          min: 0,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: totalSeries
    };

//重点疾病
    let avgText = ['重点疾病'];
    let avgLegName = ['zdjbrs'];
    let avgLeg = mergeArray(avgText, avgLegName);
    let avgSeries = getPieSeries(avgLeg, times, data);
    let avgOption = {
      title: {
        text: '重点疾病',
        x: 'center',
      },
      grid: {
        bottom: '3%',
        top: '22%',
        left: 0,
        right: 0,
        containLabel: true
      },
      series: [
        {
          name: '重点疾病',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: avgSeries,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
//患者病种详情
    let diseaseText = ['传染病患者人数', '单病种人数', '传染病上报人数', '传染病未上报人数', '传染病上报率'];
    let diseaseLegName = ['crbhzrs', 'dbzrs', 'crbsb', 'crbwsbrs', 'crbsbl'];
    let diseaseLeg = mergeArray(diseaseText, diseaseLegName);
    let sumDiseaseText = [{text: '传染病患者人数', sum: '总'}, {text: '单病种人数', sum: '总'}, {
      text: '传染病上报人数',
      sum: '总'
    }, {text: '传染病未上报人数', sum: '总'}, {text: '传染病上报率', sum: '总'}];
    let diseaseSum = getKindSum(diseaseLeg, sumDiseaseText, times, data);
    diseaseLeg = mergeArray(diseaseSum, diseaseLegName);
    let diseaseSpec = [
      {text: diseaseSum[4], type: 'bar'},
    ];
    let diseaseSeries = getDSeries(diseaseLeg, times, data, 'bar', diseaseSpec, 'yAxisIndex');
    let diseaseOption = {
      tooltip: axisTooltip,
      color: ['#FF8787', '#59829E', '#7DAAAF', '#A86565', '#9DC4C9'],//图例颜色
      legend: {
        data: diseaseSum,
        itemWidth, itemHeight
      },
      grid: {
        bottom: '3%',
        top: '28%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times
        },
      ],
      yAxis: [{
        type: 'value',
        scale: true,
        name: '人数',
        min: 0,
        minInterval: 1,
      },
        {
          type: 'value',
          scale: true,
          name: '百分比',
          min: 0,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: diseaseSeries
    };
//产科生产、剖宫产人次
    let obstetricsText = ['生产人次', '剖宫产人次'];
    let obstetricsLegName = ['ckscrs', 'pgcrs'];
    let obstetricsLeg = mergeArray(obstetricsText, obstetricsLegName);
    let sumDbstetricsText = [{text: '生产人次', sum: '总和'}, {text: '剖宫产人次', sum: '总和'}];
    let obstetricSum = getKindSum(obstetricsLeg, sumDbstetricsText, times, data);
    obstetricsLeg = mergeArray(obstetricSum, obstetricsLegName);
    let obstetricsSeries = getSeries(obstetricsLeg, times, data, 'bar');
    let obstetricsOption = {
      tooltip: tooltip,
      color: ['#7DAAAF', '#FF8787'],//图例颜色
      legend: {
        itemHeight,
        itemWidth,
        data: obstetricSum
      },
      grid: {
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '金额/万',
          min: 0,
        },
      ],
      series: obstetricsSeries
    };

//手术患者择期/平均住院日
    let shzqText = ['择期', '急诊', '急救', '科内'];
    let shzqLegName = ['sszqpjzyr', 'ssjzpjzyr', 'ssjjpjzyr', 'ssknpjzyr'];
    let shzqLeg = mergeArray(shzqText, shzqLegName);
    let shzqSeries = getDSeries(shzqLeg, times, data, 'bar');
    let shzqOption = {
      tooltip: axisTooltip,
      legend: {data: shzqText, itemWidth, itemHeight},
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '22%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '天数',
          min: 0,
          minInterval: 1,
        },
      ],
      series: shzqSeries
    };
//抗生素微生物人数
    let kswswText = ['人数'];
    let kswswLegName = ['ksswswrs'];
    let kswswLeg = mergeArray(kswswText, kswswLegName);
    let sumKswswText = [{text: '人数', sum: '12月总和'}];
    let kswswSum = getKindSum(kswswLeg, sumKswswText, times, data);
    kswswLeg = mergeArray(kswswSum, kswswLegName);
    let kswswSeries = getSeries(kswswLeg, times, data, 'bar');
    let kswswOption = {
      tooltip: tooltip,
      color: ['#7DAAAF'],
      legend: {data: kswswSum, itemHeight, itemWidth},
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '22%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '人数',
          min: 0,
          minInterval: 1,
        },
      ],
      series: kswswSeries
    };
//限制抗菌药物
    let limitText = ['使用限制抗菌药物住院患者人数', '签微生物检验样本送检率'];
    let limitLegName = ['xzkjywzlrs', 'qwswjybbssjl'];
    let limitLeg = mergeArray(limitText, limitLegName);
    let limitSumArr = [{text: '使用限制抗菌药物住院患者人数', sum: '总'}];
    let limitSum = getKindSum(limitLeg, limitSumArr, times, data);
    limitLeg = mergeArray(limitSum, limitLegName);
    let limitSpec = [
      {type: 'line', text: '签微生物检验样本送检率'},
    ];
    let limitSeries = getSeries(limitLeg, times, data, 'bar', limitSpec, 'yAxisIndex');
    let limitOption = {
      tooltip: tooltip,
      color: ['#59829E', '#FF8787'],//图例颜色
      legend: [
        {
          x: 'center',
          data: limitSum,
          itemWidth, itemHeight
        }],
      grid: {
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '人数',
          minInterval: 1,
          min: 0,
        },
        {
          type: 'value',
          scale: true,
          name: '百分数',
          min: 0,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: limitSeries
    };
//特殊抗菌药物
    let specialText = ['特殊抗菌药物住院患者人数', '前微生物检验样本送检率'];
    let specialLegName = ['sytskjywzlrs', 'qwswjybbssjl'];
    let specialLeg = mergeArray(specialText, specialLegName);
    let specialSumArr = [{text: '特殊抗菌药物住院患者人数', sum: '总'}];
    let specialSum = getKindSum(specialLeg, specialSumArr, times, data);
    specialLeg = mergeArray(specialSum, specialLegName);
    let specialSpec = [
      {type: 'line', text: '前微生物检验样本送检率'},
    ];
    let specialSeries = getSeries(specialLeg, times, data, 'bar', specialSpec, 'yAxisIndex');
    let specialOption = {
      tooltip: tooltip,
      color: ['#59829E', '#FF8787'],//图例颜色
      legend: [
        {
          x: 'center',
          data: specialSum,
          itemHeight, itemWidth
        }],
      grid: {
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '人数',
          min: 0,
          minInterval: 1,
        },
        {
          type: 'value',
          scale: true,
          name: '百分数',
          min: 0,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: specialSeries
    };
//抗菌药物资料
    let materialText = ['抗菌药物资料住院患者人数', '使用前微生物检验样本送检率'];
    let materialLegName = ['kjywzryr', 'syqwswjyybsjl'];
    let materialLeg = mergeArray(materialText, materialLegName);
    let materialSumArr = [{text: '抗菌药物资料住院患者人数', sum: '总'}];
    let materialSum = getKindSum(materialLeg, materialSumArr, times, data);
    materialLeg = mergeArray(materialSum, materialLegName);
    let materialSpec = [
      {type: 'line', text: '使用前微生物检验样本送检率'},
    ];
    let materialSeries = getSeries(materialLeg, times, data, 'bar', materialSpec, 'yAxisIndex');
    let materialOption = {
      tooltip: tooltip,
      color: ['#59829E', '#FF8787'],//图例颜色
      legend: [
        {
          x: 'center',
          data: materialSum,
          itemWidth, itemHeight
        }],
      grid: {
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: times
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '人数',
          min: 0,
          minInterval: 1,
        },
        {
          type: 'value',
          scale: true,
          name: '百分数',
          min: 0,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: materialSeries
    };


    this.setState({
      show: true,
      times,
      patNumOption: patNumOption,
      bedUseOption: bedUseOption,
      zdrsurOption: totalOption,
      zdjbOption: avgOption,
      diseaseOption: diseaseOption,
      obstetricsOption: obstetricsOption,
      shzqOption: shzqOption,
      kswswOption: kswswOption,
      limitOption: limitOption,
      specialOption: specialOption,
      materialOption: materialOption,
    });
  };

  getHosName = (val, key) => {
    this.setState({
      [key]: val
    })
  };
  /**
   * 改变值，清空torowData
   * @param val
   * @param key
   */
  changeValue = (val, key) => {
    this.setState({
      [key]: val,
      toRowData: [],
      rowData: [],
      isDetail: false,
    })
  };

  render() {
    let {
      loading,
      toColumnDefs, toRowData, patNumOption, patNumColumnDefs, patNum, bedUseOption, bedUse, bedUseColumnDefs,
      zdrsurOption, zdjbOption, diseaseOption, disease, diseaseColumnDefs, obstetricsOption, obstetrics, obstetricsColumnDefs,
      shzqOption, shzq, shzqColumnDefs, kswswOption, kswsw, kswswColumnDefs, limitOption, limit, limitColumnDefs,
      specialOption, special, specialColumnDefs, materialOption, material, materialColumnDefs,
      rowData, agTable, show, big, bigColumnDefs
    } = this.state;
    let {patNumLoading, bedUseLoading, bigLoading, diseaseLoading, obstetricsLoading, shzqLoading, kswswLoading, limitLoading, specialLoading, materialLoading} = this.state;
    return (<div className={css.outPrescriptions}>
      <Spin spinning={loading}>
        <Search renderCanvas={this.renderCanvas} selData={this.selData} getHosName={this.getHosName}
                changeValue={this.changeValue}/>
        {agTable ? <div className={`${css.agTable}`}>
          <AgGridReact
            columnDefs={toColumnDefs}
            rowData={toRowData}
            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
            rowClass={css.row}
            enableColResize={true}//能否改变列宽
            onCellClicked={this.rowClick}//行点击
            headerHeight={28}//标题高
            rowHeight={28}//行高
            rowSelection='single'//单行选择
            suppressCellSelection={false}//是否启用键盘导航
            singleClickEdit={true}//单击启用编辑模式
            stopEditingWhenGridLosesFocus={true}//网格失去焦点时停止单元格编辑
            animateRows={true}//行动画
            onGridReady={this.onGridReady}//基础api
            suppressScrollOnNewData={true}//获取新数据不会滚动到顶部
            ref="agGridReact"
          >
          </AgGridReact>
        </div> : <div className={css.rowContent}><Row gutter={12}>
          <Col className={`gutter-row ${css.padding0}`} span={12}>
            <Card title="病情人数统计" option={patNumOption} id="patNum" row={rowData} show={show} loading={patNumLoading}
                  column={patNumColumnDefs} isAg={patNum} toggleChart={this.toggleChart.bind(this, 'patNum')}/>
          </Col>
          <Col className={`gutter-row`} span={12}>
            <Card title="床位使用情况" option={bedUseOption} id="outNum" row={rowData} show={show} loading={bedUseLoading}
                  column={bedUseColumnDefs} isAg={bedUse} toggleChart={this.toggleChart.bind(this, 'bedUse')}/>
          </Col>
          <Col className={`gutter-row ${css.padding0}`} span={24}>
            <BigCard title="重点疾病、手术人数、手术人次" bigId="big" big={big} bigColumnDefs={bigColumnDefs}
                     toggleChart={this.toggleChart} loading={bigLoading}
                     rowData={rowData} show={show} leftId="zdrsur" leftOption={zdrsurOption} rightId="zdjb"
                     rightOption={zdjbOption}/>
          </Col>
          <Col className={`gutter-row ${css.padding0}`} span={12}>
            <Card title="患者病种详情统计" option={diseaseOption} id="disease" row={rowData} show={show}
                  column={diseaseColumnDefs} loading={diseaseLoading}
                  isAg={disease} toggleChart={this.toggleChart.bind(this, 'disease')}/>

          </Col>
          <Col className={`gutter-row`} span={12}>
            <Card title="产科生产、剖宫产人次" option={obstetricsOption} id="obstetrics" row={rowData} show={show}
                  column={obstetricsColumnDefs} loading={obstetricsLoading}
                  isAg={obstetrics} toggleChart={this.toggleChart.bind(this, 'obstetrics')}/>

          </Col>
          <Col className={`gutter-row ${css.padding0}`} span={12}>
            <Card title="手术患者择期/平均住院日" option={shzqOption} id="shzq" row={rowData} show={show}
                  column={shzqColumnDefs} isAg={shzq} loading={shzqLoading}
                  toggleChart={this.toggleChart.bind(this, 'shzq')}/>
          </Col>
          <Col className={`gutter-row`} span={12}>
            <Card title="抗生素微生物人数" option={kswswOption} id="kswsw" row={rowData} show={show}
                  column={kswswColumnDefs} isAg={kswsw} loading={kswswLoading}
                  toggleChart={this.toggleChart.bind(this, 'kswsw')}/>
          </Col>
          <Col className={`gutter-row ${css.padding0}`} span={12}>
            <Card title="限制抗菌药物" option={limitOption} id="limit" row={rowData} show={show}
                  column={limitColumnDefs} isAg={limit} loading={limitLoading}
                  toggleChart={this.toggleChart.bind(this, 'limit')}/>
          </Col>
          <Col className={`gutter-row`} span={12}>
            <Card title="特殊抗菌药物" option={specialOption} id="special" row={rowData} show={show}
                  column={specialColumnDefs} isAg={special} loading={specialLoading}
                  toggleChart={this.toggleChart.bind(this, 'special')}/>
          </Col>
          <Col className={`gutter-row${css.padding0} ${css.marginBottom}`} span={12}>
            <Card title="抗菌药物资料" option={materialOption} id="material" row={rowData} show={show}
                  column={materialColumnDefs} isAg={material} loading={materialLoading}
                  toggleChart={this.toggleChart.bind(this, 'material')}/>
          </Col>
        </Row></div>}</Spin>
    </div>)
  }
}
 
 
 