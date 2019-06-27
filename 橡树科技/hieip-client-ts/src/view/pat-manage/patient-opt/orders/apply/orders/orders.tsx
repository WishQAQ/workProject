/**
 * 医嘱主页面
 */
import React from 'react'
import css from './style/index.scss'
// model
import {Select} from 'pkg/common/select'
import {Select as AgSelect} from 'pkg/common/ag/select'
import {HintInput} from 'pkg/common/ag/input'
import {Props} from 'pkg/common/ag/input'
import {Rounded} from 'pkg/common/rounded'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {InputTable} from 'pkg/common/inputTable'
import {CInputTableProps, CInputTableState} from 'pkg/common/inputTable'
import {TimePicker} from 'pkg/common/timePicker'
import {AgCheckBox} from 'pkg/common/ag/checkbox'
// other
import classNames from 'classnames'
import {Radio, Button} from 'antd'
import {FluxComponent} from 'tools/flux/FluxComponent'
// service
import {orderService, OrderState} from 'service/pat-manage/patien-opt/orders/apply/orders'
import {orderCostService, OrderCostState} from 'service/pat-manage/patien-opt/orders/apply/ordersCosts/ordersCosts'

export default class MainOrders extends FluxComponent<OrderState & OrderCostState> {
  title = '综合医嘱'
  orderService = orderService
  orderCostService = orderCostService

