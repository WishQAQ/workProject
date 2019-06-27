/**
 * 护理单元 by hhc
 */
import React from 'react'
import css from './style/index.scss'
// model
import {Select} from 'pkg/common/select'
import {Select as MulSelect} from 'pkg/common/ag/select'
import {IconFont} from 'pkg/common/icon'
import {HintInput} from 'pkg/common/input'
import {Table} from 'pkg/common/table'
import {DragMove} from 'pkg/common/dragging'
import {Rounded} from 'pkg/common/rounded'
import {InputTable} from 'pkg/common/inputTable'
import zhCN from 'antd/lib/locale-provider/zh_CN'

zhCN.Transfer.itemsUnit = ''
zhCN.Transfer.itemUnit = ''

// other
import {Button, Menu, Transfer, LocaleProvider} from 'antd'
// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {NurseGroupState, nurseGroupService} from 'service/nurse/classes/nurse-group'
const dataTitle = [
  {
    headerName: '',
    field: '',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 34,
    cellClass: css.agBodyCheckbox,
    headerClass: css.agCheckbox
  },
  {
    headerName: '分组名称',
    field: 'groupName'
  },
  {
    headerName: '分组编码',
    field: 'groupCode'
  },
  {
    headerName: '分组输入码',
    field: 'groupInputCode'
  },
  {
    headerName: '分组简称',
    field: 'groupNameAbbreviation'
  },
  {
    headerName: '床位范围',
    field: 'jurisdictionBed'
  },
  {
    headerName: '父分组ID',
    field: 'parentName'
  }
]

