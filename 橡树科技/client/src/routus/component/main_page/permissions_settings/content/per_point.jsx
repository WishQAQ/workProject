/**
 * description:权限点
 * author: mou
 * time:2018-1-17
 */
import React from 'react'
import {Checkbox, message, Modal} from 'antd'
import {Title} from '../component/title'
import {AgTable} from '../component/agTable'
import {InfoModal} from '../component/infoModal'
import {PointAdd} from '../content/pointAdd'
import api from '../api'
import css from '../style/content/menuAndPer.scss'
const confirm = Modal.confirm;
export class PermissionPoint extends React.Component {
  columns = [
    {
      headerName: '',
      field: '',
      checkboxSelection: true,
      maxWidth: 25,
    },
    {
      headerName: '权限点前缀名称',
      field: 'className',
    },
    {
      headerName: '编码',
      field: 'appCode',
    },
    {
      headerName: '名称',
      field: 'appName',
    },
    {
      headerName: '注释',
      field: 'comments',
    },
    {
      headerName: '读',
      field: 'read',
      cellRendererFramework: AgCheckbox,
    },
    {
      headerName: '写',
      field: 'write',
      cellRendererFramework: AgCheckbox,
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      group: [
        {icon: 'icon-jia-', text: '新增', onclick: this.add, value: 'add'},
        {icon: 'icon-xiugai', text: '修改', onclick: this.modify, value: 'modify'},
        {icon: 'icon-jian', text: '删除', onclick: this.delete, value: 'delete'},
      ],
      selectData: [],//row select
      width: '362px',
      height: '290px',
      title: '权限点—新增',
      infoVisible: false,
      param: {
        className: '',
        appCode: '',
        appName: '',
        comments: '',
        read: '',
        write: ''
      },
      rowData: {},//当前行的数据
      name: '',//模糊输入框的值
      startIndex: 1,
      pageSize: 100,
      type: 'add',//类型
      inputShow: false,//input 模糊查询是否显示
    };
  }

  add = () => {
    this.setState({
      width: '362px',
      height: '290px',
      title: '权限点—新增',
      infoVisible: true,
      type: 'add',
      inputShow:false,
      param: {
        className: '',
        appCode: '',
        appName: '',
        comments: '',
        read: '',
        write: ''
      },
    })
  };
  modify = () => {
    const {rowData, selectData} = this.state;
    if (selectData.length === 0) {
      message.warning('请选择要修改的权限');
      return;
    }
    this.setState({
      width: '362px',
      height: '290px',
      title: '权限点—修改',
      infoVisible: true,
      type: 'modify',
      inputShow:false,
      param: rowData
    })
  };
  delete = () => {
    const {selectData} = this.state;
    if (selectData.length === 0) {
      message.warning('请选择要删除的权限点');
      return;
    }
    let react = this;
    confirm({
      content: '您确定要删除吗？',
      onOk() {
        const {deletePoint} = api;
        let appCode = {
          appCode: selectData,
        };
        appCode.appCode = JSON.stringify(appCode.appCode);
        deletePoint(appCode, response => {
          if (response.success) {
            react.refs.perTable.onReverSource();
            react.setState({
              selectData: [],
              inputShow:false
            })
          } else {
            console.error('response error', response)
          }
        })
      },
      onCancel() {
      },
    });
  };
  rowClassName = (record, index) => {
    const {selectedRowKeys} = this.state;
    if (selectedRowKeys && selectedRowKeys.length) {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if (selectedRowKeys[i] === index) {
          return css.rowActive
        }
      }
    }
  };
  onSelection = (data) => {
    let selectData = [];
    for (let i = 0; i < data.length; i++) {
      selectData.push(data[i].data.appCode)
    }
    this.setState({
      selectData: selectData
    })
  };
  rowClick = (row) => {
    this.setState({
      param: row.data,
      rowData: row.data,
    })
  };
  handleCancel = () => {
    this.setState({
      infoVisible: false
    })
  };
  /**
   * 获取权限点
   * @param index
   * @param callback
   */
  getData = (index, callback) => {
    const {fuzzyGrantsDict} = api;
    let {startIndex, pageSize, name} = this.state;
    if (index) {
      startIndex = index
    }
    let param = {
      name: name,
      startIndex: startIndex,//当前页
      pageSize: pageSize,//当前显示多少条
    };
    fuzzyGrantsDict(param, response => {
      if (response.success) {
        const data = response.data;
        callback(data);
      }
      else {
        console.error("response error", response.msg);
      }

    });
  };
  onChange = (type, e) => {
    let {param} = this.state;
    if (type === 'read' || type === 'write') {
      param[type] = e.target.checked && e.target.checked === true ? '1' : '0'
    } else {
      param[type] = e.target.value;
    }
    this.setState({
      param: param
    })
  };
  savePointAdd = () => {
    if (!this.checkInput()) {
      return false
    }
    const {param, type} = this.state;
    const {save, update} = api;
    if (type === 'add') {
      save(param, response => {
        if (response.success) {
          this.refs.perTable.onReverSource();
        } else {
          console.error('response error', response)
        }
      });
    } else {
      update(param, response => {
        if (response.success) {
          this.refs.perTable.onReverSource();
        } else {
          console.error('response error', response)
        }
      });
    }

    this.setState({
      infoVisible: false
    })
  };
  /** 检测比输入项是否输入 */
  checkInput = () => {
    const {param} = this.state;
    if (param.className === '') {
      message.warning('权限点前缀名称不能为空');
      return false
    }
    if (param.appCode === '') {
      message.warning('编码不能为空');
      return false
    }
    if (param.appName === '') {
      message.warning('名称不能为空');
      return false
    }
    return true
  };
  onChangeName = (type, e) => {
    this.setState({
      [type]: e.target.value
    })
  };
  getOnReverSource = () => {
    this.refs.perTable.onReverSource();
  };
  inputShow = () => {
    let {inputShow} = this.state;
    if (inputShow) {
      this.getOnReverSource();
    }
    this.setState({
      inputShow: !inputShow,
      rowData: {},
      param: {
        className: '',
        appCode: '',
        appName: '',
        comments: '',
        read: '',
        write: ''
      },
      selectData: [],
    })
  };
  render() {
    const {group, infoVisible, width, height, title, param, name,inputShow} = this.state;
    return (<div className={css.menuAndPer}>
      <Title group={group} className={css.point} showInput={true} onChangeName={this.onChangeName}
             getOnReverSource={this.getOnReverSource}  inputShow={this.inputShow}
             name={name} fuzzy={inputShow}>权限点</Title>
      <AgTable className={css.roleTable} data={this.getData} columns={this.columns} ref="perTable"
               onSelection={this.onSelection} rowClick={this.rowClick}/>
      <InfoModal visible={infoVisible} title={title} save={this.savePointAdd} handleCancel={this.handleCancel}
                 width={width} height={height}>
        <PointAdd param={param} onChange={this.onChange}/>
      </InfoModal>
    </div>)
  }
}

class AgCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (<Checkbox disabled checked={this.props.value === '1' ? true : false}/>)
  }
}
 
 
 