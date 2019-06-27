/**
 * 班段字典维护 by hhc
 */
import React from 'react'
import css from './style/paragraphs.scss'
import classNames from 'classnames'
// model
import {Table} from 'pkg/common/table'
import {Select} from 'pkg/common/select'
import {HintInput} from 'pkg/common/input'
import {Rounded} from 'pkg/common/rounded'
import {IconFont} from 'pkg/common/icon'
import {DragMove} from 'pkg/common/dragging'
import {Label} from 'pkg/common/label'
import {Button, Checkbox, Input, Radio, TimePicker} from 'antd'
// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {ClassParagraphsState, classParagraphsService} from 'service/nurse/classes/class-paragraphs'
import moment from 'moment'
import {SelectItem} from 'pkg/ui/SelectItem'
const RadioGroup = Radio.Group
const {TextArea} = Input
const Option = SelectItem.Option
const tableTitle = [
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
    headerName: '班段名称',
    field: 'classesName'
  },
  {
    headerName: '类型',
    field: 'type',
    valueFormatter: (params) => {
      return params.data.type ? '科室' : '全院'
    }
  },
  {
    headerName: '护理单元',
    field: 'wardName'
  },
  {
    headerName: '时间',
    field: 'timeFrom1',
    valueFormatter: (params) => {
      let data = params.data,
        html = ''
      if (data.timeFrom2) {
        html = data.timeFrom1 + '-' + data.timeTo1 + '/' + data.timeFrom2 + '-' + data.timeTo2
      } else {
        html = data.timeFrom1 + '-' + data.timeTo1
      }
      return html
    }
  },
  {
    headerName: '是否两头班',
    field: 'isTwoTime',
    valueFormatter: (params: any) => {
      return params.data.isTwoTime ? '是' : '否'
    }
  },
  {
    headerName: '班段说明',
    field: 'classesExplain'
  },
  {
    headerName: '假期班段',
    field: 'isVacation',
    valueFormatter: (params: any) => {
      return params.data.isVacation ? '是' : '否'
    }
  },
  {
    headerName: '一天允许出现次数',
    field: 'occurrenceNumber'
  },
  {
    headerName: '总时段',
    field: 'sumTime'
  }
]
export default class ClassParagraphs extends FluxComponent<ClassParagraphsState> {
  title = '班段字典维护'
  classParagraphsService = classParagraphsService
  // 表格表头信息
  format = 'HH:mm'