export default class NurseGroup extends FluxComponent<NurseGroupState> {
  title = '分组维护'
  nurseGroupServic = nurseGroupService
  /**
   * 筛选
   * @param inputValue
   * @param option
   * @return {boolean}
   */
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1
  }

  render() {
    let {
      groupDict,
      page,
      groupLenght,
      name,
      menu,
      modify,
      deptDict,
      group,
      inputData,
      inputLength,
      inputTitle,
      nurseDict,
      nurseGroupVsClasses,
      isShowParent,
      groupVsStaff,
      targetKeys,
      titleDict,
      userOpt,
      selectedKeys
    } = this.state

    // 穿梭框数据
    let mockData = []
    for (let i = 0; i < groupVsStaff.length; i++) {
      let titleValue
      for (let j = 0; j < userOpt.length; j++) {
        if (userOpt[j].userId === groupVsStaff[i].empNo) {
          titleValue = userOpt[j].position
          break
        }
      }
      const data = {
        key: groupVsStaff[i].empNo,
        title: groupVsStaff[i].name,
        description: <div className={css.transferList}>
          {targetKeys.indexOf(groupVsStaff[i].empNo) !== -1 ? <Select
            data={titleDict}
            dropdownClassName={css.dropDownMenu}
            dataOption={{value: 'itemName', key: 'id'}}
            className={css.transferSelect}
            value={titleValue}
            onChange={(val) => {
              nurseGroupService.changeTitle(groupVsStaff[i], val)
            }}
          /> : ''}
        </div>,
        chosen: targetKeys.indexOf(groupVsStaff[i].empNo) !== -1,
      }
      if (data.chosen) {
        targetKeys.push(data.key)
      }
      mockData.push(data)
    }
    return (
      <div className={css.nursingMain}>
        {/*左侧列表*/}
        <div className={css.nursingLeft}>
          <div>{'护理单元列表'}</div>
          <Menu className={css.nursingMenu}
                onClick={nurseGroupService.deptClick}>
            <Menu.ItemGroup>
              {deptDict ? deptDict.map((e, index) => {
                return <Menu.Item key={e.deptCode}>
                  <IconFont iconName={'icon-wendang'} iconClass={css.iconClass}/><span>{e.deptName}</span>
                </Menu.Item>
              }) : ''}
            </Menu.ItemGroup>
          </Menu>
        </div>
        {/*右侧表格内容区*/}
        <div className={css.nursingRight}>
          <div className={css.nursingSearch}>
            <div>
              <HintInput addonAfter={<span onClick={nurseGroupService.click}><IconFont iconName={'icon-sousuo_sousuo'}/></span>}
                         value={name ? name : ''}
                         onChange={nurseGroupService.onchange} onPressEnter={nurseGroupService.click}
              />
              <Button onClick={nurseGroupService.onClick} className={css.addBtn}>
                <IconFont iconName={'icon-icontianjia01'}/>{'新增'}
              </Button>
              <Button onClick={nurseGroupService.deleteTableData} className={css.deleteBtn}>
                <IconFont iconName={'icon-jianqu'}/>{'删除'}
              </Button>
            </div>
            <span>
              {'注:右键可编辑'}
            </span>
          </div>
          <div className={css.rightTable}>
            <Table
              columnDefs={dataTitle}
              rowData={groupDict ? groupDict : []}
              menuclassName={'nursingUnitRightMenu'}
              ContextMenuList={menu ? menu : []}
              menuClik={nurseGroupService.menuClick}
              onGridReady={nurseGroupService.onGridReady}
              clickpage={true}
              pageSize={page ? page.pageSize : 0}
              pagination={true}
              paginationAutoPageSize={true}
              onShowSizeChange={nurseGroupService.onShowSize}
              total={groupLenght ? groupLenght : 0}
              onCellClicked={nurseGroupService.groupClick}
            />
          </div>
        </div>
        {/*单元护理弹框*/}
        <DragMove
          title={<b className={css.changeTitle}>{'单元护理名称'}<span>{'(带*为必填)'}</span></b>}
          visible={modify}
          okText={'保存'}
          onCancel={nurseGroupService.closeChange}
          onOk={nurseGroupService.save}
          className={css.changeDrag}
          mask={false}
          width={350}
        >
          <div>
            {isShowParent ? <Rounded
              leftShow={'父分组ID'}
              asterisk={true}
              className={css.collection}>
              <InputTable
                className={css.nurseGroupInputTable}
                data={inputData ? inputData : []}
                option={{
                  total: inputLength ? inputLength : 0,
                  columns: inputTitle ? inputTitle : [],
                  pageSize: 6,
                  showValue: 'groupName'
                }}
                callBackMethods={(event) => {
                  nurseGroupService.showMessage(event, 'model')
                }}
                value={group.parentName ? group.parentName : ''}
              />

            </Rounded> : ''}
            <Rounded
              leftShow={'分组名称'}
              asterisk={true}
              className={css.rounded}
            >
              <HintInput value={group.groupName ? group.groupName : ''} onChange={(e) => {
                nurseGroupService.onchangeGroupValue('groupName', e.target.value)
              }}/>
            </Rounded>
            <Rounded
              leftShow={'分组简称'}
              asterisk={true}
              className={css.rounded}
            >
              <HintInput value={group.groupNameAbbreviation ? group.groupNameAbbreviation : ''} onChange={(e) => {
                nurseGroupService.onchangeGroupValue('groupNameAbbreviation', e.target.value)
              }}/>
            </Rounded>
            <Rounded
              leftShow={'床位管辖范围'}
              className={css.rounded}
            >
              <HintInput value={group.jurisdictionBed ? group.jurisdictionBed : ''} onChange={(e) => {
                nurseGroupService.onchangeGroupValue('jurisdictionBed', e.target.value)
              }}/>
            </Rounded>
            <Rounded
              leftShow={'排序号'}
              asterisk={true}
              className={css.rounded}
            >
              <HintInput value={group.serialNo ? group.serialNo : ''} onChange={(e) => {
                nurseGroupService.onchangeGroupValue('serialNo', e.target.value)
              }}/>
            </Rounded>
            <Rounded
              leftShow={'允许使用班段'}
              className={`${css.rounded} ${css.bottom}`}>
              <MulSelect
                isSearch={true}
                isMulti={true}
                data={nurseDict || []}
                dataOption={{value: 'classesName', key: 'schedulingClassesId'}}
                className={css.permission}
                value={nurseGroupVsClasses}
                onClick={(val) => {
                  nurseGroupService.onchangeGroupValue('nurseGroupVsClasses', val)
                }}
              />
            </Rounded>
          </div>
        </DragMove>
        {/*人员列表弹框*/}
        <DragMove
          title={<b className={css.changeTitle}>{'人员列表'}</b>}
          visible={this.state.personnel}
          okText={'保存'}
          onCancel={nurseGroupService.closePerson}
          onOk={nurseGroupService.saveGroupVsStaff}
          className={css.changeDrag}
          mask={false}
          width={420}
        >
          <LocaleProvider locale={zhCN}>
            <Transfer
              titles={['人员名称', '已选人员']}
              dataSource={mockData}
              showSearch={true}
              filterOption={this.filterOption}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onChange={nurseGroupService.handleChange}
              render={this.renderItem}
              onSelectChange={nurseGroupService.onSelectChange}
              className={css.transfer}
            />
          </LocaleProvider>
        </DragMove>
      </div>
    )
  }

  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} {item.description}
      </span>
    )
    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    }
  }

}