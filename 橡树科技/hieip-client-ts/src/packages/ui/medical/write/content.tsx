/**
 * Created by oakm on 2017/12/26.
 */

'use strict'
import * as React from 'react'
import {Col, Icon, Menu, Row, Select} from 'antd'
import {Rounded} from 'pkg/common/rounded'
import * as css from './style/content.scss'
import {Table} from 'src/packages/common/table'
import {Card} from '../../card'
import {Medical, ReadMode} from 'medical-draft'
import {FluxComponent} from 'src/tools/flux/FluxComponent'
import {ContentWriteState,contentWriteService} from 'service/medical/medical/components/write/content-write'
import moment from 'moment'
const Option = Select.Option
/**
 * 格式化时间
 * @param params
 */
function gshTimes(params) {
    let val = params.value
    val = val && moment(val).format('YYYY-MM-DD HH:mm')
    return val
}
const columns = [
  {
    headerName: '标题日期',
    field: 'createDateTime',
    valueFormatter: gshTimes,

  },
  {
    headerName: '文档名称',
    field: 'fileName'
  },
  {
    headerName: '文档状态',
    field: 'statusName'
  },
  {
    headerName: '书写人',
    field: 'creatorName',
  }]

export default class ContentWrite extends FluxComponent<ContentWriteState> {
    title='病历内容'
    contentWriteService=contentWriteService

  render() {
    const {medicalInfo} = this.props
      let {mrClass,patientType,mrPatientFile}=this.state
    return (
      <div className={css.content}>
        <Row>
          <Col span={9}>
            <div style={{padding: '6px 10px', overflow: 'hidden'}}>
              <Rounded
                leftShow={'病历列表'}
                style={{width: 200, height: 24, lineHeight: 1}}>
                <Select style={{width: '100%'}}
                        value={patientType?patientType:''}
                        onChange={contentWriteService.onchange.bind(this,'patientType')}
                ><Option value="1">身份证号码</Option>
                    <Option value="2">身份证号码+姓名</Option>
                    <Option value="3">病案号</Option>
                    <Option value="4">患者号</Option>
                    <Option value="5">患者号+来访次</Option>
                    <Option value="6">病案号+老访次</Option>
                    <Option value="7">姓名</Option>
                    <Option value="8">姓名+性别+出生日期</Option>
                    <Option value="9">联系人姓名+关系</Option>
                </Select>
              </Rounded>
            </div>
            <div style={{height: 250}} className={css.left_body}>
              <Row>
                <Col span={8}>
                  <Card
                    className="wenshu"
                    extra={'文书'}
                  >
                    <Menu
                      className={css.flmcgjz}
                      style={{width: '100%'}}
                      mode="inline"
                      onClick={contentWriteService.writOnchange}
                    >
                      {mrClass && mrClass.map((row: any) =>
                        <Menu.Item key={row.mrClassCode}>
                            <Icon type="file"/>{`${row.mrClassName} (${row.templateIndexCount || '0'})`}</Menu.Item>
                      )}
                    </Menu>
                  </Card>
                </Col>
                <Col span={16}>
                  <Table
                    columnDefs={columns}
                    rowData={mrPatientFile?mrPatientFile:[]}
                    onCellClicked={contentWriteService.selectLine}
                  />
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={15}>
            <div className={css.bl}>
              <Medical editorState={medicalInfo.editorState}
                       pageHeader={medicalInfo.pageHeader}
                       pageFooter={medicalInfo.pageFooter}
                       readMode={ReadMode.readOnly}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}