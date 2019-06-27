/**
 * description:左侧菜单导航
 * author: mou
 * time:2017-12-14
 */
import React from 'react'
import {Menu, Icon, message} from 'antd';
const SubMenu = Menu.SubMenu;
import api from '../api'
import moment from 'moment'
import css from './../eleMedical.scss'
export class Menus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openKeys: [],
      selectKey: [],
      clinicRecList: [],
      arr: [],
      activeIndex: null,
      rootSubmenuKeys: []
    }
  };

  componentWillMount() {
    let rootSubmenuKeys = [];
    this.getSubMenus(this.props.data, rootSubmenuKeys);
    let arr = this.cleaRepeat(rootSubmenuKeys);
    this.setState({
      data: this.props.data,
      clinicRecList: this.props.clinicRecList,
      patientInfo: this.props.patientInfo,
      activeIndex: this.props.activeIndex,
      rootSubmenuKeys: arr
    });
  }

  componentWillReceiveProps(next) {
    let rootSubmenuKeys = [];
    this.getSubMenus(next.data, rootSubmenuKeys);
    let arr = this.cleaRepeat(rootSubmenuKeys);
    this.setState({
      data: next.data,
      clinicRecList: next.clinicRecList,
      patientInfo: next.patientInfo,
      activeIndex: next.activeIndex,
      rootSubmenuKeys: arr
    });
  }

  getSubMenus = (data, arr) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].child && data[i].child.length) {
        arr.push(data[i].title);
        this.getSubMenus(data[i].child, arr)
      }
    }
  };
  cleaRepeat = (data) => {
    let res = [];
    let json = {};
    for (let i = 0; i < data.length; i++) {
      if (!json[data[i]]) {
        res.push(data[i]);
        json[data[i]] = 1;
      }
    }
    return res;
  };
  titleClick = (item) => {
    const {clinicRecList, patientInfo, activeIndex,data} = this.state;
    const treeData=data;
    let arr = item.key.split(',');
    console.log(arr);
    let num = 0;
    const {loadData, loadData1} = api;
    switch (arr[0]) {
      case '住院病历':
        let type, date;
        if (activeIndex === '1') {
          type = arr[1].substring(0, 2);
          date = arr[1].substring(2, arr[1].indexOf('\n'));
          num = 3;
        } else {
          type = arr[1].substring(0, arr[1].indexOf('\n'));
          let begin = arr[3].indexOf('.');
          let y = arr[3].substring(0, begin);
          let yearMotnDay = y + '.' + arr[2];
          date = moment(yearMotnDay).format('YYYY-MM-DD');
          if (activeIndex === '2') {
            num = 4;
          } else {
            num = 5;
          }
        }
        type = 'R';
        let obj = {};
        for (let i = 0; i < clinicRecList.length; i++) {
          if (clinicRecList[i].clinicType === type && clinicRecList[i].timeFrom === date) {
            obj.hospitalCode = clinicRecList[i].hospitalCode;
            obj.patientId = clinicRecList[i].patientId;
          }
        }
        obj.empi = patientInfo.patientInfo.empi;
        let param = {
          action: 'mrl',
          message: obj,
        };
        loadData1(param, response => {
          if (response.success) {
            let data = response.data;
            if (data && data.length) {
              for (let i = 0; i < data.length; i++) {
                data[i].title = data[i].topic;
                data[i].key = data[i].topic + ',' + data[i].src + ',' + data[i].fileUniqueId + ',' + '住院病历'
              }
              this.props.changeMenu(activeIndex, arr, data, num,treeData,1)
            } else {
              this.props.changeMenu(activeIndex, arr, [], num,treeData,1);
              message.warning('暂无住院病历列表')
            }
          } else {
            this.props.changeMenu(activeIndex, arr, [], num,treeData,1);
            console.error("response error", response);
          }

        });
        break;
      case '检查':
        let type1;
        let date1;
        if (activeIndex === '1') {
          type1 = arr[1].substring(0, 2);
          date1 = arr[1].substring(2, arr[1].indexOf('\n'));
        } else {
          type1 = arr[1].substring(0, arr[1].indexOf('\n'));
          let begin = arr[3].indexOf('.');
          let y = arr[3].substring(0, begin);
          let yearMotnDay = y + '.' + arr[2];
          date1 = moment(yearMotnDay).format('YYYY-MM-DD');
          if (activeIndex === '2') {
            num = 4;
          } else {
            num = 5;
          }
        }
        if (type1 === '住院') {
          type1 = 'R'
        } else if (type1 === '门诊') {
          type1 = 'M'
        }

        let obj1 = {};
        let param1 = {};
        for (let i = 0; i < clinicRecList.length; i++) {
          if (clinicRecList[i].clinicType === type1 && clinicRecList[i].timeFrom === date1) {
            obj1.hospitalCode = clinicRecList[i].hospitalCode;
            obj1.patientId = clinicRecList[i].patientId;
          }
        }
        if (type1 === 'M') {
          obj1.outPatientNumber = obj1.patientId;
          delete obj1.patientId;
          param1.action = 'outpExam';
          param1.message = obj1;
        } else {
          param1.action = 'inpExamMaster';
          param1.message = obj1;
        }
        loadData(param1, response => {
          if (response.success) {
            let data = response.data;
            if (data && data.length) {
              for (let i = 0; i < data.length; i++) {
                data[i].title = data[i].examClass + moment(data[i].reqDateTime).format('YYYY-MM-DD');
                data[i].key = JSON.stringify(data[i]) + ',' + i + ',' + '检查'
              }
              this.props.changeMenu(activeIndex, arr, data, num,treeData,1)
            } else {
              this.props.changeMenu(activeIndex, arr, [], num,treeData,1);
              message.warning('暂无检查列表')
            }
          } else {
            this.props.changeMenu(activeIndex, arr, [], num,treeData,1);
            console.error("response error", response);
          }

        });
        break;
      case '检验':
        let type2, date2;
        if (activeIndex === '1') {
          type2 = arr[1].substring(0, 2);
          date2 = arr[1].substring(2, arr[1].indexOf('\n'));
          num = 3
        } else {
          let begin = arr[3].indexOf('.');
          let y = arr[3].substring(0, begin);
          let yearMotnDay = y + '.' + arr[2];
          type2 = arr[1].substring(0, arr[1].indexOf('\n'));
          date2 = moment(yearMotnDay).format('YYYY-MM-DD');
          if (activeIndex === '2') {
            num = 4;
          } else {
            num = 5;
          }
        }
        if (type2 === '住院') {
          type2 = 'R'
        } else if (type2 === '门诊') {
          type2 = 'M'
        }

        let obj2 = {};
        let param3 = {};
        for (let i = 0; i < clinicRecList.length; i++) {
          if (clinicRecList[i].clinicType === type2 && clinicRecList[i].timeFrom === date2) {
            obj2.hospitalCode = clinicRecList[i].hospitalCode;
            obj2.patientId = clinicRecList[i].patientId;
          }
        }
        if (type2 === 'M') {
          param3.action = 'outpLabMaster';
          param3.message = {
            hospitalCode: obj2.hospitalCode,
            outPatientNumber: obj2.patientId
          };
        } else {
          param3.action = 'inpLabMaster';
          param3.message = obj2
        }
        loadData(param3, response => {
          if (response.success) {
            let data = response.data;
            if (data && data.length) {
              for (let i = 0; i < data.length; i++) {
                data[i].title = data[i].specimen + moment(data[i].requestedDateTime).format('YYYY-MM-DD');
                data[i].key = data[i].specimen + ',' + JSON.stringify(data[i]) + ',' + i + ',' + '检验'
              }
              this.props.changeMenu(activeIndex, arr, data, num,treeData,0)
            } else {
              this.props.changeMenu(activeIndex, arr, [], num,treeData,0);
              message.warning('暂无检验列表')
            }
          } else {
            this.props.changeMenu(activeIndex, arr, [], num,treeData,0);
            console.error("response error", response);
          }

        });
        break;
    }
    this.setState({
      arr: arr,
    },()=>{
      console.log(this.state.arr);
    })
  };
  /**递归渲染dom*/
  children = (child, parTitle) => {
    return child.map((row, index) => {
      if (row.child) {
        return <SubMenu key={row.title + ',' + parTitle} onTitleClick={this.titleClick}
                        title={<span title={row.title}><i
                          className={`icon iconfont ${row.icon} ${css.icon}`}></i>{row.title}</span>}>
          {this.children(row.child, row.title + ',' + parTitle)}
        </SubMenu>
      } else {
        return <Menu.Item key={row.key ? row.key : row.title + ',' + parTitle}><span
          title={row.title}>{row.title}</span></Menu.Item>
      }
    })
  };
  /**递归渲染dom*/
  menuNode = () => {
    const {data} = this.state;
    return data.map((parent, index) => {
      return <SubMenu key={parent.title}
                      title={<span title={parent.title}><i
                        className={`icon iconfont ${parent.icon} ${css.icon}`}></i>{parent.title}</span>}>
        {parent.child && this.children(parent.child, parent.title)}
      </SubMenu>
    })
  };
  //被选中
  onSelect = (item) => {
    const {data, arr} = this.state;
    let begin = item.key.indexOf('{');
    let end = item.key.indexOf('}');
    let row = item.key.substring(begin, end + 1);
    let title = item.key.substring(item.key.length, item.key.length - 2);
    if (title === '检查') {
      this.props.content('检查', row)
    } else if (title === '检验') {
      this.props.content('检验', row, arr)
    } else {
      let begin2 = item.key.indexOf(',');
      let t = item.key.substring(0, begin2);
      this.props.content(t, item.key);
    }
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({openKeys});
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Menu
        mode="inline"
        multiple={false}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        inlineIndent={10}
        onClick={this.onSelect.bind(this)}
      >
        {this.menuNode()}
      </Menu>
    )
  }
}
 
 
 