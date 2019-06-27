/**
 * description:出入院流量统计
 * author: mou
 * time:2017-11-11
 */
import React from 'react'
import {Row, Col, Spin} from 'antd';
import {Card} from './../component/card';                //引入卡片
import MyHeaderComponent from './../component/myHeaderComponent'//ag 筛选排序
import {AgGridReact} from "ag-grid-react"; //引入AG表格
import {Search} from './../component/header'
import css from '../../../less/main/content/hospitalExpenses.scss'
import api from './../api'
import com from './../content/deanQueryCom'
export class OutEnStatic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalColumnDefs: [],//总表列规则
      toRowData: [],//总表数据
      outInStaticOption: {series: []},//出入院统计
      outInStatic: true,
      outInStaticLoading: false,
      outInStaticColumnDefs: [],
      outPatientOption: {series: []},//出院患者
      outPatient: true,
      outPatientLoading: false,
      outPatientColumnDefs: [],
      moreTOption: {series: []},//住出院患者大于30天人数
      moreT: true,
      moreTLoading: false,
      moreTColumnDefs: [],
      outDeOption: {series: []},//出院人数详情数据
      outDe: true,
      outDeLoading: false,
      outDeColumnDefs: [],
      outAgaInOption: {series: []},//出院再入院
      outAgaIn: true,
      outAgaInLoading: false,
      outAgaInColumnDefs: [],
      inTypeOption: {series: []},//入院人数类型
      inType: true,
      inTypeLoading: false,
      inTypeColumnDefs: [],
      difAgeOption: {series: []},//不同年龄段
      difAge: true,
      difAgeLoading: false,
      difAgeColumnDefs: [],
      ocBedOption: {series: []},//占用总床数
      oc: true,
      ocLoading: false,
      ocColumnDefs: [],
      rowData: [],//行
      show: false,
      cheNum: com.cheNum,
      hosName: [],//医院名称
      deptName: [],    //科室
      selHos: null,    //选中的医院
      timeFrom: null,
      timeTo: null,
      timeType: null,
      times: [],
      loading: false,
      isDetail: false, //是否查询了详细
      overlayNoRowsTemplate: "<span>暂无相关数据</span>"
    };

    this.onGridReady = this.onGridReady.bind(this);
  };

  //获取表格基础api
  onGridReady(params) {
    this.gridApi = params.api;
    this.state.api = params;
    this.gridApi.hideOverlay();
    // this.gridApi.overlayNoRowsTemplate='<div>暂无数据</div>';
  }

  //查询数据
  selData = (selHospitalsNo, type, timeFrom, timeTo, dataType, bigOrSmall) => {
    const {selRest} = api;
    const {judgeOneOrMore, getTimes} = com;
    this.setState({
      selHos: selHospitalsNo,
      timeFrom: timeFrom,
      timeTo: timeTo,
      timeType: type,
      [bigOrSmall]: true
    });
    let dataPack = {
      message: {
        hospitalCode: selHospitalsNo,
        timeFrom: timeFrom,
        timeTo: timeTo,
        timeType: type,
      }
    };
    dataPack.action = judgeOneOrMore(selHospitalsNo, 'crHospital.singleDetail', 'crHospital.moreDetail', 'crHospital.all', dataType);
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
          /*        this.setState({
           times:getTimes(data)
           },()=>{
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
            agTable: false,
            outInStatic: true,
            outPatient: true,
            moreT: true,
            outDe: true,
            outAgaIn: true,
            inType: true,
            difAge: true,
            oc: true,
          });
          this.renderCanvas(data);
        }
      } else {
        console.error("response error", rest);
      }
      this.setState({
        [bigOrSmall]: false,
      })
    });
  };

  //大表创建列规则
  createToColDefs = () => {
    let {toRowData, cheNum, times, hosName, selHos, deptName, timeType} = this.state;
    const {setColumnsCom, setDifId} = com;
    let bigColumns = setColumnsCom(selHos, hosName, deptName, times, timeType, toRowData, cheNum);
    bigColumns = setDifId(bigColumns, "bigTable");
    bigColumns.push(
      {
        headerName: "出入院统计",
        field: "reTotal",
        marryChildren: true,
        children: [
          {
            headerName: "入院人数",
            field: "ryzrs",
            headerComponent: MyHeaderComponent,
            width: 100,
            headerClass: 'cellTd cry bgEc',
            headerComponentParams: {
              enableFilter: true,
              enableSorting: true,
              suppressMenuHide: true,
              enableMenu: false,
              menuIcon: 'fa-bars',
            }
          },
          {
            headerName: "出院人数",
            field: "cyzrs",
            headerComponent: MyHeaderComponent,
            width: 100,
            headerClass: 'cellTd cry bgEc',
            headerComponentParams: {
              enableFilter: true,
              enableSorting: true,
              suppressMenuHide: true,
              enableMenu: false,
              menuIcon: 'fa-bars',
            }
          },
          /* {
           headerName: "入院环比",
           field: "ryzrshb",
           width: 100,
           headerClass: 'cellTd',
           },
           {
           headerName: "入院同比",
           field: "ryzrstb",
           width: 100,
           headerClass: 'cellTd',
           },
           {
           headerName: "出院环比",
           field: "cyzrshb",
           width: 100,
           headerClass: 'cellTd',
           },
           {
           headerName: "出院同比",
           field: "cyzrstb",
           width: 100,
           headerClass: 'cellTd',
           },*/
        ]
      },
      {
        headerName: "出院患者",
        field: "firDoor",
        marryChildren: true,
        children: [
          {
            headerName: "平均住院天数",
            field: "cyhzpjzyts",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          /*  {
           headerName: "环比",
           field: "cyhzpjzytshb",
           width: 100,
           headerClass: 'cellTd',
           },*/
        ]
      },
      {
        headerName: "住、出院患者大于30天",
        field: "age",
        marryChildren: true,
        children: [
          {
            headerName: "住院患者",
            field: "zytsdysszrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "出院患者",
            field: "cytsdysszrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "出院人数详细数据",
        field: "rate",
        marryChildren: true,
        children: [
          {
            headerName: "非医嘱离院",
            field: "fyzlyrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "抢救死亡",
            field: "qjswrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "住院死亡",
            field: "zyswrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "自动离院",
            field: "zdyyrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "重点手术死亡患者",
            field: "zdssswhzrs",
            width: 120,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "出院再入院",
        field: "chiMedical",
        marryChildren: true,
        children: [
          {
            headerName: "人数",
            field: "cyzryrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          /* {
           headerName: "环比",
           field: "cyzryrshb",
           width: 100,
           headerClass: 'cellTd bgEc',
           },*/
        ]
      },
      {
        headerName: "入院人数类型",
        field: "enNumType",
        marryChildren: true,
        children: [
          {
            headerName: "市职工医保",
            field: "ryszgyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "城乡居民",
            field: "rycxjm",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "室内非医保",
            field: "rysnfyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "市外医保",
            field: "ryswyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "市外非医保",
            field: "ryfyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "离休干部",
            field: "rylxgbrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "不同年龄段人数",
        field: "difAgeNum",
        marryChildren: true,
        children: [
          {
            headerName: "0-2岁",
            field: "lzers",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "2-22岁",
            field: "ezeers",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "22-42岁",
            field: "eezssers",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "42-62岁",
            field: "ssezlsers",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "62岁以上",
            field: "lseysrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "占用总床数",
        field: "ocBedNum",
        marryChildren: true,
        headerClass: 'lastCol',
        children: [
          {
            headerName: "出院者占用总床日数",
            field: "cyhzzzcwrs",
            width: 120,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "实际占用总床日数",
            field: "sjzyzcwrs",
            width: 120,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "实际开放总床日数",
            field: "sjkfzcwrs",
            width: 120,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "床位周转次数",
            field: "cwzzcs",
            width: 100,
            cellClass: 'lastCol',
            headerClass: 'cellTd bgEc lastCol',
          }
        ]
      },
    );
    return bigColumns
  };
  //小表创建列规则
  createColDefs = (type) => {
    const {mergeArray, setDifId, setColumnsCom, backArr} = com;
    let {rowData, cheNum, times, selHos, hosName, deptName, timeType} = this.state;
    let arr = setColumnsCom(selHos, hosName, deptName, times, timeType, rowData, cheNum);
    switch (type) {
      case 'outInStatic':
        let outInStaticText = ['入院人数', /*'入院环比', '入院同比',*/ '出院人数', /*'出院环比', '出院同比'*/];
        let outInStaticLegName = ['ryzrs', /*'ryzrshb', 'ryzrstb',*/ 'cyzrs', /*'cyzrshb', 'cyzrstb'*/];
        let outInStaticLeg = mergeArray(outInStaticText, outInStaticLegName);
        return backArr(setDifId(arr, 'outInStatic'), outInStaticLeg);
        break;
      case 'outPatient':
        let outPatientText = ['平均住院天数', /* '环比'*/];
        let outPatientLegName = ['cyhzpjzyts', /* 'cyhzpjzytshb'*/];
        let outPatientLeg = mergeArray(outPatientText, outPatientLegName);
        return backArr(setDifId(arr, 'outPatient'), outPatientLeg);
        break;
      case 'moreT':
        let moreTText = ['住院患者', '出院患者'];
        let moreTLegName = ['zytsdysszrs', 'cytsdysszrs'];
        let moreTLeg = mergeArray(moreTText, moreTLegName);
        return backArr(setDifId(arr, 'moreT'), moreTLeg);
        break;
      case 'outDe':
        let outDeText = ['非医嘱离院', '抢救死亡', '住院死亡', '自动离院', '重点手术死亡患者'];
        let outDeLegName = ['fyzlyrs', 'qjswrs', 'zyswrs', 'zdyyrs', 'zdssswhzrs'];
        let outDeLeg = mergeArray(outDeText, outDeLegName);
        return backArr(setDifId(arr, 'outDe'), outDeLeg);
        break;
      case 'outAgaIn':
        let outAgaInText = ['人数', /*'环比'*/];
        let outAgaInLegName = ['cyzryrs', /* 'cyzryrshb'*/];
        let outAgaInLeg = mergeArray(outAgaInText, outAgaInLegName);
        return backArr(setDifId(arr, 'outAgaIn'), outAgaInLeg);
        break;
      case 'inType':
        let inTypeText = ['市职工医保', '城乡居民', '室内非医保', '市外医保', '市外非医保', '离休干部'];
        let inTypeLegName = ['ryszgyb', 'rycxjm', 'rysnfyb', 'ryswyb', 'ryfyb', 'rylxgbrs'];
        let inTypeLeg = mergeArray(inTypeText, inTypeLegName);
        return backArr(setDifId(arr, 'inType'), inTypeLeg);
        break;
      case 'difAge':
        let difAgeText = ['0-2岁', '2-22岁', '22-42岁', '42-62岁', '62岁以上'];
        let difAgeLegName = ['lzers', 'ezeers', 'eezssers', 'ssezlsers', 'lseysrs'];
        let difAgeLeg = mergeArray(difAgeText, difAgeLegName);
        return backArr(setDifId(arr, 'difAge'), difAgeLeg);
        break;
      case 'oc':
        let ocText = ['出院者占用总床日数', '实际占用总床日数', '实际开放总床日数', '床位周转次数'];
        let ocLegName = ['cyhzzzcwrs', 'sjzyzcwrs', 'sjkfzcwrs', 'cwzzcs'];
        let ocLeg = mergeArray(ocText, ocLegName);
        return backArr(setDifId(arr, 'oc'), ocLeg);
        break;
    }
  };
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
    param.action = judgeOneOrMore(selHos, 'crHospital.singleDetail', 'crHospital.moreDetail', 'crHospital.all', 'detail');
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
  //点击切换图表(小）
  toggleChart = (type) => {
    const {isDetail, selHos, timeType, timeFrom, timeTo} = this.state;
    const {selBeforeCheck} = com;
    if (!selBeforeCheck(selHos, timeType, timeFrom, timeTo)) return false;
    switch (type) {
      case 'outInStatic':
        if (!isDetail) {
          this.selSmallDetail('outInStatic')
        } else {
          this.setState({
            outInStatic: !this.state.outInStatic,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              outInStaticColumnDefs: this.createColDefs('outInStatic'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'outPatient':
        if (!isDetail) {
          this.selSmallDetail('outPatient');
        } else {
          this.setState({
            outPatient: !this.state.outPatient,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              outPatientColumnDefs: this.createColDefs('outPatient'),
              [type + 'Loading']: false
            })
          });
        }

        break;
      case 'moreT':
        if (!isDetail) {
          this.selSmallDetail('moreT')
        } else {
          this.setState({
            moreT: !this.state.moreT,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              moreTColumnDefs: this.createColDefs('moreT'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'outDe':
        if (!isDetail) {
          this.selSmallDetail('outDe')
        } else {
          this.setState({
            outDe: !this.state.outDe,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              outDeColumnDefs: this.createColDefs('outDe'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'outAgaIn':
        if (!isDetail) {
          this.selSmallDetail('outAgaIn')
        } else {
          this.setState({
            outAgaIn: !this.state.outAgaIn,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              outAgaInColumnDefs: this.createColDefs('outAgaIn'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'inType':
        if (!isDetail) {
          this.selSmallDetail('inType')
        } else {
          this.setState({
            inType: !this.state.inType,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              inTypeColumnDefs: this.createColDefs('inType'),
              [type + 'Loading']: false
            })
          });
        }

        break;
      case 'difAge':
        if (!isDetail) {
          this.selSmallDetail('difAge')
        } else {
          this.setState({
            difAge: !this.state.difAge,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              difAgeColumnDefs: this.createColDefs('difAge'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'oc':
        if (!isDetail) {
          this.selSmallDetail('oc')
        } else {
          this.setState({
            oc: !this.state.oc,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              ocColumnDefs: this.createColDefs('oc'),
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
    const {tooltip, path, itemHeight, itemWidth, axisTooltip} = com;
    let times = getTimes(data);
//出入院统计
    let outInStaticText = ['入院人数', /*'入院环比', '入院同比',*/ '出院人数', /*'出院环比', '出院同比'*/];
    let outInStaticLegName = ['ryzrs', /* 'ryzrshb', 'ryzrstb',*/ 'cyzrs', /*'cyzrshb', 'cyzrstb'*/];
    let outInStaticLeg = mergeArray(outInStaticText, outInStaticLegName);
    let outInStaticSumLeg = [{text: '入院人数', sum: '总和'}, {text: '出院人数', sum: '总和'}];
    let outInStaticArr = getKindSum(outInStaticLeg, outInStaticSumLeg, times, data);
    outInStaticLeg = mergeArray(outInStaticArr, outInStaticLegName);
    let outInStaticSpec = [
      {text: outInStaticArr[3], type: 'bar'},
      {text: '出院环比', type: 'bar'},
      {text: '出院同比', type: 'bar'},
    ];
    /* let outInStaticSeries = getDSeries(outInStaticLeg, times, data, 'bar', outInStaticSpec, 'yAxisIndex');*/
    let outInStaticSeries = getDSeries(outInStaticLeg, times, data, 'bar');
    let outInStaticOption = {
      tooltip: tooltip,
      color: ['#FF375B', /*'#FF8787', '#F3C0AE',*/ '#59829E', /*'#7DAAAF', '#9DC4C9'*/],//图例颜色
      legend: [
        {
          x: 'center',
          itemWidth,
          itemHeight,
          data: [{name: outInStaticArr[0], icon: path}, {name: outInStaticArr[1], icon: path}],
        },
        /*{
         x: 'center',
         top: '6%',
         itemWidth,
         itemHeight,
         data: [{name: outInStaticArr[3], icon: path}, outInStaticArr[4], outInStaticArr[5]],
         }*/],
      grid: {
        bottom: '3%',
        top: '22%',
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
          name: '总人数',
          minInterval: 1,//保证坐标轴刻度为整数
          min: 0,
        },
        /*     {
         type: 'value',
         name: '环比百分数',
         axisLabel: {
         formatter: '{value} %'
         }
         },*/
      ],
      series: outInStaticSeries
    };
//出院患者
    let outPatientText = ['平均住院天数', /* '环比'*/];
    let outPatientLegName = ['cyhzpjzyts', /* 'cyhzpjzytshb'*/];
    let outPatientLeg = mergeArray(outPatientText, outPatientLegName);
    let outPatientSpec = [
      {text: '环比', type: 'line'},
    ];
    /*  let outPatientSeries = getSeries(outPatientLeg, times, data, 'bar', outPatientSpec, 'yAxisIndex');*/
    let outPatientSeries = getSeries(outPatientLeg, times, data, 'bar');
    let outPatientOption = {
      tooltip: axisTooltip,
      color: ['#7DAAAF', /* '#BE6868'*/],
      legend: {data: outPatientText, itemHeight, itemWidth},
      grid: {
        left: '3%',
        right: '14%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {type: 'category', data: times},
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '天数',
          minInterval: 1,//保证坐标轴刻度为整数
          min: 0,
        }, /*{
         type: 'value',
         scale: true,
         name: '环比百分数',
         axisLabel: {
         formatter: '{value} %'
         }
         },*/],
      series: outPatientSeries
    };
//住、出院患者大于30天
    let moreTText = ['住院患者', '出院患者'];
    let moreTLegName = ['zytsdysszrs', 'cytsdysszrs'];
    let moreTLeg = mergeArray(moreTText, moreTLegName);
    let sumMoreTText = [{text: '住院患者', sum: '总和'}, {text: '出院患者', sum: '总和'}];
    let moreTsum = getKindSum(moreTLeg, sumMoreTText, times, data);
    moreTLeg = mergeArray(moreTsum, moreTLegName);
    let moreTSeries = getSeries(moreTLeg, times, data, 'bar',);
    let moreTOption = {
      tooltip: tooltip,
      color: ['#FF8787', '#7DAAAF'],
      legend: {data: moreTsum, itemWidth, itemHeight},
      grid: {
        left: '3%',
        right: '14%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {type: 'category', data: times},
      yAxis: {type: 'value', scale: true, name: '人数', min: 0, minInterval: 1},
      series: moreTSeries
    };
//出院人数详情数据
    let outDeText = ['非医嘱离院', '抢救死亡', '住院死亡', '自动离院', '重点手术死亡患者'];
    let outDeLegName = ['fyzlyrs', 'qjswrs', 'zyswrs', 'zdyyrs', 'zdssswhzrs'];
    let outDeLeg = mergeArray(outDeText, outDeLegName);
    let sumOutDeText = [{text: '非医嘱离院', sum: '总和'}, {text: '抢救死亡', sum: '总和'}, {text: '住院死亡', sum: '总和'}, {
      text: '自动离院',
      sum: '总和'
    }, {text: '重点手术死亡患者', sum: '总和'}];
    let outDeSum = getKindSum(outDeLeg, sumOutDeText, times, data);
    outDeLeg = mergeArray(outDeSum, outDeLegName);
    let outDeSeries = getDSeries(outDeLeg, times, data, 'bar');
    let outDeOption = {
      tooltip: axisTooltip,
      color: ['#59829E', '#782F2F', '#FF8787', '#7DAAAF', '#A86565'],//图例颜色
      legend: {
        data: outDeSum,
        itemHeight, itemWidth,
      },
      grid: {
        bottom: '3%',
        top: '22%',
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
          name: '人数',
          minInterval: 1,
          min: 0,
        },
      ],
      series: outDeSeries
    };
//出院再入院
    let outAgaInText = ['人数', /* '环比'*/];
    let outAgaInLegName = ['cyzryrs', /* 'cyzryrshb'*/];
    let outAgaInLeg = mergeArray(outAgaInText, outAgaInLegName);
    let outAgaArr = [{text: '人数', sum: '总和'}];
    let outAgaInSum = getKindSum(outAgaInLeg, outAgaArr, times, data);
    outAgaInLeg = mergeArray(outAgaInSum, outAgaInLegName);
    let outAgaInSpec = [
      {text: '环比', type: 'line'},
    ];
    let outAgaInSeries = getSeries(outAgaInLeg, times, data, 'bar');
    /* let outAgaInSeries = getSeries(outAgaInLeg, times, data, 'bar', outAgaInSpec, 'yAxisIndex');*/
    let outAgaInOption = {
      tooltip: axisTooltip,
      color: ['#3C9AE4', /*'#BE6868'*/],
      legend: {data: outAgaInSum, itemHeight, itemWidth,},
      grid: {
        left: '3%',
        right: '14%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {type: 'category', data: times},
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '人数',
          minInterval: 1,
          min: 0,
        }, /*{
         type: 'value',
         scale: true,
         name: '环比',
         min: 0,
         axisLabel: {
         formatter: '{value} %'
         }
         }*/],
      series: outAgaInSeries
    };
//入院人数类型
    let inTypeText = ['市职工医保', '城乡居民', '室内非医保', '市外医保', '市外非医保', '离休干部'];
    let inTypeLegName = ['ryszgyb', 'rycxjm', 'rysnfyb', 'ryswyb', 'ryfyb', 'rylxgbrs'];
    let inTypeLeg = mergeArray(inTypeText, inTypeLegName);
    let sumInTypeText = [{text: '市职工医保', sum: '总和'}, {text: '城乡居民', sum: '总和'}, {
      text: '室内非医保',
      sum: '总和'
    }, {text: '市外医保', sum: '总和'}, {text: '市外非医保', sum: '总和'}, {text: '离休干部', sum: '总和'}];
    let inTypeSum = getKindSum(inTypeLeg, sumInTypeText, times, data);
    inTypeLeg = mergeArray(inTypeSum, inTypeLegName);
    let inTypeSeries = getDSeries(inTypeLeg, times, data, 'bar');
    let inTypeOption = {
      tooltip: axisTooltip,
      color: ['#3C9AE4', '#59829E', '#FF8787', '#9DC4C9', '#A86565', '#7DAAAF'],//图例颜色
      legend: {
        itemHeight, itemWidth,
        data: inTypeSum
      },
      grid: {
        bottom: '3%',
        top: '28%',
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
          name: '人数',
          min: 0,
          minInterval: 1,
        },
      ],
      series: inTypeSeries
    };
//不同年龄段
    let difAgeText = ['0-2岁', '2-22岁', '22-42岁', '42-62岁', '62岁以上'];
    let difAgeLegName = ['lzers', 'ezeers', 'eezssers', 'ssezlsers', 'lseysrs'];
    let difAgeLeg = mergeArray(difAgeText, difAgeLegName);
    let sumDifAgeText = [{text: '0-2岁', sum: '总和'}, {text: '2-22岁', sum: '总和'}, {
      text: '22-42岁',
      sum: '总和'
    }, {text: '42-62岁', sum: '总和'}, {text: '62岁以上', sum: '总和'}];
    let difAgeSum = getKindSum(difAgeLeg, sumDifAgeText, times, data);
    difAgeLeg = mergeArray(difAgeSum, difAgeLegName);
    let difAgeSeries = getDSeries(difAgeLeg, times, data, 'bar');
    let difAgeOption = {
      tooltip: axisTooltip,
      color: ['#FF8787', '#3CB071', '#3C9AE4', '#7DAAAF', '#7B6881'],//图例颜色
      legend: {
        data: difAgeSum,
        itemWidth,
        itemHeight,
      },
      grid: {
        bottom: '3%',
        top: '22%',
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
          name: '人数',
          min: 0,
          minInterval: 1,
        },
      ],
      series: difAgeSeries
    };

//占用总床数
    let ocText = ['出院者占用总床日数', '实际占用总床日数', '实际开放总床日数', '床位周转次数'];
    let ocLegName = ['cyhzzzcwrs', 'sjzyzcwrs', 'sjkfzcwrs', 'cwzzcs'];
    let ocLeg = mergeArray(ocText, ocLegName);
    let ocSpec = [
      {type: 'bar', text: '床位周转次数'}
    ];
    let ocSeries = getDSeries(ocLeg, times, data, 'bar', ocSpec, 'yAxisIndex');
    let ocBedOption = {
      tooltip: axisTooltip,
      color: ['#7DAAAF', '#FA8630', '#3C9AE4', '#FFCC19'],
      legend: {data: ocText, itemHeight, itemWidth},
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
        {
          type: 'value',
          scale: true,
          name: '次数',
          min: 0,
          minInterval: 1,
        },
      ],
      series: ocSeries
    };
    this.setState({
      show: true,
      times,
      outInStaticOption: outInStaticOption,
      outPatientOption: outPatientOption,
      moreTOption: moreTOption,
      outDeOption: outDeOption,
      outAgaInOption: outAgaInOption,
      inTypeOption: inTypeOption,
      difAgeOption: difAgeOption,
      ocBedOption: ocBedOption,
    });
  };

  getHosName = (val, key) => {
    this.setState({
      [key]: val
    })
  };
  changeValue = (val, key) => {
    this.setState({
      [key]: val,
      toRowData: [],
      rowData: [],
      isDetail: false,
    })
  };
  rowClick = (row) => {
    this.setState({
      agActive: row.node.rowIndex,
    })
  };
  getRowClass = (param) => {
    let {agActive} = this.state;
    if (param.rowIndex === agActive) {
      return `${css.row} ${css.agActive1}`
    } else {
      return `${css.row}`
    }
  };

  render() {
    let {loading, toColumnDefs, toRowData, outInStaticOption, outInStaticColumnDefs, outInStatic, outPatientOption, outPatient, outPatientColumnDefs, moreTOption, moreT, moreTColumnDefs, outDeOption, outDe, outDeColumnDefs, outAgaInOption, outAgaIn, outAgaInColumnDefs, inTypeOption, inType, inTypeColumnDefs, difAgeOption, difAge, difAgeColumnDefs, ocBedOption, oc, ocColumnDefs, rowData, agTable, show} = this.state;
    let {outInStaticLoading, outPatientLoading, moreTLoading, inTypeLoading, outDeLoading, outAgaInLoading, difAgeLoading, ocLoading} = this.state;
    return (<div className={css.hospitalExpenses}>
      <Spin spinning={loading}>
        <Search renderCanvas={this.renderCanvas} selData={this.selData}
                getHosName={this.getHosName} changeValue={this.changeValue}/>
        {agTable ? <div className={`${css.agTable}`}>
          <AgGridReact
            rowClass={`${css.row}`}
          //  getRowClass={this.getRowClass}
            columnDefs={toColumnDefs}
            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
            rowData={toRowData}
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
        </div> :
          <div className={css.rowContent}>
            <Row gutter={12}>
              <Col className={`gutter-row ${css.padding0}`} span={12}>
                <Card title="出、入院统计" option={outInStaticOption} id="outInStatic" row={rowData} show={show}
                      column={outInStaticColumnDefs} isAg={outInStatic} loading={outInStaticLoading}
                      toggleChart={this.toggleChart.bind(this, 'outInStatic')}/>
              </Col>
              <Col className={`gutter-row `} span={12}>
                <Card title="出院患者" option={outPatientOption} id="outPatient" row={rowData} show={show}
                      column={outPatientColumnDefs} isAg={outPatient} loading={outPatientLoading}
                      toggleChart={this.toggleChart.bind(this, 'outPatient')}/>
              </Col>
              <Col className={`gutter-row  ${css.padding0}`} span={12}>
                <Card title="住、出院患者大于30天人数" option={moreTOption} id="moreT" row={rowData} show={show}
                      column={moreTColumnDefs} loading={moreTLoading}
                      isAg={moreT} toggleChart={this.toggleChart.bind(this, 'moreT')}/>

              </Col>
              <Col className={`gutter-row `} span={12}>
                <Card title="出院人数详情数据" option={outDeOption} id="outDe" row={rowData} show={show}
                      column={outDeColumnDefs} loading={outDeLoading}
                      isAg={outDe} toggleChart={this.toggleChart.bind(this, 'outDe')}/>

              </Col>
              <Col className={`gutter-row  ${css.padding0}`} span={12}>
                <Card title="出院再入院人数" option={outAgaInOption} id="outAgaIn" row={rowData} show={show}
                      column={outAgaInColumnDefs} isAg={outAgaIn} loading={outAgaInLoading}
                      toggleChart={this.toggleChart.bind(this, 'outAgaIn')}/>
              </Col>
              <Col className={`gutter-row `} span={12}>
                <Card title="入院人数类型对比" option={inTypeOption} id="inType" row={rowData} show={show}
                      column={inTypeColumnDefs} isAg={inType} loading={inTypeLoading}
                      toggleChart={this.toggleChart.bind(this, 'inType')}/>
              </Col>
              <Col className={`gutter-row  ${css.padding0}`} span={12}>
                <Card title="不同年龄段人数" option={difAgeOption} id="difAge" row={rowData} show={show}
                      column={difAgeColumnDefs} isAg={difAge} loading={difAgeLoading}
                      toggleChart={this.toggleChart.bind(this, 'difAge')}/>
              </Col>
              <Col className={`gutter-row ${css.marginBottom}`} span={12}>
                <Card title="占用总床数" option={ocBedOption} id="oc" row={rowData} show={show}
                      column={ocColumnDefs} isAg={oc} loading={ocLoading}
                      toggleChart={this.toggleChart.bind(this, 'oc')}/>
              </Col>
            </Row>
          </div>
        }
      </Spin>
    </div>)
  }
}
 
 
 