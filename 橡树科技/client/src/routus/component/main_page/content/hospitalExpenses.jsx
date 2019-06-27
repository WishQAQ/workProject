/**
 * description:门诊挂号量统计
 * author: mou
 * time:2017-11-9
 */
import React from 'react'
import {Row, Col, Spin} from 'antd';
import {Card} from './../component/card';                //引入卡片
import MyHeaderComponent from './../component/myHeaderComponent';//ag 筛选排序
import {AgGridReact} from "ag-grid-react"; //引入AG表格
import {Search} from './../component/header';
import api from './../api';
import com from './../content/deanQueryCom';
import css from '../../../less/main/content/hospitalExpenses.scss';

export class HospitalExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      open: false,
      rowData: [],//行
      api: null,
      columnDefs: [],
      totalPeOption: {series: []},
      doorFirstOption: {series: []},
      ageOption: {series: []},
      rateOption: {series: []},
      chiOption: {series: []},
      sexOption: {series: []},
      total: true,//门诊总数显示表格或图表
      totalLoading: false,  //门诊显示加载中
      firDoor: true,
      firDoorLoading: false,
      age: true,
      ageLoading: false,
      rate: true,
      rateLoading: false,
      chi: true,
      chiLoading: false,
      sex: true,
      sexLoading: false,
      totalColumnDefs: [],
      firDoorColumnDefs: [],
      ageColumnDefs: [],
      rateColumnDefs: [],
      chiColumnDefs: [],
      sexColumnDefs: [],
      agTable: false,   //总的ag表格是否显示
      toColumnDefs: [],//总表列规则
      toRowData: [],//总表rowData
      cheNum: com.cheNum,//表格筛选选中数量
      path: com.path,//图例圆角矩形路径
      times: [],     //时间
      hosName: [],    //医院名称
      deptName: [],    //科室名称
      selHos: null,    //选中的医院
      timeFrom: null,
      timeTo: null,
      timeType: null,
      loading: false,    //加载中
      isDetail: false,    //是否查询了详细
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
    param.action = judgeOneOrMore(selHos, 'demo.挂号(明细).单', 'demo.挂号(明细).多', 'demo.挂号(汇总).单与多', 'detail');
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
    dataPack.action = judgeOneOrMore(selHospitalsNo, 'demo.挂号(明细).单', 'demo.挂号(明细).多', 'demo.挂号(汇总).单与多', dataType);
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
            agTable: false,
            total: true,
            firDoor: true,
            age: true,
            rate: true,
            chi: true,
            sex: true,
          });
          this.renderCanvas(data);
        }
        this.setState({
          [bigOrSmall]: false
        });
      } else {
        this.setState({
          [bigOrSmall]: false
        });
        console.error("response error", rest);
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
        headerName: "挂号总人数",
        field: "reTotal",
        marryChildren: true,
        children: [
          {
            headerName: "门诊",
            field: "mzghzrs",
            headerComponent: MyHeaderComponent,
            width: 100,
            headerClass: 'cellTd bgEc',
            headerComponentParams: {
              enableFilter: true,
              enableSorting: true,
              suppressMenuHide: true,
              enableMenu: false,
              menuIcon: 'fa-bars',
            },
          },
          {
            headerName: "急诊",
            field: "jzghzrs",
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
            headerName: "同比数",
            field: "mzghbfb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "首次门诊",
        field: "firDoor",
        marryChildren: true,
        children: [
          {
            headerName: "总数",
            field: "mzscjzrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "同比数",
            field: "mzscjzbfb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "不同年龄段",
        field: "age",
        marryChildren: true,
        children: [
          {
            headerName: "0-2岁",
            field: "mznl1",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "2-22岁",
            field: "mznl2",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "22-42岁",
            field: "mznl3",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "42-62岁",
            field: "mznl4",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "62岁以上",
            field: "mznl5",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "门诊费用类别、医保率",
        field: "rate",
        marryChildren: true,
        children: [
          {
            headerName: "市外医保",
            field: "mzfylbswyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "市内非医保",
            field: "mzfylbsnfyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "市外非医保",
            field: "mzfylbswfyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "市职工医保",
            field: "mzfylbszgyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "城乡居民",
            field: "mzfylbcxjm",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "离休干部",
            field: "mzfylblxgb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "中医挂号",
        field: "chiMedical",
        marryChildren: true,
        children: [
          {
            headerName: "总人数",
            field: "zyghrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "同比数",
            field: "zyghbfb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "男女挂号",
        field: "sex",
        marryChildren: true,
        children: [
          {
            headerName: "男",
            field: "malers",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "女",
            field: "female",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "挂号总人数",
        field: "reTotal",
        marryChildren: true,
        children: [
          {
            headerName: "门诊",
            field: "mzghzrs",
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
            headerName: "急诊",
            field: "jzghzrs",
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
            headerName: "同比数",
            field: "mzghbfb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "首次门诊",
        field: "firDoor",
        marryChildren: true,
        children: [
          {
            headerName: "总数",
            field: "mzscjzrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "同比数",
            field: "mzscjzbfb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "不同年龄段",
        field: "age",
        marryChildren: true,
        children: [
          {
            headerName: "0-2岁",
            field: "mznl1",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "2-22岁",
            field: "mznl2",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "22-42岁",
            field: "mznl3",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "42-62岁",
            field: "mznl4",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "62岁以上",
            field: "mznl5",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "门诊费用类别、医保率",
        field: "rate",
        marryChildren: true,
        children: [
          {
            headerName: "市外医保",
            field: "mzfylbswyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "市内非医保",
            field: "mzfylbsnfyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "市外非医保",
            field: "mzfylbswfyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "市职工医保",
            field: "mzfylbszgyb",
            width: 100,
            headerClass: 'cellTd bgEc',
          }, {
            headerName: "城乡居民",
            field: "mzfylbcxjm",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "离休干部",
            field: "mzfylblxgb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "中医挂号",
        field: "chiMedical",
        marryChildren: true,
        children: [
          {
            headerName: "总人数",
            field: "zyghrs",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "同比数",
            field: "zyghbfb",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
        ]
      },
      {
        headerName: "男女挂号",
        field: "sex",
        marryChildren: true,
        headerClass: 'lastCol',
        children: [
          {
            headerName: "男",
            field: "malers",
            width: 100,
            headerClass: 'cellTd bgEc',
          },
          {
            headerName: "女",
            field: "female",
            width: 100,
            headerClass: 'cellTd bgEc lastCol',
            cellClass: 'lastCol',
          },
        ]
      },
    );
    return bigColumns;
  };
  //小的表格创建列规则
  createColDefs = (type) => {
    const {mergeArray, setDifId, setColumnsCom, backArr} = com;
    let {rowData, cheNum, times, selHos, hosName, deptName, timeType} = this.state;
    let arr = setColumnsCom(selHos, hosName, deptName, times, timeType, rowData, cheNum);
    switch (type) {
      case 'total':
        let totalLegText = ['门诊', '急诊', '门诊同比'];
        let totalLegName = ['mzghzrs', 'jzghzrs', 'mzghbfb'];
        let totalLeg = mergeArray(totalLegText, totalLegName);
        let totalText = ['门诊'];
        arr = backArr(setDifId(arr, 'total'), totalLeg, totalText);
        return arr;
        break;
      case 'firDoor':
        let doorFirstLegText = ['首次就诊', '门诊'];
        let doorFirstLegName = ['mzscjzrs', 'mzscjzbfb'];
        let doorFirstLeg = mergeArray(doorFirstLegText, doorFirstLegName);
        arr = backArr(setDifId(arr, 'firDoor'), doorFirstLeg);
        return arr;
        break;
      case 'age':
        let ageText = ['0-2岁', '2-22岁', '22-42岁', '42-62岁', '62岁以上'];
        let ageLegName = ['mznl1', 'mznl2', 'mznl3', 'mznl4', 'mznl5'];
        let ageLeg = mergeArray(ageText, ageLegName);
        arr = backArr(setDifId(arr, 'age'), ageLeg);
        return arr;
        break;
      case 'rate':
        let rateText = ['市外医保', '市内非医保', '市外非医保', '市职工医保', '城乡居民', '离休干部'];
        let rateLegName = ['mzfylbswyb', 'mzfylbsnfyb', 'mzfylbswfyb', 'mzfylbszgyb', 'mzfylbcxjm', 'mzfylblxgb'];
        let rateLeg = mergeArray(rateText, rateLegName);
        arr = backArr(setDifId(arr, 'rate'), rateLeg);
        return arr;
        break;
      case 'chi':
        let chiText = ['总人数', '同分比'];
        let chiLegName = ['zyghrs', 'zyghbfb'];
        let chiLeg = mergeArray(chiText, chiLegName);
        arr = backArr(setDifId(arr, 'chi'), chiLeg);
        return arr;
        break;
      case 'sex':
        let sexText = ['男', '女'];
        let sexLegName = ['malers', 'female'];
        let sexLeg = mergeArray(sexText, sexLegName);
        arr = backArr(setDifId(arr, 'sex'), sexLeg);
        return arr;
        break;
    }
  };
  //点击切换图表(小）
  toggleChart = (type) => {
    let {isDetail, selHos, timeType, timeFrom, timeTo} = this.state;
    const {selBeforeCheck} = com;
    if (!selBeforeCheck(selHos, timeType, timeFrom, timeTo)) return false;
    switch (type) {
      case 'total':
        if (!isDetail) {
          this.selSmallDetail('total')
        } else {
          this.setState({
            rowData: this.state.toRowData,
            total: !this.state.total,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              totalColumnDefs: this.createColDefs('total'),
              [type + 'Loading']: false
            })
          });
        }
        break;
      case 'firDoor':
        if (!isDetail) {
          this.selSmallDetail('firDoor')
        } else {
          this.setState({
            firDoor: !this.state.firDoor,
            rowData: this.state.toRowData,
            [type + 'Loading']: true,
          }, () => {
            this.setState({
              firDoorColumnDefs: this.createColDefs('firDoor'),
              [type + 'Loading']: false
            })
          });
        }

        break;
      case 'age':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            age: !this.state.age,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              ageColumnDefs: this.createColDefs('age'),
              [type + 'Loading']: false
            })
          });
        }

        break;
      case 'rate':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            rate: !this.state.rate,
            rowData: this.state.toRowData,
            [type + 'Loading']: true
          }, () => {
            this.setState({
              rateColumnDefs: this.createColDefs('rate'),
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
      case 'sex':
        if (!isDetail) {
          this.selSmallDetail(type)
        } else {
          this.setState({
            sex: !this.state.sex,
            rowData: this.state.toRowData,
            [type + 'Loading']: true,
          }, () => {
            this.setState({
              sexColumnDefs: this.createColDefs('sex'),
              [type + 'Loading']: false
            })
          });
        }
        break;
    }
  };
  //渲染canvas
  renderCanvas = (selData) => {
    const {getTimes, path, mergeArray, getSeries, getDSeries, getKindSum, itemHeight, itemWidth, tooltip, axisTooltip, splitLine} = com;
    let times = getTimes(selData);
    //总人数统计
    let totalLegText = ['门诊', '急诊', '门诊同比'];
    let totalLegName = ['mzghzrs', 'jzghzrs', 'mzghbfb'];
    let totalLeg = mergeArray(totalLegText, totalLegName);
    let sumLeg = [{text: '门诊', sum: '总和'}, {text: '急诊', sum: '总和'}];
    let mArr = getKindSum(totalLeg, sumLeg, times, selData);
    let speLegs = [{type: 'line', text: '门诊同比'}];
    totalLeg = mergeArray(mArr, totalLegName);
    let totalSeries = getSeries(totalLeg, times, selData, 'bar', speLegs, 'yAxisIndex');
    let totalPeOption = {
      color: ['#3C9AE4', '#FF8787', '#2E8D87'],//图例颜色
      legend: {
        itemWidth,
        itemHeight,
        data: [
          {name: mArr[0], icon: path},
          {name: mArr[1], icon: path},
          {name: mArr[2]},
        ]
      },
      tooltip: tooltip,
      xAxis: [
        {
          type: 'category',
          data: times,
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '总人数',
          minInterval: 1,//保证坐标轴刻度为整数
          max: 'dataMax',
          min: 0,
          splitLine: splitLine,
        },
        {
          type: 'value',
          name: '同比分',
          min: 'dataMin',
          max: 'dataMax',
          splitLine: splitLine,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      grid: {
        bottom: '3%',
        containLabel: true
      },
      series: totalSeries
    };
    //门诊首次就诊人数
    let doorFirText = ['首次就诊', '门诊'];
    let doorFirLegName = ['mzscjzrs', 'mzscjzbfb'];
    let doorLeg = mergeArray(doorFirText, doorFirLegName);
    let doorSum = [{text: '首次就诊', sum: '总和'}];
    let doorFirSum = getKindSum(doorLeg, doorSum, times, selData);
    let doorSpe = [{type: 'line', text: '门诊'}];
    doorLeg = mergeArray(doorFirSum, doorFirLegName);
    let doorFirSeries = getSeries(doorLeg, times, selData, 'bar', doorSpe, 'yAxisIndex');
    let doorFirstOption = {
      color: ['#3C9AE4', '#2E8D87'],//图例颜色
      legend: {
        itemHeight,
        itemWidth,
        data: [{name: doorFirSum[0], icon: path}, doorFirSum[1]]
      },
      tooltip: tooltip,
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
          max: 'dataMax',
          min: 0,
          splitLine: splitLine,
        },
        {
          type: 'value',
          name: '同比分',
          min: 'dataMin',
          max: 'dataMax',
          splitLine: splitLine,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      grid: {
        bottom: '3%',
        containLabel: true
      },
      series: doorFirSeries
    };
    //门诊不同年龄段
    let ageText = ['0-2岁', '2-22岁', '22-42岁', '42-62岁', '62岁以上'];
    let ageLegName = ['mznl1', 'mznl2', 'mznl3', 'mznl4', 'mznl5'];
    let ageLeg = mergeArray(ageText, ageLegName);
    let sumAgeText = [{text: '0-2岁', sum: '总数'}, {text: '2-22岁', sum: '总数'}, {
      text: '22-42岁',
      sum: '总数'
    }, {text: '42-62岁', sum: '总数'}, {text: '62岁以上', sum: '总数'}];
    let ageSum = getKindSum(ageLeg, sumAgeText, times, selData);
    ageLeg = mergeArray(ageSum, ageLegName);
    let ageSeries = getSeries(ageLeg, times, selData, 'line');
    let ageOption = {
      tooltip: tooltip,
      color: ['#FF8787', '#3CB071', '#3C9AE4', '#2E8D87', '#6414D0'],//图例颜色
      legend: {
        data: ageSum,
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
          name: '总人数',
          minInterval: 1,//保证坐标轴刻度为整数
          max: 'dataMax',
          min: 0,
          splitLine: splitLine,
        },
      ],
      series: ageSeries
    };
    //门诊费用、类别率
    let rateText = ['市外医保', '市内非医保', '市外非医保', '市职工医保', '城乡居民', '离休干部'];
    let rateLegName = ['mzfylbswyb', 'mzfylbsnfyb', 'mzfylbswfyb', 'mzfylbszgyb', 'mzfylbcxjm', 'mzfylblxgb'];
    let rateLeg = mergeArray(rateText, rateLegName);
    let rateSeries = getDSeries(rateLeg, times, selData, 'bar');
    let rateOption = {
      tooltip: axisTooltip,
      grid: {
        bottom: '3%',
        top: '25%',
        containLabel: true
      },
      color: ['#FF8787', '#3CB071', '#AF14D0', '#3C9AE4', '#2E8D87', '#6414D0'],//图例颜色
      legend: {
        itemWidth,
        itemHeight,
        data: [{name: rateText[0], icon: path}, {name: rateText[1], icon: path},
          {name: rateText[2], icon: path}, {name: rateText[3], icon: path},
          {name: rateText[4], icon: path}, {name: rateText[5], icon: path}]
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
          name: '百分比',
          min: 'dataMin',
          splitLine: splitLine,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: rateSeries
    };
    //中医挂号
    let chiText = ['总人数', '同分比'];
    let chiLegName = ['zyghrs', 'zyghbfb'];
    let chiLeg = mergeArray(chiText, chiLegName);
    let sumChiText = [{text: '总人数', sum: '12月总和'}, {text: '同分比', sum: '总同比'}];
    let chiSum = getKindSum(chiLeg, sumChiText, times, selData);
    chiLeg = mergeArray(chiSum, chiLegName);
    let chiSpe = [{type: 'line', text: chiSum[1]}];
    let chiSeries = getSeries(chiLeg, times, selData, 'bar', chiSpe, 'yAxisIndex');
    let chiOption = {
      tooltip: tooltip,
      color: ['#7DAAAF', '#BE6868'],//图例颜色
      legend: {
        itemWidth,
        itemHeight,
        data: [{name: chiSum[0], icon: path}, {name: chiSum[1]}]
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
          min: 0,
          minInterval: 1,//保证坐标轴刻度为整数
          max: 'dataMax',
          splitLine: splitLine,
        },
        {
          type: 'value',
          name: '同分比',
          min: 'dataMin',
          max: 'dataMax',
          splitLine: splitLine,
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      grid: {
        bottom: '3%',
        containLabel: true
      },
      series: chiSeries
    };
    //男女挂号
    let sexText = ['男', '女'];
    let sexLegName = ['malers', 'female'];
    let sexLeg = mergeArray(sexText, sexLegName);
    let sumSexText = [{text: '男', sum: '总人数'}, {text: '女', sum: '总人数'}];
    let sexSum = getKindSum(sexLeg, sumSexText, times, selData);
    sexLeg = mergeArray(sexSum, sexLegName);
    let sexSeries = getSeries(sexLeg, times, selData, 'bar');
    let sexOption = {
      tooltip: tooltip,
      color: ['#3C9AE4', '#FF8787'],
      legend: {
        itemHeight,
        itemWidth,
        data: [{name: sexSum[0], icon: path}, {name: sexSum[1], icon: path}]
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: times
        },
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1,//保证坐标轴刻度为整数
          max: 'dataMax',
          min: 0,
          splitLine: splitLine,
        }
      ],
      grid: {
        bottom: '3%',
        containLabel: true
      },
      series: sexSeries
    };
    //设置option
    this.setState({
      show: true,
      times: times,
      totalPeOption: totalPeOption,
      doorFirstOption: doorFirstOption,
      ageOption: ageOption,
      rateOption: rateOption,
      chiOption: chiOption,
      sexOption: sexOption
    });
  };
  /**
   * 获取医院和科室字典表
   * @param val
   * @param key
   */
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
    let {loading, doorFirstOption, ageOption, rateOption, chiOption, sexOption, totalPeOption, agTable, total, firDoor, age, rate, chi, sex, show} = this.state;
    let {totalLoading, firDoorLoading, ageLoading, rateLoading, chiLoading, sexLoading} = this.state;
    return (<div className={css.hospitalExpenses}>
      <Spin spinning={loading}>
        <Search renderCanvas={this.renderCanvas} selData={this.selData} getHosName={this.getHosName}
                changeValue={this.changeValue}/>
        {
          agTable ?
            <div className={`${css.agTable}`}>
              <AgGridReact
                columnDefs={this.state.toColumnDefs}
                rowData={this.state.toRowData}
                overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                enableColResize={true}//能否改变列宽
                //   onCellClicked={this.rowClick}//行点击
                // getRowClass={this.getRowClass}//行样式
                headerHeight={28}//标题高
                rowHeight={28}//行高
                rowClass={css.row}
                rowSelection='single'//单行选择
                suppressCellSelection={false}//是否启用键盘导航
                // onCellContextMenu={this.getContextMenuItems}//右键菜单
                singleClickEdit={true}//单击启用编辑模式
                stopEditingWhenGridLosesFocus={true}//网格失去焦点时停止单元格编辑
                // enableCellChangeFlash={true}//值改变高亮显示
                animateRows={true}//行动画
                onGridReady={this.onGridReady}//基础api
                suppressScrollOnNewData={true}//获取新数据不会滚动到顶部
                suppressDragLeaveHidesColumns={true}//让列无法拖拽出去隐藏
                ref="agGridReact"
                //deltaRowDataMode={true}
                // getRowNodeId={(data)=> { return data.orderText; }}
              >
              </AgGridReact>
            </div>
            : <div className={css.rowContent}><Row gutter={12}>
            <Col className={`gutter-row ${css.padding0}`} span={12}>
              <Card title="总人数统计" option={totalPeOption} id="total" row={this.state.rowData} show={show}
                    column={this.state.totalColumnDefs} isAg={total}
                    toggleChart={this.toggleChart.bind(this)} loading={totalLoading}/>
            </Col>
            <Col className={`gutter-row `} span={12}>
              <Card title="门诊首次就诊人数" option={doorFirstOption} id="firDoor" show={show}
                    row={this.state.rowData}
                    column={this.state.firDoorColumnDefs} isAg={firDoor}
                    toggleChart={this.toggleChart.bind(this)} loading={firDoorLoading}/>
            </Col>
            <Col className={`gutter-row ${css.padding0}`} span={12}>
              <Card title="门诊不同年龄段人数" option={ageOption} id="age" row={this.state.rowData} show={show}
                    column={this.state.ageColumnDefs} isAg={age}
                    toggleChart={this.toggleChart.bind(this)} loading={ageLoading}/>
            </Col>
            <Col className={`gutter-row `} span={12}>
              <Card title="门诊费用类别、率" option={rateOption} id="rate" row={this.state.rowData} show={show}
                    column={this.state.rateColumnDefs} isAg={rate}
                    toggleChart={this.toggleChart.bind(this)} loading={rateLoading}/>
            </Col>
            <Col className={`gutter-row ${css.padding0}`} span={12}>
              <Card title="中医挂号人数" option={chiOption} id="chi" row={this.state.rowData} show={show}
                    column={this.state.chiColumnDefs} isAg={chi}
                    toggleChart={this.toggleChart.bind(this)} loading={chiLoading}/>
            </Col>
            <Col className={`gutter-row ${css.marginBottom}`} span={12}>
              <Card title="男女挂号人数" option={sexOption} id="sex" row={this.state.rowData} show={show}
                    column={this.state.sexColumnDefs} isAg={sex}
                    toggleChart={this.toggleChart.bind(this)} loading={sexLoading}/>
            </Col>
          </Row>
          </div>}</Spin>
    </div>)
  }
}
 
 
 