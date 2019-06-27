/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-病案首页-患者病案信息-诊断信息
 */
import React, {Component} from 'react';
import qs from 'qs';
import moment from 'moment';

export class CostInfo extends Component{
  componentWillMount(){
    this.state= {
      costInfo: this.props.costInfo||{}
    }
  }
  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.costInfo !== nextState.costInfo){
      this.setState({
        costInfo : nextProps.costInfo||{}
      });
    }
  }
  render(){
    let {costInfo} = this.state;
    return (
      <table className="cost-info">
        <tbody>
          <tr>
            <th>住院费用（元）</th>
            <th>总费用</th>
            <td><input type="text" id="totalCosts" value={costInfo.totalCosts||0} disabled/></td>
            <th>自付金额</th>
            <td><input type="text" id="totalPayments" value={costInfo.totalPayments||0} disabled/></td>
          </tr>
          <tr>
            <th rowSpan="2">综合医疗服务类</th>
            <td>(1)一般医疗服务费</td>
            <td><input type="text" id="zhYbyl" value={costInfo.zhYbyl||0} disabled/></td>
            <td>(2)一般治疗操作费</td>
            <td><input type="text" id="zhYbzl" value={costInfo.zhYbzl||0} disabled/></td>
          </tr>
          <tr>
            <td>(3)护理费</td>
            <td><input type="text" id="zhHlHl" value={costInfo.zhHlHl||0} disabled/></td>
            <td>(4)其他费用</td>
            <td><input type="text" id="zhOtherQt" value={costInfo.zhOtherQt||0} disabled/></td>
          </tr>
          <tr>
            <th rowSpan="2">诊断类</th>
            <td>(5)病理诊断费</td>
            <td><input type="text" id="zdBlBl" value={costInfo.zdBlBl||0} disabled/></td>
            <td>(6)实验室诊断费</td>
            <td><input type="text" id="zdSysHy" value={costInfo.zdSysHy||0} disabled/></td>
          </tr>
          <tr>
            <td>(7)影像学诊断费</td>
            <td><input type="text" id="zdYxx" value={costInfo.zdYxx||0} disabled/></td>
            <td>(8)临床诊断项目费</td>
            <td><input type="text" id="zdLcxmJc" value={costInfo.zdLcxmJc||0} disabled/></td>
          </tr>
          <tr>
            <th rowSpan="2">治疗类</th>
            <td>(9)非手术治疗项目费</td>
            <td><input type="text" id="zlFsszlxm" value={costInfo.zlFsszlxm||0} disabled/></td>
            <td>临床物理治疗费</td>
            <td><input type="text" id="zlLcwlzl" value={costInfo.zlLcwlzl||0} disabled/></td>
          </tr>
          <tr>
            <td>(10)手术治疗费</td>
            <td><input type="text" id="zlSszl" value={costInfo.zlSszl||0} disabled/></td>
            <td>麻醉费</td>
            <td><input type="text" id="zlMzMz" value={costInfo.zlMzMz||0} disabled/></td>
          </tr>
          <tr>
            <th>{}</th>
            <td>手术费</td>
            <td><input type="text" id="zlSsSs" value={costInfo.zlSsSs||0} disabled/></td>
            <td/>
            <td/>
          </tr>
          <tr>
            <th>康复类</th>
            <td>(11)康复费</td>
            <td><input type="text" id="kfKfKfzl" value={costInfo.kfKfKfzl||0} disabled/></td>
            <td/>
            <td/>
          </tr>
          <tr>
            <th>西药类</th>
            <td>(13)西药费</td>
            <td><input type="text" id="xyXyXy" value={costInfo.xyXyXy||0} disabled/></td>
            <td>抗菌药物</td>
            <td><input type="text" id="xyKjywKjyw" value={costInfo.xyKjywKjyw||0} disabled/></td>
          </tr>
          <tr>
            <th>中医类</th>
            <td>(12)中医治疗费</td>
            <td><input type="text" id="zyZyzlZyzl" value={costInfo.zyZyzlZyzl||0} disabled/></td>
            <td/>
            <td/>
          </tr>
        </tbody>
      </table>
    )
  }
}
