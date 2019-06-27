/**
 * 创建人：谢小慧
 * 时间：2017/9/15
 * 描述：单医院医改数据查询
 */
import React from 'react';
import  qs from 'qs';
import moment from "moment";
import {Button, DatePicker, Input, Select, message, Card,  Spin, Table, Col, Row} from 'antd';
import {CardContainer, CardHeader, CardText, FlexContent} from '../../common/card';
import {EchartContainer} from '../../common/echarts/echartContainer';
import {NullInfo} from '../../common/nullInfo';
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const zyLegend=["床位"," 检查","化验","治疗","手术","护理","卫生材料","药品","其他住院"];
const mzLegend=["诊察费","检查","化验","治疗","手术","卫生材料","药品","其他门诊"];
const otherLegend=["医保报销","个人自付","非医保患者","高血压特病患者","糖尿病特病患者","血透析患者"]
export class SingleHospitalDetail extends React.Component {
  constructor(props) {
    super(props);
    // 所有医院
    this.param = {
      hospitalCode: '',
      timeFrom: '',
      timeTo: ''
    }
    this.state = {
      loading: false,
      timeType:"day",
      format:"YYYY-MM-DD",
      hospitalList: []
    };
    this.tableColumns = [
      {
        title: '费用名称',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      }, {
        title: '费用',
        dataIndex: 'cost',
        key: 'cost',
        width: 70,
      }
    ];
    this.getHospital();
  }

