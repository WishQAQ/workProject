/**
 * description:角色信息
 * author: mou
 * time:2018-1-17
 */
import React from 'react'
import {message, Modal} from 'antd'
import {Title} from '../component/title'
import {AgTable} from '../component/agTable'
import {Setting} from '../component/modal'
import {Config} from '../component/config2'
import {InfoModal} from '../component/infoModal'
import {RoleInfoAdd} from '../content/roleInfoAdd'
import api from '../api'
import css from '../style/content/roleInfo.scss'
const confirm = Modal.confirm;
/** 角色信息表格头部 */
const roleColumn = [
  {
    headerName: '',
    field: '',
    checkboxSelection: true,
    maxWidth: 25,
  },
  {
    headerName: '编码',
    field: 'code',
    width: 150
  },
  {
    headerName: '角色名称',
    field: 'name',
    width: 200
  },
  {
    headerName: '排序号',
    field: 'sortNo',
    width: 150
  },
  {
    headerName: '拼音码',
    field: 'inputCode',
    width: 150
  }
];
export class RoleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: [
        {icon: 'icon-jia-', text: '新增', onclick: this.add, value: 'add'},
        {icon: 'icon-xiugai', text: '修改', onclick: this.modify, value: 'modify'},
        {icon: 'icon-jian', text: '删除', onclick: this.delete, value: 'delete'},
        {icon: 'icon-quanxian', text: '权限点', onclick: this.setting, value: 'setting'},
      ],
      selectData: [],//表格选中的行
      title: '角色信息—新增',
      width: "362px",
      height: "268px",
      infoVisible: false,//新增modal是否显示
      visible: false,//权限点modal是否显示
      param: {
        name: '',
        code: '',
        sortNo: '',
        //      inputCode: '',
      },//模态框数据
      rowData: {},//当前行的数据
      startIndex: 1,
      pageSize: 100,
      rolePoints: {
        grants: [],//拥有的权限
        grantsDict: [],//权限字典表
        menu: [],//拥有菜单
        menuDict: [],//菜单字典表
      },
      checkedMenus: [],//选中的菜单arr
      defaultMenu: '',//默认选中的菜单
      checkedGrant: [],//权限选中的值
      defaultGrant: '',//默认权限点
      menu: '',//模糊查询的值
      grant: '',//模糊查询权限的值
    };
  }

  add = () => {
    this.setState({
      infoVisible: true,
      title: '角色信息—新增',
      width: "362px",
      height: "268px",
      param: {
        name: '',
        code: '',
        sortNo: '',
        //      inputCode: '',
      },//模态框数据
    });
  };
  modify = () => {
    let {selectData, rowData} = this.state;
    if (selectData.length === 0) {
      message.warning('请选择要修改的角色')
    } else {
      this.setState({
        infoVisible: true,
        title: '角色信息—修改',
        width: "362px",
        height: "268px",
        param: rowData,
      });
    }

  };
  delete = () => {
    const {selectData} = this.state;
    if (selectData.length === 0) {
      message.warning('请选择要删除的角色');
      return;
    }
    let react = this;
    confirm({
      content: '您确定要删除吗？',
      onOk() {
        const {deleteRole} = api;
        let roleId = {
          roleId: selectData,
        };
        roleId.roleId = JSON.stringify(roleId.roleId);
        deleteRole(roleId, response => {
          if (response.success) {
            react.setState({
              selectData: []
            });
            react.refs.roleTable.onReverSource();
          } else {
            console.error('response error', response)
          }
        })
      },
      onCancel() {
      },
    });
  };
  setting = () => {
    let {selectData, rowData} = this.state;
    if (selectData.length === 0) {
      message.warning('请选择要配置权限的角色');
      return
    }
    this.setState({
      param: rowData,
    }, () => {
      this.getRolePoint();
      this.setState({
        visible: true,
        title: '角色对应菜单权限点',
        width: "630px", //模态框的宽度
        height: "604px",//模态框的高度
      });
    })
  };
  getCheckedValue = (rolePoints, callback) => {
    let checkedMenus = [], defaultMenu, checkedGrant = [], defaultGrant;
    for (let i = 0; i < rolePoints.menu.length; i++) {
      checkedMenus.push(rolePoints.menu[i].menuId);
      if (rolePoints.menu[i].isDefault)
        defaultMenu = rolePoints.menu[i].menuId
    }
    for (let j = 0; j < rolePoints.grants.length; j++) {
      checkedGrant.push(rolePoints.grants[j].code);
      if (rolePoints.grants[j].isDefault)
        defaultGrant = rolePoints.grants[j].code
    }
    callback(checkedMenus, defaultMenu, checkedGrant, defaultGrant);
  };
  getRolePoint = () => {
    const {rolePoint} = api;
    const {param} = this.state;
    let roleId = {
      roleId: param.id
    };
    rolePoint(roleId, response => {
      if (response.success) {
        const data = response.data;
        this.getCheckedValue(data, (checkedValue, defaultMenu, checkedGrant, defaultGrant) => {
          this.setState({
            rolePoints: data,
            checkedMenus: checkedValue,
            defaultMenu: defaultMenu,
            checkedGrant: checkedGrant,
            defaultGrant: defaultGrant
          })
        });

      } else {
        console.error('response error', response)
      }
    })
  };
  /**
   * 隐藏modal
   */
  handleCancel = () => {
    this.setState({
      visible: false,
      infoVisible: false,
      title: ''
    });
  };
  save = () => {
    const {configuration} = api;
    let {checkedGrant, checkedMenus, defaultMenu, defaultGrant, param} = this.state;
    let dataPack = {};
    dataPack.roleMenuDict = [];
    dataPack.roleGrantsDict = [];
    for (let i = 0; i < checkedMenus.length; i++) {
      if (defaultMenu !== '') {
        defaultMenu = defaultMenu.toString()
      }
      if (checkedMenus[i] === defaultMenu) {
        dataPack.roleMenuDict.push({
          isDefault: 1,
          menuId: checkedMenus[i],
          roleId: param.id
        });
      } else {
        dataPack.roleMenuDict.push({
          menuId: checkedMenus[i],
          roleId: param.id
        });
      }
    }
    for (let i = 0; i < checkedGrant.length; i++) {
      if (checkedGrant[i] === defaultGrant) {
        dataPack.roleGrantsDict.push({
          isDefault: 1,
          code: checkedGrant[i],
          roleId: param.id
        });
      } else {
        dataPack.roleGrantsDict.push({
          code: checkedGrant[i],
          roleId: param.id
        });
      }
    }
    dataPack.roleMenuDict = JSON.stringify(dataPack.roleMenuDict);
    dataPack.roleGrantsDict = JSON.stringify(dataPack.roleGrantsDict);
    configuration(dataPack, response => {
      if (response.success) {
        this.setState({
          visible: false
        });
      } else {
        console.error('response error', response)
      }
    })
  };
  /**
   * 给行添加class
   * @param record
   * @param index
   * @returns {*}
   */
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
  /**
   * 获取角色信息
   * @param index
   * @param callback
   */
  getData = (index, callback) => {
    const {fuzzyRole} = api;
    let {startIndex, pageSize} = this.state;
    if (index) {
      startIndex = index
    }
    let param = {
      name: name,
      startIndex: startIndex,//当前页
      pageSize: pageSize,//当前显示多少条
    };
    fuzzyRole(param, response => {
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
    if (type === 'sortNo') {
      param[type] = e
    } else {
      param[type] = e.target.value;
    }
    this.setState({
      param: param
    })
  };
  saveRoleInfo = () => {
    if (!this.checkInput()) {
      return false
    }
    const {param} = this.state;
    let {infoVisible} = this.state;
    const {insertRole} = api;
    insertRole(param, response => {
      if (response.success) {
        this.refs.roleTable.onReverSource();
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
      message.warning('角色名称不能为空');
      return false
    }
    return true
  };
  changeCheckedValue = (type, values) => {
    this.setState({
      [type]: values
    })
  };
  setDefaultMenu = (type, val) => {
    this.setState({
      [type]: val
    })
  };
  getFuzzyValue = (type, val) => {
    this.setState({
      [type]: val
    })
  };
  /** 模糊查询菜单 */
  fuzzyMenu = () => {
    const {selectMneuHierarchy} = api;
    const {menu} = this.state;
    let {rolePoints} = this.state;
    let dataPack = {
      name: menu
    };
    selectMneuHierarchy(dataPack, response => {
      if (response.success) {
        const data = response.data;
        rolePoints.menuDict = data;
        this.setState({
          rolePoints
        })
      } else {
        console.error('response error', response)
      }
    })
  };

  /** 模糊查询权限 */
  fuzzyGrant = () => {
    const {fuzzyGrantsDict} = api;
    const {grant} = this.state;
    let {rolePoints} = this.state;
    let dataPack = {
      name: grant
    };
    fuzzyGrantsDict(dataPack, response => {
      if (response.success) {
        const data = response.data;
        rolePoints.grantsDict = data;
        this.setState({
          rolePoints
        })
      } else {
        console.error('response error', response)
      }
    })
  };

  render() {
    const {group, visible, title, width, height, infoVisible, param, rolePoints, checkedMenus, defaultMenu, defaultGrant, checkedGrant} = this.state;
    return (<div className={css.roleInfo}>
      <Title group={group} setting={this.setting}>角色信息</Title>
      <AgTable columns={roleColumn} data={this.getData} className={css.roleTable} onSelection={this.onSelection}
               ref="roleTable" rowClick={this.rowClick}/>
      <Setting visible={visible} title={title} save={this.save} width={width} height={height}
               handleCancel={this.handleCancel} className={css.infoModal}>
        <Config checkedMenus={checkedMenus} setDefaultMenu={this.setDefaultMenu} rolePoints={rolePoints}
                defaultMenu={defaultMenu} defaultGrant={defaultGrant} fuzzyMenu={this.fuzzyMenu}
                checkedGrant={checkedGrant} fuzzyGrant={this.fuzzyGrant} getFuzzyValue={this.getFuzzyValue}
                changeCheckedValue={this.changeCheckedValue}/>
      </Setting>
      <InfoModal visible={infoVisible} title={title} handleCancel={this.handleCancel} save={this.saveRoleInfo}
                 width={width} height={height}>
        <RoleInfoAdd handleCancel={this.handleCancel} param={param} onChange={this.onChange}/>
      </InfoModal>
    </div>)
  }
}
 
 
 