  /**
   * 医嘱表列规则
   */
  orderColumns = [
    {
      headerName: '',
      field: '',
      width: 15,
      minWidth: 15,
      maxWidth: 15,
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      }
    },
    {
      headerName: '',
      field: '',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: (params) => {
        return params.data.orderStatus === -1 || params.data.orderStatus === 5
      },
      width: 25,
      minWidth: 25,
      maxWidth: 25,
      cellStyle: {
        paddingTop: '4px',
        paddingLeft: '3px',
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      enableCellChangeFlash: false
    },
    {
      headerName: '长/临',
      field: 'repeatIndicatorName',
      width: 40,
      minWidth: 40,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: AgSelect,
      cellEditorParams: {
        data: [
          {key: 0, value: '临时'},
          {key: 1, value: '长期'}
        ],
        dataOption: {key: 'key', value: 'value'},
        onClick: (e, v) => {
          orderService.setStateJson2(e.key, 'orderData', v.rowIndex, 'repeatIndicator')
          orderService.closeDoubleEdit('orderData.' + v.rowIndex + '.open', v.rowIndex)
        },
        className: css.agSelect,
        open: true,
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      valueFormatter: (params) => {
        return orderService.displayCorrectValue(params, 'repeatIndicatorName')
      },
    },
    {
      headerName: '类别',
      field: 'orderClassName',
      width: 45,
      minWidth: 45,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: AgSelect,
      cellEditorParams: {
        open: true,
        data: [
          {key: 'A', value: '西药'},
          {key: 'B', value: '中药'},
          {key: '', value: '非药品'}
        ],
        dataOption: {key: 'key', value: 'value'},
        onClick: (e, v) => {
          orderService.setStateJson2(e.key, 'orderData', v.rowIndex, 'orderClass')
          orderService.closeDoubleEdit('orderData.' + v.rowIndex + '.open', v.rowIndex)
        },
        className: css.agSelect,
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      valueFormatter: (params) => {
        return orderService.displayCorrectValue(params, 'orderClassName')
      }
    },
    {
      headerName: '开始时间',
      field: 'startDateTime',
      width: 120,
      minWidth: 120,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: TimePicker,
      cellEditorParams: {
        timePrecision: 0,
        className: css.agTimePicker,
        autoFocus: true,
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      valueFormatter: (params) => {
        return this.orderService.displayTime(params)
      }
    },
    {
      headerName: '医嘱内容',
      field: 'orderText',
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      width: 190,
      minWidth: 190,
      cellEditorFramework: InputTable,
      cellEditorParams: {
        data: [],
        option: {
          total: 0,
          columns: [],
          pageSize: 7,
          showValue: 'value',
          columnsCallData: (e, callback) => {
            orderService.orderTextDictCol(e.rowIndex, callback)
          }
        },
        isRenderShow: true,
        isMask: false,
        tableLeft: -280,
        callData: (v, callback) => {
          orderService.orderTextDict(v, callback)
        },
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      }
    },
    {
      headerName: '叙',
      field: 'specialFlag',
      width: 35,
      minWidth: 35,
      cellRendererFramework: AgCheckBox,
      cellRendererParams: {
        onCheck: (key, v) => {
          orderService.setStateJson2(key, 'orderData', v.rowIndex, 'specialFlag')
        }
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      cellStyle: {paddingTop: '5px'}
    },
    {
      headerName: '计价属性',
      field: 'drugBillingAttrName',
      width: 65,
      minWidth: 65,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: AgSelect,
      cellEditorParams: {
        data: [
          {key: 0, value: '正常计价'},
          {key: 1, value: '自带药'},
          {key: 2, value: '手工计价'},
          {key: 3, value: '不计价'},
          {key: 4, value: '不摆药'},
          {key: 5, value: '出院带药'},
        ],
        dataOption: {key: 'key', value: 'value'},
        className: css.agSelect,
        open: true,
        isMask: false,
        onClick: (e, v) => {
          orderService.setStateJson2(e.key, 'orderData', v.rowIndex, 'drugBillingAttr')
        },
      },
      valueFormatter: (params) => {
        return orderService.displayCorrectValue(params, 'drugBillingAttrName')
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
    },
    {
      headerName: '剂量',
      field: 'dosage',
      width: 40,
      minWidth: 40,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: PublicHintInput,
      cellEditorParams: {
        verification: {eventonver: 'change', regex: /^[1-9]\d*$/}
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      enableCellChangeFlash: true
    },
    {
      headerName: '单位',
      field: 'dosageUnits',
      width: 40,
      minWidth: 40,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: PublicInputTable,
      cellEditorParams: {
        data: [],
        option: {
          total: 0,
          columns: [],
          pageSize: 7,
          showValue: 'value',
        },
        isRenderShow: true,
        isMask: false,
        tableLeft: -50,
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      enableCellChangeFlash: true
    },
    {
      headerName: '皮试',
      field: 'skinTest',
      width: 40,
      minWidth: 40,
      cellRendererFramework: AgCheckBox,
      cellRendererParams: {
        onCheck: (key, v) => {
          orderService.setStateJson2(key, 'orderData', v.rowIndex, 'skinTest')
        }
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      cellStyle: {paddingTop: '5px'}
    },
    {
      headerName: '途径',
      field: 'administration',
      width: 90,
      minWidth: 90,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: PublicInputTable,
      cellEditorParams: {
        data: [],
        option: {
          total: 0,
          columns: [],
          pageSize: 7,
          showValue: 'value',
        },
        isRenderShow: true,
        isMask: false,
        tableLeft: -50,
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      enableCellChangeFlash: true
    },
    {
      headerName: '天数',
      field: 'abidance',
      width: 40,
      minWidth: 40,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: HintInput,
      cellEditorParams: {
        verification: {eventonver: 'change', regex: /^[1-9]\d*$/}
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      }
    },
    {
      headerName: '数量',
      field: 'amount',
      width: 40,
      minWidth: 40,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: HintInput,
      cellEditorParams: {
        verification: {eventonver: 'change', regex: /^[1-9]\d*$/}
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      }
    },
    {
      headerName: '频次',
      field: 'frequency',
      width: 85,
      minWidth: 85,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: PublicInputTable,
      cellEditorParams: {
        data: [],
        option: {
          total: 0,
          columns: [],
          pageSize: 7,
          showValue: 'value'
        },
        isRenderShow: true,
        isMask: false,
        tableLeft: -140,
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      enableCellChangeFlash: true
    },
    {
      headerName: '详细描述',
      field: 'freqDetail',
      width: 85,
      minWidth: 85,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: PublicInputTable,
      cellEditorParams: {
        data: [],
        option: {
          total: 0,
          columns: [],
          pageSize: 7,
          showValue: 'value',
        },
        isRenderShow: true,
        isMask: false,
        tableLeft: -50,
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      }
    },
    {
      headerName: '执行时间',
      field: 'performSchedule',
      width: 90,
      minWidth: 90,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: PublicHintInput,
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      enableCellChangeFlash: true
    },
    {
      headerName: '状态',
      field: 'orderStatusName',
      width: 80,
      maxWidth: 80,
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      valueFormatter: (params) => {
        return orderService.displayCorrectValue(params, 'orderStatusName')
      }
    },
    {
      headerName: '医生',
      field: 'doctor',
      width: 100,
      minWidth: 100,
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      valueFormatter: (params) => {
        if (params.data.doctor && params.data.doctor.name) {
          return params.data.doctor.name
        }
        else {
          return ''
        }
      }
    },
    {
      headerName: '持续时间',
      field: 'duration',
      width: 90,
      minWidth: 90,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: HintInput,
      cellEditorParams: {
        verification: {eventonver: 'change', regex: /^[1-9]\d*$/}
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      }
    },
    {
      headerName: '单位',
      field: 'durationUnits',
      width: 50,
      minWidth: 50,
      editable: (event) => {
        return orderService.editOrNot(event)
      },
      cellEditorFramework: AgSelect,
      cellEditorParams: {
        data: [
          {key: '年', value: '年'},
          {key: '月', value: '月'},
          {key: '周', value: '周'},
          {key: '日', value: '日'},
          {key: '小时', value: '小时'},
          {key: '分', value: '分'},
          {key: '秒', value: '秒'},
          {key: '毫秒', value: '毫秒'},
        ],
        dataOption: {key: 'key', value: 'value'},
        open: true,
        className: css.agSelect,
      },
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      }
    },
    {
      headerName: '阴阳',
      field: 'performResult',
      width: 40,
      minWidth: 40,
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      }
    },
    {
      headerName: '停止时间',
      field: 'stopDateTime',
      width: 130,
      minWidth: 130,
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      }
    },
    {
      headerName: '停止医生',
      field: 'stopDoctor',
      width: 100,
      minWidth: 100,
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      valueFormatter: (params) => {
        return orderService.displayCorrectValue(params, 'stopDoctor')
      }
    },
    {
      headerName: '核对护士',
      field: 'processingNurse',
      width: 90,
      minWidth: 90,
      cellClass: (params) => {
        return orderService.setRowClass(params, css)
      },
      valueFormatter: (params) => {
        return orderService.displayCorrectValue(params, 'processingNurse')
      }
    },
  ]

  /**
   * 计费列规则
   */
  billingColumn = [
    {
      headerName: '',
      field: '',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 25,
      minWidth: 25,
      maxWidth: 25,
      cellStyle: {
        paddingLeft: '3px',
        paddingTop: '7px'
      }
    },
    {
      headerName: '类别',
      field: 'itemClassName',
      valueFormatter: (params) => {
        return orderCostService.showCurrentValue(params, 'itemClassName')
      },
      cellClass: (params) => {
        return css.commonClass
      },
    },
    {
      headerName: '计价规则',
      field: 'backbillRule',
      editable: (event) => {
        return orderCostService.editOrNot(event)
      },
      cellEditorFramework: Select,
      cellEditorParams: {
        data: [
          {key: '按次', value: '按次'},
          {key: '按日', value: '按日'},
          {key: '只记一次', value: '只记一次'},
          {key: '不计价', value: '不计价'}
        ],
        dataOption: {key: 'key', value: 'value'},
        className: css.agSelect,
        open: true,
      },
      cellClass: (params) => {
        return css.commonClass
      },
    },
    {
      headerName: '计价项目',
      field: 'itemName',
      editable: (event) => {
        return orderCostService.editOrNot(event)
      },
      cellEditorFramework: InputTable,
      cellEditorParams: {
        data: [],
        option: {
          total: 0,
          columns: [],
          pageSize: 7,
          showValue: 'value',
          columnsCallData: (e, callback) => {
            orderCostService.clinicPriceListColumn(callback)
          }
        },
        isRenderShow: true,
        isMask: true,
        tableLeft: -250,
        callData: (v, callback) => {
          orderCostService.clinicPriceList(v, callback)
        },
      },
      cellClass: (params) => {
        return css.commonClass
      },
    },
    {
      headerName: '数量',
      field: 'amount',
      editable: (event) => {
        return orderCostService.editOrNot(event)
      },
      cellEditorFramework: HintInput,
      cellEditorParams: {
        verification: {eventonver: 'change', regex: /^[1-9]\d*$/}
      },
      cellClass: (params) => {
        return css.commonClass
      },
    },
    {
      headerName: '单位',
      field: 'units',
      cellClass: (params) => {
        return css.commonClass
      },
    },
    {
      headerName: '规格',
      field: 'itemSpec',
      cellClass: (params) => {
        return css.commonClass
      },
    }
  ]

  render() {
    let {orderItemClass, orderData, menuList, showNewVersion, showCosts,
        canControl} = this.state
    return (
      <div>
        <div className={css.ordersTopItem}>
          <Select
            data={orderItemClass}
            dataOption={{value: 'className', key: 'id'}}
            placeholder={'请选择医嘱类别'}
            className={css.orderCate}
            onChange={(key) => {
              orderService.setStateJson('orderClass', key)
            }}
          />
          <div className={css.orderWhen}>
            <b>{'医嘱类型:'}</b>
            <Radio.Group className={css.orderTimeChoose} onChange={(e) => {
              orderService.setStateJson('repeatIndicator', e.target.value)
            }}>
              <Radio value={''}>{'全部'}</Radio>
              <Radio value={'1'}>{'长期'}</Radio>
              <Radio value={'0'}>{'临时'}</Radio>
            </Radio.Group>
          </div>
          <Button type={'primary'} className={classNames(css.publicButton)} onClick={orderService.loadOrders}>
            <IconFont iconName={'icon-sousuo-'}/>{'查询'}
          </Button>
          {/*根据配置判断显示内容*/}
          {showNewVersion ? <div className={css.ordersBtnGroup}>
              <Button type={'primary'} className={classNames(css.publicButton)}>
                <IconFont iconName={'icon-sync'}/>{'刷新'}
              </Button>
              <Button type={'primary'} className={classNames(css.publicButton)} onClick={orderService.tempShow}>
                <IconFont iconName={'icon-wodeyizhu1'}/>{'快速医嘱'}
              </Button>
              <Button type={'primary'} className={classNames(css.publicButton)}>
                <IconFont iconName={'icon-gouxuan'}/>{'提交'}
              </Button>
              <Button type={'primary'} className={classNames(css.publicButton)} onClick={orderService.addOrder}>
                <IconFont iconName={'icon-zengjia-'}/>{'新增'}
              </Button>
              <Button type={'primary'} className={classNames(css.publicButton)} onClick={orderService.insertOrder}>
                <IconFont iconName={'icon-zengjia-'}/>{'插入'}
              </Button>
              <Button type={'primary'} className={classNames(css.publicButton)} onClick={orderService.subOrder}>
                <IconFont iconName={'icon-zicaidan_hover'}/>{'子医嘱'}
              </Button>
              <Button type={'danger'} className={classNames(css.publicButton, css.delButton)} onClick={orderService.delOrder}>
                <IconFont iconName={'icon-jianqu'}/>{'删除'}
              </Button>
              <Button type={'primary'} className={classNames(css.publicButton)} onClick={()=>{orderService.saveOrders(5)}}>
                <IconFont iconName={'icon-baocun1'}/>{'保存'}
              </Button>
              <Button className={classNames(css.publicButton, css.billing)} onClick={orderService.billingShow}>
                <IconFont iconName={'icon-feiyong'}/>{'计费'}
              </Button>
            </div>
            :
            <div className={css.newOrders}>
              <span>{'保存'}</span>
              <span>{'提交'}</span>
              <span>{'执行'}</span>
              <span>{'新开'}</span>
              <span>{'作废'}</span>
              <span>{'停止'}</span>
            </div>}
        </div>
        {/*根据配置判断显示内容*/}
        {showNewVersion ? <div className={css.orders}>
            <Table
              columnDefs={this.orderColumns}
              rowData={orderData}
              customWith={true}
              rowHeight={25}
              suppressCellSelection={false} // 开启单元格选中
              stopEditingWhenGridLosesFocus={true} // 焦点离开关闭编辑模式
              onGridReady={orderService.ordersTableApi}
              onCellClicked={orderService.setRowIndex} // 单击事件
              onCellContextMenu={orderService.rightClick} // 右键事件
              onCellMouseOver={orderService.mouseOver}
              onSelectionChanged={(node) => orderService.selectOrderData(node.api.getSelectedNodes())}
              menuclassName={'ordersRightMenu'}
              rowSelection={'multiple'} // 多选
              ContextMenuList={menuList} // 右键菜单项
              menuClik={orderService.ordersRightMenu} // 右键菜单点击
              onCellValueChanged={orderService.cellValueChange} // 值改变事件
              singleClickEdit={true} // 点击启动编辑加载组件
              suppressDragLeaveHidesColumns={true} // 关闭拖动列到表格外删除列
              suppressMovableColumns={true} // 关闭拖动换列
            />
          </div>
          :
          <div>
            <div className={css.newOrderTable}>
              <Table
                columnDefs={this.orderColumns}
                rowData={orderData}
                customWith={true}
                rowHeight={25}
                suppressCellSelection={false} // 开启单元格选中
                stopEditingWhenGridLosesFocus={true} // 焦点离开关闭编辑模式
                onGridReady={orderService.ordersTableApi}
                onCellClicked={orderService.setRowIndex} // 单击事件
                onCellContextMenu={orderService.rightClick} // 右键事件
                onCellMouseOver={orderService.mouseOver}
                onSelectionChanged={(node) => orderService.selectOrderData(node.api.getSelectedNodes())} // 多选select
                menuclassName={'ordersRightMenu'}
                rowSelection={'multiple'} // 多选
                ContextMenuList={menuList} // 右键菜单项
                menuClik={orderService.ordersRightMenu} // 右键菜单点击
                onCellValueChanged={orderService.cellValueChange} // 值改变事件
                singleClickEdit={true} // 点击启动编辑加载组件
                suppressDragLeaveHidesColumns={true} // 关闭拖动列到表格外删除列
                suppressMovableColumns={true} // 关闭拖动换列
              />
            </div>
            <div className={css.newOrderOperation}>
              <div className={css.newOrderCosts}>
                <Table
                  columnDefs={this.billingColumn}
                  rowData={showCosts}
                  onCellClicked={orderCostService.singleClick}
                  onGridReady={orderCostService.onGridReady}
                  suppressCellSelection={false} // 开启单元格选中
                  stopEditingWhenGridLosesFocus={true} // 焦点离开关闭编辑模式
                  singleClickEdit={true} // 点击启动编辑加载组件
                  suppressDragLeaveHidesColumns={true} // 关闭拖动列到表格外删除列
                  suppressMovableColumns={true} // 关闭拖动换列
                  rowSelection={'multiple'} // 多选
                  onSelectionChanged={(node) => orderCostService.moreSelect(node.api.getSelectedNodes())} // 多选select
                />
              </div>
              <div className={css.newOrderButton}>
                <fieldset>
                  <legend>医嘱操作项:</legend>
                  <Button type={'primary'} className={classNames(css.newPublicButton)}>
                    <IconFont iconName={'icon-sync'}/>{'刷新'}
                  </Button>
                  <Button type={'primary'} className={classNames(css.newPublicButton)} onClick={orderService.tempShow}>
                    <IconFont iconName={'icon-wodeyizhu1'}/>{'快速医嘱'}
                  </Button>
                  <Button type={'primary'} className={classNames(css.newPublicButton)}>
                    <IconFont iconName={'icon-gouxuan'}/>{'提交'}
                  </Button>
                  <Button type={'primary'} className={classNames(css.newPublicButton)} onClick={orderService.addOrder}>
                    <IconFont iconName={'icon-zengjia-'}/>{'新增'}
                  </Button>
                  <Button type={'primary'} className={classNames(css.newPublicButton)} onClick={orderService.insertOrder}>
                    <IconFont iconName={'icon-zengjia-'}/>{'插入'}
                  </Button>
                  <Button type={'primary'} className={classNames(css.newPublicButton)} onClick={orderService.subOrder}>
                    <IconFont iconName={'icon-zicaidan_hover'}/>{'子医嘱'}
                  </Button>
                  <Button type={'danger'} className={classNames(css.newPublicButton, css.delButton)} onClick={orderService.delOrder}>
                    <IconFont iconName={'icon-jianqu'}/>{'删除'}
                  </Button>
                  <Button type={'primary'} className={classNames(css.newPublicButton)} onClick={()=>{orderService.saveOrders(5)}}>
                    <IconFont iconName={'icon-baocun1'}/>{'保存'}
                  </Button>
                </fieldset>
                <fieldset>
                  <legend>计价:</legend>
                  <Button
                      type={'primary'}
                      className={classNames(css.newPublicButton)}
                      onClick={orderCostService.addNewCosts}
                      disabled={!canControl}
                  >
                    {'新增'}
                  </Button>
                  <Button
                      type={'primary'}
                      className={classNames(css.newPublicButton)}
                      onClick={orderCostService.delCosts}
                      disabled={!canControl}
                  >
                    {'删除'}
                  </Button>
                    <Button
                        type={'primary'}
                        className={classNames(css.newPublicButton)}
                        onClick={orderCostService.saveCosts}
                        disabled={!canControl}
                    >
                        {'保存'}
                    </Button>
                </fieldset>
                <fieldset>
                  <legend>报告:</legend>
                  <Button type={'primary'} className={classNames(css.newPublicButton)}>
                    {'检查报告'}
                  </Button>
                  <Button type={'primary'} className={classNames(css.newPublicButton)}>
                    {'检验报告'}
                  </Button>
                </fieldset>
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

/**
 * 公共inputTable
 */
interface PublicInputProps extends CInputTableProps {
  column: any // 列
  rowIndex: number // 行号
}

class PublicInputTable extends React.Component<PublicInputProps, OrderState> {
  orderService = orderService
  getV = null

  /**
   * 判断表头请求字典表字段
   * @param params
   */
  determine = (params) => {
    let value = ''
    switch (params.column.colId) {
      case 'frequency':
        value = 'performFreqDict'
        break
      case 'dosageUnits':
        value = 'dosageUnitsDict'
        break
      case 'administration':
        value = 'administrationDict'
        break
      case 'freqDetail':
        value = 'explainDoctorDict'
        break
      default:
        value = ''
        break
    }
    return value
  }

  /**
   * 判断字段后请求数据
   * @param params
   */
  datermineData = (params) => {
    let data = ''
    let index = params.props.rowIndex
    switch (params.props.column.colId) {
      case 'frequency':
        data = `orderData.${index}.freqCounter`
        break
      case 'dosageUnits':
        data = `orderData.${index}.dosageUnits`
        break
      case 'administration':
        data = `orderData.${index}.administration`
        break
      case 'freqDetail':
        data = `orderData.${index}.freqDetail`
        break
      default:
        data = ''
        break
    }
    return data
  }

  /**
   * 截取其他公用字段
   */
  publicDatermine = (params) => {
    let pub = ''
    switch (params.props.column.colId) {
      case 'frequency':
        pub = 'performFreqDict'
        break
      case 'dosageUnits':
        pub = 'dosageUnitsDict'
        break
      case 'administration':
        pub = 'administrationDict'
        break
      case 'freqDetail':
        pub = 'explainDoctorDict'
        break
      default:
        pub = ''
        break
    }
    return pub
  }

  /**
   * 回显值
   */
  getValue() {
    return this.getV ? this.getV.getValue() : ''
  }

  /**
   * 双击启用编辑模式
   */
  doubleEdit = (rowIndex) => {
    orderService.setStateJson2(true, 'orderData', rowIndex, 'open')
  }

  /**
   * 判断使用组件
   */
  whichComponent = () => {
    let {option, rowIndex, ...rest} = this.props

    let state = orderService.backState()
    option = {
      columnsCallData: (e, callback) => {
        orderService.noChangeColumns(e, callback, this.determine(e))
      }, ...option
    }
    let long = state.orderData[rowIndex].repeatIndicator
    let drug = state.orderData[rowIndex].orderClass
    let open = state.orderData[rowIndex].open
    let colId = this.props.column.colId
    if (long === 1 && (drug === 'A' || drug === 'B')) { // 长期药品
      return <InputTable
        ref={x => this.getV = x}
        option={option}
        callData={(v, callback) => {
          orderService.inputTableCellBack(v, this.publicDatermine(v), this.datermineData(v), callback)
        }}
        {...rest}
      />
    }
    else if ((long === 1 && drug !== 'A') || (long === 1 && drug !== 'B')) { // 长期非药品
      if (colId === 'administration' || colId === 'dosageUnits') {
        return <div>
          {open ?
            <InputTable
              ref={x => this.getV = x}
              option={option}
              callData={(v, callback) => {
                orderService.inputTableCellBack(v, this.publicDatermine(v), this.datermineData(v), callback)
              }}
              {...rest}
            />
            :
            <div onDoubleClick={() => this.doubleEdit(rowIndex)} className={css.empty}>{''}</div>}
        </div>
      }
      else {
        return <InputTable
          ref={x => this.getV = x}
          option={option}
          callData={(v, callback) => {
            orderService.inputTableCellBack(v, this.publicDatermine(v), this.datermineData(v), callback)
          }}
          {...rest}
        />
      }
    }
    else if (long === 0 && (drug === 'A' || drug === 'B')) { // 临时药品
      if (colId === 'dosageUnits' || colId === 'frequency') {
        return <div>{''}</div>
      }
      else {
        return <InputTable
          ref={x => this.getV = x}
          option={option}
          callData={(v, callback) => {
            orderService.inputTableCellBack(v, this.publicDatermine(v), this.datermineData(v), callback)
          }}
          {...rest}
        />
      }
    }
    else { // 临时非药品
      if (colId === 'frequency') {
        return <div>{''}</div>
      }
      else if (colId === 'dosageUnits' || colId === 'administration') {
        return <div>
          {open ?
            <InputTable
              ref={x => this.getV = x}
              option={option}
              callData={(v, callback) => {
                orderService.inputTableCellBack(v, this.publicDatermine(v), this.datermineData(v), callback)
              }}
              {...rest}
            />
            :
            <div onDoubleClick={() => this.doubleEdit(rowIndex)} className={css.empty}>{''}</div>}
        </div>
      }
      else {
        return <InputTable
          ref={x => this.getV = x}
          option={option}
          callData={(v, callback) => {
            orderService.inputTableCellBack(v, this.publicDatermine(v), this.datermineData(v), callback)
          }}
          {...rest}
        />
      }
    }
  }

  render() {
    return this.whichComponent()
  }
}

/**
 * 公共input
 */
interface PublicHintInputProps extends Props {
  column: any // 列
  rowIndex: number // 行号
}

class PublicHintInput extends React.Component<PublicHintInputProps, OrderState> {

  value = null

  /**
   * 回显值
   */
  getValue() {
    return this.value ? this.value.getValue() : this.props.value
  }

  /**
   * 根据药品和长临判断输入组件
   */
  judgement = () => {
    let {verification, rowIndex} = this.props
    let state = orderService.backState()
    let long = state.orderData[rowIndex].repeatIndicator
    let drug = state.orderData[rowIndex].orderClass
    let open = state.orderData[rowIndex].open
    let colId = this.props.column.colId
    let ver = verification ? {eventonver: verification.eventonver || 'change', regex: verification.regex || ''} : undefined
    switch (drug) {
      case 'A':
      case 'B':
        if (long === 1) { // 长期药品
          return <HintInput
            ref={x => this.value = x}
            value={this.getValue()}
            verification={ver}
          />
        }
        else {
          if (colId === 'dosage') { // 临时药品
            return <HintInput
              ref={x => this.value = x}
              value={this.getValue()}
              verification={ver}
            />
          }
          return <div>{''}</div>
        }
      default:
        if (long === 1) { // 长期非药品
          if (colId === 'performSchedule') {
            return <HintInput
              ref={x => this.value = x}
              value={this.getValue()}
              verification={ver}
            />
          }
          return <div>{open ?
            <HintInput
              ref={x => this.value = x}
              value={this.getValue()}
              verification={ver}
            />
            :
            <div onDoubleClick={() => {
              this.doubleEdit(rowIndex)
            }} className={css.empty}>{''}</div>}
          </div>
        }
        else { // 临时非药品
          if (colId === 'dosage') {
            return <div>
              {open ?
                <HintInput
                  ref={x => this.value = x}
                  value={this.getValue()}
                  verification={ver}
                />
                :
                <div onDoubleClick={() => this.doubleEdit(rowIndex)} className={css.empty}>{''}</div>}
              }
            </div>
          }
          return <div>{''}</div>
        }
    }
  }

  /**
   * 双击启用编辑模式
   */
  doubleEdit = (rowIndex) => {
    orderService.setStateJson2(true, 'orderData', rowIndex, 'open')
    setTimeout(() => {
      this.forceUpdate()
    }, 150)
  }

  render() {
    return this.judgement()
  }
}