  /**
   * 查询所有医院
   */
  getHospital = () => {
    this.hospitalList = [];
    fetch("/dict/findAllHospital", {method: "POST"}).then(response => {
      if (response.success) {
        this.setState({hospitalList: response.data});
      }
    });
  }
  /**
   * 值改变
   */
  changeParam = (name, value) => {
    let time=new Date().getFullYear();
    if (name==="yearTime"){
        this.param["timeFrom"]=parseInt(time)-parseInt(value);
        this.param["timeTo"]=time;
    }else{
      if (name === "timeFrom" || name === "timeTo") {
        value = moment(value).format(this.state.format);
      }
      this.param[name] = value;
    }
  }
  //类型不同,时间控件的内容显示不同
  changeType = (value) => {
   if(value==="year"){
     let time=new Date().getFullYear();
     this.param["timeFrom"]=parseInt(time)-2;
     this.param["timeTo"]=time;
   }else{
     this.param["timeFrom"]="";
     this.param["timeTo"]="";
   }
    this.setState({"timeType": value, "format": (value === "month" ? "YYYY-MM" : "YYYY-MM-DD")});
  }
  validateValue= () =>{
    if (!this.param["hospitalCode"]||!this.param["timeFrom"]||!this.param["timeTo"]){
      message.error("医院，开始时间和结束时间必须填写");
      return false;
    }
    //数据效验,day:最大查询15天,month 最多查询15 个月
    let timeFrom=new Date(this.param["timeFrom"]);
    let timeTo=new Date(this.param["timeTo"]);
    if(timeFrom>timeTo){
      message.error("开始时间不能大于结束时间");
      return false;
    }
    /*if (this.state["timeType"]==="month"&&!(timeTo.getTime()-timeFrom.getTime())<=5*30*24*60*60*1000){
      message.error("按月查询不能查询查过12月");
      return false;
    }*/
    console.log(timeFrom,timeTo);
  /*  if(this.state["timeType"]==="day"&&!(timeTo.getTime()-timeFrom.getTime())<=15*24*60*60*1000){
      message.error("按天查询不能查询查过15天");
      return false;
    }*/
    return true;
  }
  // 查询信息
  queryData =() =>{
    if(this.validateValue()){
      // 查询总的数据，再查询明细数据
      this.param["type"]=this.state["timeType"];
      let  zyName=[
        {name:"床位",propName:"zyCwIncome",data:[], type: 'line'},
        {name:"检查",propName:"zyJcIncome",data:[], type: 'line'},
        {name:"化验",propName:"zyHyIncome",data:[], type: 'line'},
        {name:"治疗",propName:"zyZlIncome",data:[], type: 'line'},
        {name:"手术",propName:"zySsIncome",data:[], type: 'line'},
        {name:"护理",propName:"zyHlIncome",data:[], type: 'line'},
        {name:"卫生材料",propName:"zyWsclIncome",data:[], type: 'line'},
        {name:"药品",propName:"zyYpIncome",data:[], type: 'line'},
        {name:"其他住院",propName:"qitaIncome",data:[], type: 'line'}
      ];
      let  mzName=[
        {name:"诊察费",propName:"mzZcfIncome",data:[], type: 'line'},
        {name:"检查",propName:"mzJcIncome",data:[], type: 'line'},
        {name:"化验",propName:"mzHyIncome",data:[], type: 'line'},
        {name:"治疗",propName:"mzZlIncome",data:[], type: 'line'},
        {name:"手术",propName:"mzSsIncome",data:[], type: 'line'},
        {name:"卫生材料",propName:"mzWsclIncome",data:[], type: 'line'},
        {name:"药品",propName:"mzYpIncome",data:[], type: 'line'},
        {name:"其他门诊",propName:"mzQtIncome",data:[], type: 'line'}
      ];
      let  otherName=[
        {name:"医保报销",stack: '门诊',propName:"mzMzybbxIncome",data:[],type:'bar'},
        {name:"个人自付",stack: '门诊',propName:"mzMzgrzfIncome",data:[],type:'bar'},
        {name:"非医保患者",stack: '门诊',propName:"mzMzfybIncome",data:[],type:'bar'},
        {name:"高血压特病患者",stack: '门诊',propName:"mzGxytbIncome",data:[],type:'bar'},
        {name:"糖尿病特病患者",stack: '门诊',propName:"mzTnbtbIncome",data:[],type:'bar'},
        {name:"血透析患者",stack: '门诊',propName:"mzXtxtbIncome",data:[],type:'bar'},
        {name:"医保报销",stack: '住院',propName:"zyMzybbxIncome",data:[],type:'bar'},
        {name:"个人自付",stack: '住院',propName:"zyMzgrzfIncome",data:[],type:'bar'},
        {name:"非医保患者",stack: '住院',propName:"zyMzfybIncome",data:[],type:'bar'},
        {name:"高血压特病患者",stack: '住院',propName:"zyGxytbIncome",data:[],type:'bar'},
        {name:"糖尿病特病患者",stack: '住院',propName:"zyTnbtbIncome",data:[],type:'bar'},
        {name:"血透析患者",stack: '住院',propName:"zyXtxtbIncome",data:[],type:'bar'}
      ];
      fetch("/medicalReform/HspYg/getSingleHositalInfo",
          {method: "POST",body:qs.stringify(this.param)}).then(response => {
            if(response.success){
              let data=Object.entries(response.data[this.param["hospitalCode"].replace(";","")]);
              data.sort(function(a, b) {
                let at=new Date(a[0]);
                let bt=new Date(b[0]);
                return at>bt;
              });
              let mzData=0;
              let zyData=0;
              let xValue=[];// x轴数据
              for (let a of data) {
                let key=a[0];
                xValue.push(key);
                let value=a[1]?a[1]:{};
                mzData+=value["mzIncome"]?value["mzIncome"]:0;
                zyData+=value["zyIncome"]?value["zyIncome"]:0;
                for(let d of mzName){
                    let v=value[d["propName"]];
                    d["data"].push(v?v:0);
                }
                for(let d of zyName){
                  let v=value[d["propName"]];
                  d["data"].push(v?v:0);
                }
                for(let d of otherName){
                  let v=value[d["propName"]];
                  d["data"].push(v?v:0);
                }
              }
              this.setState({
                mzData:mzData.toFixed(2),
                zyData:zyData.toFixed(2),
                mzOption:this.initMzDetailInfo(xValue,zyName),
                zyOption:this.initZyDetailInfo(xValue,mzName),
                mzAndZy:this.initOtherInfo(xValue,otherName)
              });
            }else{
              message.error("内容加载失败");
            }
      });
    }
  }
   // 其他信息
  initOtherInfo = (xData,otherName) =>{
    return {
      tooltip : {
        trigger: 'axis',
        textStyle:{
          fontSize:12,
          fontFamily: 'Microsoft YaHei'
        },
        formatter:function(data){
            let mzHtml="门诊:";
            let zyHtml="</br>住院:";
            for(let  a of data){
              if(a.seriesId.indexOf("0")>=0){
                mzHtml+="</br>&nbsp;&nbsp;"+a.seriesName+":"+parseFloat(a.value).toFixed(4)+"元";
              }else{
                zyHtml+="</br>&nbsp;&nbsp;"+a.seriesName+":"+parseFloat(a.value).toFixed(4)+"元";
              }
            }
            return mzHtml+zyHtml;
        },
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:otherLegend,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'value'
        }
      ],
      yAxis : [
        {
          type : 'category',
          data : xData
        }
      ],
      series:otherName
    }
  }
  // 门诊信息
  initMzDetailInfo = (xData,zyName) =>{
    return {
      tooltip : {
        trigger: 'axis',
        formatter:function(data){
          let html="";
          for(let a=0;a<data.length;a++){
            if(a!=0&&(a-1)%2==0){
              html+="</br>";
            }
            html+="&nbsp;&nbsp;"+data[a].seriesName+":"+parseFloat(data[a].value).toFixed(4)+"元";
          }
          return html;
        },
        textStyle:{
          fontSize:12,
          fontFamily: 'Microsoft YaHei'
        },
      },
      legend: {
        data:zyLegend,
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : xData,
          axisLabel:{
            interval: 0
          }
        }
      ],
      grid:{
        top:'10%',
        bottom:'10%'
      },
      yAxis : [
        {
          type : 'value'
        }
      ],
      series:zyName
    }
  }
  // 住院信息
  initZyDetailInfo = (xData,zyName) =>{
    return {
      tooltip : {
        trigger: 'axis',
        formatter:function(data){
          let html="";
          for(let a=0;a<data.length;a++){
            if(a!=0&&(a-1)%2==0){
              html+="</br>";
            }
            html+="&nbsp;&nbsp;"+data[a].seriesName+":"+parseFloat(data[a].value).toFixed(4)+"元";
          }
          return html;
        },
        textStyle:{
          fontSize:12,
          fontFamily: 'Microsoft YaHei'
        },
      },
      legend: {
        data:zyLegend,
      },
      grid:{
        bottom:20
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : xData
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series:zyName
    }
  }
  render() {
    let {mzOption, zyOption, loading, mzData, zyData, mzAndZy, hospitalList} = this.state;
    return (
      <div className="single-hospital-detail">
        {loading ?
          <div className="loading">
              <Spin size="large" tip="数据正在加载中..."/>
          </div>
          : ""}
          <FlexContent className="data-seach">
              <CardContainer>
                  <CardHeader title="单机构医疗收入"/>
                  <CardText>
                    <span className="item">
                        <label>医院名称：</label>
                        <Select
                          placeholder="医院名称"
                          showSearch
                          optionFilterProp="children"
                          style={{ width: 200 }}
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          onChange={this.changeParam.bind(this,'hospitalCode')}
                        >
                           {
                             hospitalList.map((v, i) => {
                               return <Option key={i} value={v.hospitalNo + ";"}>{v.abbreviation}</Option>
                             })
                           }
                        </Select>
                    </span>
                      <span className="item">
                        <label>类型：</label>
                        <Select
                          placeholder="类型"
                          style={{width: 70}}
                          defaultValue="day"
                          onChange={this.changeType}
                        >
                           <option value="year">年</option>
                           <option value="month">月</option>
                           <option value="day">日</option>
                        </Select>
                    </span>
                    {
                      this.state.timeType === "year" ?
                        <span className="item">
                                         <label>时间：</label>
                                         <Select
                                           placeholder="类型"
                                           style={{width: 150}}
                                           defaultValue="2"
                                           onChange={this.changeParam.bind(this,'yearTime')}
                                         >
                                            <option value="5">近五年</option>
                                            <option value="4">近四年</option>
                                            <option value="3">近三年</option>
                                            <option value="2">近两年</option>
                                        </Select>
                                    </span>
                        : (this.state.timeType === "month"?
                                        <span className="item">
                                            <label>时间：</label>
                                            <MonthPicker
                                              timePrecision={true}
                                              onChange={this.changeParam.bind(this, 'timeFrom')}
                                              format={this.state.format}/> ~
                                            <MonthPicker
                                              timePrecision={true}
                                              onChange={this.changeParam.bind(this, 'timeTo')}
                                              format={this.state.format}/>
                                         </span>
                                          :
                                            <span className="item">
                                              <label>时间：</label>
                                              <DatePicker
                                                timePrecision={true}
                                                onChange={this.changeParam.bind(this, 'timeFrom')}
                                                format={this.state.format}/> ~
                                              <DatePicker
                                                timePrecision={true}
                                                onChange={this.changeParam.bind(this, 'timeTo')}
                                                format={this.state.format}/>
                                           </span>)
                    }
                    <span className="item">
                        <Button type="primary" loading={loading} onClick={this.queryData}>查询</Button>
                    </span>
                  </CardText>
              </CardContainer>
          </FlexContent>
          <div className="data-content">
            <FlexContent className="column flex-grow3 left-data">
              <CardContainer className="sum-data flex-grow2">
                <Row type="flex" justify="space-around">
                  <Col span={10}>
                    <Card  className="mz-sum-data" title="门诊总费用" >¥{mzData?mzData:0}元</Card>
                  </Col>
                  <Col span={10}>
                    <Card className="zy-sum-data" title="住院总费用">¥{zyData?zyData:0}元</Card>
                  </Col>
                </Row>
              </CardContainer>
              <CardContainer className="flex-grow7">
                <CardHeader title="门诊/住院部分收入"/>
                <CardText>
                  {
                    mzOption ? <EchartContainer
                      type={1}
                      option={mzAndZy}
                      echartId="echar1"
                      showBtn={false}
                      alone={true}
                    /> : <NullInfo/>
                  }
                </CardText>
              </CardContainer>
            </FlexContent>
              <FlexContent className=" column flex-grow6">
                  <CardContainer>
                    <CardHeader title="门诊收入统计"/>
                    <CardText>
                      {
                        mzOption ? <EchartContainer
                          type={1}
                          option={mzOption}
                          echartId="echar2"
                          showBtn={false}
                          alone={true}
                        /> : <NullInfo/>
                      }
                    </CardText>
                  </CardContainer>
                  <CardContainer >
                    <CardHeader title="住院收入统计"/>
                    <CardText>
                      {zyOption ? <EchartContainer
                        type={1}
                        option={zyOption}
                        echartId="echar3"
                        showBtn={false}
                        alone={true}
                      /> : <NullInfo/>}
                    </CardText>
                  </CardContainer>
              </FlexContent>
          </div>
      </div>
    )
  }
}