  render() {
    let {menu, page, classesDict, classLenght, type, name, insetVisible, classas, deptDict, nursingCode,isTwo} = this.state
    return (
      <div className={css.paragraphsMain}>
        {/*单元护理顶部搜索*/}
        <div className={css.paragraphsTitle}>
          <Rounded leftShow={'护理单元合集'} className={css.collection}>
            <Select
              showSearch={true}
              data={deptDict ? deptDict : []}
              onChange={classParagraphsService.dropDown}
              value={nursingCode ? nursingCode : ''}
              dataOption={{value: 'deptName', key: 'deptCode'}}
              dropdownClassName={css.dropDownMenu}
              className={css.collectionSelect}
            />
          </Rounded>
          <div className={css.smallCom}>
            <b>类型:</b>
            <RadioGroup className={css.radioGroupStyle}
                        value={type}
                        onChange={classParagraphsService.onchange.bind(this, 'type')}
            >
              <Radio value={0}>
                {'全院'}
              </Radio>
              <Radio value={1}>
                {'科室'}
              </Radio>
            </RadioGroup>
            <Checkbox  checked={isTwo===1?true:false} onChange={classParagraphsService.check.bind(this, 'isTwo')}>
              {'是否是两头班'}
            </Checkbox>
          </div>
          <Rounded leftShow={'班段名称'} className={css.collection}>
            <HintInput value={name ? name : ''} onChange={classParagraphsService.textOnchange.bind(this, 'name')}/>
          </Rounded>
          <Button
            onClick={classParagraphsService.click}
            className={`${css.btn} ${css.blue}`}>
            <IconFont iconName={'icon-sousuo_sousuo'}/>{'查询'}
          </Button>
          <Button type={'primary'}
                  onClick={classParagraphsService.insert}
                  className={`${css.btn} ${css.addBtn}`}>
            <IconFont iconName={'icon-icontianjia01'}/>{'新增'}
          </Button>
          <Button
            onClick={classParagraphsService.delete}
            className={`${css.btn} ${css.deleteBtn}`}>
            <IconFont iconName={'icon-jianqu'}/>{'删除'}
          </Button>
          <span className={css.rightTip}>注:右键可编辑</span>
        </div>
        {/* 班段维护的table  */}
        <div className={css.mainTable}>
          <Table
            onSelectionChanged={classParagraphsService.onSelection}
            rowSelection="multiple"
            columnDefs={tableTitle}
            ContextMenuList={menu ? menu : []}
            onGridReady={classParagraphsService.onGridReady}
            clickpage={true}
            pageSize={page ? page.pageSize : 0}
            pagination={true}
            paginationAutoPageSize={true}
            onShowSizeChange={classParagraphsService.onShowSize}
            total={classLenght ? classLenght : 0}
            rowData={classesDict ? classesDict : []}
            onCellClicked={classParagraphsService.onCellClicked}
            menuClik={classParagraphsService.menuClick}
          />
        </div>

        {/* 班段新增弹框 */}
        <DragMove
          title={<b className={css.dragTitle}>{'班段信息'}<span>{'(带*为必填)'}</span></b>}
          visible={insetVisible ? insetVisible : false}
          okText={`保存`}
          onCancel={classParagraphsService.padlock}
          onOk={classParagraphsService.save}
          className={css.drag}
          width={448}
        >
          <div>
            <Rounded leftShow={'班段名称'} asterisk={true} className={classNames(css.collection, css.bottom)}>
              <HintInput value={classas.classesName ? classas.classesName : ''}
                         onChange={classParagraphsService.inputValue.bind(this, 'classas.classesName')}/>
            </Rounded>
            <Rounded leftShow={'护理单元'} asterisk={true} className={classNames(css.collection, css.bottom)}>

              <Select
                showSearch={true}
                data={deptDict ? deptDict : []}
                value={classas.wardCode ? classas.wardCode : ''}
                onChange={classParagraphsService.updateEntity.bind(this, 'classas.wardCode')}
                dropdownClassName={css.dropDownMenu}
                dataOption={{value: 'deptName', key: 'deptCode'}}
                className={css.collectionSelect}
              />
            </Rounded>
            {/*<Rounded leftShow={'科室'} asterisk={true} className={classNames(css.collection, css.bottom)}>*/}
            {/*<Select*/}
            {/*showSearch={true}*/}
            {/*data={[]}*/}
            {/*dropdownClassName={css.dropDownMenu}*/}
            {/*dataOption={{value: 'value', key: 'key'}}*/}
            {/*onChange={classParagraphsService.updateEntity.bind(this, 'classas.deptCode')}*/}
            {/*className={css.collectionSelect}*/}
            {/*/>*/}
            {/*</Rounded>*/}
            <div className={css.bottom}>
              <div style={{display:'inline-block'}}>
                <Label>
                  <span>{'类型:'}<span className={css.start}>{'*'}</span></span>
                </Label>
                <RadioGroup value={classas.type ? classas.type : 0}
                            onChange={classParagraphsService.updateEntity.bind(this, 'classas.type')}
                            className={css.radioGroupStyle}>
                  <Radio value={0}>{'全院'}</Radio>
                  <Radio value={1}>{'科室'}</Radio>
                </RadioGroup>
              </div>
              <div className={classNames(css.checkBoxGroup)}>
                <Checkbox
                  checked={classas.isVacation === 1 ? true : false}
                  onChange={classParagraphsService.updateMulti.bind(this, 'classas.isVacation')}>
                  {'假期班段'}
                </Checkbox>
              </div>
              <div className={classNames(css.checkBoxGroup)}>
                <Checkbox
                  checked={classas.isTransfer === 1 ? true : false}
                  onChange={classParagraphsService.updateMulti.bind(this, 'classas.isTransfer')}>
                  {'是否是交接班'}
                </Checkbox>
              </div>
              <div className={classNames(css.checkBoxGroup)}>
                <Checkbox
                  checked={classas.isTwoTime === 1 ? true : false}
                  onChange={classParagraphsService.updateIsTwoTime.bind(this, 'classas.isTwoTime')}>
                  {'是否是两头班'}
                </Checkbox>
              </div>
            </div>
            <div className={css.bottom}>
              <div className={css.timeGroup}>
                <div className={css.selectTime}>
                  <Select
                    dropdownClassName={css.dropDownMenu}
                    dataOption={{value: 'value', key: 'key'}}
                    className={css.select}
                    onChange={classParagraphsService.updateDay.bind(this, 'dayOne')}
                    value={classas.dayOne ? classas.dayOne : ''}
                  >
                    <Option value="0">{'今天'}</Option>
                    <Option value="1">{'明天'}</Option>
                    <Option value="2">{'后天'}</Option>
                  </Select>
                  <TimePicker placeholder={'开始时间1/小时.分钟'}
                              format={this.format}
                              className={css.timeP}
                              value={classas.timeOne ? moment(classas.timeOne, 'HH:mm') : null}
                              onChange={classParagraphsService.timeOnchange.bind(this, 'classas.timeFrom1', 1)}
                  />
                </div>
                <span className={css.inter}>~</span>
                <div className={css.selectTime}>
                  <Select
                    dropdownClassName={css.dropDownMenu}
                    dataOption={{value: 'value', key: 'key'}}
                    className={css.select}
                    onChange={classParagraphsService.updateDay.bind(this, 'dayThree')}
                    value={classas.dayThree ? classas.dayThree : ''}
                  >
                    <Option value="0">{'今天'}</Option>
                    <Option value="1">{'明天'}</Option>
                    <Option value="2">{'后天'}</Option>
                  </Select>
                  <TimePicker placeholder={'结束时间1/小时.分钟'}
                              format={this.format}
                              className={css.timeP}
                              value={classas.timeThree ? moment(classas.timeThree, 'HH:mm') : null}
                              onChange={classParagraphsService.timeOnchange.bind(this, 'classas.timeTo1', 2)}
                  />
                </div>
              </div>
            </div>
            <div className={`${css.bottom} ${classas.isTwoTime === 0 ? css.timeShow : ''}`}>
              <div className={css.timeGroup}>
                <div className={css.selectTime}>
                  <Select
                    dropdownClassName={css.dropDownMenu}
                    dataOption={{value: 'value', key: 'key'}}
                    className={css.select}
                    onChange={classParagraphsService.updateDay.bind(this, 'dayTwo')}
                    value={classas.dayTwo ? classas.dayTwo : ''}
                  >
                    <Option value="0">{'今天'}</Option>
                    <Option value="1">{'明天'}</Option>
                    <Option value="2">{'后天'}</Option>
                  </Select>
                  <TimePicker placeholder={'开始时间2/小时.分钟'}
                              format={this.format}
                              className={css.timeP}
                              value={classas.timeTwo ? moment(classas.timeTwo, 'HH:mm') : null}
                              onChange={classParagraphsService.timeOnchange.bind(this, 'classas.timeFrom2', 3)}

                  />
                </div>
                <span className={css.inter}>~</span>
                <div className={css.selectTime}>
                  <Select
                    dropdownClassName={css.dropDownMenu}
                    dataOption={{value: 'value', key: 'key'}}
                    className={css.select}
                    onChange={classParagraphsService.updateDay.bind(this, 'dayFour')}
                    value={classas.dayFour ? classas.dayFour : ''}
                  >
                    <Option value="0">{'今天'}</Option>
                    <Option value="1">{'明天'}</Option>
                    <Option value="2">{'后天'}</Option>
                  </Select>
                  <TimePicker placeholder={'结束时间2/小时.分钟'}
                              format={this.format}
                              className={css.timeP}
                              value={classas.timeFour ? moment(classas.timeFour, 'HH:mm') : null}
                              onChange={classParagraphsService.timeOnchange.bind(this, 'classas.timeTo2', 4)}
                  />
                </div>
              </div>
            </div>
            <TextArea rows={1} className={css.inputArea} placeholder="班段说明"
                      value={classas.classesExplain ? classas.classesExplain : ''}
                      onChange={classParagraphsService.inputValue.bind(this, 'classas.classesExplain')}
            />
            <Rounded leftShow={'一天允许出现次数'} className={classNames(css.collection, css.bottom)}>
              <HintInput
                value={classas.occurrenceNumber ? classas.occurrenceNumber : ''}
                onChange={classParagraphsService.inputValue.bind(this, 'classas.occurrenceNumber')}
              />
            </Rounded>
          </div>
        </DragMove>
      </div>
    )
  }

}