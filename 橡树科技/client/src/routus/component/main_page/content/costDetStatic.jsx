/**
 * description:费用明细汇总
 * author: mou
 * time:2017-11-14
 */
import React from 'react'
import {Row, Col, Spin, Button} from 'antd';
import {Card} from './../component/card';                //引入卡片
import {BigCard} from './../component/bigCard';                //引入卡片
import MyHeaderComponent from './../component/myHeaderComponent'//ag 筛选排序
import {AgGridReact} from "ag-grid-react"; //引入AG表格
import {Search} from './../component/header'
import css from '../../../less/main/content/outPrescriptions.scss'
import api from './../api';
import com from './../content/deanQueryCom'

export class CostDetStatic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalColumnDefs: [],
      toRowData: [],
      bigOption: {series: []}, //总费用，总费用环比
      bigColumnDefs: [],
      big: true,
      bigLoading: false,
      avgOption: {series: []},//平均费用
      difCostDetColumnDefs: [],
      difCostDet: true,
      difCostDetLoading: false,
      difCostDetOption: {series: []},//各费用明细
      kindsColumnDefs: [],
      kinds: true,
      kindsLoading: false,
      kindsOption: {series: []},//各药物种类明细
      iClassColumnDefs: [],
      iClass: true,
      iClassLoading: false,
      iClassOption: {series: []},//I类
      antiColumnDefs: [],
      anti: true,
      antiLoading: false,
      antiOption: {series: []},//抗菌
      bigTwoColumnDefs: [],
      bigTwo: true,
      bigTwoLoading: false,
      bigTwoOption: {series: []},//总人数、人均药费
      bigTwoAvgOption: {series: []},//人均药费占比
      antibioticOption: {series: []},
      antibiotic: true,
      antibioticLoading: false,
      antibioticColumnDefs: [],//抗生素
      insOption: {series: []},
      ins: true,
      insLoading: false,
      insColumnDefs: [],//医保比例
      rowData: [],//行
      show: false,
      cheNum: 0,
      hosName: [],  //医院名称
      deptName: [],
      selHos: null,    //选中的医院
      timeFrom: null,
      timeTo: null,
      timeType: null,
      inOut: null,//全部、在院、出院
      settle: null,//发生金额、结算金额
      times: [], //时间
      loading: false,
      isDetail: false,
      type: 'cost',//判断是否有全部、发生金额等按钮
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

  //查询数据
  selData = (selHospitalsNo, type, timeFrom, timeTo, dataType, bigOrSmall, inOut, settle) => {
    const {selRest} = api;
    const {judgeOneOrMore, getTimes} = com;
    this.setState({
      selHos: selHospitalsNo,
      timeFrom: timeFrom,
      timeTo: timeTo,
      timeType: type,
      inOut: inOut,
      settle: settle,
      [bigOrSmall]: true,
    });
    let dataPack = {
      message: {
        hospitalCode: selHospitalsNo,
        timeFrom: timeFrom,
        timeTo: timeTo,
        timeType: type,
        inOut: inOut,
        settle: settle,
      }
    };
    dataPack.action = judgeOneOrMore(selHospitalsNo, 'demo.住费(明细).单', 'demo.住费(明细).多', 'demo.住费(汇总).单与多', dataType);
    selRest(dataPack, rest => {
      if (rest.success) {
        const data = rest.data;
        if (dataType === "detail") {
          this.setState({
            times: getTimes(data),
            agTable: !this.state.agTable,
            rowData: data,
            toRowData: data,
            isDetail: true,
          }, () => {
            this.setState({
              toColumnDefs: this.createToColDefs(),//创建
            })
          });
          /*      this.setState({
           times: getTimes(data)
           }, () => {
           this.setState({
           toColumnDefs: this.createToColDefs(),//创建
           toRowData: data,
           isDetail: true,
           }, () => {
           this.setState({
           agTable: !this.state.agTable,
           })
           })
           })*/
        } else {
          this.setState({
            agTable: false,
            big: true,
            difCostDet: true,
            kinds: true,
            iClass: true,
            anti: true,
            bigTwo: true,
            antibiotic: true,
            ins: true,
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
  /**
   * 小的表格查询详细数据
   * @param one
   */
  selSmallDetail = (one) => {
    const {selHos, timeType, timeFrom, timeTo, inOut, settle} = this.state;
    const {judgeOneOrMore, getTimes} = com;
    const param = {
      message: {
        hospitalCode: selHos,
        timeFrom: timeFrom,
        timeTo: timeTo,
        timeType: timeType,
        inOut: inOut,
        settle: settle,
      }
    };
    param.action = judgeOneOrMore(selHos, 'demo.住费(明细).单', 'demo.住费(明细).多', 'demo.住费(汇总).单与多', 'detail');
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
  //大表创建列规则
  createToColDefs = () => {
    let {toRowData, cheNum, times, hosName, selHos, deptName, timeType} = this.state;
    const {setColumnsCom, setDifId} = com;
    let bigColumns = setColumnsCom(selHos, hosName, deptName, times, timeType, toRowData, cheNum);
    bigColumns = setDifId(bigColumns, 'bigTable');
    bigColumns.push(
      {
        headerName: "总费用、平均费用",
        field: "reTotal",
        marryChildren: true,
        children: [
          {
            headerName: "金额",
            field: "zfy",
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
          /* {
           headerName: "总费用环比",
           field: "zfyyhb",
           headerComponent: MyHeaderComponent,
           width: 100,
           headerClass: 'cellTd zfy',
           headerComponentParams: {
           enableFilter: true,
           enableSorting: true,
           suppressMenuHide: true,
           enableMenu: false,
           menuIcon: 'fa-bars',
           }
           },*/ {
            headerName: "平均费用",
            field: "pjfy",
            headerComponent: MyHeaderComponent,
            width: 100,
            headerClass: 'cellTd pjf',
            headerComponentParams: {
              enableFilter: true,
              enableSorting: true,
              suppressMenuHide: true,
              enableMenu: false,
              menuIcon: 'fa-bars',
            }
          },

        ]
      },
      {
        headerName: "各费用明细",
        field: "cosDetail",
        marryChildren: true,
        children: [
          {
            headerName: "检验费用",
            field: "jyfy",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "治疗费用",
            field: "zlfy",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "手术费用",
            field: "ssfy",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "材料费用",
            field: "clfy",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "每百元材料费用支出",
            field: "byclfzc",
            width: 120,
            headerClass: 'cellTd',
          }, {
            headerName: "药费",
            field: "ys",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "药占比",
            field: "yzb",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      {
        headerName: "各药物种类明细",
        field: "medKindDetail",
        marryChildren: true,
        children: [
          {
            headerName: "中药费用",
            field: "zyfy",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "西药费用",
            field: "xyfy",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "抗生素费用",
            field: "kssfy",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "重庆基药费用",
            field: "cqjyfy",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "国家基药费用",
            field: "gjjyfy",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "抗生素占比",
            field: "ksszb",
            width: 100,
            headerClass: 'cellTd',
          }, {
            headerName: "国家基药占比",
            field: "gjjyzb",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      /* {
       headerName: "I类切口手术患者预防使用抗菌药物比例",
       field: "kjywzb",
       width: 220,
       headerClass: 'cellTd',
       },*/
      {
        headerName: "抗生素抗菌药物费用",
        field: "ksskjywfy",
        width: 120,
        headerClass: 'cellTd',
      },
      {
        headerName: "总人数、人均药费",
        field: "numAndCost",
        marryChildren: true,
        children: [
          {
            headerName: "人数",
            field: "zrs",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "人均药费",
            field: "rjyf",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      {
        headerName: "人均药费占比",
        field: "rjyfzb",
        width: 100,
        headerClass: 'cellTd',
      },
      {
        headerName: "抗生素",
        field: "kss",
        marryChildren: true,
        children: [
          {
            headerName: "数量",
            field: "ksskjywsl",
            width: 100,
            headerClass: 'cellTd',
          },
          {
            headerName: "费用比例",
            field: "ksskjywfybl",
            width: 100,
            headerClass: 'cellTd',
          },
        ]
      },
      /* {
       headerName: "医保比例",
       field: "ybbl",
       width: 100,
       headerClass: 'cellTd',
       },*/
    );
    return bigColumns;
  };
  //小表格创建列规则
  createColDefs = (type) => {
    const {mergeArray, setDifId, setColumnsCom, backArr} = com;
    let {rowData, cheNum, times, selHos, hosName, deptName, timeType} = this.state;
    let arr = setColumnsCom(selHos, hosName, deptName, times, timeType, rowData, cheNum);
    switch (type) {
      case 'big':
        let outPreText = ['总费用', /* '总费用环比',*/ '平均费用'];
        let outPreLegName = ['zfy', /*'zfyyhb',*/ 'pjfy'];
        let outPreLeg = mergeArray(outPreText, outPreLegName);
        return backArr(setDifId(arr, 'big'), outPreLeg);
        break;
      case 'difCostDet':
        let difCostDetText = ['检验费用', '治疗费用', '手术费用', '材料费用', '每百元材料费用支出', '药费', '药占比'];
        let difCostDetLegName = ['jyfy', 'zlfy', 'ssfy', 'clfy', 'byclfzc', 'ys', 'yzb'];
        let difCostDetLeg = mergeArray(difCostDetText, difCostDetLegName);
        return backArr(setDifId(arr, 'difCostDet'), difCostDetLeg);
        break;
      case 'kinds':
        let kindsDetText = ['中药费用', '西药费用', '抗生素费用', '重庆基药费用', '国家基药费用', '抗生素占比', '国家基药占比'];
        let kindsDetLegName = ['zyfy', 'xyfy', 'kssfy', 'cqjyfy', 'gjjyfy', 'ksszb', 'gjjyzb'];
        let kindsLeg = mergeArray(kindsDetText, kindsDetLegName);
        return backArr(setDifId(arr, 'chi'), kindsLeg);
        break;
      case 'iClass':
        let iClassText = ['i类切口手术患者预防使用抗菌药物比例'];
        let iClassLegName = ['kjywzb'];
        let iClassLeg = mergeArray(iClassText, iClassLegName);
        return backArr(setDifId(arr, 'iClass'), iClassLeg);
        break;
      case 'anti':
        let antiText = ['抗生素抗菌药物费用'];
        let antiLegName = ['ksskjywfy'];
        let antiLeg = mergeArray(antiText, antiLegName);
        return backArr(setDifId(arr, 'anti'), antiLeg);
        break;
      case 'bigTwo':
        let bigTwoText = ['总人数', '人均药费', '人均药费占比'];
        let bigTwoLegName = ['zrs', 'rjyf', 'rjyfzb'];
        let bigTwoLeg = mergeArray(bigTwoText, bigTwoLegName);
        return backArr(setDifId(arr, 'bigTwo'), bigTwoLeg);
        break;
      case 'antibiotic':
        let antibioticText = ['数量', '费用比例'];
        let antibioticLegName = ['ksskjywsl', 'ksskjywfybl'];
        let antibioticLeg = mergeArray(antibioticText, antibioticLegName);
        return backArr(setDifId(arr, 'antibiotic'), antibioticLeg);
        break;
      case 'ins':
        let ybText = ['医保比例'];
        let ybLegName = ['ybbl'];
        let ybLeg = mergeArray(ybText, ybLegName);
        return backArr(setDifId(arr, 'ins'), ybLeg);
        break;
    }
  };
  //点击切换图表(小）
  toggleChart = (type) => {
    let {isDetail, selHos, timeType, timeFrom, timeTo} = this.state;
    const {selBeforeCheck} = com;
    if (!selBeforeCheck(selHos, timeType, timeFrom, timeTo)) return false;
    switch (type) {
      case 'big':
        if (!isDetail) {
          this.selSmallDetail('big');
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
      case 'difCostDet':
        if (!isDetail) {
          this.selSmallDetail('difCostDet')
        } else {
          this.setState({
            difCostDet: !this.state.difCostDet,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              difCostDetColumnDefs: this.createColDefs('difCostDet'),
              [type + 'Loading']: false
            });
          });
        }
        break;
      case 'kinds':
        if (!isDetail) {
          this.selSmallDetail('kinds')
        } else {
          this.setState({
            kinds: !this.state.kinds,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              kindsColumnDefs: this.createColDefs('kinds'),
              [type + 'Loading']: false
            })
          });
        }

        break;
      case 'iClass':
        if (!isDetail) {
          this.selSmallDetail('iClass')
        } else {
          this.setState({
            iClass: !this.state.iClass,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              iClassColumnDefs: this.createColDefs('iClass'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'anti':
        if (!isDetail) {
          this.selSmallDetail('anti')
        } else {
          this.setState({
            anti: !this.state.anti,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              antiColumnDefs: this.createColDefs('anti'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'bigTwo':
        if (!isDetail) {
          this.selSmallDetail('bigTwo')
        } else {
          this.setState({
            bigTwo: !this.state.bigTwo,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              bigTwoColumnDefs: this.createColDefs('bigTwo'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'antibiotic':
        if (!isDetail) {
          this.selSmallDetail('antibiotic')
        } else {
          this.setState({
            antibiotic: !this.state.antibiotic,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              antibioticColumnDefs: this.createColDefs('antibiotic'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'ins':
        if (!isDetail) {
          this.selSmallDetail('ins')
        } else {
          this.setState({
            ins: !this.state.ins,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              insColumnDefs: this.createColDefs('ins'),
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
    const {tooltip, path, itemHeight, itemWidth, axisTooltip, getPieSeries} = com;
    let times = getTimes(data);
//总费用、总费用环比、平均费用
    let staticText = ['金额', /*'总费用环比'*/];
    let staticLegName = ['zfy', /*'zfyyhb'*/];
    let staticLeg = mergeArray(staticText, staticLegName);
    let staticArr = [{text: '金额', sum: '总'}];
    let staticSum = getKindSum(staticLeg, staticArr, times, data);
    staticLeg = mergeArray(staticSum, staticLegName);
    let staticSpec = [
      {type: 'line', text: '总费用环比'}];
    /* let staticSeries = getSeries(staticLeg, times, data, 'bar', staticSpec, 'yAxisIndex');*/
    let staticSeries = getSeries(staticLeg, times, data, 'bar');
    let staticOption = {
      tooltip: tooltip,
      color: ['#3C9AE4', /* '#FF8787'*/],//图例颜色
      legend: [
        {
          data: staticSum,
          itemHeight, itemWidth
        }],
      grid: {
        bottom: '3%',
        top: '22%',
        left: 0,
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
          name: '金额/万',
          min: 0,
        },
        /* {
         type: 'value',
         scale: true,
         name: '环比百分数',
         min: 'dataMin',
         axisLabel: {
         formatter: '{value} %'
         }
         },*/
      ],
      series: staticSeries
    };
    let avgText = ['平均费用'];
    let avgLegName = ['pjfy'];
    let avgLeg = mergeArray(avgText, avgLegName);
    //分类—》时间—》数据
    let avgSeries = getPieSeries(avgLeg, times, data);
    let avgOption = {
      title: {
        text: '平均费用',
        x: 'center'
      },
      grid: {
        bottom: '3%',
        top: '22%',
        left: 0,
        right: 10,
        containLabel: true
      },
      legend: {
        orient: 'vertical',
        top: '22%',
        right: 10,
        data: times
      },
      series: [
        {
          name: '平均费用',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: true,
              formatter: function (params) {
                return params.name + params.seriesName + params.value
              },
            }
          },
          data: avgSeries
        }
      ]
    };
//各费用明细
    let difCostDetText = ['检验费用', '治疗费用', '手术费用', '材料费用', '每百元材料费用支出', '药费', '药占比'];
    let difCostDetLegName = ['jyfy', 'zlfy', 'ssfy', 'clfy', 'byclfzc', 'ys', 'yzb'];
    let difCostDetLeg = mergeArray(difCostDetText, difCostDetLegName);
    let difCostDetSpec = [
      {type: 'bar', text: '药占比'},
    ];
    let difCostDetSeries = getDSeries(difCostDetLeg, times, data, 'bar', difCostDetSpec, 'yAxisIndex');
    let difCostDetOption = {
      tooltip: axisTooltip,
      color: ['#7B6881', '#59829E', '#FF8787', '#FFCC19', '#A86565', '#7DAAAF', '#9DC4C9'],//图例颜色
      legend: [
        {
          itemHeight, itemWidth,
          data: [difCostDetText[0], difCostDetText[1], difCostDetText[2], difCostDetText[3]],
        },
        {
          top: '6%',
          itemHeight, itemWidth,
          data: [difCostDetText[4], difCostDetText[5], difCostDetText[6]],
        }],
      grid: {
        bottom: '3%',
        top: '22%',
        left: 0,
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
          name: '金额/万',
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
      series: difCostDetSeries
    };
//各药物种类明细
    let kindsDetText = ['中药费用', '西药费用', '抗生素费用', '重庆基药费用', '国家基药费用', '抗生素占比', '国家基药占比'];
    let kindsDetLegName = ['zyfy', 'xyfy', 'kssfy', 'cqjyfy', 'gjjyfy', 'ksszb', 'gjjyzb'];
    let kindsDetLeg = mergeArray(kindsDetText, kindsDetLegName);
    let kindsDetSpec = [
      {type: 'bar', text: '抗生素占比'},
      {type: 'bar', text: '国家基药占比'},
    ];
    let kindsDetSeries = getDSeries(kindsDetLeg, times, data, 'bar', kindsDetSpec, 'yAxisIndex');
    let kindsDetOption = {
      tooltip: axisTooltip,
      color: ['#A86565', '#3C9AE4', '#7DAAAF', '#2E8D87', '#FF8787', '#9DC4C9', '#F3C0AE'],//图例颜色
      legend: [
        {
          data: kindsDetText,
          itemWidth, itemHeight
        }],
      grid: {
        bottom: '3%',
        top: '22%',
        left: 0,
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
          name: '金额/万',
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
      series: kindsDetSeries
    };

//I类
    let iClassText = ['I类切口手术患者预防使用抗菌药物比例'];
    let iClassLegName = ['kjywzb'];
    let iClassLeg = mergeArray(iClassText, iClassLegName);
    //分类—》时间—》数据
    let iClassSeries = getPieSeries(iClassLeg, times, data);
    let iClassOption = {
      grid: {
        bottom: '3%',
        top: '22%',
        left: 0,
        right: 10,
        containLabel: true
      },
      legend: {
        orient: 'vertical',
        top: '22%',
        right: 10,
        data: times
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,

            },
            emphasis: {
              show: true,
              formatter: function (params) {
                return params.name + ':' + params.value
              },
            }
          },
          data: iClassSeries
        }
      ]
    };
//抗生素、抗菌类药物
    let antiText = ['抗生素抗菌药物费用'];
    let antiLegName = ['ksskjywfy'];
    let antiLeg = mergeArray(antiText, antiLegName);
    let sumAntiText = [{text: '抗生素抗菌药物费用', sum: '总'}];
    let antiSum = getKindSum(antiLeg, sumAntiText, times, data);
    antiLeg = mergeArray(antiSum, antiLegName);
    let antiSeries = getSeries(antiLeg, times, data, 'bar', '', '', 'show');
    let antiOption = {
      tooltip: tooltip,
      color: ['#7DAAAF'],//图例颜色
      legend: [
        {
          data: antiSum,
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
          name: '金额',
          min: 0,
        },
      ],
      series: antiSeries
    };
//总人数、人均药费
    let bigTwoText = ['人数', '人均药费'];
    let bigTwoLegName = ['zrs', 'rjyf'];
    let bigTwoLeg = mergeArray(bigTwoText, bigTwoLegName);
    let bigTwoArr = [{text: '人数', sum: '总'}];
    let bigTwoSum = getKindSum(bigTwoLeg, bigTwoArr, times, data);
    bigTwoLeg = mergeArray(bigTwoSum, bigTwoLegName);
    let bigTwoSpec = [
      {type: 'line', text: '人均药费'}
    ];
    let bigTwoSeries = getSeries(bigTwoLeg, times, data, 'bar', bigTwoSpec, 'yAxisIndex');
    let bigTwoOption = {
      tooltip: tooltip,
      color: ['#FF8787', '#BE6868'],//图例颜色
      legend: [
        {
          data: bigTwoSum,
          itemWidth,
          itemHeight
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
        }, {
          type: 'value',
          scale: true,
          name: '金额',
          min: 0,
        },
      ],
      series: bigTwoSeries
    };
//人均药费占比
    let bigTwoAvgText = ['人均药费占比'];
    let bigTwoAvgLegName = ['rjyfzb'];
    let bigTwoAvgLeg = mergeArray(bigTwoAvgText, bigTwoAvgLegName);
    //分类—》时间—》数据
    let bigTwoAvgSeries = getPieSeries(bigTwoAvgLeg, times, data);
    let bigTwoAvgOption = {
      title: {
        text: '人均药费占比',
        x: 'center',
      },
      calculable: true,
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return params.name + ':' + params.value
              },
            },
          },
          data: bigTwoAvgSeries
        }
      ]
    };

//抗生素
    let antibioticText = ['数量', '费用比例'];
    let antibioticLegName = ['ksskjywsl', 'ksskjywfybl'];
    let antibioticLeg = mergeArray(antibioticText, antibioticLegName);
    let antibioticSpec = [
      {type: 'line', text: '费用比例'}
    ];
    let antibioticSeries = getSeries(antibioticLeg, times, data, 'bar', antibioticSpec, 'yAxisIndex');
    let antibioticOption = {
      tooltip: tooltip,
      color: ['#59829E', '#BE6868'],//图例颜色
      legend: [
        {
          itemHeight, itemWidth,
          data: antibioticText,
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
          name: '数量',
          min: 0,
          minInterval: 1,
        }, {
          type: 'value',
          scale: true,
          name: '百分比',
          min: 0,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: antibioticSeries
    };
//医保
    let insText = ['医保比例'];
    let insLegName = ['ybbl'];
    let insLeg = mergeArray(insText, insLegName);
    let insSeries = getSeries(insLeg, times, data, 'line');
    let insOption = {
      tooltip: tooltip,
      color: ['#2E8D87'],//图例颜色
      legend: [
        {
          data: insText,
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
          name: '百分比',
          min: 0,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: insSeries
    };
    this.setState({
      show: true,
      times,
      bigOption: staticOption,
      avgOption: avgOption,
      difCostDetOption: difCostDetOption,
      kindsOption: kindsDetOption,
      iClassOption: iClassOption,
      antiOption: antiOption,
      bigTwoOption: bigTwoOption,
      bigTwoAvgOption: bigTwoAvgOption,
      antibioticOption: antibioticOption,
      insOption: insOption,
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
      toColumnDefs, toRowData, bigOption, bigColumnDefs, big, avgOption, difCostDetOption, difCostDetColumnDefs, difCostDet,
      kindsOption, kinds, kindsColumnDefs, iClassOption, iClass, iClassColumnDefs, antiOption, anti, antiColumnDefs,
      bigTwoOption, bigTwoAvgOption, bigTwo, bigTwoColumnDefs, antibioticOption, antibiotic, antibioticColumnDefs,
      insOption, ins, insColumnDefs, rowData, agTable, show
    } = this.state;
    let {bigLoading, difCostDetLoading, kindsLoading, iClassLoading, antiLoading, bigTwoLoading, antibioticLoading, insLoading} = this.state;
    return (<div className={css.outPrescriptions}>
      <Spin spinning={loading}>
        <Search renderCanvas={this.renderCanvas} selData={this.selData} type={this.state.type}
                getHosName={this.getHosName} changeValue={this.changeValue}/>
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
          <Col className={`utter-row ${css.padding0}`} span={24}>
            <BigCard title="总费用、平均费用" bigId="big" toggleChart={this.toggleChart} big={big}
                     bigColumnDefs={bigColumnDefs} rowData={rowData} show={show} leftId="static"
                     leftOption={bigOption} loading={bigLoading}
                     rightId="avg" rightOption={avgOption}/>
          </Col>
          <Col className={`utter-row ${css.padding0}`} span={12}>
            <Card title="各费用明细" option={difCostDetOption} id="difCostDet" row={rowData} show={show}
                  column={difCostDetColumnDefs} loading={difCostDetLoading}
                  isAg={difCostDet} toggleChart={this.toggleChart.bind(this, 'difCostDet')}/>

          </Col>
          <Col className={`utter-row `} span={12}>
            <Card title="各药物种类明细" option={kindsOption} id="kinds" row={rowData} show={show}
                  column={kindsColumnDefs} loading={kindsLoading}
                  isAg={kinds} toggleChart={this.toggleChart.bind(this, 'kinds')}/>

          </Col>
          <Col className={`utter-row ${css.padding0}`} span={12}>
            {/*  <Card title="I类切口手术患者预防使用抗菌药物比例" option={iClassOption} id="iClass" row={rowData} show={show}
             column={iClassColumnDefs} isAg={iClass} loading={iClassLoading}
             toggleChart={this.toggleChart.bind(this, 'iClass')}/>*/}
            <Card title="抗生素药品费用比例数量" option={antibioticOption} id="antibiotic" row={rowData} show={show}
                  column={antibioticColumnDefs} isAg={antibiotic} loading={antibioticLoading}
                  toggleChart={this.toggleChart.bind(this, 'antibiotic')}/>
          </Col>
          <Col className={`utter-row `} span={12}>
            <Card title="抗生素抗菌药物费用" option={antiOption} id="anti" row={rowData} show={show}
                  column={antiColumnDefs} isAg={anti} loading={antiLoading}
                  toggleChart={this.toggleChart.bind(this, 'anti')}/>
          </Col>
          <Col className={`utter-row ${css.padding0} ${css.marginBottom}`} span={24}>
            <BigCard title="总人数、人均药费、人均药费占比" bigId="bigTwo" toggleChart={this.toggleChart} big={bigTwo}
                     bigColumnDefs={bigTwoColumnDefs} rowData={rowData} show={show} leftId="bigTwo"
                     leftOption={bigTwoOption} loading={bigTwoLoading}
                     rightId="bigTwoAvg" rightOption={bigTwoAvgOption}/>
          </Col>
          {/*  <Col className={`gutter-ro `}" span={12}>
           <Card title="抗生素药品费用比例数量" option={antibioticOption} id="antibiotic" row={rowData} show={show}
           column={antibioticColumnDefs} isAg={antibiotic} loading={antibioticLoading}
           toggleChart={this.toggleChart.bind(this, 'antibiotic')}/>
           </Col>
           <Col className={`gutter-ro `}" span={12}>
           <Card title="医保比例" option={insOption} id="ins" row={rowData} show={show}
           column={insColumnDefs} isAg={ins} loading={insLoading}
           toggleChart={this.toggleChart.bind(this, 'ins')}/>
           </Col>*/}
        </Row></div>}</Spin>
    </div>)
  }
}
 
 
 