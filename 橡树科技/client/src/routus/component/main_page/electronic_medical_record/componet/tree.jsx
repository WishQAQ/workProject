/**
 * description:树形控件
 * author: mou
 * time:2017-12-12
 */
import React from 'react'
import {Tree, message} from 'antd'
import api from '../api'
import moment from 'moment'
const TreeNode = Tree.TreeNode;
export class MyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],//渲染的数据
      clinicRecList: [],//返回的数据
      patientInfo: '',
      activeIndex: '',//当前是哪个面板
      defaultExpandedKeys: [],
      selectedKeysArr: [],
    }
  };

  componentWillMount() {
    this.setState({
      treeData: this.props.treeData,
      clinicRecList: this.props.clinicRecList,
      patientInfo: this.props.patientInfo,
      activeIndex: this.props.activeIndex,
    })
  }

  componentWillReceiveProps(next) {
    this.setState({
      treeData: next.treeData,
      clinicRecList: this.props.clinicRecList,
      patientInfo: this.props.patientInfo,
      activeIndex: this.props.activeIndex,
    })
  }

  onSelect = (selectedKeys, info) => {
    let subTitle, patientId, arr, split, param = {};
    const {clinicRecList, treeData, patientInfo} = this.state;
    const {loadData, loadData1} = api;
    this.onExpand(info);
    if (selectedKeys.length > 0) {
      //判断点击的是否是某个页面
      let isSon = this.getSon(selectedKeys[0], ',', 1);
      if (isSon === -1) {
        //否
        //判断是否点击的是检查，检验，住院病历
        if (selectedKeys[0].indexOf('\n')) {
          let split = selectedKeys[0].indexOf('\n');
          subTitle = selectedKeys[0].substring(0, split);
          patientId = selectedKeys[0].substring(split, selectedKeys[0].length);
          arr = selectedKeys[0].split('\n')
        }
        if (subTitle === '住院病历') {
          param.message = this.backParam(clinicRecList, patientId, 'hospitalCode', 'patientId');
          param.message.empi = patientInfo.patientInfo.empi;
          param.action = 'mrl';
          this.loadMedList(treeData, param, arr[1], subTitle)
        }
        else if (subTitle === '检查') {
          if (arr[2] === 'M') {
            param.message = this.backParam(clinicRecList, arr[1], 'hospitalCode', 'outPatientNumber');
            param.action = 'outpExam'
          } else {
            param.message = this.backParam(clinicRecList, arr[1], 'hospitalCode', 'patientId');
            param.action = 'inpExamMaster';
          }
          //arr[1]  patientId     arr[0]   检查、检验
          this.loadData(treeData, param, arr[1], arr[0], subTitle, 'examClass', 'reqDateTime');
        }
        else if (subTitle === '检验') {
          if (arr[2] === 'M') {
            param.message = this.backParam(clinicRecList, arr[1], 'hospitalCode', 'outPatientNumber');
            param.action = 'outpLabMaster'
          } else {
            param.message = this.backParam(clinicRecList, arr[1], 'hospitalCode', 'patientId');
            param.action = 'inpLabMaster';
          }
          this.loadData(treeData, param, arr[1], arr[0], subTitle, 'specimen', 'requestedDateTime');
        }
      } else {
        //是
        let regex = new RegExp('\n', 'g');
        let moreSon = selectedKeys[0].match(regex);
        //判断是否检查检验子页
        if (moreSon.length && moreSon.length === 1) {
          split = selectedKeys[0].indexOf('\n');
          subTitle = selectedKeys[0].substring(0, split);
          patientId = selectedKeys[0].substring(split, isSon);
          this.props.content(subTitle, patientId);
        } else {
          //是
          split = selectedKeys[0].split('\n');
          subTitle = split[3];
          patientId = split[1];
          let other = split[2];
          this.props.content(subTitle, patientId, other);
        }
      }
    }
  };
  getSon = (str, cha, num) => {
    let x = str.indexOf(cha);
    for (let i = 0; i < num.length; i++) {
      x = str.indexOf(cha, x + 1)
    }
    return x;
  };
  /**
   * 加载检查、检验列表
   * @param treeData
   * @param param
   * @param patientId
   * @param testTitle  检查
   * @param subTitle  具体小标题
   * @param key1  键
   * @param key2  键
   */
  loadData = (treeData, param, patientId, testTitle, subTitle, key1, key2) => {
    const {loadData} = api;
    loadData(param, response => {
      if (response.success) {
        let data = response.data;
        if (data && data.length) {
          for (let i = 0; i < data.length; i++) {
            data[i].title = data[i][key1] + (data[i][key2] ? moment(data[i][key2]).format('YYYY-MM-DD') : null);
            data[i].key = data[i].title.trim() + '\n' + patientId + '\n' + JSON.stringify(data[i]) + '\n' + subTitle + '\n' + i
          }
          this.props.changeMenu(treeData, data, testTitle, patientId)
        } else {
          this.props.changeMenu(treeData, [], testTitle, patientId);
          message.warning('暂无检查列表')
        }
      } else {
        this.props.changeMenu(treeData, [], testTitle, patientId);
        console.error("response error", response);
      }
    });
  };
  /**
   * 动态加载住院病历
   * @param treeData
   * @param param
   * @param patientId
   * @param subTitle
   */
  loadMedList = (treeData, param, patientId, subTitle) => {
    const {loadData1} = api;
    loadData1(param, response => {
      if (response.success) {
        let data = response.data;
        if (data && data.length) {
          for (let i = 0; i < data.length; i++) {
            data[i].title = data[i].topic;
            data[i].key = data[i].topic + '\n' + patientId + '\n' + JSON.stringify(data[i]) + '\n' + subTitle + '\n' + i
          }
          this.props.changeMenu(treeData, data, subTitle, patientId)
        } else {
          this.props.changeMenu(treeData, [], subTitle, patientId);
          message.warning('暂无住院病历列表')
        }
      } else {
        this.props.changeMenu(treeData, [], subTitle, patientId);
        console.log('response error', response)
      }
    });
  };
  /**
   * 设置当前展开treeNode
   * @param info
   */
  onExpand = (info) => {
    let {selectedKeysArr} = this.state;
    //判断点击的是否是子页
    if (info.node.props.eventKey.indexOf('son') === -1) {
      if (selectedKeysArr.length === 0) {
        //首次
        this.setState({
          selectedKeysArr: [info.node.props.id],
          defaultExpandedKeys: [info.node.props.id],
        });
      } else {
        let arr = info.node.props.id.split('#');
        let key;
        if (arr[0] === selectedKeysArr[0]) {
          //收缩
          for (let i = 0; i < arr.length; i++) {
            key = arr[i];
            if (arr[0] === key) {
              key = arr[i + 1];
              break;
            }
          }
          this.setState({
            selectedKeysArr: [key],
            defaultExpandedKeys: [key],
          });
        } else {
          //展开
          this.setState({
            selectedKeysArr: [arr[0]],
            defaultExpandedKeys: [arr[0]],
          });
        }
      }
    }
  };
  //循环返回参数
  backParam = (clinicRecList, patientId, key1, key2) => {
    let obj = {};
    for (let i = 0; i < clinicRecList.length; i++) {
      if (patientId.trim() === clinicRecList[i].patientId.trim()) {
        obj[key1] = clinicRecList[i].hospitalCode;
        obj[key2] = clinicRecList[i].patientId;
        break;
      }
    }
    return obj;
  };
  /**递归渲染dom*/
  children = (child, parKey) => {
    return child.map((row) => {
      let key = row.child ? row.key : (row.key + ',' + 'son');
      let id = row.child ? row.key + '#' + parKey : (row.key + '\n' + 'son' + '#' + parKey);
      return <TreeNode title={<span title={row.title}><i className={`icon iconfont ${row.icon}`}/>{row.title}</span>}
                       id={id} key={key}>
        {row.child && this.children(row.child, id) }
      </TreeNode>
    })
  };
  /**
   * 渲染dom
   * @returns {Array}
   */
  treeNodes = () => {
    const {treeData} = this.state;
    return treeData.map((parent) => {
      return <TreeNode id={parent.key}
                       title={<span title={parent.title}><i
                         className={`icon iconfont ${parent.icon}`}/>{parent.title}</span>}
                       key={parent.key}>
        {parent.child && this.children(parent.child, parent.key)}
      </TreeNode>
    })
  };

  render() {
    return (
      <div>
        <Tree
          showLine
          onSelect={this.onSelect}
          expandedKeys={this.state.defaultExpandedKeys}
          showIcon={true}
        >
          {this.treeNodes()}
        </Tree>
      </div>
    )
  }
}
 