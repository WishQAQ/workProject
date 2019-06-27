/**
 * description:门诊处方
 * author: mou
 * time:2017-11-10
 */
import React from 'react'
import {Row, Col, message, Spin} from 'antd';
import {Card} from './../component/card';                //引入卡片
import {BigCard} from './../component/bigCard';
import MyHeaderComponent from './../component/myHeaderComponent'//ag 筛选排序
import {AgGridReact} from "ag-grid-react"; //引入AG表格
import {Search} from './../component/header'
import css from '../../../less/main/content/outPrescriptions.scss'
import qs from "qs";
import api from './../api'
import com from './deanQueryCom'
export class OutpatientPrescriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalColumnDefs: [],
      toRowData: [],
      outPreOption: {series: []},//门诊处方总数
      outPreMonNumOption: {series: []},//门诊处方金额与张数
      avgOption: {series: []},//大处方
      totalOption: {series: []},//大处方
      antiOption: {series: []},//抗菌
      chiOption: {series: []},//中药
      antibioticOption: {series: []},//抗生素
      outPreColumnDefs: [],
      outPre: true,
      outPreLoading: false,
      outNumColumnDefs: [],
      outNum: true,
      outNumLoading: false,
      big: true,
      bigLoading: false,
      avg: true,
      avgLoading: false,
      chi: true,
      chiLoading: false,
      chiColumnDefs: [],
      antiColumnDefs: [],
      anti: true,
      antiLoading: false,
      antibiotic: true,
      antibioticLoading: false,
      antibioticColumnDefs: [],
      rowData: [],//行
      show: false,
      cheNum: com.cheNum,
      times: [],        //时间
      hosName: [],   //医院名称
      deptName: [],
      selHos: null,    //选中的医院
      timeFrom: null,
      timeTo: null,
      timeType: null,
      loading: false,
      isDetail: false,
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
    param.action = judgeOneOrMore(selHos, 'outpBill.singleDetail', 'outpBill.moreDetail', 'outpBill.all', 'detail');
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
        timeType: type
      },
    };
    dataPack.action = judgeOneOrMore(selHospitalsNo, 'outpBill.singleDetail', 'outpBill.moreDetail', 'outpBill.all', dataType);
    selRest(dataPack, rest => {
      if (rest.success) {
        const data = rest.data;
        let times = getTimes(data);
        if (dataType === 'detail') {
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
           toRowData: data,
           isDetail: true,
           toColumnDefs: this.createToColDefs(),//创建
           }, () => {
           this.setState({
           agTable: !this.state.agTable,
           })
           })
           })*/
        } else {
          this.setState({
            times: times,
            agTable: false,
            outPre: true,
            outNum: true,
            big: true,
            avg: true,
            chi: true,
            anti: true,
            antibiotic: true,
          });
          this.renderCanvas(data);
        }
      } else {
        console.error("response error", rest);
      }
      this.setState({
        [bigOrSmall]: false
      });
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
        headerName: "门诊处方",
        field: "reTotal",
        marryChildren: true,
        children: [
          {
            headerName: "总数",
            field: "mzcfzs",
            headerComponent: MyHeaderComponent,
            width: 100,
            headerClass: 'cellTd bgEc',
            headerComponentParams: {
              enableFilter: true,
              enableSorting: true,
              suppressMenuHide: true,
              enableMenu: false,
              menuIcon: 'fa-bars',
            }
          },
          {
            headerName: "环比百分数",
            field: "mzcfhb",
            headerComponent: MyHeaderComponent,
            width: 100,
            headerClass: 'cellTd bgEc hb',
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
        headerName: "门诊处方,各类金额与张数",
        field: "firDoor",
        marryChildren: true,
        children: [
          {
            headerName: "中药(金额)",
            field: "mzcfzyje",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "西药(金额)",
            field: "mzcfxyje",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "成药(金额)",
            field: "mzcfcyje",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "中药(张数)",
            field: "mzcfzyje",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "西药(张数)",
            field: "mzcfxyje",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "成药(张数)",
            field: "mzcfcyje",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "大处方统计总额度、总数量占比",
        field: "age",
        marryChildren: true,
        children: [
          {
            headerName: "500以上(总数)",
            field: "mzcffywbyszs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "300-500(总数)",
            field: "mzcffyszwyszs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "200-300(总数)",
            field: "mzcffyezsyszs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "100-200(总数)",
            field: "mzcffyyzeyszs",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "500以上(总占比)",
            field: "mzcffywbyszs",
            width: 140,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "300-500(总占比)",
            field: "mzcffyszwyszs",
            width: 140,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "200-300(总占比)",
            field: "mzcffyezsyszs",
            width: 140,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "100-200(总占比)",
            field: "mzcffyyzeyszs",
            width: 140,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "500以上(平均费用)",
            field: "mzcffywbyszs",
            width: 140,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "300-500(平均费用)",
            field: "mzcffyszwyszs",
            width: 140,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "200-300(平均费用)",
            field: "mzcffyezsyszs",
            width: 140,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "100-200(平均费用)",
            field: "mzcffyyzeyszs",
            width: 140,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "中医占比",
        field: "rate",
        marryChildren: true,
        children: [
          {
            headerName: "张数",
            field: "mzcfzyzzszb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "费用",
            field: "mzcfzyzjezb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "抗菌药物",
        field: "chiMedical",
        marryChildren: true,
        children: [
          {
            headerName: "数量",
            field: "mzcfkjywzs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "占比",
            field: "mzcfkjywzb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "抗生素",
        field: "sex",
        marryChildren: true,
        headerClass: 'lastCol',
        children: [
          {
            headerName: "非限制使用药物/1级(总额)",
            field: "mzcfkssyjzje",
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "限制使用药物/2级(总额)",
            field: "mzcfkssejzje",
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "特殊使用药物/3级(总额)",
            field: "mzcfksssjzje",
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "非限制使用药物/1级(总张数)",
            field: "mzcfkssyjzzs",
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "限制使用药物/2级(总张数)",
            field: "mzcfkssejzzs",
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "特殊使用药物/3级(总张数)",
            field: "mzcfksssjzzs",
            headerClass: 'cellTd bgEc lastCol',
            cellClass: 'lastCol',
          },
        ]
      },
    );
    return bigColumns;
  };
  createColDefs = (type) => {
    let {rowData, cheNum, selHos, hosName, times, deptName, timeType} = this.state;
    const {mergeArray, setDifId, setColumnsCom, backArr} = com;
    let arr = setColumnsCom(selHos, hosName, deptName, times, timeType, rowData, cheNum);
    switch (type) {
      case 'outPre':
        let outPreText = ['处方总数', '环比百分数'];
        let outPreLegName = ['mzcfzs', 'mzcfhb'];
        let outPreLeg = mergeArray(outPreText, outPreLegName);
        return backArr(setDifId(arr, 'outPre'), outPreLeg);
        break;
      case 'outNum':
        let outPreMoNumText = ['中药(金额)', '西药(金额)', '成药(金额)', '中药(张数)', '西药(张数)', '成药(张数)'];
        let outPreMoNumLegName = ['mzcfzyje', 'mzcfxyje', 'mzcfcyje', 'mzcfzyzs', 'mzcfxyzs', 'mzcfcyzs'];
        let outPreMoNumLeg = mergeArray(outPreMoNumText, outPreMoNumLegName);
        return backArr(setDifId(arr, 'outNum'), outPreMoNumLeg);
        break;
      case 'big':
        let totalText = ['500以上(总数)', '300-500(总数)', '200-300(总数)', '100-200(总数)', '500以上(占比)', '300-500(占比)', '200-300(占比)', '100-200(占比)', '500以上(平均费用)', '300-500(平均费用)', '200-300(平均费用)', '100-200(平均费用)'];
        let totalLegName = ['mzcffywbyszs', 'mzcffyszwyszs', 'mzcffyezsyszs', 'mzcffyyzeyszs', 'mzcffywbysslzb', 'mzcffyszwsslzb', 'mzcffyezsysslzb', 'mzcffyyzeysslzb', 'mzcffywbyspjcf', 'mzcffyszwspjcf', 'mzcffyezsyspjcf', 'mzcffyyzeyspjcf'];
        let totalLeg = mergeArray(totalText, totalLegName);
        return backArr(setDifId(arr, 'big'), totalLeg);
        break;
      case 'chi':
        let chiText = ['张数', '费用'];
        let chiLegName = ['mzcfzyzzszb', 'mzcfzyzjezb'];
        let chiLeg = mergeArray(chiText, chiLegName);
        return backArr(setDifId(arr, 'chi'), chiLeg);
        break;
      case 'anti':
        let antiText = ['抗菌数量', '占比例'];
        let antiLegName = ['mzcfkjywzs', 'mzcfkjywzb'];
        let antiLeg = mergeArray(antiText, antiLegName);
        return backArr(setDifId(arr, 'anti'), antiLeg);
        break;
      case 'antibiotic':
        let antibioticText = ['非限制使用药物/1级(总额)', '限制使用药物/2级(总额)', '特殊使用药物/3级(总额)', '非限制使用药物/1级(总张数)', '限制使用药物/2级(总张数)', '特殊使用药物/3级(总张数)'];
        let antibioticLegName = ['mzcfkssyjzje', 'mzcfkssejzje', 'mzcfksssjzje', 'mzcfkssyjzzs', 'mzcfkssejzzs', 'mzcfksssjzzs'];
        let antibioticLeg = mergeArray(antibioticText, antibioticLegName);
        return backArr(setDifId(arr, 'antibiotic'), antibioticLeg);
        break;
    }
  };
  //点击切换图表(小）
  toggleChart = (type) => {
    let {isDetail, selHos, timeType, timeFrom, timeTo} = this.state;
    const {selBeforeCheck} = com;
    if (!selBeforeCheck(selHos, timeType, timeFrom, timeTo)) return false;
    switch (type) {
      case 'outPre':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            outPre: !this.state.outPre,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              outPreColumnDefs: this.createColDefs('outPre'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'outNum':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            outNum: !this.state.outNum,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              outNumColumnDefs: this.createColDefs('outNum'),
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
      case 'chi':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            chi: !this.state.chi,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              chiColumnDefs: this.createColDefs('chi'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'anti':
        if (!isDetail) {
          this.selSmallDetail(type)
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
      case 'antibiotic':
        if (!isDetail) {
          this.selSmallDetail(type)
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
    }
  };
  //渲染canvas
  renderCanvas = (data) => {
    const {path, itemHeight, itemWidth, tooltip, axisTooltip, getTimes, getKindSum, getSeries, getDSeries, mergeArray, splitLine} = com;
    let times = getTimes(data);
//门诊处方总人数统计
    let outPreText = ['处方总数', '环比百分数'];
    let outPreLegName = ['mzcfzs', 'mzcfhb'];
    let outPreLeg = mergeArray(outPreText, outPreLegName);
    let outPreSum = [{text: '处方总数', sum: '12月总和'}];
    let outPreSumLeg = getKindSum(outPreLeg, outPreSum, times, data);
    outPreLeg = mergeArray(outPreSumLeg, outPreLegName);
    let outPreSpec = [{text: '环比百分数', type: 'line'}];
    let outPreSeries = getSeries(outPreLeg, times, data, 'bar', outPreSpec, 'yAxisIndex');
    let outPreOption = {
      tooltip: tooltip,
      color: ['#7DAAAF', '#BE6868'],//图例颜色
      legend: {
        itemWidth,
        itemHeight,
        data: [{name: outPreSumLeg[0], icon: path}, {name: outPreSumLeg[1]}]
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
          name: '总人数',
          minInterval: 1,//保证坐标轴刻度为整数
          max: 'dataMax',
          min: 0,
          splitLine: splitLine,
        },
        {
          type: 'value',
          scale: true,
          name: '环比百分数',
          min: 'dataMin',
          max: 'dataMax',
          splitLine: splitLine,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: outPreSeries
    };
//门诊处方金额与张数
    let outPreMoNumText = ['中药', '西药', '成药', '中药', '西药', '成药'];
    let outPreMoNumLegName = ['mzcfzyje', 'mzcfxyje', 'mzcfcyje', 'mzcfzyzs', 'mzcfxyzs', 'mzcfcyzs'];
    let outPreMoNumLeg = mergeArray(outPreMoNumText, outPreMoNumLegName);
    let sumOutPreMoNumText = [{text: '中药', sum: '总额'}, {text: '西药', sum: '总额'}, {text: '成药', sum: '总额'}, {
      text: '中药',
      sum: '总张数'
    }, {text: '西药', sum: '总张数'}, {text: '成药', sum: '总张数'}];
    let outPreMoSum = getKindSum(outPreMoNumLeg, sumOutPreMoNumText, times, data);
    outPreMoNumLeg = mergeArray(outPreMoSum, outPreMoNumLegName);
    let outPreMoNumSpec = [
      {text: outPreMoSum[0], type: 'bar'},
      {text: outPreMoSum[1], type: 'bar'},
      {text: outPreMoSum[2], type: 'bar'}
    ];
    let outPreMoNumSeries = getDSeries(outPreMoNumLeg, times, data, 'bar', outPreMoNumSpec, 'xAxisIndex');
    let outPreMonNumOption = {
      tooltip: axisTooltip,
      color: ['#782F2F', '#59829E', '#7DAAAF', '#A86565', '#FF8787', '#9DC4C9'],
      legend: [
        {
          x: 'center',
          itemHeight,
          itemWidth,
          data: [outPreMoSum[0], outPreMoSum[1], outPreMoSum[2]],
        },
        {
          x: 'center',
          top: '6%',
          itemHeight,
          itemWidth,
          data: [{name: outPreMoSum[3], icon: path}, {
            name: outPreMoSum[4],
            icon: path
          }, {name: outPreMoSum[5], icon: path}],
        }],
      grid: {
        left: '3%',
        right: '14%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          scale: true,
          name: '张数',
          min: 0,
        },
        {
          type: 'value',
          scale: true,
          name: '金额/万',
          min: 0,
        },
      ],
      yAxis: {
        type: 'category',
        data: times,
        splitLine: splitLine,
      },
      series: outPreMoNumSeries
    };
//大处方统计
    let totalText = ['500以上', '300-500', '200-300', '100-200', '500以上/占比', '300-500/占比', '200-300/占比', '100-200/占比'];
    let totalLegName = ['mzcffywbyszs', 'mzcffyszwyszs', 'mzcffyezsyszs', 'mzcffyyzeyszs', 'mzcffywbysslzb', 'mzcffyszwsslzb', 'mzcffyezsysslzb', 'mzcffyyzeysslzb'];
    let totalLeg = mergeArray(totalText, totalLegName);
    let totalSumArr = [{text: '500以上', sum: '总'}, {text: '300-500', sum: '总'}, {
      text: '200-300',
      sum: '总'
    }, {text: '100-200', sum: '总'}];
    let totalSum = getKindSum(totalLeg, totalSumArr, times, data);
    totalLeg = mergeArray(totalSum, totalLegName);
    let totalSpec = [
      {type: 'bar', text: '500以上/占比'},
      {type: 'bar', text: '300-500/占比'},
      {type: 'bar', text: '200-300/占比'},
      {type: 'bar', text: '100-200/占比'}];
    let totalSeries = getDSeries(totalLeg, times, data, 'bar', totalSpec, 'yAxisIndex');
    let totalOption = {
      tooltip: axisTooltip,
      color: ['#59829E', '#FF8787', '#9DC4C9', '#F3C0AE', '#59829E', '#FF8787', '#9DC4C9', '#F3C0AE'],//图例颜色
      legend: [
        {
          itemWidth,
          itemHeight,
          x: 'center',
          data: totalSum,
        }],
      grid: {
        bottom: '3%',
        top: '30%',
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
          name: '总数量',
          minInterval: 1,//保证坐标轴刻度为整数
          max: 'dataMax',
          min: 0,
          splitLine: splitLine,
        },
        {
          type: 'value',
          scale: true,
          name: '数量占比',
          splitLine: splitLine,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: totalSeries
    };
//平均费用
    let avgText = ['500以上', '300-500', '200-300', '100-200'];
    let avgLegName = ['mzcffywbyspjcf', 'mzcffyszwspjcf', 'mzcffyezsyspjcf', 'mzcffyyzeyspjcf'];
    let avgLeg = mergeArray(avgText, avgLegName);
    let avgSeries = getDSeries(avgLeg, times, data, 'bar');
    let avgOption = {
      title: {
        text: '平均费用',
      },
      tooltip: axisTooltip,
      color: ['#FF375B', '#FA8630', '#FFCC19', '#59829E'],//图例颜色
      legend: {
        itemHeight, itemWidth,
        data: [{name: avgText[0], icon: path},
          {name: avgText[1], icon: path},
          {name: avgText[2], icon: path},
          {name: avgText[3], icon: path}]
      }
      ,
      grid: {
        bottom: '3%',
        top: '30%',
        left: 0,
        right: 0,
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
          scale: true,
          name: '金额/万',
          min: 0,
          splitLine: splitLine,
        },
      ],
      series: avgSeries
    };
//中医
    let chiText = ['张数', '费用'];
    let chiLegName = ['mzcfzyzzszb', 'mzcfzyzjezb'];
    let chiLeg = mergeArray(chiText, chiLegName);
    let chiSeries = getSeries(chiLeg, times, data, 'bar');
    let chiOption = {
      tooltip: axisTooltip,
      color: ['#7DAAAF', '#FF8787'],//图例颜色
      legend: {
        itemHeight,
        itemWidth,
        data: [{name: chiText[0], icon: path}, {name: chiText[1], icon: path}]
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
          name: '比例',
          min: 0,
          splitLine: splitLine,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: chiSeries
    };
//抗菌
    let antiText = ['抗菌数量', '占比例'];
    let antiLegName = ['mzcfkjywzs', 'mzcfkjywzb'];
    let antiLeg = mergeArray(antiText, antiLegName);
    let sumAntiText = [{text: '抗菌数量', sum: '总和'}, {text: '占比例', sum: '总比例'}];
    let antiSum = getKindSum(antiLeg, sumAntiText, times, data);
    antiLeg = mergeArray(antiSum, antiLegName);
    let antiSpec = [{text: antiSum[1], type: 'line'}];
    let antiSeries = getSeries(antiLeg, times, data, 'bar', antiSpec, 'yAxisIndex');
    let antiOption = {
      tooltip: axisTooltip,
      color: ['#2E8D87', '#FF8787'],//图例颜色
      legend: {
        itemHeight,
        itemWidth,
        data: [{name: antiSum[0], icon: path}, {name: antiSum[1]}]
      },
      grid: {
        bottom: '3%',
        containLabel: true
      },
      toolbox: {},
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
          splitLine: splitLine,
        },
        {
          type: 'value',
          scale: true,
          name: '占比例',
          min: 0,
          splitLine: splitLine,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: antiSeries
    };

//抗生素
    let antibioticText = ['非限制使用药物/1级(总额)', '限制使用药物/2级(总额)', '特殊使用药物/3级(总额)', '非限制使用药物/1级(总张数)', '限制使用药物/2级(总张数)', '特殊使用药物/3级(总张数)'];
    let antibioticLegName = ['mzcfkssyjzje', 'mzcfkssejzje', 'mzcfksssjzje', 'mzcfkssyjzzs', 'mzcfkssejzzs', 'mzcfksssjzzs'];
    let antibioticLeg = mergeArray(antibioticText, antibioticLegName);
    let sumAntibioticText = [{text: '非限制使用药物/1级(总额)', sum: '总和'}, {
      text: '限制使用药物/2级(总额)',
      sum: '总和'
    }, {text: '特殊使用药物/3级(总额)', sum: '总和'}, {text: '非限制使用药物/1级(总张数)', sum: '总和'}, {
      text: '限制使用药物/2级(总张数)',
      sum: '总和'
    }, {text: '特殊使用药物/3级(总张数)', sum: '总和'}];
    let antibioticSum = getKindSum(antibioticLeg, sumAntibioticText, times, data);
    antibioticLeg = mergeArray(antibioticSum, antibioticLegName);
    let antibioticSpec = [
      {type: 'bar', text: antibioticSum[3]},
      {type: 'bar', text: antibioticSum[4]},
      {type: 'bar', text: antibioticSum[5]},
    ];
    let antibioticSeries = getDSeries(antibioticLeg, times, data, 'bar', antibioticSpec, 'yAxisIndex');
    let antibioticOption = {
      tooltip: axisTooltip,
      legend: [
        {
          itemWidth, itemHeight,
          x: 'center',
          data: [{name: antibioticSum[0], icon: path}, {
            name: antibioticSum[1],
            icon: path
          }, {name: antibioticSum[2], icon: path}, {name: antibioticSum[3], icon: path}, {
            name: antibioticSum[4],
            icon: path
          }, {name: antibioticSum[5], icon: path}],
          width: '100%'
        }
      ],
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '30%',
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
          name: '金额/万',
          min: 0,
          splitLine: splitLine,
        },
        {
          type: 'value',
          scale: true,
          name: '张数',
          min: 0,
          splitLine: splitLine,
        },
      ],
      series: antibioticSeries
    };

    this.setState({
      show: true,
      times,
      outPreOption: outPreOption,
      outPreMonNumOption: outPreMonNumOption,
      totalOption: totalOption,
      avgOption: avgOption,
      antiOption: antiOption,
      chiOption: chiOption,
      antibioticOption: antibioticOption
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
    let {outPreLoading, outNumLoading, bigLoading, chiLoading, antiLoading, antibioticLoading} = this.state;
    let {loading, toColumnDefs, toRowData, outNumColumnDefs, outNum, outPreMonNumOption, outPreColumnDefs, outPre, avgOption, totalOption, antiColumnDefs, anti, antiOption, chiOption, chiColumnDefs, chi, antibioticOption, antibioticColumnDefs, antibiotic, outPreOption, rowData, agTable, show, big, bigColumnDefs} = this.state;
    return (<div className={css.outPrescriptions}>
      <Spin spinning={loading}>
        <Search renderCanvas={this.renderCanvas} selData={this.selData}
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
            suppressDragLeaveHidesColumns={true}//让列无法拖拽出去隐藏
            ref="agGridReact"
          >
          </AgGridReact>
        </div> : <div className={css.rowContent}><Row gutter={12}>
          <Col className={`gutter-row ${css.padding0}`} span={12}>
            <Card title="门诊处方总数" option={outPreOption} id="outPre" row={rowData} show={show}
                  column={outPreColumnDefs} isAg={outPre} loading={outPreLoading}
                  toggleChart={this.toggleChart.bind(this, 'outPre')}/>
          </Col>
          <Col className={`gutter-row `} span={12}>
            <Card title="门诊处方金额与张数" option={outPreMonNumOption} id="outNum" row={rowData} show={show}
                  column={outNumColumnDefs} isAg={outNum} loading={outNumLoading}
                  toggleChart={this.toggleChart.bind(this, 'outNum')}/>
          </Col>
          <Col className={`gutter-row ${css.padding0}`} span={24}>
            <BigCard big={big} show={show} title="大处方统计" toggleChart={this.toggleChart}
                     bigColumnDefs={bigColumnDefs} rowData={rowData} leftId="total" rightId="avg"
                     loading={bigLoading}
                     leftOption={totalOption} rightOption={avgOption} bigId="big"/>
          </Col>
          <Col className={`gutter-row ${css.padding0}`} span={12}>
            <Card title="中医占总处方比例" option={chiOption} id="chi" row={rowData} show={show}
                  column={chiColumnDefs} loading={chiLoading}
                  isAg={chi} toggleChart={this.toggleChart.bind(this, 'chi')}/>

          </Col>
          <Col className={`gutter-row `} span={12}>
            <Card title="抗菌药物处方" option={antiOption} id="anti" row={rowData} show={show}
                  column={antiColumnDefs} loading={antiLoading}
                  isAg={anti} toggleChart={this.toggleChart.bind(this, 'anti')}/>

          </Col>
          <Col className={`gutter-row ${css.padding0} ${css.marginBottom}`} span={12}>
            <Card title="抗生素等级统计" option={antibioticOption} id="antibiotic" row={rowData} show={show}
                  column={antibioticColumnDefs} isAg={antibiotic} loading={antibioticLoading}
                  toggleChart={this.toggleChart.bind(this, 'antibiotic')}/>
          </Col>
        </Row></div>}
      </Spin>
    </div>)
  }
}
 
 
 