/**
 * description:菜单字典
 * author: mou
 * time:2018-1-17
 */
import React from 'react'
import {message, Modal} from 'antd'
import {Title} from '../component/title'
import {AgTable} from '../component/agTable'
import {InfoModal} from '../component/infoModal'
import {MenuDictAdd} from '../content/menuDictAdd'
import api from '../api'
import css from '../style/content/menuAndPer.scss'
const confirm = Modal.confirm;
const menuColumns = [
  {
    headerName: '',
    field: '',
    checkboxSelection: true,
    maxWidth: 25,
  },
  {
    headerName: '菜单名称',
    field: 'name',
  },
  {
    headerName: '菜单编码',
    field: 'code',
  },
  {
    headerName: 'URL地址',
    field: 'url',
  },
  {
    headerName: '排序号',
    field: 'sortNo',
  },
  {
    headerName: '父类菜单',
    field: 'parentName',
  },
  {
    headerName: '输入码',
    field: 'inputCode',
  },
  {
    headerName: '图class',
    field: 'icon',
  },
];
export class MenuDict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: [
        {icon: 'icon-jia-', text: '新增', onclick: this.add, value: 'add'},
        {icon: 'icon-xiugai', text: '修改', onclick: this.modify, value: 'modify'},
        {icon: 'icon-jian', text: '删除', onclick: this.delete, value: 'delete'},
      ],
      selectData: [],//选择的row
      infoVisible: false,
      width: "362px",
      height: "354px",
      title: '菜单字典—新增',
      param: {
        name: '',
        code: '',
        url: '',
        sortNo: '',
        parentId: '',
        id: '',
        icon: '',
        // inputCode: ''
      },
      rowData: {},//当前行的数据
      menuDict: [],//菜单字典
      name: '',//模糊输入框的值
      startIndex: 1,
      pageSize: 100,
      inputShow: false,//input 模糊查询是否显示
    };
  }

  componentWillMount() {
    this.getMenuDict();
  }

  add = () => {
    this.setState({
      infoVisible: true,
      width: "362px",
      height: "354px",
      title: '菜单字典—新增',
      inputShow:false,
      param: {
        name: '',
        code: '',
        url: '',
        sortNo: '',
        parentId: '',
        id: '',
        icon: '',
        // inputCode: ''
      },
    });
  };
  modify = () => {
    let {selectData, rowData} = this.state;
    if (selectData.length === 0) {
      message.warning('请选择要修改的菜单');
      return;
    }
    this.setState({
      infoVisible: true,
      width: "362px",
      height: "354px",
      title: '菜单字典—修改',
      inputShow:false,
      param: rowData
    });
  };
  delete = () => {
    const {selectData} = this.state;
    if (selectData.length === 0) {
      message.warning('请选择要删除的菜单');
      return;
    }
    let react = this;
    confirm({
      content: '您确定要删除吗？',
      onOk() {
        const {deleteMenuDict} = api;
        let menuDictId = {
          menuDictId: selectData,
        };
        menuDictId.menuDictId = JSON.stringify(menuDictId.menuDictId);
        deleteMenuDict(menuDictId, response => {
          if (response.success) {
            react.setState({
              selectData: [],
              inputShow:false,
            });
            react.refs.menuTable.onReverSource();
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
  /**
   * 角色信息 行点击
   * @param row
   */
  rowClick = (row) => {
    this.setState({
      param: row.data,
      rowData: row.data
    })
  };
  handleCancel = () => {
    this.setState({
      infoVisible: false
    })
  };
  getMenuDict = () => {
    const {selectMenuDict} = api;
    selectMenuDict(response => {
      if (response.success) {
        const data = response.data;
        this.setState({
          menuDict: data
        })
      } else {
        console.error('response error', response)
      }
    })
  };
  /**
   * 获取菜单字典信息
   * @param index
   * @param callback
   */
  getData = (index, callback) => {
    const {fuzzyMenuDict} = api;
    let {startIndex, pageSize, name} = this.state;
    if (index) {
      startIndex = index
    }
    let param = {
      name: name,
      startIndex: startIndex,//当前页
      pageSize: pageSize,//当前显示多少条
    };
    fuzzyMenuDict(param, response => {
      if (response.success) {
        const data = response.data;
        callback(data);
      }
      else {
        console.error("response error", response);
      }

    });
  };
  onSelection = (data) => {
    let selectData = [];
    for (let i = 0; i < data.length; i++) {
      selectData.push(data[i].data.id)
    }
    this.setState({
      selectData: selectData
    })
  };
  onChange = (type, e) => {
    let {param} = this.state;
    if (type === 'sortNo' || type === 'parentId') {
      param[type] = e;
    } else {
      param[type] = e.target.value
    }
    this.setState({
      param: param
    })
  };
  saveMenuDict = () => {
    if (!this.checkInput()) {
      return false
    }
    const {param} = this.state;
    let {infoVisible} = this.state;
    const {insertMenuDict} = api;
    insertMenuDict(param, response => {
      if (response.success) {
        this.refs.menuTable.onReverSource();
      } else {
        console.error('response error', response)
      }
    });
    this.setState({
      infoVisible: !infoVisible
    });
  };
  /** 检测比输入项是否输入 */
  checkInput = () => {
    const {param} = this.state;
    if (param.name === '') {
      message.warning('菜单名称不能为空');
      return false
    }
    if (param.url === '') {
      message.warning('URL地址不能为空');
      return false
    }
    return true
  };
  getOnReverSource = () => {
    this.refs.menuTable.onReverSource();
  };
  onChangeName = (type, e) => {
    this.setState({
      [type]: e.target.value
    })
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
        name: '',
        code: '',
        url: '',
        sortNo: '',
        parentId: '',
        id: '',
        icon: '',
      },
      selectData: [],
    })
  };

  render() {
    const {group, infoVisible, width, height, title, param, menuDict, name, inputShow} = this.state;
    return (<div className={css.menuAndPer}>
      <Title group={group} showInput={true} getOnReverSource={this.getOnReverSource} onChangeName={this.onChangeName}
             inputShow={this.inputShow}
             name={name} fuzzy={inputShow}>菜单字典</Title>
      <AgTable className={css.roleTable} data={this.getData} columns={menuColumns} rowClick={this.rowClick}
               onSelection={this.onSelection} ref="menuTable"/>
      <InfoModal visible={infoVisible} title={title} save={this.saveMenuDict} handleCancel={this.handleCancel}
                 width={width} height={height}>
        <MenuDictAdd onChange={this.onChange} param={param} menuDict={menuDict}/>
      </InfoModal>
    </div>)
  }

}
 
 
 